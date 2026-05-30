// Cloudflare Worker - DeepSeek API proxy
// Keeps the API key on the server side and normalizes chat requests.

const ALLOWED_ORIGINS = [
  'https://vonth.github.io',
];

const MODEL_ALIASES = {
  'deepseek-v4-flash': 'deepseek-v4-flash',
  'deepseek-v4-pro': 'deepseek-v4-pro',
  // legacy compatibility only
  'deepseek-chat': 'deepseek-v4-flash',
  'deepseek-reasoner': 'deepseek-v4-flash',
  'v4flash': 'deepseek-v4-flash',
  'v4pro': 'deepseek-v4-pro',
};

const MAX_HISTORY_MESSAGES = 20;
const DEFAULT_MAX_TOKENS = 1500;
const MAX_ALLOWED_MAX_TOKENS = 8192;

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return corsResponse(null, 204, request);
    }

    if (request.method !== 'POST') {
      return corsResponse({ error: { status: 405, message: 'Method not allowed' } }, 405, request);
    }

    const origin = request.headers.get('Origin') || '';
    const referer = request.headers.get('Referer') || '';
    const isAllowed = ALLOWED_ORIGINS.some(
      allowed => origin === allowed || referer.startsWith(`${allowed}/`)
    );

    if (!isAllowed) {
      return new Response('Forbidden', { status: 403 });
    }

    try {
      const apiKey = env.DEEPSEEK_API_KEY;
      if (!apiKey) {
        throw httpError(500, 'Worker is missing DEEPSEEK_API_KEY');
      }

      const body = await readRequestJson(request);
      if (!body || typeof body !== 'object' || Array.isArray(body)) {
        throw httpError(400, 'Request body must be a JSON object');
      }

      const model = MODEL_ALIASES[body.model];
      if (!model) {
        throw httpError(400, `Unsupported model: ${body.model || 'missing'}`, {
          supportedModels: Object.keys(MODEL_ALIASES),
        });
      }

      const messages = normalizeMessages(body);
      const maxTokens = normalizeMaxTokens(body.max_tokens);
      const upstreamBody = {
        ...body,
        model,
        messages,
        stream: false,
        max_tokens: maxTokens,
      };

      const apiResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(upstreamBody),
      });

      const data = await readJsonResponse(apiResponse);
      if (!apiResponse.ok) {
        const apiError = extractApiError(data, apiResponse.status);
        console.error('DeepSeek API error', JSON.stringify({
          status: apiError.status,
          message: apiError.message,
          details: apiError.details,
          type: apiError.type,
          code: apiError.code,
          model,
          forwardedMessages: messages.length,
          max_tokens: maxTokens,
        }));
        return corsResponse(errorBody(apiError, env), apiResponse.status, request);
      }

      return corsResponse(data, apiResponse.status, request);
    } catch (err) {
      const status = Number.isInteger(err.status) ? err.status : 500;
      const apiError = {
        status,
        message: err.message || 'Worker request failed',
        details: err.details || null,
      };
      console.error('Chat worker error', JSON.stringify(apiError));
      return corsResponse(errorBody(apiError, env), status, request);
    }
  },
};

async function readRequestJson(request) {
  try {
    return await request.json();
  } catch (err) {
    throw httpError(400, 'Request body must be valid JSON', { parseError: err.message });
  }
}

function normalizeMessages(body) {
  let source = Array.isArray(body?.messages) ? body.messages : [];

  if (source.length === 0) {
    const singleContent = typeof body?.content === 'string'
      ? body.content
      : (typeof body?.message === 'string' ? body.message : '');
    if (singleContent.trim()) {
      source = [{ role: 'user', content: singleContent }];
    }
  }

  const normalized = source
    .filter(item => item && typeof item === 'object')
    .map(item => {
      const role = ['system', 'user', 'assistant'].includes(item.role) ? item.role : 'user';
      const content = typeof item.content === 'string'
        ? item.content
        : (typeof item.message === 'string' ? item.message : '');
      return { role, content: content.trim() };
    })
    .filter(item => item.content.length > 0);

  if (normalized.length === 0) {
    throw httpError(400, 'Request must include a non-empty messages array or message/content string', {
      receivedFields: Object.keys(body || {}),
    });
  }

  const firstSystem = normalized.find(item => item.role === 'system');
  const chatMessages = normalized.filter(item => item.role !== 'system').slice(-MAX_HISTORY_MESSAGES);

  if (!chatMessages.some(item => item.role === 'user')) {
    throw httpError(400, 'Request history must include at least one user message', {
      forwardedMessages: chatMessages.length,
    });
  }

  return firstSystem ? [firstSystem, ...chatMessages] : chatMessages;
}

function normalizeMaxTokens(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_MAX_TOKENS;
  }
  return Math.min(parsed, MAX_ALLOWED_MAX_TOKENS);
}

async function readJsonResponse(response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (err) {
    return { raw: text.slice(0, 2000), parseError: err.message };
  }
}

function extractApiError(data, status) {
  const error = data?.error || {};
  return {
    status,
    message: error.message || data?.message || `DeepSeek API returned HTTP ${status}`,
    details: error.details || error.detail || data?.details || data?.detail || data || null,
    type: error.type || data?.type || null,
    code: error.code || data?.code || null,
  };
}

function errorBody(apiError, env) {
  if (isDevelopment(env)) {
    return { error: apiError };
  }

  return {
    error: {
      status: apiError.status,
      message: apiError.status >= 500 ? 'Model API request failed' : apiError.message,
    },
  };
}

function isDevelopment(env) {
  const value = String(env?.ENVIRONMENT || env?.NODE_ENV || env?.DEBUG_API_ERRORS || '').toLowerCase();
  return ['development', 'dev', 'local', 'true', '1'].includes(value);
}

function httpError(status, message, details = null) {
  const err = new Error(message);
  err.status = status;
  err.details = details;
  return err;
}

function corsResponse(data, status, request) {
  const origin = request.headers.get('Origin') || '*';
  const headers = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  return new Response(
    data !== null ? JSON.stringify(data) : null,
    { status, headers }
  );
}

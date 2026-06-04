"use strict";

        const Config = {
            WORKER_URL: 'https://still-bread-327a.liaoyilin826.workers.dev/',
            MAX_REGENERATIONS: 10,
            PAGE_SIZE: 50,
            MAX_API_MESSAGES: 200,
            MAX_CHARS_FOR_CHAT: 200000,
            MAX_COMPLETION_TOKENS: 1500,
            SUMMARY_SINGLE_PASS_CHARS: 30000,
            SUMMARY_SEGMENT_CHARS: 15000,
            SUMMARY_SEGMENT_MAX_TOKENS: 3000,
            SUMMARY_FINAL_MAX_TOKENS: 6000,
            SUMMARY_SEGMENT_MODEL: 'deepseek-v4-pro',
            SUMMARY_SEGMENT_THINKING_MODE: 'fast',
            SUMMARY_FINAL_MODEL: 'deepseek-v4-pro',
            SUMMARY_FINAL_THINKING_MODE: 'thinking',
            SUMMARY_LONG_FINAL_MODEL: 'deepseek-v4-pro',
            SUMMARY_LONG_FINAL_THINKING_MODE: 'fast',
            SUMMARY_ARCHIVE_PROFILE: 'intimacy_multi_role',
            STORY_ARCHIVE_TRIGGER_CHARS: 30000 // 3万字符触发本卷剧情存档建议
        };

        const SVGIcons = {
            edit: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
            delete: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
            close: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
            check: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
            regenerate: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>',
            chevronDown: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>',
            chevronUp: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="18 15 12 9 6 15"></polyline></svg>',
            chevronLeft: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>',
            chevronRight: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>',
            moon: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
            sun: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
            spinner: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>',
            warning: '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
            copy: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
            sparkles: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>'
        };

        // --- IndexedDB 管理 ---
        const DBManager = {
            dbName: 'DeepSeekRP_DB',
            dbVersion: 2,
            db: null,
            init() {
                return new Promise((resolve, reject) => {
                    const request = indexedDB.open(this.dbName, this.dbVersion);
                    request.onupgradeneeded = (e) => {
                        const db = e.target.result;
                        if (!db.objectStoreNames.contains('backgrounds')) {
                            db.createObjectStore('backgrounds', { keyPath: 'id' });
                        }
                        // v2: 新增对话数据存储，替代 localStorage
                        if (!db.objectStoreNames.contains('appdata')) {
                            db.createObjectStore('appdata', { keyPath: 'key' });
                        }
                    };
                    request.onsuccess = (e) => { this.db = e.target.result; resolve(); };
                    request.onerror = (e) => reject(e);
                });
            },
            async saveAppData(data) {
                return new Promise((resolve, reject) => {
                    const tx = this.db.transaction('appdata', 'readwrite');
                    tx.objectStore('appdata').put({ key: 'main', value: data });
                    tx.oncomplete = () => resolve();
                    tx.onerror = (e) => reject(e);
                });
            },
            async loadAppData() {
                return new Promise((resolve, reject) => {
                    const tx = this.db.transaction('appdata', 'readonly');
                    const req = tx.objectStore('appdata').get('main');
                    req.onsuccess = () => resolve(req.result ? req.result.value : null);
                    req.onerror = (e) => reject(e);
                });
            },
            async saveBg(id, dataUrl) {
                return new Promise((resolve, reject) => {
                    const tx = this.db.transaction('backgrounds', 'readwrite');
                    const store = tx.objectStore('backgrounds');
                    store.put({ id, dataUrl, timestamp: Date.now() });
                    tx.oncomplete = () => resolve();
                    tx.onerror = (e) => reject(e);
                });
            },
            async getAllBgs() {
                return new Promise((resolve, reject) => {
                    const tx = this.db.transaction('backgrounds', 'readonly');
                    const store = tx.objectStore('backgrounds');
                    const request = store.getAll();
                    request.onsuccess = () => {
                        const bgs = request.result.sort((a, b) => b.timestamp - a.timestamp);
                        resolve(bgs);
                    };
                    request.onerror = (e) => reject(e);
                });
            },
            async deleteBg(id) {
                return new Promise((resolve, reject) => {
                    const tx = this.db.transaction('backgrounds', 'readwrite');
                    const store = tx.objectStore('backgrounds');
                    store.delete(id);
                    tx.oncomplete = () => resolve();
                    tx.onerror = (e) => reject(e);
                });
            }
        };

        const Pagination = { currentPage: 1 };
        const STALE_GENERATING_SUMMARY_MS = 10 * 60 * 1000;
        let currentAbortController = null;
        let currentPendingRequest = null;

        function escapeHtml(text) {
            if (!text) return '';
            return text.replace(/[&<>]/g, function(m) {
                if (m === '&') return '&amp;';
                if (m === '<') return '&lt;';
                if (m === '>') return '&gt;';
                return m;
            });
        }

        // 配置 marked，渲染 AI 回复中的 Markdown
        if (typeof marked !== 'undefined') {
            marked.setOptions({ breaks: true, gfm: true });
        }
        function renderMarkdown(text) {
            if (!text) return '';
            if (typeof marked === 'undefined') return escapeHtml(text);
            try { return sanitizeHtml(marked.parse(text)); } catch(e) { return escapeHtml(text); }
        }

        function sanitizeHtml(html) {
            const template = document.createElement('template');
            template.innerHTML = html;
            const allowedTags = new Set(['A', 'B', 'BLOCKQUOTE', 'BR', 'CODE', 'DEL', 'EM', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HR', 'I', 'IMG', 'LI', 'OL', 'P', 'PRE', 'S', 'STRONG', 'TABLE', 'TBODY', 'TD', 'TH', 'THEAD', 'TR', 'UL']);
            const allowedAttrs = {
                A: new Set(['href', 'title']),
                IMG: new Set(['src', 'alt', 'title']),
                TH: new Set(['align']),
                TD: new Set(['align'])
            };

            template.content.querySelectorAll('*').forEach((node) => {
                if (!allowedTags.has(node.tagName)) {
                    node.replaceWith(...node.childNodes);
                    return;
                }

                [...node.attributes].forEach((attr) => {
                    const allowed = allowedAttrs[node.tagName]?.has(attr.name);
                    if (!allowed) {
                        node.removeAttribute(attr.name);
                        return;
                    }
                    if ((attr.name === 'href' || attr.name === 'src') && !isSafeUrl(attr.value)) {
                        node.removeAttribute(attr.name);
                    }
                });

                if (node.tagName === 'A') {
                    node.setAttribute('target', '_blank');
                    node.setAttribute('rel', 'noopener noreferrer');
                }
            });

            return template.innerHTML;
        }

        function isSafeUrl(value) {
            const trimmed = String(value || '').trim().toLowerCase();
            return trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:') || trimmed.startsWith('#') || trimmed.startsWith('/');
        }

        function normalizeRequestThinkingMode(model, thinkingMode) {
            if (thinkingMode === 'fast' || thinkingMode === 'thinking') return thinkingMode;
            if (model === 'deepseek-reasoner' || model === 'deepseek-v4-pro' || model === 'v4pro') return 'thinking';
            return 'fast';
        }

        async function callChatApi({ model, messages, signal, thinkingMode, maxTokens }) {
            const normalizedThinkingMode = normalizeRequestThinkingMode(model, thinkingMode);
            const safeMaxTokens = Number.isFinite(maxTokens) && maxTokens > 0 ? maxTokens : Config.MAX_COMPLETION_TOKENS;
            const requestBody = {
                model,
                messages,
                stream: false,
                max_tokens: safeMaxTokens
            };

            if (normalizedThinkingMode === 'thinking') {
                requestBody.thinking = { type: 'enabled' };
                requestBody.reasoning_effort = 'high';
            } else {
                requestBody.thinking = { type: 'disabled' };
            }

            const response = await fetch(Config.WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
                signal
            });

            let data = null;
            try { data = await response.json(); } catch(e) {}

            if (!response.ok) {
                const error = data?.error || {};
                const status = error.status || response.status;
                const message = error.message || data?.message || `HTTP ${response.status}`;
                const details = formatErrorDetails(error.details);
                throw new Error(details ? `[${status}] ${message}\n${details}` : `[${status}] ${message}`);
            }

            const message = data?.choices?.[0]?.message;
            if (!message || typeof message.content !== 'string') {
                throw new Error('API 返回格式异常，未找到有效回复内容');
            }

            return {
                content: message.content,
                reasoning: typeof message.reasoning_content === 'string' ? message.reasoning_content : null,
                finishReason: data?.choices?.[0]?.finish_reason || null,
                usage: data?.usage || null
            };
        }

        function normalizeReplyReasoning(reply) {
            return typeof reply?.reasoning === 'string' && reply.reasoning.trim() ? reply.reasoning : null;
        }

        function startPendingRequest(meta = {}) {
            if (currentAbortController) currentAbortController.abort();
            const controller = new AbortController();
            currentAbortController = controller;
            currentPendingRequest = { ...meta, controller };
            return currentPendingRequest;
        }

        function clearPendingRequest(pending) {
            if (currentPendingRequest === pending) {
                currentPendingRequest = null;
                currentAbortController = null;
            }
        }

        function clearAllPendingRequestState() {
            currentPendingRequest = null;
            currentAbortController = null;
        }

        function isPendingForUserMessage(conv, userMessage) {
            return Boolean(currentPendingRequest && conv && userMessage && currentPendingRequest.conversationId === conv.id && currentPendingRequest.userMessage === userMessage);
        }

        function isPendingForAssistantMessage(conv, assistantMessage) {
            return Boolean(currentPendingRequest && conv && assistantMessage && currentPendingRequest.conversationId === conv.id && currentPendingRequest.assistantMessage === assistantMessage);
        }

        function isMessagePresent(conv, message, role = null) {
            return Boolean(conv && message && conv.messages.includes(message) && (!role || message.role === role));
        }

        function getSummaryMemoryText(msg) {
            return msg.continuationPrompt || msg.content || '';
        }

        function getSummaryTitle(msg, fallbackIndex) {
            return msg.title || `历史剧情总结点 ${fallbackIndex + 1}`;
        }

        function buildInheritedMemoryForNextVolume(conv, summaryMsg) {
            const currentMemory = getSummaryMemoryText(summaryMsg).trim();
            if (!currentMemory) return '';

            const previousMemory = conv?.continuationFrom?.inheritedMemory?.trim();
            if (previousMemory) {
                return `【更早剧情继承】\n${previousMemory}\n\n【上一卷续写包】\n${currentMemory}`;
            }

            return currentMemory;
        }

        function buildContinuationFromSummary(sourceConv, summaryMsg, summaryIndex) {
            const inheritedMemory = buildInheritedMemoryForNextVolume(sourceConv, summaryMsg).trim();
            if (!inheritedMemory) return null;

            return {
                sourceConversationId: sourceConv.id,
                sourceConversationName: sourceConv.name || '',
                sourceSummaryIndex: summaryIndex,
                sourceSummaryTimestamp: summaryMsg.timestamp || new Date().toISOString(),
                sourceSummaryStartOffset: summaryMsg.startOffset,
                sourceSummaryEndOffset: summaryMsg.endOffset,
                inheritedMemory,
                createdAt: new Date().toISOString()
            };
        }

        function buildMemoryBlock(rawHistory, conv = null) {
            const inheritedMemory = typeof conv?.continuationFrom?.inheritedMemory === 'string'
                ? conv.continuationFrom.inheritedMemory.trim()
                : '';
            const doneSummaries = rawHistory
                .filter(m => m.role === 'system_summary' && m.status === 'done')
                .filter(m => getSummaryMemoryText(m).trim());

            if (!inheritedMemory && !doneSummaries.length) return '';

            const recentSummaries = doneSummaries.slice(-3);
            const parts = [];

            if (inheritedMemory) {
                parts.push(
                    '【上一卷继承记忆】',
                    '以下内容来自上一卷的模型续写包，是当前会话必须继承的剧情事实、角色状态、关系进展和当前接续点。请继承这些内容，但不要主动复述。',
                    inheritedMemory
                );
            }

            if (recentSummaries.length) {
                if (inheritedMemory) {
                    parts.push(
                        '【当前会话内剧情存档】',
                        '以下内容是当前会话内已经完成的剧情存档，请一并继承。'
                    );
                } else {
                    parts.push(
                        '【剧情存档 / 前情提要】',
                        '以下内容是已经发生过的剧情事实和角色记忆，不是当前对话。请继承这些内容，但不要主动复述或回应它。'
                    );
                }

                recentSummaries.forEach((m, idx) => {
                    const globalSummaryIndex = doneSummaries.length - recentSummaries.length + idx;
                    const title = getSummaryTitle(m, globalSummaryIndex);
                    const text = getSummaryMemoryText(m).trim();
                    parts.push(`【${title}】\n${text}`);
                });
            }

            return parts.join('\n\n');
        }

        function parseStoryArchiveReply(text) {
            function extractBlock(source, startTag, endTag) {
                const start = source.indexOf(startTag);
                if (start === -1) return '';
                const contentStart = start + startTag.length;
                const end = source.indexOf(endTag, contentStart);
                if (end === -1 || end <= contentStart) return '';
                return source.slice(contentStart, end).trim();
            }

            const source = typeof text === 'string' ? text : '';
            const userArchive = extractBlock(source, '<<<USER_ARCHIVE>>>', '<<<END_USER_ARCHIVE>>>');
            const continuationPrompt = extractBlock(source, '<<<CONTINUATION_PROMPT>>>', '<<<END_CONTINUATION_PROMPT>>>');

            return { title: '', userArchive, continuationPrompt };
        }

        const RELATIONSHIP_ARCHIVE_SYSTEM_PROMPT = [
            '你是一位专业的角色扮演"关系档案"整理员。你的任务是阅读一段角色扮演对话，',
            '并基于"现有档案 + 新增对话"，推演出角色经历这段剧情后的最新状态档案，供后续对话延续人设之用。',
            '',
            '你必须遵守：',
            '- 你只整理已经发生的内容，绝不续写剧情、绝不替用户角色做任何决定、绝不改写或推翻已发生的事实。',
            '- 你不进行角色扮演，不回应对话内容，只输出档案。',
            '- 如对话中存在亲密内容，只客观记录其关系性质、情感与心理影响，',
            '  不露骨复述细节，不新增未发生的内容。',
            '- 你的全部输出必须是一个合法的 JSON 对象，不含任何 JSON 之外的文字。',
            '',
            '核心写作原则：',
            '1. 你要写的是"角色经历这些之后、现在是谁、对用户是什么状态"，而不是流水账式地复述"发生了哪些事"。',
            '2. 保留角色的本性张力，不要抹平。角色初始设定中的核心性格特质、防御机制与内心创伤不会凭空消失——',
            '   剧情改变的往往不是这些特质本身，而是它们\\*对用户\\*的朝向与表现方式（例：原本用于自我保护的某种言行，',
            '   对用户可能转化为亲昵或信任的表达）。请把"本性仍在、但对用户已然不同"的张力如实写出。',
            '   绝不要为了表现关系进展，就把角色简化成一味顺从、温柔或甜腻的样子——那会让角色失真、扁平。',
            '3. 不要遗漏有情感重量的关键细节。具体的物件、场景、对话（如某个有意义的礼物、某次关键的坦白），',
            '   即使只出现一次，只要承载情感意义，就必须保留；不要因为某些闲聊出现多次就记录它、却漏掉真正重要的东西。'
        ].join('\n');

        const RELATIONSHIP_ARCHIVE_OUTPUT_EXAMPLE = [
            '{',
            '  "state": {',
            '    "relationshipDefinition": "……",',
            '    "attitudeToUser": "……",',
            '    "relationshipTemperature": "……",',
            '    "emotionalState": "……",',
            '    "traumaStatus": "……"',
            '  },',
            '  "journal": "（完整的、包含旧内容+新内容的情感日记全文）",',
            '  "toneExamples": \\["……", "……"],',
            '  "newAnchors": \\["……", "……"]',
            '}'
        ].join('\n');

        function buildRelationshipArchivePersonInstruction(archive, roleName) {
            if (archive?.journalPerson === 'first') {
                return [
                    `· journal 的叙述人称：以角色【${roleName}】的第一人称口吻书写，角色自称"我"，称呼对方为"用户"或角色对用户惯用的称呼。`,
                    '  日记是角色的内心独白，要带入角色的语气、心境与主观感受去回顾这段关系。',
                    '  注意：日记只记录角色自己视角所知、所感的内容；对于用户的想法，只能是角色的揣测与观察，不可替用户断定其内心。'
                ].join('\n');
            }
            return '· journal 的叙述人称：第三人称客观视角。以旁观者口吻叙述，角色称其名（如"风澪"），用户称"用户"。';
        }

        function isArchiveEmptyForPrompt(archive) {
            if (!archive) return true;
            const state = normalizeArchiveState(archive.state);
            return !state.relationshipDefinition.trim()
                && !state.attitudeToUser.trim()
                && !state.relationshipTemperature.trim()
                && !state.emotionalState.trim()
                && !state.traumaStatus.trim()
                && !(archive.journal || '').trim()
                && !(archive.toneExamples || []).length
                && !(archive.anchors || []).length;
        }

        function buildExistingArchiveJson(archive) {
            if (isArchiveEmptyForPrompt(archive)) return '{}';
            return JSON.stringify({
                state: normalizeArchiveState(archive.state),
                journal: typeof archive.journal === 'string' ? archive.journal : '',
                toneExamples: Array.isArray(archive.toneExamples) ? archive.toneExamples : [],
                anchors: Array.isArray(archive.anchors) ? archive.anchors : []
            }, null, 2);
        }

        function buildRelationshipArchiveMessages({ role, roleLabel, archive, newChunkText }) {
            const roleName = role?.name || roleLabel || 'AI侧角色/角色组';
            const personInstruction = buildRelationshipArchivePersonInstruction(archive, roleName);
            const existingArchiveJson = buildExistingArchiveJson(archive);
            const userPrompt = [
                `角色名：${roleName}`,
                '',
                '角色初始设定（供参考，理解角色底色，不要直接抄进档案）：',
                role?.systemPrompt || '',
                '',
                personInstruction,
                '',
                '【现有档案】（上次更新后的档案 JSON；若为空对象 {} 表示首次生成，直接基于新增对话生成）：',
                existingArchiveJson,
                '',
                `【新增对话】（从上次更新到现在新发生的对话。"${roleLabel}："为角色台词，"用户："为用户台词）：`,
                '====================',
                newChunkText,
                '====================',
                '',
                '请基于「现有档案 + 新增对话」，推演角色的最新状态，按下列规则更新各字段，并严格只输出一个 JSON 对象。',
                '',
                '字段更新规则：',
                '· state：基于现有 state 演进、整体重写，反映最新现状。包含：',
                '  - relationshipDefinition：两人关系的当前定性。',
                '  - attitudeToUser：【最重要】角色此刻对用户的态度——信任程度、亲疏、防备是否卸下、以何种方式表达在乎；',
                '    相比故事开始有何转变，写清楚。',
                '  - relationshipTemperature：用一个词概括当前关系温度（可加括号补充），如"炽热（伴随患得患失）"。',
                '  - emotionalState：角色当前的情绪与心理状态。',
                '  - traumaStatus：角色核心创伤/软肋现在以什么形式存在（缓和了，还是变了形式）。',
                '    ★若本段新增对话未涉及这一方面，请原样沿用现有档案中的该项描述，不要凭空编造变化。',
                '· journal：见下方"journal 专项规则"。',
                '· toneExamples：从【新增对话】中挑选 1-2 句最能代表角色"现在"对用户说话方式的台词，',
                '  尽量摘录原话，可在括号内补一句神态。整体替换。',
                '· newAnchors：★只输出【现有档案】的 anchors 列表里"尚未出现"的、有情感重量的具体细节（物件 / 场景 / 具体对话）。',
                '  已经在列表里的绝不重复；本段没有新的就输出空数组 \\[]。不要输出已有 anchors。',
                '',
                'journal 专项规则：',
                '· journal 是这段关系的"情感日记"——一段连续、流动的叙事，记录两人一路走来的历程，而非事件清单。',
                '· 记录的核心是"这段时间里两人之间发生了什么、对这段关系与角色心境意味着什么"，把关系、情感、态度的变化',
                '  自然融入叙述。每个有分量的节点都要写到，交代清楚来龙去脉（起承转合），但只写其情感意义，',
                '  不铺陈具体动作细节（具体物件 / 场景 / 对话由 anchors 负责，journal 不重复）。',
                '· 不必强求每段都有"重大转折"。关系早期转折可能密集；进入平稳相处后，则如实记录相处的质感、氛围与',
                '  情感的细微加深——平淡的温情同样是关系的重要部分，不要因为"没有大事发生"就略过或硬拔高成转折。',
                '· 更新方式：在【现有档案】journal 的结尾，把【新增对话】这一段自然续写下去，输出完整的最新 journal',
                '  （包含旧内容 + 新内容）。保持前后连贯的叙事感。',
                '  ★已有的早期内容必须保持原貌，绝不要为了简短而压缩、概括或删改前面的部分。',
                '· journal 没有字数上限。它随剧情自然增长，长度由内容决定，绝不要为了控制篇幅而牺牲早期内容或主线的完整性。',
                '',
                '输出格式（严格遵守）：',
                '- 只输出一个合法 JSON 对象，不要任何解释、前言、结尾，不要 Markdown 代码块标记（不要出现 ```）。',
                '- newAnchors 只放本次新增，不要带上已有的（系统会自行合并）。',
                '- 严格使用以下结构（见 5.4 示例）。',
                RELATIONSHIP_ARCHIVE_OUTPUT_EXAMPLE
            ].join('\n');

            return [
                { role: 'system', content: RELATIONSHIP_ARCHIVE_SYSTEM_PROMPT },
                { role: 'user', content: userPrompt }
            ];
        }

        function stripJsonCodeFence(text) {
            const source = String(text || '').trim();
            const match = source.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
            return (match ? match[1].trim() : source).replace(/\\([\[\]])/g, '$1');
        }

        function parseRelationshipArchiveReply(text) {
            let parsed;
            try {
                parsed = JSON.parse(stripJsonCodeFence(text));
            } catch (err) {
                throw new Error('模型返回不是合法 JSON');
            }
            if (!parsed || typeof parsed !== 'object' || !parsed.state || typeof parsed.state !== 'object' || typeof parsed.journal !== 'string') {
                throw new Error('模型返回缺少 state 或 journal');
            }
            return {
                state: normalizeArchiveState(parsed.state),
                journal: parsed.journal,
                toneExamples: Array.isArray(parsed.toneExamples) ? parsed.toneExamples.filter(item => typeof item === 'string') : [],
                newAnchors: Array.isArray(parsed.newAnchors) ? parsed.newAnchors.filter(item => typeof item === 'string') : []
            };
        }

        function dedupeAppendAnchors(existing, additions) {
            const result = Array.isArray(existing) ? existing.filter(item => typeof item === 'string') : [];
            const seen = new Set(result.map(item => item.trim()).filter(Boolean));
            (Array.isArray(additions) ? additions : []).forEach(item => {
                const text = typeof item === 'string' ? item.trim() : '';
                if (!text || seen.has(text)) return;
                seen.add(text);
                result.push(text);
            });
            return result;
        }

        function mergeRelationshipArchive(oldArchive, draft, currentEnd) {
            const normalizedOld = normalizeConversationArchive(oldArchive);
            return {
                version: normalizedOld.version + 1,
                lastIndex: Number.isInteger(currentEnd?.effectiveIndex) ? currentEnd.effectiveIndex : normalizedOld.lastIndex,
                lastMessageId: typeof currentEnd?.messageId === 'string' ? currentEnd.messageId : normalizedOld.lastMessageId,
                journalPerson: normalizedOld.journalPerson,
                state: normalizeArchiveState(draft.state),
                journal: typeof draft.journal === 'string' ? draft.journal : '',
                toneExamples: Array.isArray(draft.toneExamples) ? draft.toneExamples.filter(item => typeof item === 'string') : [],
                anchors: dedupeAppendAnchors(normalizedOld.anchors, draft.newAnchors)
            };
        }

        function appendDefaultContinuationConstraints(text) {
            const constraints = `

## 续写约束
- 不要重置关系。
- 不要改写已发生事实。
- 不要替用户角色做决定。
- 不要突然让角色性格漂移。
- 不要突然消除身体状态和情绪余波。
- 不要跳过当前未完成动作。
- 不要突然揭露全部秘密。
- 从当前停顿点自然继续。
- 保持本卷形成的语气、称呼、关系张力、身体状态和互动节奏。`;

            const source = (text || '').trim();
            if (!source) return '';
            if (source.includes('## 续写约束')) return source;
            return `${source}${constraints}`;
        }

        function formatDialogueMessages(messages, absoluteStartOffset, roleLabel) {
            return messages.map((m, i) =>
                `【第${absoluteStartOffset + i + 1}条】${m.role === 'user' ? '用户' : roleLabel}：${m.content}`
            ).join('\n\n');
        }

        function splitMessagesIntoSegments(selectedMessages, startOffset, roleLabel, maxChars) {
            const segments = [];
            let current = [];
            let currentChars = 0;
            let currentStart = startOffset;

            const pushCurrent = () => {
                if (!current.length) return;
                const segmentStartOffset = currentStart;
                const segmentEndOffset = currentStart + current.length - 1;
                segments.push({
                    segmentIndex: segments.length,
                    startOffset: segmentStartOffset,
                    endOffset: segmentEndOffset,
                    messages: current,
                    text: formatDialogueMessages(current, segmentStartOffset, roleLabel),
                    charCount: currentChars
                });
            };

            for (let i = 0; i < selectedMessages.length; i++) {
                const msg = selectedMessages[i];
                const len = msg.content?.length || 0;

                if (current.length > 0 && currentChars + len > maxChars) {
                    pushCurrent();
                    current = [];
                    currentChars = 0;
                    currentStart = startOffset + i;
                }

                current.push(msg);
                currentChars += len;
            }

            pushCurrent();
            return segments;
        }

        function isSegmentDraftUsable(draft, segments) {
            if (!Array.isArray(draft) || draft.length !== segments.length) return false;
            return draft.every((d, i) => {
                const seg = segments[i];
                return d
                    && d.segmentIndex === seg.segmentIndex
                    && d.startOffset === seg.startOffset
                    && d.endOffset === seg.endOffset
                    && typeof d.content === 'string'
                    && d.content.trim();
            });
        }

        function recoverStaleGeneratingSummaries(conv) {
            if (!conv || !Array.isArray(conv.messages)) return false;

            const now = Date.now();
            let recovered = false;

            conv.messages.forEach(msg => {
                if (!msg || msg.role !== 'system_summary' || msg.status !== 'generating') return;

                const marker = msg.updatedAt || msg.startedAt;
                const markerTime = marker ? Date.parse(marker) : NaN;
                const isStale = !Number.isFinite(markerTime) || now - markerTime > STALE_GENERATING_SUMMARY_MS;

                if (!isStale) return;

                msg.status = 'warning';
                delete msg.progressText;
                recovered = true;
            });

            return recovered;
        }

        function getContinuationOnlyArchiveProfilePrompt(profile) {
            const outputTemplate = `请基于全部输入生成仅供模型续写的剧情复盘报告。禁止续写剧情，禁止替用户角色做决定，禁止添加原文未发生的内容。\n\nAI侧角色/角色组说明：该名称可能是单一角色，也可能包含多个由 assistant 同时扮演的角色。请根据角色设定和对话内容判断实际主要角色。若只有一个 AI侧角色，不要凭空拆出多个角色；若有多个 AI侧角色，不要把他们合并成一个人。不要凭空创造原文没有的角色。\n\n写作原则：请先按输入或分段摘要的顺序还原完整主线，再整理人物状态、伏笔与当前焦点事件。不要直接按主题合并所有分段，不要机械拼接，不要打乱时间线。最终续写包建议控制在 2200～3000 中文字以内；如果内容过多，优先保留：1. 当前焦点事件；2. 核心主线与完整经过；3. 人物状态与关系；4. 伏笔与未解冲突。当前焦点事件必须写得具体、有画面感，不能只写一句话。\n\n请严格只输出以下一个分隔块，不要输出 USER_ARCHIVE，不要输出 ARCHIVE_TITLE，不要输出 JSON，不要输出卷标题，不要输出一句话概括，不要输出固定约束段，不要添加分隔符之外的开场白、解释或补充说明。\n\n<<<CONTINUATION_PROMPT>>>\n# 下一卷续写包\n\n## 核心世界观与主线\n根据所有分段摘要，按原文时序整理故事背景、主线发展和本卷完整剧情经过。重点写清事件是如何一步步发展到当前局面的，不要按主题打乱顺序。保留重要时间标签、场景转换、因果关系和关系推进。\n\n## 人物设定与状态\n整理所有主要出场人物的身份、性格、外貌/身体状态、当前心理、动机、已知信息、隐瞒信息、相互关系及卷末状态。多角色时逐人记录，不要合并成一个“AI角色”；单角色时不要凭空拆分。可以自然写入亲密关系造成的身体/情绪余波，但不要露骨复述细节。\n\n## 伏笔与未解之谜\n整理所有仍需保留的暗线、未解冲突、误会、谎言、未完成对话、待揭露真相、已预告事件和后续必须延续的线索。不要把已经解决的事误写成伏笔。\n\n## 当前焦点事件\n这是最重要的接续部分。请详细整理故事最后中断时的具体场景、时间、地点、环境氛围、在场人物位置、角色动作、最后台词/问题、情绪与关系张力、身体状态、未完成互动和下一轮最自然应该从哪里接上。写法要有画面感，像“下一幕开场场记”，不要写成干巴巴的任务清单。不得续写后续剧情，不得替用户角色决定下一步行为。\n<<<END_CONTINUATION_PROMPT>>>`;

            if (profile === 'intimacy_multi_role') {
                return {
                    systemPrompt: `你是一位专业的长篇角色扮演剧情档案整理员，擅长整理成人、多角色、复杂亲密关系 RP 的模型续写包。你的任务是客观整理已经发生的剧情事实、角色状态、关系进展、亲密关系造成的情绪与身体余波、未回收伏笔和当前接续点，让后续模型能够准确继承剧情。你不得续写剧情，不得新增亲密内容，不得替用户角色做新决定，不得改写已发生事实。所有角色均按成年人处理；如原文中存在边界、犹豫、拒绝、误会或权力不平衡，只能客观记录为剧情状态和后续约束，不得美化或扩写。不得输出 CONTINUATION_PROMPT 分隔块之外的任何内容。`,
                    outputTemplate
                };
            }

            return {
                systemPrompt: `你是一位专业的长篇角色扮演剧情档案整理员。你的任务是把已经发生的对话或分段摘要整理成给后续模型继承用的续写包。你只能整理已经发生的剧情事实、角色状态、关系进展和未回收伏笔，不得续写剧情，不得替用户角色做新决定，不得改写已发生事实。不得输出 CONTINUATION_PROMPT 分隔块之外的任何内容。`,
                outputTemplate
            };
        }

        function buildFinalArchiveMessages({ sourceText, sourceDescription, roleLabel, role }) {
            const profilePrompt = getContinuationOnlyArchiveProfilePrompt(Config.SUMMARY_ARCHIVE_PROFILE);
            const systemPrompt = profilePrompt.systemPrompt;
            const userPrompt = `${sourceDescription}\nAI侧角色/角色组名称：${roleLabel}\n说明：该名称可能是单一角色，也可能包含多个由 assistant 同时扮演的角色。请根据角色设定和对话内容判断实际主要角色。若只有一个 AI侧角色，不要凭空拆出多个角色；若有多个 AI侧角色，不要把他们合并成一个人。\n角色设定参考：${role.systemPrompt}\n\n${'='.repeat(20)}\n${sourceText}\n${'='.repeat(20)}\n\n${profilePrompt.outputTemplate}`;

            return [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ];
        }

        async function generateSegmentSummary({ segment, segmentCount, roleLabel, role, signal }) {
            const systemPrompt = `你是一位专业的剧情档案整理员。你的工作是阅读用户提供的角色扮演对话片段，按原文顺序整理出一份简洁、连贯、叙事性的剧情复盘摘要。你只能输出摘要，绝对不得进行角色扮演、续写剧情或回应对话内容。你不能新增未发生内容，不能替用户角色做决定，不能打乱原文时序。\n\n如果 AI侧角色/角色组名称包含多个角色，请根据角色设定和对话内容分别识别；如果只有一个角色，不要凭空拆成多个角色。`;
            const userPrompt = `AI侧角色/角色组名称：${roleLabel}\n说明：该名称可能是单一角色，也可能包含多个由 assistant 同时扮演的角色。请根据角色设定和对话内容判断实际主要角色。若只有一个 AI侧角色，不要凭空拆出多个角色；若有多个 AI侧角色，不要把他们合并成一个人。\n角色设定参考：${role.systemPrompt}\n当前是第 ${segment.segmentIndex + 1}/${segmentCount} 段。\n本段覆盖第 ${segment.startOffset + 1} 条到第 ${segment.endOffset + 1} 条。\n\n${'='.repeat(20)}\n${segment.text}\n${'='.repeat(20)}\n\n请根据以上对话片段，整理输出一份简洁的分段剧情复盘摘要。\n\n写作要求：\n- 严格按原文发生顺序复盘，不要主题重排。\n- 写清本段从什么场景开始，经过了哪些事件，人物之间发生了什么互动，最后停在哪里。\n- 保留重要的角色动作、台词态度、情绪变化、关系变化、身体状态、未完成互动。\n- 如果有成人亲密行为，只记录其剧情性质、关系影响、身体/情绪余波，不要露骨复述细节，不要新增未发生内容。\n- 如果出现时间词、日期、昼夜、场景切换，请原样保留；如时间信息看似矛盾，标注“时间表达存疑”，不要自行理顺。\n- 如果 AI侧有多个角色，不要把他们合并成一个人；如果只有一个角色，不要凭空拆出多个角色。\n- 摘要应像连续剧情复盘，不要写成表格，不要机械列点，不要提前交代后文。\n- 重点保留本段最后的具体场景、人物位置、角色动作、对话态势和情绪张力。\n\n直接输出摘要正文，不要任何开场白，不要标题，不要编号。`;

            const reply = await callChatApi({
                model: Config.SUMMARY_SEGMENT_MODEL,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                signal,
                thinkingMode: Config.SUMMARY_SEGMENT_THINKING_MODE,
                maxTokens: Config.SUMMARY_SEGMENT_MAX_TOKENS
            });

            if (reply.finishReason === 'length') {
                throw new Error(`第 ${segment.segmentIndex + 1}/${segmentCount} 段摘要被 max_tokens 截断，请提高 SUMMARY_SEGMENT_MAX_TOKENS 后重试`);
            }

            return reply.content;
        }

        function buildFinalArchivePromptFromSegments({ segmentSummaries, roleLabel, role, startOffset, endOffset }) {
            const sourceText = segmentSummaries.map((item, idx) =>
                `【分段摘要 ${idx + 1}/${segmentSummaries.length}｜第 ${item.segment.startOffset + 1} 条至第 ${item.segment.endOffset + 1} 条】\n${item.content}`
            ).join('\n\n');

            const sourceDescription = `以下是按完整消息边界覆盖第 ${startOffset + 1} 条至第 ${endOffset + 1} 条对话后生成的全部分段剧情复盘摘要，共 ${segmentSummaries.length} 段。请生成仅供模型续写的剧情复盘报告。

长范围合并要求：
- 你将看到按原文顺序排列的分段剧情复盘摘要。
- 请先按分段顺序还原完整主线，再整理人物状态、伏笔与当前焦点事件。
- 不要直接按主题合并所有分段；连续事件必须保持连续。
- 不要机械拼接，不要打乱时间线，不要只总结最后一段。
- 当前焦点事件必须来自最后一个分段的结尾状态，并结合整体关系状态补充。
- 最终只输出 CONTINUATION_PROMPT 分隔块。
- 不要输出 USER_ARCHIVE、ARCHIVE_TITLE、卷标题、一句话概括、固定约束段、JSON 或分隔符之外的解释。
- 最终续写包建议控制在 2200～3000 中文字以内。
- 如果内容过多，优先保留：当前焦点事件、核心主线与完整经过、人物状态与关系、伏笔与未解冲突。
- 当前焦点事件必须写得具体、有画面感，不能只写一句话。
- 不得补写剧情，不得替用户角色决定下一步行为。`;
            return buildFinalArchiveMessages({ sourceText, sourceDescription, roleLabel, role });
        }

        function formatErrorDetails(details) {
            if (!details) return '';
            const text = typeof details === 'string' ? details : JSON.stringify(details);
            return text.length > 800 ? `${text.slice(0, 800)}...` : text;
        }

        function normalizeContinuationFrom(value) {
            if (!value || typeof value !== 'object') return undefined;
            const inheritedMemory = typeof value.inheritedMemory === 'string' ? value.inheritedMemory.trim() : '';
            if (!inheritedMemory) return undefined;

            const normalized = {
                sourceConversationId: typeof value.sourceConversationId === 'string' ? value.sourceConversationId : '',
                sourceConversationName: typeof value.sourceConversationName === 'string' ? value.sourceConversationName : '',
                sourceSummaryIndex: Number.isInteger(value.sourceSummaryIndex) ? value.sourceSummaryIndex : null,
                sourceSummaryTimestamp: typeof value.sourceSummaryTimestamp === 'string' ? value.sourceSummaryTimestamp : '',
                inheritedMemory,
                createdAt: typeof value.createdAt === 'string' ? value.createdAt : new Date().toISOString()
            };

            if (Number.isInteger(value.sourceSummaryStartOffset)) normalized.sourceSummaryStartOffset = value.sourceSummaryStartOffset;
            if (Number.isInteger(value.sourceSummaryEndOffset)) normalized.sourceSummaryEndOffset = value.sourceSummaryEndOffset;

            return normalized;
        }

        function normalizeImportedRoles(data) {
            if (!data || !Array.isArray(data.roles)) return [];

            return data.roles
                .filter(role => role && typeof role === 'object')
                .map(role => {
                    const conversations = Array.isArray(role.conversations) ? role.conversations.map(conv => {
                        const normalizedConv = {
                            id: conv?.id || DataManager.generateId(),
                            name: typeof conv?.name === 'string' && conv.name.trim() ? conv.name.trim() : '新对话',
                            messages: Array.isArray(conv?.messages) ? conv.messages.map(normalizeImportedMessage).filter(Boolean) : []
                        };
                        const continuationFrom = normalizeContinuationFrom(conv?.continuationFrom);
                        if (continuationFrom) normalizedConv.continuationFrom = continuationFrom;
                        return normalizedConv;
                    }) : [];

                    const normalizedRole = {
                        id: role.id || DataManager.generateId(),
                        name: typeof role.name === 'string' && role.name.trim() ? role.name.trim() : '未命名角色',
                        systemPrompt: typeof role.systemPrompt === 'string' && role.systemPrompt.trim() ? role.systemPrompt.trim() : '你是一个乐于助人的AI助手。',
                        conversations
                    };
                    if (normalizedRole.conversations.length === 0) {
                        normalizedRole.conversations.push({ id: DataManager.generateId(), name: '新对话', messages: [] });
                    }
                    return normalizedRole;
                });
        }

        function normalizeImportedMessage(msg) {
            if (!msg || typeof msg !== 'object') return null;
            const allowedRoles = new Set(['user', 'assistant', 'system_summary']);
            if (!allowedRoles.has(msg.role)) return null;

            const normalized = {
                role: msg.role,
                content: typeof msg.content === 'string' ? msg.content : '',
                timestamp: msg.timestamp || new Date().toISOString()
            };

            if (msg.role === 'assistant') {
                normalized.reasoning = typeof msg.reasoning === 'string' ? msg.reasoning : null;
                normalized.regenerations = Array.isArray(msg.regenerations) ? msg.regenerations.map(regen => ({
                    content: typeof regen?.content === 'string' ? regen.content : '',
                    reasoning: typeof regen?.reasoning === 'string' ? regen.reasoning : null,
                    timestamp: regen?.timestamp || Date.now()
                })) : [];
                normalized.currentVersion = Number.isInteger(msg.currentVersion) ? Math.max(0, Math.min(msg.currentVersion, normalized.regenerations.length)) : 0;
                normalized.reasoningCollapsed = Boolean(msg.reasoningCollapsed);
            }

            if (msg.role === 'system_summary') {
                normalized.status = ['warning', 'generating', 'done'].includes(msg.status) ? msg.status : 'warning';
                if (Number.isInteger(msg.startOffset)) normalized.startOffset = msg.startOffset;
                if (Number.isInteger(msg.endOffset)) normalized.endOffset = msg.endOffset;
                if (typeof msg.title === 'string') normalized.title = msg.title;
                if (typeof msg.continuationPrompt === 'string') normalized.continuationPrompt = msg.continuationPrompt;
                if (typeof msg.archiveType === 'string') normalized.archiveType = msg.archiveType;
                if (Array.isArray(msg.segmentSummariesDraft)) {
                    normalized.segmentSummariesDraft = msg.segmentSummariesDraft
                        .filter(item =>
                            item
                            && Number.isInteger(item.segmentIndex)
                            && Number.isInteger(item.startOffset)
                            && Number.isInteger(item.endOffset)
                            && typeof item.content === 'string'
                        )
                        .map(item => ({
                            segmentIndex: item.segmentIndex,
                            startOffset: item.startOffset,
                            endOffset: item.endOffset,
                            content: item.content,
                            createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString()
                        }));
                }
            }

            return normalized;
        }


        const FIELD_LABELS = {
            identity: '身份背景', personality: '性格内核', speech: '说话方式', userPersona: '用户角色设定', relationship: '与用户关系', scene: '开场场景', taboo: '绝不破戒'
        };
        const DEFAULT_ACCENT_COLOR = '#b08968';
        const DEFAULT_SAVED_COLORS = ['#b08968', '#c47a8a', '#8a7ab0', '#7a9a6a'];
        const DEFAULT_GLOBAL_SETTINGS = { theme: 'night', defaultModel: 'deepseek-v4-pro', defaultThinkingMode: 'thinking', defaultAccentColor: DEFAULT_ACCENT_COLOR, savedColors: DEFAULT_SAVED_COLORS.slice(), contextMessageLimit: 200, storyArchiveTriggerChars: 30000 };

        function makeId() { return crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(16).slice(2); }
        function normalizeHexColor(value, fallback = DEFAULT_ACCENT_COLOR) { const raw = String(value || '').trim(); return /^#[0-9a-fA-F]{6}$/.test(raw) ? raw.toLowerCase() : fallback; }
        function normalizeRoleFields(value) { if (!value || typeof value !== 'object') return null; const out = {}; let hasAny = false; Object.keys(FIELD_LABELS).forEach(key => { out[key] = typeof value[key] === 'string' ? value[key] : ''; if (out[key].trim()) hasAny = true; }); return hasAny ? out : null; }
        function buildSystemPromptFromFields(fields) { const normalized = normalizeRoleFields(fields); if (!normalized) return ''; return Object.entries(FIELD_LABELS).map(([key, label]) => { const text = (normalized[key] || '').trim(); return text ? '【' + label + '】\n' + text : ''; }).filter(Boolean).join('\n\n'); }
        function getInitialChar(name) { const chars = Array.from(String(name || '').trim()); return chars.length ? chars[chars.length - 1].toUpperCase() : 'AI'; }
        function normalizeImportedMessage(msg) {
            if (!msg || typeof msg !== 'object') return null;
            const allowedRoles = new Set(['user', 'assistant', 'system_summary', 'scene_separator']);
            if (!allowedRoles.has(msg.role)) return null;
            const normalized = { id: typeof msg.id === 'string' && msg.id ? msg.id : makeId(), role: msg.role, content: typeof msg.content === 'string' ? msg.content : '', timestamp: msg.timestamp || new Date().toISOString() };
            if (msg.role === 'assistant') {
                normalized.reasoning = typeof msg.reasoning === 'string' ? msg.reasoning : null;
                normalized.regenerations = Array.isArray(msg.regenerations) ? msg.regenerations.map(regen => ({ content: typeof regen?.content === 'string' ? regen.content : '', reasoning: typeof regen?.reasoning === 'string' ? regen.reasoning : null, timestamp: regen?.timestamp || Date.now() })) : [];
                normalized.currentVersion = Number.isInteger(msg.currentVersion) ? Math.max(0, Math.min(msg.currentVersion, normalized.regenerations.length)) : 0;
                normalized.reasoningCollapsed = msg.reasoningCollapsed !== undefined ? Boolean(msg.reasoningCollapsed) : true;
            }
            if (msg.role === 'system_summary') {
                normalized.status = ['warning', 'generating', 'done'].includes(msg.status) ? msg.status : 'warning';
                ['startOffset', 'endOffset'].forEach(key => { if (Number.isInteger(msg[key])) normalized[key] = msg[key]; });
                ['title', 'continuationPrompt', 'archiveType', 'progressText', 'startedAt', 'updatedAt'].forEach(key => { if (typeof msg[key] === 'string') normalized[key] = msg[key]; });
                if (Array.isArray(msg.segmentSummariesDraft)) normalized.segmentSummariesDraft = msg.segmentSummariesDraft.filter(item => item && Number.isInteger(item.segmentIndex) && Number.isInteger(item.startOffset) && Number.isInteger(item.endOffset) && typeof item.content === 'string').map(item => ({ segmentIndex: item.segmentIndex, startOffset: item.startOffset, endOffset: item.endOffset, content: item.content, createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString() }));
            }
            return normalized;
        }
        function createEmptyArchive() { return { version: 0, lastIndex: -1, lastMessageId: null, journalPerson: 'third', state: { relationshipDefinition: '', attitudeToUser: '', relationshipTemperature: '', emotionalState: '', traumaStatus: '' }, journal: '', toneExamples: [], anchors: [] }; }
        function normalizeArchiveState(value) { const source = value && typeof value === 'object' ? value : {}; return { relationshipDefinition: typeof source.relationshipDefinition === 'string' ? source.relationshipDefinition : '', attitudeToUser: typeof source.attitudeToUser === 'string' ? source.attitudeToUser : '', relationshipTemperature: typeof source.relationshipTemperature === 'string' ? source.relationshipTemperature : '', emotionalState: typeof source.emotionalState === 'string' ? source.emotionalState : '', traumaStatus: typeof source.traumaStatus === 'string' ? source.traumaStatus : '' }; }
        function normalizeConversationArchive(value) { const source = value && typeof value === 'object' ? value : {}; const empty = createEmptyArchive(); return { version: Number.isInteger(source.version) && source.version >= 0 ? source.version : empty.version, lastIndex: Number.isInteger(source.lastIndex) ? source.lastIndex : empty.lastIndex, lastMessageId: typeof source.lastMessageId === 'string' && source.lastMessageId ? source.lastMessageId : null, journalPerson: source.journalPerson === 'first' ? 'first' : 'third', state: normalizeArchiveState(source.state), journal: typeof source.journal === 'string' ? source.journal : '', toneExamples: Array.isArray(source.toneExamples) ? source.toneExamples.filter(item => typeof item === 'string') : [], anchors: Array.isArray(source.anchors) ? source.anchors.filter(item => typeof item === 'string') : [] }; }
        function normalizeConversationData(conv, roleName) { const source = conv && typeof conv === 'object' ? conv : {}; const normalized = { id: source.id || makeId(), name: typeof source.name === 'string' && source.name.trim() ? source.name.trim() : '新对话', backgroundId: typeof source.backgroundId === 'string' && source.backgroundId ? source.backgroundId : 'default', bgOpacity: normalizeBgOpacity(source.bgOpacity), accentColor: source.accentColor ? normalizeHexColor(source.accentColor, DEFAULT_ACCENT_COLOR) : null, messages: Array.isArray(source.messages) ? source.messages.map(normalizeImportedMessage).filter(Boolean) : [], archive: normalizeConversationArchive(source.archive) }; const continuationFrom = normalizeContinuationFrom(source.continuationFrom); if (continuationFrom) normalized.continuationFrom = continuationFrom; return normalized; }
        function normalizeRoleData(role) { const source = role && typeof role === 'object' ? role : {}; const name = typeof source.name === 'string' && source.name.trim() ? source.name.trim() : '未命名角色'; const fields = normalizeRoleFields(source.fields); const systemPrompt = typeof source.systemPrompt === 'string' && source.systemPrompt.trim() ? source.systemPrompt.trim() : (fields ? buildSystemPromptFromFields(fields) : '你是一个乐于助人的AI助手。'); const normalized = { id: source.id || makeId(), name, systemPrompt, fields, promptMode: source.promptMode === 'struct' || fields ? 'struct' : 'free', accentColor: normalizeHexColor(source.accentColor || source.accent || DEFAULT_ACCENT_COLOR, DEFAULT_ACCENT_COLOR), avatarDataUrl: normalizeAvatarDataUrl(source.avatarDataUrl), unread: Boolean(source.unread), conversations: Array.isArray(source.conversations) ? source.conversations.map(conv => normalizeConversationData(conv, name)) : [] }; if (normalized.conversations.length === 0) normalized.conversations.push(normalizeConversationData(null, name)); return normalized; }
        function normalizeImportedRoles(data) { return data && Array.isArray(data.roles) ? data.roles.filter(role => role && typeof role === 'object').map(normalizeRoleData) : []; }
        function normalizeContextMessageLimit(value) { const n = Number(value); if (!Number.isFinite(n)) return Config.MAX_API_MESSAGES; return Math.max(20, Math.min(200, Math.round(n))); }
        function normalizeStoryArchiveTriggerChars(value) { const n = Number(value); return [20000, 30000, 50000, 80000, 100000].includes(n) ? n : Config.STORY_ARCHIVE_TRIGGER_CHARS; }
        function formatStoryArchiveTriggerChars(value) { return (normalizeStoryArchiveTriggerChars(value) / 10000) + ' 万'; }
        function normalizeGlobalSettings(value = {}) { const source = value && typeof value === 'object' ? value : {}; const modelSettings = DataManager.normalizeModelSettings(source.defaultModel, source.defaultThinkingMode); const savedColors = Array.isArray(source.savedColors) ? source.savedColors.map(c => normalizeHexColor(c, '')).filter(Boolean) : DEFAULT_SAVED_COLORS.slice(); return { theme: source.theme === 'day' || source.theme === 'light' ? 'day' : 'night', defaultModel: modelSettings.currentModel, defaultThinkingMode: modelSettings.currentThinkingMode, defaultAccentColor: normalizeHexColor(source.defaultAccentColor, DEFAULT_ACCENT_COLOR), savedColors: [...new Set(savedColors.length ? savedColors : DEFAULT_SAVED_COLORS)].slice(0, 24), contextMessageLimit: normalizeContextMessageLimit(source.contextMessageLimit), storyArchiveTriggerChars: normalizeStoryArchiveTriggerChars(source.storyArchiveTriggerChars) }; }
        function formatMessageTime(timestamp) { const d = new Date(timestamp || Date.now()); return Number.isNaN(d.getTime()) ? '' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
        function formatRelativeTime(timestamp) { const d = new Date(timestamp || Date.now()); if (Number.isNaN(d.getTime())) return ''; const n = new Date(); const a = new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime(); const b = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); const diff = Math.round((a - b) / 86400000); if (diff === 0) return formatMessageTime(timestamp); if (diff === 1) return '昨天'; if (diff < 7) return diff + '天前'; return (d.getMonth() + 1) + '/' + d.getDate(); }
        function truncateText(text, max = 52) { const source = String(text || '').replace(/\s+/g, ' ').trim(); return source.length > max ? source.slice(0, max - 1) + '…' : source; }
        function hslToHex(h, s, l) { s /= 100; l /= 100; const c = (1 - Math.abs(2 * l - 1)) * s; const x = c * (1 - Math.abs((h / 60) % 2 - 1)); const m = l - c / 2; let r = 0, g = 0, b = 0; if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; } else if (h < 180) { g = c; b = x; } else if (h < 240) { g = x; b = c; } else if (h < 300) { r = x; b = c; } else { r = c; b = x; } const toHex = v => Math.round((v + m) * 255).toString(16).padStart(2, '0'); return '#' + toHex(r) + toHex(g) + toHex(b); }
        function hexToHsl(hex) { const safe = normalizeHexColor(hex); const r = parseInt(safe.slice(1, 3), 16) / 255, g = parseInt(safe.slice(3, 5), 16) / 255, b = parseInt(safe.slice(5, 7), 16) / 255; const max = Math.max(r, g, b), min = Math.min(r, g, b); let h = 0, s = 0, l = (max + min) / 2; if (max !== min) { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min); if (max === r) h = (g - b) / d + (g < b ? 6 : 0); else if (max === g) h = (b - r) / d + 2; else h = (r - g) / d + 4; h *= 60; } return [Math.round(h), Math.round(s * 100), Math.round(l * 100)]; }
        function normalizeBgOpacity(value) { const n = Number(value); if (!Number.isFinite(n)) return 0.7; if (n > 1) return Math.max(0, Math.min(100, n)) / 100; return Math.max(0, Math.min(1, n)); }
        function normalizeAvatarDataUrl(value) { return typeof value === 'string' && /^data:image\//i.test(value) ? value : null; }

        const DataManager = {
            roles: [], currentRoleId: null, currentConversationId: null, currentModel: 'deepseek-v4-pro', currentThinkingMode: 'thinking', sidebarOpen: false, globalSettings: { ...DEFAULT_GLOBAL_SETTINGS },
            normalizeModelSettings(model, thinkingMode) { const normalizedMode = thinkingMode === 'fast' || thinkingMode === 'thinking' ? thinkingMode : null; if (model === 'deepseek-chat') return { currentModel: 'deepseek-v4-flash', currentThinkingMode: 'fast' }; if (model === 'deepseek-reasoner') return { currentModel: 'deepseek-v4-flash', currentThinkingMode: 'thinking' }; if (model === 'deepseek-v4-flash' || model === 'v4flash' || model === 'flash') return { currentModel: 'deepseek-v4-flash', currentThinkingMode: normalizedMode || 'fast' }; if (model === 'deepseek-v4-pro' || model === 'v4pro' || model === 'pro') return { currentModel: 'deepseek-v4-pro', currentThinkingMode: normalizedMode || 'thinking' }; return { currentModel: 'deepseek-v4-pro', currentThinkingMode: 'thinking' }; },
            generateId() { return makeId(); },
            getConversationActivityTime(conv) { return (conv?.messages || []).reduce((latest, msg) => { const time = Date.parse(msg.timestamp); return Number.isFinite(time) && time > latest ? time : latest; }, 0); },
            getRoleActivityTime(role) { return (role?.conversations || []).reduce((latest, conv) => Math.max(latest, this.getConversationActivityTime(conv)), 0); },
            getLatestConversation(role) { if (!role?.conversations?.length) return null; return role.conversations.reduce((latest, conv, index) => { const latestTime = this.getConversationActivityTime(latest.conv); const convTime = this.getConversationActivityTime(conv); return convTime > latestTime || (convTime === latestTime && index > latest.index) ? { conv, index } : latest; }, { conv: role.conversations[0], index: 0 }).conv; },
            getPreferredConversation(role, convId = null) { if (!role?.conversations?.length) return null; return role.conversations.find(c => c.id === convId) || role.conversations.find(c => c.id === this.currentConversationId) || this.getLatestConversation(role); },
            defaultRole: { id: 'default_role', name: '新角色', systemPrompt: '你是一个乐于助人的AI助手。', fields: null, accentColor: DEFAULT_ACCENT_COLOR, conversations: [] },
            ensureDefaultRoles({ save = true } = {}) { if (!Array.isArray(this.roles) || this.roles.length === 0) this.roles = [normalizeRoleData(this.defaultRole)]; this.roles = this.roles.map(normalizeRoleData); if (!this.roles.find(r => r.id === this.currentRoleId)) this.currentRoleId = this.roles[0]?.id || null; const role = this.getCurrentRole(); if (role && !role.conversations.find(c => c.id === this.currentConversationId)) this.currentConversationId = this.getPreferredConversation(role)?.id || null; if (save) this.saveData(); },
            saveData() { const data = { roles: this.roles, currentRoleId: this.currentRoleId, currentConversationId: this.currentConversationId, currentModel: this.currentModel, currentThinkingMode: this.currentThinkingMode, globalSettings: this.globalSettings }; DBManager.saveAppData(data).catch(() => { try { localStorage.setItem('deepseek_app_data', JSON.stringify(data)); } catch(e) {} }); try { localStorage.setItem('deepseek_app_index', JSON.stringify({ currentRoleId: this.currentRoleId, currentConversationId: this.currentConversationId, currentModel: this.currentModel, currentThinkingMode: this.currentThinkingMode, globalSettings: this.globalSettings })); } catch(e) {} },
            async loadData() { let data = null; try { data = await DBManager.loadAppData(); } catch(e) {} if (!data) { const saved = localStorage.getItem('deepseek_app_data'); if (saved) { try { data = JSON.parse(saved); } catch(e) {} } } if (data) { this.roles = Array.isArray(data.roles) ? data.roles : []; this.currentRoleId = data.currentRoleId || null; this.currentConversationId = data.currentConversationId || null; this.globalSettings = normalizeGlobalSettings(data.globalSettings || {}); const s = this.normalizeModelSettings(data.currentModel || this.globalSettings.defaultModel, data.currentThinkingMode || this.globalSettings.defaultThinkingMode); this.currentModel = s.currentModel; this.currentThinkingMode = s.currentThinkingMode; this.globalSettings.defaultModel = s.currentModel; this.globalSettings.defaultThinkingMode = s.currentThinkingMode; } else { this.globalSettings = normalizeGlobalSettings(DEFAULT_GLOBAL_SETTINGS); this.currentModel = this.globalSettings.defaultModel; this.currentThinkingMode = this.globalSettings.defaultThinkingMode; } this.ensureDefaultRoles({ save: false }); const oldBg = localStorage.getItem('deepseek_current_bg_id'); const conv = this.getCurrentConversation(); if (conv && (!conv.backgroundId || conv.backgroundId === 'default') && oldBg && oldBg !== 'default') conv.backgroundId = oldBg; this.saveData(); },
            getCurrentRole() { return this.roles.find(r => r.id === this.currentRoleId) || null; },
            getCurrentConversation() { const role = this.getCurrentRole(); return role ? role.conversations.find(c => c.id === this.currentConversationId) || null : null; },
            loadSidebarState() {}, toggleSidebar() {}
        };

        const DOM = { device: document.getElementById('device'), listScreen: document.getElementById('listScreen'), activityScreen: document.getElementById('activityScreen'), meScreen: document.getElementById('meScreen'), chatScreen: document.getElementById('chatScreen'), roleListDiv: document.getElementById('roleList'), roleSearchInput: document.getElementById('roleSearchInput'), addRoleBtn: document.getElementById('addRoleBtn'), messagesArea: document.getElementById('chatFeed'), chatFeed: document.getElementById('chatFeed'), messageInput: document.getElementById('chatInput'), chatInput: document.getElementById('chatInput'), sendBtn: document.getElementById('sendBtn'), backBtn: document.getElementById('backBtn'), chatName: document.getElementById('chatName'), chatAvatar: document.getElementById('chatAvatar'), chatMenuBtn: document.getElementById('chatMenuBtn'), chatMenu: document.getElementById('chatMenu'), summaryMenuItem: document.getElementById('summaryMenuItem'), relationshipArchiveMenuItem: document.getElementById('relationshipArchiveMenuItem'), insertSceneItem: document.getElementById('insertSceneItem'), renameConvItem: document.getElementById('renameConvItem'), clearConvItem: document.getElementById('clearConvItem'), profileScrim: document.getElementById('profileScrim'), profilePanel: document.getElementById('profilePanel'), profileAv: document.getElementById('profileAv'), profileName: document.getElementById('profileName'), profileDesc: document.getElementById('profileDesc'), profileConvList: document.getElementById('profileConvList'), editRoleBtn: document.getElementById('editRoleBtn'), changeBgBtn: document.getElementById('changeBgBtn'), roleColorBtn: document.getElementById('roleColorBtn'), profileModelBtn: document.getElementById('profileModelBtn'), profileRenameBtn: document.getElementById('profileRenameBtn'), newConvBtn: document.getElementById('newConvBtn'), deleteCurrentRoleBtn: document.getElementById('deleteCurrentRoleBtn'), editPanel: document.getElementById('editPanel'), editName: document.getElementById('editName'), editStruct: document.getElementById('editStruct'), editFree: document.getElementById('editFree'), editFreeText: document.getElementById('editFreeText'), closeEditBtn: document.getElementById('closeEditBtn'), saveEditRoleBtn: document.getElementById('saveEditRoleBtn'), modelMenu: document.getElementById('modelMenu'), roleNewPanel: document.getElementById('roleNewPanel'), newName: document.getElementById('newName'), newStruct: document.getElementById('newStruct'), newFree: document.getElementById('newFree'), newFreeText: document.getElementById('newFreeText'), closeNewRoleBtn: document.getElementById('closeNewRoleBtn'), saveNewRoleBtn: document.getElementById('saveNewRoleBtn'), dlgScrim: document.getElementById('dlgScrim'), summarySheet: document.getElementById('summarySheet'), colorSheet: document.getElementById('colorSheet'), bgSheet: document.getElementById('bgSheet'), optionsSheet: document.getElementById('optionsSheet'), importSheet: document.getElementById('importSheet'), aboutSheet: document.getElementById('aboutSheet'), avatarCropSheet: document.getElementById('avatarCropSheet'), roleAvatarInput: document.getElementById('roleAvatarInput'), avatarCropStage: document.getElementById('avatarCropStage'), avatarCropCanvas: document.getElementById('avatarCropCanvas'), cancelAvatarCropBtn: document.getElementById('cancelAvatarCropBtn'), saveAvatarCropBtn: document.getElementById('saveAvatarCropBtn'), cpScopeLabel: document.getElementById('cpScopeLabel'), cpScopeHint: document.getElementById('cpScopeHint'), cpSwatch: document.getElementById('cpSwatch'), cpHex: document.getElementById('cpHex'), cpHsl: document.getElementById('cpHsl'), hSlider: document.getElementById('hSlider'), sSlider: document.getElementById('sSlider'), lSlider: document.getElementById('lSlider'), hNum: document.getElementById('hNum'), sNum: document.getElementById('sNum'), lNum: document.getElementById('lNum'), cpSaved: document.getElementById('cpSaved'), savedGrid: document.getElementById('savedGrid'), savedColorsEditBtn: document.getElementById('savedColorsEditBtn'), cancelColorBtn: document.getElementById('cancelColorBtn'), saveColorBtn: document.getElementById('saveColorBtn'), accentHex: document.getElementById('accentHex'), bgSheetTitle: document.getElementById('bgSheetTitle'), bgEditToggle: document.getElementById('bgEditToggle'), bgPreviewWrap: document.getElementById('bgPreviewWrap'), bgPreviewImg: document.getElementById('bgPreviewImg'), bgPreviewAv: document.getElementById('bgPreviewAv'), bgPreviewName: document.getElementById('bgPreviewName'), bgOpacityControl: document.getElementById('bgOpacityControl'), bgOpacitySlider: document.getElementById('bgOpacitySlider'), bgOpacityVal: document.getElementById('bgOpacityVal'), bgGrid: document.getElementById('bgGrid'), bgCountVal: document.getElementById('bgCountVal'), uploadNewBgBtn: document.getElementById('uploadNewBgBtn'), bgInput: document.getElementById('bgInput'), customBgLayer: document.getElementById('customBgLayer'), optSheetTitle: document.getElementById('optSheetTitle'), optSheetSub: document.getElementById('optSheetSub'), optList: document.getElementById('optList'), meModelVal: document.getElementById('meModelVal'), meThinkVal: document.getElementById('meThinkVal'), meContextVal: document.getElementById('meContextVal'), importDrop: document.getElementById('importDrop'), importFile: document.getElementById('importFile'), cancelImportBtn: document.getElementById('cancelImportBtn'), modalScrim: document.getElementById('modalScrim'), modal: document.getElementById('modal'), modalTitle: document.getElementById('modalTitle'), modalMsg: document.getElementById('modalMsg'), modalInput: document.getElementById('modalInput'), modalCancel: document.getElementById('modalCancel'), modalConfirm: document.getElementById('modalConfirm'), editUserMsgModal: document.getElementById('editUserMsgModal'), editUserMsgContent: document.getElementById('editUserMsgContent'), confirmEditMsgBtn: document.getElementById('confirmEditMsgBtn'), cancelEditMsgBtn: document.getElementById('cancelEditMsgBtn') };
        let editingUserMessageIndex = null, editingAssistantMessageIndex = null, activeTab = 'list', editRoleMode = 'free', newRoleMode = 'struct', colorScope = 'global', bgSheetContext = 'chat', optionSheetKind = null, modalState = {}, avatarCropState = null;
        const MODEL_OPTIONS = [{ key: 'deepseek-v4-flash', name: 'DeepSeek V4 Flash', shortName: 'V4 Flash', desc: '快 · 日常对话' }, { key: 'deepseek-v4-pro', name: 'DeepSeek V4 Pro', shortName: 'V4 Pro', desc: '慢 · 高质量长文' }]; const THINKING_OPTIONS = [{ key: 'fast', name: '快速回答', desc: '直接出文，省思考时间' }, { key: 'thinking', name: '深度思考', desc: '展示推理过程，更稳更慢' }]; const CONTEXT_LIMIT_OPTIONS = [20, 40, 60, 100, 150, 200].map(value => ({ key: String(value), name: value + ' 条', desc: value === 200 ? '尽量多记 · 请求最大' : value >= 100 ? '长对话 · 记忆更完整' : value === 40 ? '平衡速度和记忆' : '更快 · 记忆更短' })); const ARCHIVE_TRIGGER_OPTIONS = [20000, 30000, 50000, 80000, 100000].map(value => ({ key: String(value), name: formatStoryArchiveTriggerChars(value), desc: value === 20000 ? '最早提醒 · 细节最全' : value === 30000 ? '更早总结 · 推荐' : value === 50000 ? '较长剧情后提醒' : value === 80000 ? '更长剧情后提醒' : '最长剧情后提醒' }));
        function setAvatarText(el, text) { if (!el) return; const node = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE); if (node) node.nodeValue = text; else el.insertBefore(document.createTextNode(text), el.firstChild); }
        function setAvatarVisual(el, role) { if (!el || !role) return; const dataUrl = normalizeAvatarDataUrl(role.avatarDataUrl); if (dataUrl) { el.classList.add('has-image'); el.style.backgroundImage = 'url("' + dataUrl.replace(/"/g, '%22') + '")'; setAvatarText(el, ''); return; } el.classList.remove('has-image'); el.style.backgroundImage = ''; setAvatarText(el, getInitialChar(role.name)); }
        function collectFields(container) { const fields = {}; Object.keys(FIELD_LABELS).forEach(key => { fields[key] = container?.querySelector('[data-field="' + key + '"]')?.value.trim() || ''; }); return fields; }
        function fillFields(container, fields) { Object.keys(FIELD_LABELS).forEach(key => { const input = container?.querySelector('[data-field="' + key + '"]'); if (input) input.value = fields?.[key] || ''; }); }
        function setModeButtons(scope, mode) { const selector = scope === 'edit' ? '[data-edit-mode]' : '[data-new-mode]'; const attr = scope === 'edit' ? 'editMode' : 'newMode'; document.querySelectorAll(selector).forEach(btn => btn.classList.toggle('on', btn.dataset[attr] === mode)); if (scope === 'edit') { editRoleMode = mode; DOM.editStruct.style.display = mode === 'struct' ? 'block' : 'none'; DOM.editFree.style.display = mode === 'free' ? 'block' : 'none'; } else { newRoleMode = mode; DOM.newStruct.style.display = mode === 'struct' ? 'block' : 'none'; DOM.newFree.style.display = mode === 'free' ? 'block' : 'none'; } }
        function openModal(opts = {}) { modalState = opts; DOM.modalTitle.textContent = opts.title || ''; DOM.modalMsg.textContent = opts.msg || ''; DOM.modalMsg.style.display = opts.msg ? 'block' : 'none'; DOM.modalInput.style.display = opts.type === 'prompt' ? 'block' : 'none'; DOM.modalInput.value = opts.inputValue || ''; DOM.modalConfirm.textContent = opts.confirmLabel || '确定'; DOM.modalConfirm.className = 'modal-btn ' + (opts.danger ? 'danger' : 'confirm'); DOM.modalCancel.style.display = opts.type === 'alert' ? 'none' : 'block'; DOM.modalScrim.classList.add('open'); DOM.modal.classList.add('open'); DOM.editUserMsgModal.classList.remove('open'); if (opts.type === 'prompt') setTimeout(() => { DOM.modalInput.focus(); DOM.modalInput.select(); }, 100); }
        function closeModal() { DOM.modalScrim.classList.remove('open'); DOM.modal.classList.remove('open'); DOM.editUserMsgModal.classList.remove('open'); modalState = {}; }
        function openEditUserModal(index, content) { editingUserMessageIndex = index; editingAssistantMessageIndex = null; DOM.editUserMsgModal.querySelector('.modal-title').textContent = '编辑消息'; DOM.confirmEditMsgBtn.textContent = '重新生成'; DOM.editUserMsgContent.value = content || ''; DOM.modalScrim.classList.add('open'); DOM.modal.classList.remove('open'); DOM.editUserMsgModal.classList.add('open'); setTimeout(() => DOM.editUserMsgContent.focus(), 100); }
        function openEditAssistantModal(index, content) { editingAssistantMessageIndex = index; editingUserMessageIndex = null; DOM.editUserMsgModal.querySelector('.modal-title').textContent = '编辑 AI 回复'; DOM.confirmEditMsgBtn.textContent = '保存'; DOM.editUserMsgContent.value = content || ''; DOM.modalScrim.classList.add('open'); DOM.modal.classList.remove('open'); DOM.editUserMsgModal.classList.add('open'); setTimeout(() => DOM.editUserMsgContent.focus(), 100); }
        function adjustChatInputHeight() { const input = DOM.chatInput; if (!input) return; input.style.height = 'auto'; const maxHeight = parseFloat(getComputedStyle(input).maxHeight) || 88; const nextHeight = Math.min(input.scrollHeight, maxHeight); input.style.height = nextHeight + 'px'; input.style.overflowY = input.scrollHeight > maxHeight ? 'auto' : 'hidden'; }
        function copyToClipboard(text, onSuccess) { const fallback = () => { const textarea = document.createElement('textarea'); textarea.value = text; textarea.style.position = 'fixed'; textarea.style.opacity = '0'; document.body.appendChild(textarea); textarea.select(); try { document.execCommand('copy'); onSuccess?.(); } catch(e) {} document.body.removeChild(textarea); }; if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => onSuccess?.()).catch(fallback); else fallback(); }
        const UIManager = {
            resetPagination() { Pagination.currentPage = 1; },
            adjustPaginationAfterDelete(totalMessages) { const totalPages = Math.ceil(totalMessages / Config.PAGE_SIZE); if (Pagination.currentPage > totalPages && totalPages > 0) Pagination.currentPage = totalPages; else if (totalPages === 0) Pagination.currentPage = 1; },
            jumpToLastPage(totalMessages) { const totalPages = Math.ceil(totalMessages / Config.PAGE_SIZE); Pagination.currentPage = totalPages > 0 ? totalPages : 1; },
            scrollChatToBottom() { requestAnimationFrame(() => { DOM.chatFeed.scrollTop = DOM.chatFeed.scrollHeight; }); },
            getActiveAssistantVersion(msg) {
                if (!msg || msg.role !== 'assistant') return msg;
                if (msg.currentVersion > 0 && msg.regenerations?.length) {
                    return msg.regenerations[msg.currentVersion - 1] || msg;
                }
                return msg;
            },
            getDialogueContent(msg) {
                if (!msg) return '';
                if (msg.role === 'assistant') return this.getActiveAssistantVersion(msg)?.content || '';
                return msg.content || '';
            },
            getArchiveEffectiveMessages(conv) {
                return (conv?.messages || [])
                    .filter(msg => msg?.role === 'user' || msg?.role === 'assistant')
                    .map((msg, effectiveIndex) => ({
                        message: msg,
                        messageId: msg.id || '',
                        effectiveIndex,
                        role: msg.role,
                        content: this.getDialogueContent(msg)
                    }))
                    .filter(item => item.messageId && item.content.trim());
            },
            getArchiveIncrement(conv) {
                const archive = normalizeConversationArchive(conv?.archive);
                const effective = this.getArchiveEffectiveMessages(conv);
                let start = 0;
                let boundaryMissing = false;
                if (archive.lastMessageId) {
                    const boundary = effective.findIndex(item => item.messageId === archive.lastMessageId);
                    if (boundary >= 0) {
                        start = boundary + 1;
                    } else if (archive.version > 0) {
                        start = 0;
                        boundaryMissing = true;
                    }
                } else if (archive.lastIndex >= 0) {
                    start = Math.max(0, Math.min(effective.length, archive.lastIndex + 1));
                }
                const items = effective.slice(start);
                return {
                    archive,
                    items,
                    totalChars: items.reduce((sum, item) => sum + item.content.length, 0),
                    currentEnd: items.length ? items[items.length - 1] : null,
                    boundaryMissing
                };
            },
            formatArchiveIncrementText(items, roleLabel) {
                return items.map(item => `【第${item.effectiveIndex + 1}条】${item.role === 'user' ? '用户' : roleLabel}：${item.content}`).join('\n\n');
            },
            updateRelationshipArchiveMenuState(conv = DataManager.getCurrentConversation()) {
                const item = DOM.relationshipArchiveMenuItem;
                if (!item) return;
                const left = item.querySelector('.left');
                if (!left) return;
                if (item.dataset.generating === 'true') {
                    left.textContent = '关系档案 · 更新中';
                    return;
                }
                const info = this.getArchiveIncrement(conv);
                const triggerChars = normalizeStoryArchiveTriggerChars(DataManager.globalSettings?.storyArchiveTriggerChars);
                left.textContent = info.totalChars > triggerChars ? '关系档案 · 可更新' : '关系档案';
            },
            
            // 【核心防 400 机制】：智能提取有效上下文，动态截断长对话
            getSafeApiMessages(conv, role, userIndex = null) {
                const rawHistory = userIndex !== null ? conv.messages.slice(0, userIndex + 1) : conv.messages;
                const memoryBlock = buildMemoryBlock(rawHistory, conv);
                
                let apiMsgs = [];
                // 1. 从所有记录中提取真实对话；已完成的存档点进入 system memoryBlock，不参与历史裁剪
                for (let m of rawHistory) {
                    if (m.role === 'system_summary') continue;
                    if (m.role === 'user' || m.role === 'assistant') {
                        // 使用当前页面展示的版本内容，而非总是最新生成的内容
                        let displayContent = this.getDialogueContent(m).trim();
                        if (displayContent) apiMsgs.push({ role: m.role, content: displayContent });
                    }
                }
                
                // 2. 从后往前截断，控制单次发往大模型的字数，防止 400 报错（安全余量设为 80000 字符）
                let charCount = 0;
                let truncated = [];
                
                for (let i = apiMsgs.length - 1; i >= 0; i--) {
                    charCount += apiMsgs[i].content.length;
                    if (charCount > Config.MAX_CHARS_FOR_CHAT && truncated.length > 3) {
                        break; 
                    }
                    truncated.unshift(apiMsgs[i]);
                }
                
                // 3. 确保截断后末尾是 user 消息，否则 API 会 400
                while (truncated.length > 0 && truncated[truncated.length - 1].role !== 'user') {
                    truncated.pop();
                }
                // 4. 始终把系统角色设定顶在最前面
                const contextLimit = normalizeContextMessageLimit(DataManager.globalSettings?.contextMessageLimit);
                const recentMessages = truncated.slice(-contextLimit);
                const systemContent = [role.systemPrompt || '', memoryBlock].filter(Boolean).join('\n\n');
                return [{ role: "system", content: systemContent }, ...recentMessages];
            },

            // 检测本卷剧情存档建议阈值，以弹出“存档建议卡片”
            checkConversationLimit() {
                const conv = DataManager.getCurrentConversation();
                if (!conv) return;
                if (normalizeConversationArchive(conv.archive).version > 0) {
                    for (let i = conv.messages.length - 1; i >= 0; i--) {
                        const msg = conv.messages[i];
                        if (msg.role === 'system_summary' && msg.status === 'warning') {
                            conv.messages.splice(i, 1);
                        }
                    }
                    this.updateRelationshipArchiveMenuState(conv);
                    return;
                }
                
                // 寻找上一个已完成存档点，只计算在那之后的字数
                const lastSummaryIdx = conv.messages.findLastIndex(m => m.role === 'system_summary' && m.status === 'done');
                const msgsToCount = lastSummaryIdx !== -1 ? conv.messages.slice(lastSummaryIdx + 1) : conv.messages;
                
                const totalChars = msgsToCount.reduce((acc, msg) => {
                    if (msg.role !== 'user' && msg.role !== 'assistant') return acc;
                    return acc + this.getDialogueContent(msg).length;
                }, 0);

                // 判断是否已经有正在显示的存档建议（未完成的总结）
                const hasPendingSummary = conv.messages.some(m => m.role === 'system_summary' && m.status !== 'done');

                const triggerChars = normalizeStoryArchiveTriggerChars(DataManager.globalSettings?.storyArchiveTriggerChars);
                if (totalChars > triggerChars && !hasPendingSummary) {
                    conv.messages.push({
                        id: DataManager.generateId(),
                        role: 'system_summary',
                        status: 'warning',
                        content: '',
                        timestamp: new Date().toISOString()
                    });
                } else if (totalChars <= triggerChars) {
                    for (let i = conv.messages.length - 1; i > lastSummaryIdx; i--) {
                        const msg = conv.messages[i];
                        if (msg.role === 'system_summary' && msg.status === 'warning') {
                            conv.messages.splice(i, 1);
                        }
                    }
                }
                this.updateRelationshipArchiveMenuState(conv);
            },
            async generateArchiveUpdate() {
                const conv = DataManager.getCurrentConversation();
                const role = DataManager.getCurrentRole();
                if (!conv || !role) return;
                conv.archive = normalizeConversationArchive(conv.archive);
                const increment = this.getArchiveIncrement(conv);
                if (!increment.items.length) {
                    alert('当前没有新的有效对话可更新档案。');
                    this.updateRelationshipArchiveMenuState(conv);
                    return;
                }
                if (increment.boundaryMissing && !confirm('上次档案更新的边界消息已被删除。为避免漏读，本次会从当前完整有效对话重新整理档案，是否继续？')) {
                    return;
                }

                this.closeChatMenu();
                const roleLabel = role.name || 'AI侧角色/角色组';
                const newChunkText = this.formatArchiveIncrementText(increment.items, roleLabel);
                const apiMessages = buildRelationshipArchiveMessages({
                    role,
                    roleLabel,
                    archive: increment.archive,
                    newChunkText
                });

                const pending = startPendingRequest({ type: 'relationship_archive', conversationId: conv.id });
                if (DOM.relationshipArchiveMenuItem) DOM.relationshipArchiveMenuItem.dataset.generating = 'true';
                this.updateRelationshipArchiveMenuState(conv);

                try {
                    let lastError = null;
                    for (let attempt = 0; attempt < 2; attempt++) {
                        try {
                            const reply = await callChatApi({
                                model: Config.SUMMARY_FINAL_MODEL,
                                messages: apiMessages,
                                signal: pending.controller.signal,
                                thinkingMode: Config.SUMMARY_FINAL_THINKING_MODE,
                                maxTokens: Config.SUMMARY_FINAL_MAX_TOKENS
                            });
                            if (reply.finishReason === 'length') throw new Error('档案 JSON 被 max_tokens 截断');
                            const draft = parseRelationshipArchiveReply(reply.content);
                            conv.archive = mergeRelationshipArchive(increment.archive, draft, increment.currentEnd);
                            DataManager.saveData();
                            this.renderChatFeed();
                            this.renderProfile();
                            this.renderRoleList();
                            alert('关系档案已更新。');
                            return;
                        } catch (err) {
                            lastError = err;
                            if (err.name === 'AbortError' || attempt === 1) throw err;
                        }
                    }
                    throw lastError || new Error('档案更新失败');
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        alert('档案更新失败，请重试。\n' + err.message);
                    }
                } finally {
                    if (DOM.relationshipArchiveMenuItem) delete DOM.relationshipArchiveMenuItem.dataset.generating;
                    clearPendingRequest(pending);
                    this.updateRelationshipArchiveMenuState(conv);
                }
            },
            
            // 智能生成特定范围的剧情总结
            async generateStorySummary(summaryIndex, startOffset, endOffset) {
                const conv = DataManager.getCurrentConversation();
                const role = DataManager.getCurrentRole();
                if (!conv || !role) return;

                const summaryMsg = conv.messages[summaryIndex];
                if (!summaryMsg) return;

                const nowIso = new Date().toISOString();
                summaryMsg.status = 'generating';
                summaryMsg.startOffset = startOffset;
                summaryMsg.endOffset = endOffset;
                summaryMsg.startedAt = nowIso;
                summaryMsg.updatedAt = nowIso;
                DataManager.saveData();
                this.loadConversationToUI();

                // 筛选出该 summary 卡片之前的有效对话
                const historyMessages = conv.messages.slice(0, summaryIndex)
                    .filter(m => m.role === 'user' || m.role === 'assistant')
                    .map(m => ({ role: m.role, content: this.getDialogueContent(m) }));
                const selectedMessages = historyMessages.slice(startOffset, endOffset + 1);

                const roleLabel = role.name || 'AI侧角色/角色组';
                const totalChars = selectedMessages.reduce((a, m) => a + (m.content?.length || 0), 0);

                const restoreWarning = () => {
                    summaryMsg.status = 'warning';
                    delete summaryMsg.progressText;
                    DataManager.saveData();
                    this.loadConversationToUI();
                };

                const updateProgress = (text) => {
                    summaryMsg.progressText = text;
                    summaryMsg.updatedAt = new Date().toISOString();
                    DataManager.saveData();
                    this.loadConversationToUI();
                };

                const saveSegmentDraft = (segmentSummaries) => {
                    summaryMsg.segmentSummariesDraft = segmentSummaries.map(item => ({
                        segmentIndex: item.segment.segmentIndex,
                        startOffset: item.segment.startOffset,
                        endOffset: item.segment.endOffset,
                        content: item.content,
                        createdAt: item.createdAt || new Date().toISOString()
                    }));
                    DataManager.saveData();
                };

                let segments = null;
                let segmentSummariesFromDraft = null;
                if (totalChars > Config.SUMMARY_SINGLE_PASS_CHARS) {
                    segments = splitMessagesIntoSegments(selectedMessages, startOffset, roleLabel, Config.SUMMARY_SEGMENT_CHARS);
                    if (isSegmentDraftUsable(summaryMsg.segmentSummariesDraft, segments)) {
                        const useDraft = confirm('检测到已有分段摘要草稿，是否跳过分段阶段，仅重新合并最终存档？');
                        if (useDraft) {
                            segmentSummariesFromDraft = summaryMsg.segmentSummariesDraft.map((d, idx) => ({
                                segment: segments[idx],
                                content: d.content,
                                createdAt: d.createdAt
                            }));
                        } else {
                            delete summaryMsg.segmentSummariesDraft;
                            DataManager.saveData();
                        }
                    }

                    if (!segmentSummariesFromDraft && segments.length > 1 && !confirm(`本次存档范围较长，将分 ${segments.length} 段生成摘要并合并，可能耗时更久，是否继续？`)) {
                        restoreWarning();
                        return;
                    }
                }

                if (currentAbortController) currentAbortController.abort();
                currentPendingRequest = null;
                currentAbortController = new AbortController();

                try {
                    let reply;

                    if (!segments) {
                        updateProgress('正在生成本卷剧情存档...');
                        const dialogueText = formatDialogueMessages(selectedMessages, startOffset, roleLabel);
                        const apiMessages = buildFinalArchiveMessages({
                            sourceText: dialogueText,
                            sourceDescription: `以下是一段角色扮演对话记录，共 ${selectedMessages.length} 条消息。`,
                            roleLabel,
                            role
                        });

                        reply = await callChatApi({
                            model: Config.SUMMARY_FINAL_MODEL,
                            messages: apiMessages,
                            signal: currentAbortController.signal,
                            thinkingMode: Config.SUMMARY_FINAL_THINKING_MODE,
                            maxTokens: Config.SUMMARY_FINAL_MAX_TOKENS
                        });
                    } else {
                        const segmentSummaries = segmentSummariesFromDraft || [];

                        if (segmentSummariesFromDraft) {
                            updateProgress('正在使用已有分段摘要草稿，重新合并最终存档...');
                        } else {
                            for (let i = 0; i < segments.length; i++) {
                                updateProgress(`正在生成分段摘要 ${i + 1}/${segments.length}...`);
                                const content = await generateSegmentSummary({
                                    segment: segments[i],
                                    segmentCount: segments.length,
                                    roleLabel,
                                    role,
                                    signal: currentAbortController.signal
                                });
                                segmentSummaries.push({
                                    segment: segments[i],
                                    content,
                                    createdAt: new Date().toISOString()
                                });
                                summaryMsg.progressText = `已完成分段摘要 ${i + 1}/${segments.length}，正在继续...`;
                                summaryMsg.updatedAt = new Date().toISOString();
                                saveSegmentDraft(segmentSummaries);
                                this.loadConversationToUI();
                            }
                        }

                        updateProgress('正在合并分段摘要，生成本卷剧情存档...');
                        const apiMessages = buildFinalArchivePromptFromSegments({
                            segmentSummaries,
                            roleLabel,
                            role,
                            startOffset,
                            endOffset
                        });

                        reply = await callChatApi({
                            model: Config.SUMMARY_LONG_FINAL_MODEL,
                            messages: apiMessages,
                            signal: currentAbortController.signal,
                            thinkingMode: Config.SUMMARY_LONG_FINAL_THINKING_MODE,
                            maxTokens: Config.SUMMARY_FINAL_MAX_TOKENS
                        });
                    }

                    if (reply.finishReason === 'length') {
                        throw new Error('最终剧情存档被 max_tokens 截断，请压缩最终输出格式或提高 Worker max_tokens 上限后重试');
                    }

                    const parsed = parseStoryArchiveReply(reply.content);
                    const continuationRaw = [parsed.continuationPrompt, parsed.userArchive, reply.content]
                        .map(text => typeof text === 'string' ? text.trim() : '')
                        .find(Boolean) || '';
                    const continuation = appendDefaultContinuationConstraints(continuationRaw);
                    if (!continuation) {
                        throw new Error('模型续写包为空，未保存存档。请重试。');
                    }

                    summaryMsg.content = '已生成模型续写包。后续对话会自动继承该存档；如需查看完整内容，可使用复制按钮。';
                    summaryMsg.continuationPrompt = continuation;
                    summaryMsg.archiveType = 'volume';
                    summaryMsg.status = 'done';
                    delete summaryMsg.segmentSummariesDraft;
                    delete summaryMsg.progressText;
                    DataManager.saveData();
                    this.loadConversationToUI();
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        alert(`总结生成失败: ${err.message}`);
                    }
                    restoreWarning();
                } finally {
                    clearAllPendingRequestState();
                }
            },


            getEffectiveAccent(role = DataManager.getCurrentRole(), conv = DataManager.getCurrentConversation()) { return normalizeHexColor(conv?.accentColor || role?.accentColor || DataManager.globalSettings.defaultAccentColor, DEFAULT_ACCENT_COLOR); },
            applyAccentColor(color) { DOM.device.style.setProperty('--accent', normalizeHexColor(color, DEFAULT_ACCENT_COLOR)); }, applyCurrentAccent() { this.applyAccentColor(this.getEffectiveAccent()); },
            getRoleDescription(role) { const fields = normalizeRoleFields(role?.fields); if (fields) return truncateText([fields.identity, fields.personality, fields.speech].filter(Boolean).join(' '), 30); return truncateText(role?.systemPrompt || '', 30); },
            getConversationPreview(conv) { if (!conv?.messages?.length) return '「新对话已开始」'; for (let i = conv.messages.length - 1; i >= 0; i--) { const msg = conv.messages[i]; if (msg.role === 'scene_separator') return '—— ' + (msg.content || '新场景') + ' ——'; if (msg.role === 'system_summary' && msg.status === 'done') return '「剧情存档已生成」'; if (msg.role === 'user' || msg.role === 'assistant') return truncateText(this.getDialogueContent(msg), 52); } return '「新对话已开始」'; },
            getConversationTime(conv) { const msg = [...(conv?.messages || [])].reverse().find(item => item.timestamp); return formatRelativeTime(msg?.timestamp || Date.now()); },
            renderRoleList() { const query = (DOM.roleSearchInput?.value || '').trim().toLowerCase(); DOM.roleListDiv.innerHTML = ''; const roles = DataManager.roles.filter(role => !query || role.name.toLowerCase().includes(query)).map((role, index) => ({ role, index, activity: DataManager.getRoleActivityTime(role) })).sort((a, b) => b.activity - a.activity || a.index - b.index).map(item => item.role); if (!roles.length) { DOM.roleListDiv.innerHTML = '<div class="empty-state">没有找到角色。</div>'; return; } roles.forEach(role => { const conv = DataManager.getLatestConversation(role); const accent = normalizeHexColor(role.accentColor || DataManager.globalSettings.defaultAccentColor); const row = document.createElement('div'); row.className = 'role-row ' + (DataManager.currentRoleId === role.id ? 'active' : ''); row.dataset.roleId = role.id; row.innerHTML = '<div class="role-stripe" style="background:' + accent + '"></div><div class="role-avatar" style="--av:' + accent + '">' + escapeHtml(getInitialChar(role.name)) + (role.unread ? '<div class="unread" style="--av:' + accent + '"></div>' : '') + '</div><div class="role-info"><div class="role-name">' + escapeHtml(role.name) + '<span class="role-time">' + escapeHtml(this.getConversationTime(conv)) + '</span></div><div class="role-preview">' + escapeHtml(this.getConversationPreview(conv)) + '</div></div>'; setAvatarVisual(row.querySelector('.role-avatar'), role); row.addEventListener('click', () => this.openChat(role.id)); DOM.roleListDiv.appendChild(row); }); },
            renderProfile() { const role = DataManager.getCurrentRole(); const conv = DataManager.getCurrentConversation(); if (!role) return; setAvatarVisual(DOM.profileAv, role); DOM.profileName.textContent = role.name; DOM.profileDesc.textContent = this.getRoleDescription(role); DOM.profileConvList.innerHTML = role.conversations.map(item => { const active = item.id === conv?.id; return '<div class="conv-row ' + (active ? 'active' : '') + '" data-conv-id="' + item.id + '"><div class="conv-dot ' + (active ? 'active' : '') + '"></div><div class="conv-info"><div class="conv-title">' + escapeHtml(item.name || '新对话') + '</div><div class="conv-sub">' + escapeHtml(this.getConversationPreview(item)) + '</div></div><div class="conv-time">' + escapeHtml(this.getConversationTime(item)) + '</div></div>'; }).join(''); },
            renderChatHeader() { const role = DataManager.getCurrentRole(); const conv = DataManager.getCurrentConversation(); if (!role) return; DOM.chatName.textContent = role.name; setAvatarVisual(DOM.chatAvatar, role); DOM.chatInput.placeholder = '发消息给 ' + role.name + '…'; this.applyAccentColor(this.getEffectiveAccent(role, conv)); this.updateRelationshipArchiveMenuState(conv); },
            renderChatFeed() { const conv = DataManager.getCurrentConversation(); const role = DataManager.getCurrentRole(); this.renderChatHeader(); this.renderProfile(); if (!conv || !role) { DOM.chatFeed.innerHTML = '<div class="empty-state">从列表里选择一个角色开始。</div>'; return; } if (recoverStaleGeneratingSummaries(conv)) DataManager.saveData(); const allMessages = conv.messages; const totalPages = Math.ceil(allMessages.length / Config.PAGE_SIZE); if (Pagination.currentPage < 1) Pagination.currentPage = 1; if (totalPages > 0 && Pagination.currentPage > totalPages) Pagination.currentPage = totalPages; const startIdx = (Pagination.currentPage - 1) * Config.PAGE_SIZE; const pageMessages = allMessages.slice(startIdx, Math.min(startIdx + Config.PAGE_SIZE, allMessages.length)); DOM.chatFeed.innerHTML = ''; pageMessages.forEach((msg, i) => { const node = this.renderMessageNode(msg, startIdx + i, allMessages); if (node) DOM.chatFeed.appendChild(node); }); if (totalPages > 1) { const p = document.createElement('div'); p.className = 'pagination-controls'; p.innerHTML = '<button class="pagination-btn" data-action="prev-page" ' + (Pagination.currentPage === 1 ? 'disabled' : '') + '>上一页</button><span class="page-info">' + Pagination.currentPage + ' / ' + totalPages + '</span><button class="pagination-btn" data-action="next-page" ' + (Pagination.currentPage === totalPages ? 'disabled' : '') + '>下一页</button>'; DOM.chatFeed.appendChild(p); } const spacer = document.createElement('div'); spacer.style.height = '24px'; DOM.chatFeed.appendChild(spacer); DOM.chatFeed.scrollTop = DOM.chatFeed.scrollHeight; this.scrollChatToBottom(); this.applyConversationBackground(conv.backgroundId, conv.bgOpacity); },
            loadConversationToUI() { this.renderChatFeed(); }, renderSidebar() { this.renderRoleList(); },
            renderMessageNode(msg, globalIdx, allMessages) { const time = formatMessageTime(msg.timestamp); if (msg.role === 'scene_separator') { const scene = document.createElement('div'); scene.className = 'scene'; scene.dataset.index = String(globalIdx); scene.textContent = (msg.content || '新场景') + ' · ' + time; return scene; } if (msg.role === 'user') { const w = document.createElement('div'); w.className = 'user-msg'; w.innerHTML = '<div class="user-bubble">' + escapeHtml(msg.content) + '</div><div class="msg-actions"><button class="meta">' + escapeHtml(time) + '</button><button data-action="edit-user" data-index="' + globalIdx + '">' + SVGIcons.edit + '编辑</button><button data-action="delete-user" data-index="' + globalIdx + '">' + SVGIcons.delete + '删除</button></div>'; return w; } if (msg.role === 'assistant') { const active = this.getActiveAssistantVersion(msg); const reasoning = active?.reasoning || null; const isOpen = reasoning && !msg.reasoningCollapsed; const w = document.createElement('div'); w.className = 'ai-msg'; const reason = reasoning ? '<button class="think-toggle ' + (isOpen ? 'open' : '') + '" data-action="toggle-reasoning" data-index="' + globalIdx + '"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>思考过程 <span class="chev">›</span></button><div class="think-content ' + (isOpen ? 'show' : '') + '">' + escapeHtml(reasoning) + '</div>' : ''; w.innerHTML = reason + '<div class="ai-body">' + renderMarkdown(active?.content || '') + '</div><div class="msg-actions"><button class="meta">' + escapeHtml(time) + '</button><button data-action="edit-assistant" data-index="' + globalIdx + '">' + SVGIcons.edit + '编辑</button><button data-action="regenerate" data-index="' + globalIdx + '">' + SVGIcons.regenerate + '重新生成</button><span class="version-control"><button data-action="version" data-index="' + globalIdx + '" data-delta="-1">' + SVGIcons.chevronLeft + '</button><span>' + (msg.currentVersion + 1) + '/' + ((msg.regenerations?.length || 0) + 1) + '</span><button data-action="version" data-index="' + globalIdx + '" data-delta="1">' + SVGIcons.chevronRight + '</button></span></div>'; return w; } if (msg.role === 'system_summary') return this.renderSummaryNode(msg, globalIdx, allMessages); return null; },
            renderSummaryNode(msg, globalIdx, allMessages) { const w = document.createElement('div'); w.className = 'ai-msg'; const valid = allMessages.slice(0, globalIdx).filter(m => m.role === 'user' || m.role === 'assistant'); const maxIdx = Math.max(0, valid.length - 1); const doneOrdinal = allMessages.slice(0, globalIdx + 1).filter(m => m.role === 'system_summary' && m.status === 'done').length - 1; const prev = allMessages.slice(0, globalIdx).findLastIndex(m => m.role === 'system_summary' && m.status === 'done'); let startVal = 0; if (prev !== -1 && allMessages[prev].endOffset !== undefined && allMessages[prev].endOffset < maxIdx) startVal = allMessages[prev].endOffset + 1; startVal = msg.startOffset !== undefined ? msg.startOffset : startVal; const endVal = msg.endOffset !== undefined ? msg.endOffset : maxIdx; const warn = '<p>选择本次要沉淀进记忆的对话范围，生成后续模型会自动继承。</p>' + (valid.length ? '<div class="range-selector"><div class="range-info" id="range-text-' + globalIdx + '">存档范围：从第 ' + (startVal + 1) + ' 条 到 第 ' + (endVal + 1) + ' 条</div><input type="range" id="summary-slider-' + globalIdx + '" data-summary-slider="' + globalIdx + '" data-start="' + startVal + '" min="' + startVal + '" max="' + maxIdx + '" value="' + endVal + '"></div><button class="summary-btn" data-action="generate-summary" data-index="' + globalIdx + '">' + SVGIcons.sparkles + '生成本卷剧情存档</button>' : '<p>当前还没有可总结的对话。</p>'); const done = '<p>已生成从第 ' + (msg.startOffset + 1) + ' 条至第 ' + (msg.endOffset + 1) + ' 条的剧情浓缩记录，后续对话会自动纳入此总结。</p><div class="summary-text">' + escapeHtml(getSummaryMemoryText(msg)) + '</div><div style="display:flex;flex-wrap:wrap;gap:8px"><button class="copy-summary-btn" data-action="copy-summary" data-index="' + globalIdx + '">' + SVGIcons.copy + '复制内容</button><button class="regenerate-summary-btn" data-action="regenerate-summary" data-index="' + globalIdx + '">' + SVGIcons.regenerate + '重新生成</button><button class="next-volume-btn" data-action="next-volume" data-index="' + globalIdx + '">开启下一卷</button><button class="link-conv-btn" data-action="link-conv" data-index="' + globalIdx + '">关联到现有会话</button>' + ((msg.endOffset !== undefined && msg.endOffset < maxIdx) ? '<button class="continue-summary-btn" data-action="continue-summary" data-index="' + globalIdx + '">从总结点继续总结</button>' : '') + '</div>'; const body = msg.status === 'warning' ? warn : msg.status === 'generating' ? '<p style="display:flex;align-items:center;gap:8px;">' + SVGIcons.spinner + ' ' + escapeHtml(msg.progressText || '正在生成剧情存档，请稍候...') + '</p>' : done; w.innerHTML = '<div class="system-summary-message ' + (msg.status === 'done' ? 'checkpoint-done' : '') + '"><div class="summary-header"><div class="summary-title-wrap">' + (msg.status === 'done' ? '剧情存档 · ' + escapeHtml(getSummaryTitle(msg, doneOrdinal)) : SVGIcons.warning + '<span>本卷剧情存档</span>') + '</div></div>' + body + '</div>'; return w; },

            async openChat(roleId, convId = null) { const role = DataManager.roles.find(r => r.id === roleId); if (!role) return; const preferredConv = DataManager.getPreferredConversation(role, convId); DataManager.currentRoleId = roleId; DataManager.currentConversationId = preferredConv?.id || null; role.unread = false; DataManager.saveData(); this.jumpToLastPage(preferredConv?.messages?.length || 0); this.renderChatFeed(); this.renderRoleList(); this.closeAllSheets(); this.closeProfile(); this.closeEdit(); DOM.listScreen.classList.add('hidden-left'); DOM.meScreen.classList.add('hidden-left'); DOM.activityScreen.classList.add('hidden-left'); DOM.chatScreen.classList.remove('hidden-right'); this.scrollChatToBottom(); const conv = DataManager.getCurrentConversation(); await this.applyConversationBackground(conv?.backgroundId || 'default', conv?.bgOpacity); },
            goBack() { this.closeProfile(); this.closeEdit(); this.closeChatMenu(); this.closeModelMenu(); this.closeAllSheets(); DOM.chatScreen.classList.add('hidden-right'); this.clearConversationBackground(); const target = { list: DOM.listScreen, activity: DOM.activityScreen, me: DOM.meScreen }[activeTab] || DOM.listScreen; target.classList.remove('hidden-left'); target.classList.remove('hidden-right'); this.renderRoleList(); },
            switchTab(tab) { if (!['list', 'activity', 'me'].includes(tab)) return; activeTab = tab; this.closeAllSheets(); [DOM.listScreen, DOM.activityScreen, DOM.meScreen].forEach(s => { s.classList.add('hidden-right'); s.classList.remove('hidden-left'); }); const target = { list: DOM.listScreen, activity: DOM.activityScreen, me: DOM.meScreen }[tab]; target.classList.remove('hidden-right'); document.querySelectorAll('.tab').forEach(item => item.classList.toggle('active', item.dataset.tab === tab)); if (tab === 'me') this.renderSettingsUI(); },
            openProfile() { this.renderProfile(); DOM.profileScrim.classList.add('open'); DOM.profilePanel.classList.add('open'); }, closeProfile() { DOM.profileScrim.classList.remove('open'); DOM.profilePanel.classList.remove('open'); }, closeEdit() { DOM.editPanel.classList.remove('open'); },
            openEditRolePanel() { const role = DataManager.getCurrentRole(); if (!role) return; DOM.editName.value = role.name; DOM.editFreeText.value = role.systemPrompt || ''; fillFields(DOM.editStruct, role.fields); setModeButtons('edit', role.fields ? 'struct' : 'free'); DOM.editPanel.classList.add('open'); },
            saveEditedRole() { const role = DataManager.getCurrentRole(); if (!role) return; const name = DOM.editName.value.trim(); if (!name) { alert('请填写角色名称。'); return; } role.name = name; if (editRoleMode === 'struct') { const fields = collectFields(DOM.editStruct); const prompt = buildSystemPromptFromFields(fields); if (!prompt) { alert('请至少填写一个人设字段。'); return; } role.fields = fields; role.promptMode = 'struct'; role.systemPrompt = prompt; } else { const prompt = DOM.editFreeText.value.trim(); if (!prompt) { alert('请填写人设描述。'); return; } role.fields = null; role.promptMode = 'free'; role.systemPrompt = prompt; } DataManager.saveData(); this.renderRoleList(); this.renderChatFeed(); this.closeEdit(); },
            openNewRolePanel() { DOM.newName.value = ''; DOM.newFreeText.value = ''; fillFields(DOM.newStruct, null); setModeButtons('new', 'struct'); DOM.roleNewPanel.classList.add('open'); }, closeNewRolePanel() { DOM.roleNewPanel.classList.remove('open'); },
            saveNewRole() { const name = DOM.newName.value.trim(); if (!name) { alert('请先给 TA 起个名字。'); return; } let fields = null, systemPrompt = ''; if (newRoleMode === 'struct') { fields = collectFields(DOM.newStruct); systemPrompt = buildSystemPromptFromFields(fields); if (!systemPrompt) { alert('请至少填写一个人设字段。'); return; } } else { systemPrompt = DOM.newFreeText.value.trim(); if (!systemPrompt) { alert('请填写人设描述。'); return; } } const role = normalizeRoleData({ id: DataManager.generateId(), name, systemPrompt, fields: newRoleMode === 'struct' ? fields : null, promptMode: newRoleMode, accentColor: DataManager.globalSettings.defaultAccentColor, conversations: [] }); DataManager.roles.unshift(role); DataManager.currentRoleId = role.id; DataManager.currentConversationId = role.conversations[0]?.id || null; DataManager.saveData(); this.closeNewRolePanel(); this.switchTab('list'); this.renderRoleList(); },
            addConversation(roleId = DataManager.currentRoleId) { const role = DataManager.roles.find(r => r.id === roleId); if (!role) return; const conv = normalizeConversationData({ id: DataManager.generateId(), name: '新对话', messages: [] }, role.name); role.conversations.unshift(conv); DataManager.currentRoleId = role.id; DataManager.currentConversationId = conv.id; DataManager.saveData(); this.resetPagination(); this.renderRoleList(); this.renderChatFeed(); this.renderProfile(); this.closeProfile(); },
            switchConversation(roleId, convId) { DataManager.currentRoleId = roleId; DataManager.currentConversationId = convId; DataManager.saveData(); this.jumpToLastPage(DataManager.getCurrentConversation()?.messages?.length || 0); this.renderChatFeed(); this.renderProfile(); },
            renameCurrentConversation() { const conv = DataManager.getCurrentConversation(); if (!conv) return; this.closeChatMenu(); openModal({ title: '重命名对话', type: 'prompt', inputValue: conv.name || '', confirmLabel: '保存', onConfirm: value => { const name = String(value || '').trim(); if (!name) return false; conv.name = name; DataManager.saveData(); this.renderRoleList(); this.renderProfile(); return true; } }); },
            clearCurrentConversation() { const conv = DataManager.getCurrentConversation(); if (!conv) return; this.closeChatMenu(); if (!confirm('确定清空所有消息？此操作不可撤销。')) return; conv.messages = []; DataManager.saveData(); this.resetPagination(); this.renderChatFeed(); this.renderRoleList(); },
            insertSceneSeparator() { const conv = DataManager.getCurrentConversation(); if (!conv) return; this.closeChatMenu(); openModal({ title: '插入场景分隔', type: 'prompt', msg: '给这一幕起一个短名字。', confirmLabel: '插入', onConfirm: value => { const content = String(value || '').trim(); if (!content) return false; conv.messages.push({ id: DataManager.generateId(), role: 'scene_separator', content, timestamp: new Date().toISOString() }); DataManager.saveData(); this.jumpToLastPage(conv.messages.length); this.renderChatFeed(); return true; } }); },
            deleteRole(roleId = DataManager.currentRoleId) { const role = DataManager.roles.find(r => r.id === roleId); if (!role) return; if (!confirm('确定删除 ' + role.name + ' 及其所有对话？此操作不可撤销')) return; DataManager.roles = DataManager.roles.filter(r => r.id !== roleId); if (DataManager.currentRoleId === roleId) { DataManager.currentRoleId = DataManager.roles[0]?.id || null; DataManager.currentConversationId = DataManager.roles[0]?.conversations[0]?.id || null; } DataManager.ensureDefaultRoles({ save: false }); DataManager.saveData(); this.goBack(); this.renderRoleList(); this.renderChatFeed(); },
            openSummaryControl() { const conv = DataManager.getCurrentConversation(); if (!conv) return; this.closeChatMenu(); let idx = -1; for (let i = conv.messages.length - 1; i >= 0; i--) { if (conv.messages[i].role === 'system_summary' && conv.messages[i].status !== 'done') { idx = i; break; } } if (idx === -1) { conv.messages.push({ id: DataManager.generateId(), role: 'system_summary', status: 'warning', content: '', timestamp: new Date().toISOString() }); idx = conv.messages.length - 1; DataManager.saveData(); } this.jumpToLastPage(conv.messages.length); this.renderChatFeed(); },
            openNextVolumeFromSummary(summaryIndex) {
                const role = DataManager.getCurrentRole();
                const conv = DataManager.getCurrentConversation();
                if (!role || !conv) return;

                const summaryMsg = conv.messages[summaryIndex];
                if (!summaryMsg || summaryMsg.role !== 'system_summary' || summaryMsg.status !== 'done') return;

                const continuationFrom = buildContinuationFromSummary(conv, summaryMsg, summaryIndex);
                if (!continuationFrom) {
                    alert('当前存档没有可继承的续写包，无法开启下一卷。');
                    return;
                }

                const existingBranch = role.conversations.some(item =>
                    item?.continuationFrom?.sourceConversationId === conv.id
                    && item.continuationFrom.sourceSummaryTimestamp === continuationFrom.sourceSummaryTimestamp
                );
                if (existingBranch && !confirm('检测到已经从这个存档点开启过下一卷。是否仍然创建新的分支会话？')) {
                    return;
                }

                const now = new Date().toISOString();
                const newConv = {
                    id: DataManager.generateId(),
                    name: `${conv.name || '当前会话'} · 下一卷`,
                    continuationFrom,
                    messages: [{
                        id: DataManager.generateId(),
                        role: 'assistant',
                        content: '已载入上一卷剧情存档，可以继续剧情。',
                        reasoning: null,
                        regenerations: [],
                        currentVersion: 0,
                        reasoningCollapsed: false,
                        timestamp: now
                    }]
                };

                role.conversations.push(newConv);
                DataManager.currentConversationId = newConv.id;
                DataManager.saveData();
                this.resetPagination();
                this.renderSidebar();
                this.loadConversationToUI();
            },
            linkExistingConversationFromSummary(summaryIndex) {
                const role = DataManager.getCurrentRole();
                const sourceConv = DataManager.getCurrentConversation();
                if (!role || !sourceConv) return;

                const summaryMsg = sourceConv.messages[summaryIndex];
                if (!summaryMsg || summaryMsg.role !== 'system_summary' || summaryMsg.status !== 'done') return;

                const continuationFrom = buildContinuationFromSummary(sourceConv, summaryMsg, summaryIndex);
                if (!continuationFrom) {
                    alert('当前存档没有可继承的续写包，无法关联到现有会话。');
                    return;
                }

                const candidates = role.conversations.filter(c => c.id !== sourceConv.id);
                if (!candidates.length) {
                    alert('当前角色下没有可关联的其他会话。');
                    return;
                }

                const listText = candidates
                    .map((c, idx) => `${idx + 1}. ${c.name || '未命名会话'}${c.continuationFrom ? '（已有继承记忆）' : ''}`)
                    .join('\n');
                const input = prompt(`请选择要关联到的现有会话，输入序号：\n\n${listText}`);
                if (!input) return;

                const targetIndex = Number(input.trim()) - 1;
                const targetConv = candidates[targetIndex];
                if (!targetConv) {
                    alert('输入的序号无效。');
                    return;
                }

                if (targetConv.continuationFrom) {
                    const sameSource =
                        targetConv.continuationFrom.sourceConversationId === sourceConv.id
                        && targetConv.continuationFrom.sourceSummaryTimestamp === continuationFrom.sourceSummaryTimestamp;

                    if (sameSource) {
                        alert('该会话已经关联到这个存档点。');
                        return;
                    }

                    if (!confirm('目标会话已经有关联的上一卷记忆。是否覆盖为当前存档点？')) {
                        return;
                    }
                }

                targetConv.continuationFrom = continuationFrom;
                DataManager.saveData();
                this.renderSidebar();
                if (DataManager.currentConversationId === targetConv.id) {
                    this.loadConversationToUI();
                }
                alert(`已将「${targetConv.name || '未命名会话'}」关联到当前存档点。该会话后续聊天会自动继承上一卷记忆。`);
            },
            toggleReasoning(assistantIndex) { const conv = DataManager.getCurrentConversation(); if (!conv) return; const msg = conv.messages[assistantIndex]; if (!msg || msg.role !== 'assistant') return; msg.reasoningCollapsed = !msg.reasoningCollapsed; DataManager.saveData(); this.loadConversationToUI(); },
            changeAssistantVersion(assistantIndex, delta) { const conv = DataManager.getCurrentConversation(); if (!conv) return; const assistantMsg = conv.messages[assistantIndex]; if (!assistantMsg || assistantMsg.role !== 'assistant') return; const totalVers = assistantMsg.regenerations.length + 1; let newVer = assistantMsg.currentVersion + delta; if (newVer < 0) newVer = 0; if (newVer >= totalVers) newVer = totalVers - 1; if (newVer === assistantMsg.currentVersion) return; assistantMsg.currentVersion = newVer; this.checkConversationLimit(); DataManager.saveData(); this.loadConversationToUI(); },
            
            async regenerateAssistantResponse(assistantIndex) {
                const conv = DataManager.getCurrentConversation(); const role = DataManager.getCurrentRole(); if (!conv || !role) return;
                const assistantMsg = conv.messages[assistantIndex]; if (!assistantMsg || assistantMsg.role !== 'assistant') return;
                if (assistantMsg.regenerations.length + 1 >= Config.MAX_REGENERATIONS + 1) { alert(`已达到最大重新生成次数（${Config.MAX_REGENERATIONS}次）`); return; }
                let userIndex = -1;
                for (let i = assistantIndex - 1; i >= 0; i--) {
                    if (conv.messages[i].role === 'user') {
                        userIndex = i;
                        break;
                    }
                }
                if (userIndex < 0) return;
                const triggerUserMsg = conv.messages[userIndex];
                
                // 【应用防 400 机制】
                const apiMessages = this.getSafeApiMessages(conv, role, userIndex);
                
                const pending = startPendingRequest({ type: 'regenerate', conversationId: conv.id, userMessage: triggerUserMsg, assistantMessage: assistantMsg });
                const loadingDiv = document.createElement('div'); loadingDiv.className = 'loading'; loadingDiv.innerHTML = `${SVGIcons.spinner} 生成中...`; DOM.messagesArea.appendChild(loadingDiv); DOM.messagesArea.scrollTop = DOM.messagesArea.scrollHeight;
                try {
                    const reply = await callChatApi({ model: DataManager.currentModel, messages: apiMessages, signal: pending.controller.signal, thinkingMode: DataManager.currentThinkingMode });
                    if (!isMessagePresent(conv, triggerUserMsg, 'user') || !isMessagePresent(conv, assistantMsg, 'assistant')) return;
                    // 新版本追加到 regenerations 末尾，保持 1=原始 2=第一次重生成... 的正序
                    const newContent = reply.content;
                    const newReasoning = normalizeReplyReasoning(reply);
                    assistantMsg.regenerations.push({ content: newContent, reasoning: newReasoning, timestamp: Date.now() });
                    assistantMsg.currentVersion = assistantMsg.regenerations.length; // 自动跳到最新版本
                    
                    this.checkConversationLimit();
                    DataManager.saveData(); this.loadConversationToUI();
                } catch (err) { if (err.name !== 'AbortError') alert(`重新生成失败: ${err.message}`); } finally { loadingDiv.remove(); clearPendingRequest(pending); }
            },
            deleteUserMessageAndAssistant(userIndex) {
                if (!confirm('确定删除此消息及后续回复吗？')) return;
                const conv = DataManager.getCurrentConversation();
                if (!conv) return;
                const userMsg = conv.messages[userIndex];
                if (isPendingForUserMessage(conv, userMsg)) currentPendingRequest.controller.abort();
                let deleteCount = 1;
                for (let i = userIndex + 1; i < conv.messages.length; i++) {
                    if (conv.messages[i].role === 'assistant') {
                        deleteCount = i - userIndex + 1;
                        break;
                    }
                    if (conv.messages[i].role === 'user') break;
                }
                conv.messages.splice(userIndex, deleteCount);
                DataManager.saveData();
                this.adjustPaginationAfterDelete(conv.messages.length);
                this.loadConversationToUI();
            },
            deleteAssistantMessage(assistantIndex) {
                const conv = DataManager.getCurrentConversation();
                if (!conv) return;
                const assistantMsg = conv.messages[assistantIndex];
                if (!assistantMsg || assistantMsg.role !== 'assistant') return;
                if (!confirm('确定删除这条 AI 回复吗？')) return;
                if (isPendingForAssistantMessage(conv, assistantMsg)) currentPendingRequest.controller.abort();
                conv.messages.splice(assistantIndex, 1);
                DataManager.saveData();
                this.adjustPaginationAfterDelete(conv.messages.length);
                this.loadConversationToUI();
                this.renderRoleList();
            },
            
            async generateReplyForUserIndex(conv, userIndex, systemPrompt) {
                const triggerUserMsg = conv?.messages?.[userIndex];
                if (!triggerUserMsg || triggerUserMsg.role !== 'user') return;
                // 【应用防 400 机制】
                const apiMessages = this.getSafeApiMessages(conv, { systemPrompt: systemPrompt }, userIndex);
                
                const pending = startPendingRequest({ type: 'reply', conversationId: conv.id, userMessage: triggerUserMsg });
                const loadingDiv = document.createElement('div'); loadingDiv.className = 'loading'; loadingDiv.innerHTML = `${SVGIcons.spinner} 生成中...`; DOM.messagesArea.appendChild(loadingDiv); DOM.messagesArea.scrollTop = DOM.messagesArea.scrollHeight;
                try {
                    const reply = await callChatApi({ model: DataManager.currentModel, messages: apiMessages, signal: pending.controller.signal, thinkingMode: DataManager.currentThinkingMode });
                    if (!isMessagePresent(conv, triggerUserMsg, 'user')) return;
                    conv.messages.push({ id: DataManager.generateId(), role: 'assistant', content: reply.content, reasoning: normalizeReplyReasoning(reply), regenerations: [], currentVersion: 0, reasoningCollapsed: false, timestamp: new Date().toISOString() });
                    
                    this.checkConversationLimit();
                    DataManager.saveData(); this.jumpToLastPage(conv.messages.length); this.loadConversationToUI();
                } catch (err) { if (err.name !== 'AbortError') alert(`生成失败: ${err.message}`); } finally { loadingDiv.remove(); clearPendingRequest(pending); }
            },

            addLoading() { const div = document.createElement('div'); div.className = 'loading'; div.innerHTML = SVGIcons.spinner + ' 生成中...'; DOM.chatFeed.appendChild(div); DOM.chatFeed.scrollTop = DOM.chatFeed.scrollHeight; return div; },
            async sendMessage() {
                const text = DOM.chatInput.value.trim();
                if (!text) return;
                if (!DataManager.currentRoleId) { alert('请先选择一个角色'); return; }
                const conv = DataManager.getCurrentConversation();
                const role = DataManager.getCurrentRole();
                if (!conv || !role) return;
                DOM.chatInput.value = '';
                adjustChatInputHeight();
                DOM.sendBtn.disabled = true;
                DOM.chatInput.disabled = true;
                const triggerUserMsg = { id: DataManager.generateId(), role: 'user', content: text, timestamp: new Date().toISOString() };
                conv.messages.push(triggerUserMsg);
                this.jumpToLastPage(conv.messages.length);
                this.loadConversationToUI();
                const apiMessages = this.getSafeApiMessages(conv, role);
                const pending = startPendingRequest({ type: 'reply', conversationId: conv.id, userMessage: triggerUserMsg });
                const loadingDiv = this.addLoading();
                try {
                    const reply = await callChatApi({ model: DataManager.currentModel, messages: apiMessages, signal: pending.controller.signal, thinkingMode: DataManager.currentThinkingMode });
                    if (!isMessagePresent(conv, triggerUserMsg, 'user')) return;
                    conv.messages.push({ id: DataManager.generateId(), role: 'assistant', content: reply.content, reasoning: normalizeReplyReasoning(reply), regenerations: [], currentVersion: 0, reasoningCollapsed: true, timestamp: new Date().toISOString() });
                    role.unread = false;
                    this.checkConversationLimit();
                    DataManager.saveData();
                    this.jumpToLastPage(conv.messages.length);
                    this.loadConversationToUI();
                    this.renderRoleList();
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        alert('生成失败: ' + err.message);
                        if (isMessagePresent(conv, triggerUserMsg, 'user')) conv.messages.splice(conv.messages.indexOf(triggerUserMsg), 1);
                        this.loadConversationToUI();
                    }
                } finally {
                    loadingDiv.remove();
                    clearPendingRequest(pending);
                    DOM.sendBtn.disabled = false;
                    DOM.chatInput.disabled = false;
                    adjustChatInputHeight();
                    DOM.chatInput.focus();
                }
            },
            adjustTextareaHeight() {},
            setDay(isDay, persist = true) { DOM.device.classList.toggle('day', isDay); DataManager.globalSettings.theme = isDay ? 'day' : 'night'; document.querySelectorAll('.seg-day').forEach(btn => btn.classList.toggle('on', isDay)); document.querySelectorAll('.seg-night').forEach(btn => btn.classList.toggle('on', !isDay)); if (persist) { localStorage.setItem('deepseek_theme', isDay ? 'light' : 'dark'); DataManager.saveData(); } },
            loadTheme() { const saved = localStorage.getItem('deepseek_theme'); this.setDay(saved ? saved === 'light' : DataManager.globalSettings.theme === 'day', false); }, toggleTheme() { this.setDay(!DOM.device.classList.contains('day')); },
            renderSettingsUI() { DOM.accentHex.textContent = normalizeHexColor(DataManager.globalSettings.defaultAccentColor).toUpperCase(); DOM.meModelVal.textContent = MODEL_OPTIONS.find(i => i.key === DataManager.currentModel)?.shortName || DataManager.currentModel; DOM.meThinkVal.textContent = THINKING_OPTIONS.find(i => i.key === DataManager.currentThinkingMode)?.name || DataManager.currentThinkingMode; DOM.meContextVal.textContent = normalizeContextMessageLimit(DataManager.globalSettings.contextMessageLimit) + ' 条'; const archiveVal = document.getElementById('meArchiveTriggerVal'); if (archiveVal) archiveVal.textContent = formatStoryArchiveTriggerChars(DataManager.globalSettings.storyArchiveTriggerChars); this.updateBgCount(); },
            onModelChange(model = DataManager.currentModel, thinking = DataManager.currentThinkingMode) { const s = DataManager.normalizeModelSettings(model, thinking); DataManager.currentModel = s.currentModel; DataManager.currentThinkingMode = s.currentThinkingMode; DataManager.globalSettings.defaultModel = s.currentModel; DataManager.globalSettings.defaultThinkingMode = s.currentThinkingMode; DataManager.saveData(); this.renderSettingsUI(); this.renderModelMenu(); },
            onContextLimitChange(value) { DataManager.globalSettings.contextMessageLimit = normalizeContextMessageLimit(value); DataManager.saveData(); this.renderSettingsUI(); },
            onArchiveTriggerChange(value) { DataManager.globalSettings.storyArchiveTriggerChars = normalizeStoryArchiveTriggerChars(value); DataManager.saveData(); this.renderSettingsUI(); },
            openOptionsSheet(kind) { optionSheetKind = kind; const isModel = kind === 'model'; const isContext = kind === 'context'; const isArchive = kind === 'archive'; const items = isArchive ? ARCHIVE_TRIGGER_OPTIONS : isContext ? CONTEXT_LIMIT_OPTIONS : isModel ? MODEL_OPTIONS : THINKING_OPTIONS; const current = isArchive ? String(normalizeStoryArchiveTriggerChars(DataManager.globalSettings.storyArchiveTriggerChars)) : isContext ? String(normalizeContextMessageLimit(DataManager.globalSettings.contextMessageLimit)) : isModel ? DataManager.currentModel : DataManager.currentThinkingMode; DOM.optSheetTitle.textContent = isArchive ? '剧情总结阈值' : isContext ? '上下文记忆' : isModel ? '默认模型' : '思考模式'; DOM.optSheetSub.textContent = isArchive ? '选择本卷剧情达到多少字符后提醒总结' : isContext ? '选择每次请求保留的最近消息数' : '选一个'; DOM.optList.innerHTML = items.map(item => '<div class="opt-row ' + (item.key === current ? 'on' : '') + '" data-option-key="' + item.key + '"><div class="opt-info"><div class="opt-name">' + escapeHtml(item.name) + '</div><div class="opt-desc">' + escapeHtml(item.desc) + '</div></div><div class="opt-tick">✓</div></div>').join(''); this.showSheet('optionsSheet'); DOM.optionsSheet.dataset.kind = kind; },
            renderModelMenu() { DOM.modelMenu.innerHTML = '<div class="mp-label">模型</div>' + MODEL_OPTIONS.map(item => '<div class="mp-item ' + (item.key === DataManager.currentModel ? 'on' : '') + '" data-model="' + item.key + '"><div class="left">' + escapeHtml(item.name) + '<small>' + escapeHtml(item.desc) + '</small></div><span class="tick">✓</span></div>').join('') + '<div class="mp-label" style="margin-top:6px">思考模式</div>' + THINKING_OPTIONS.map(item => '<div class="mp-item ' + (item.key === DataManager.currentThinkingMode ? 'on' : '') + '" data-thinking="' + item.key + '"><div class="left">' + escapeHtml(item.name) + '<small>' + escapeHtml(item.desc) + '</small></div><span class="tick">✓</span></div>').join(''); },
            toggleChatMenu(e) { e?.stopPropagation(); this.updateRelationshipArchiveMenuState(); DOM.chatMenu.classList.toggle('open'); this.closeModelMenu(); }, closeChatMenu() { DOM.chatMenu.classList.remove('open'); }, toggleModelMenu(e) { e?.stopPropagation(); this.renderModelMenu(); DOM.modelMenu.classList.toggle('open'); this.closeChatMenu(); }, closeModelMenu() { DOM.modelMenu.classList.remove('open'); },
            showSheet(id) { this.closeAllSheets(); DOM.dlgScrim.classList.add('open'); document.getElementById(id)?.classList.add('open'); }, closeAllSheets() { DOM.dlgScrim.classList.remove('open'); [DOM.summarySheet, DOM.colorSheet, DOM.bgSheet, DOM.optionsSheet, DOM.importSheet, DOM.aboutSheet, DOM.avatarCropSheet].forEach(sheet => sheet?.classList.remove('open')); if (DOM.optionsSheet) delete DOM.optionsSheet.dataset.kind; avatarCropState = null; DOM.cpSaved.classList.remove('editing'); DOM.savedColorsEditBtn.textContent = '管理'; DOM.bgGrid.classList.remove('editing'); DOM.bgEditToggle.textContent = '管理'; },
            openColorSheet(scope = 'global') { colorScope = scope; const role = DataManager.getCurrentRole(); const startHex = scope === 'role' ? this.getEffectiveAccent(role, DataManager.getCurrentConversation()) : DataManager.globalSettings.defaultAccentColor; const [h, s, l] = hexToHsl(startHex); DOM.hSlider.value = h; DOM.sSlider.value = s; DOM.lSlider.value = l; DOM.cpScopeLabel.textContent = scope === 'role' && role ? '「' + role.name + '」的强调色' : '默认强调色'; DOM.cpScopeHint.textContent = scope === 'role' ? '仅影响当前角色。修改后会同步到列表、头像、对话中的高亮。' : '新建角色时的默认强调色，已有角色不受影响。'; this.renderSavedColors(); this.updateColorPicker(); this.showSheet('colorSheet'); },
            updateColorPicker() { const h = Number(DOM.hSlider.value), s = Number(DOM.sSlider.value), l = Number(DOM.lSlider.value); const hex = hslToHex(h, s, l); DOM.hNum.textContent = h; DOM.sNum.textContent = s; DOM.lNum.textContent = l; DOM.cpHex.textContent = hex.toUpperCase(); DOM.cpHsl.textContent = 'H ' + h + ' · S ' + s + ' · L ' + l; DOM.cpSwatch.style.setProperty('--cp-color', hex); DOM.sSlider.style.background = 'linear-gradient(to right, hsl(' + h + ' 0% ' + l + '%), hsl(' + h + ' 100% ' + l + '%))'; DOM.lSlider.style.background = 'linear-gradient(to right, hsl(' + h + ' ' + s + '% 5%), hsl(' + h + ' ' + s + '% 50%), hsl(' + h + ' ' + s + '% 95%))'; this.applyAccentColor(hex); if (colorScope === 'global') DOM.accentHex.textContent = hex.toUpperCase(); },
            cancelColorSheet() { DOM.accentHex.textContent = normalizeHexColor(DataManager.globalSettings.defaultAccentColor).toUpperCase(); this.applyCurrentAccent(); this.closeAllSheets(); },
            saveColorSheet() { const hex = normalizeHexColor(DOM.cpHex.textContent.toLowerCase()); const role = DataManager.getCurrentRole(); if (colorScope === 'role' && role) role.accentColor = hex; else DataManager.globalSettings.defaultAccentColor = hex; DataManager.saveData(); this.applyCurrentAccent(); this.renderSettingsUI(); this.renderRoleList(); this.renderChatFeed(); this.closeAllSheets(); },
            renderSavedColors() { const colors = DataManager.globalSettings.savedColors || []; DOM.savedGrid.innerHTML = colors.map(color => '<div class="sw" style="background:' + color + '" data-color="' + color + '"><span class="rm" data-remove-color="' + color + '">×</span></div>').join('') + '<div class="sw add" data-add-color="true"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>'; },
            applyBgOpacity(value = 0.7) { const opacity = normalizeBgOpacity(value); DOM.chatScreen.style.setProperty('--bg-opacity', String(opacity)); if (DOM.bgOpacitySlider) DOM.bgOpacitySlider.value = String(Math.round(opacity * 100)); if (DOM.bgOpacityVal) DOM.bgOpacityVal.textContent = Math.round(opacity * 100) + '%'; },
            saveBgOpacity(value) { const conv = DataManager.getCurrentConversation(); if (!conv) return; conv.bgOpacity = normalizeBgOpacity(value); this.applyBgOpacity(conv.bgOpacity); DataManager.saveData(); },
            clearConversationBackground() { if (!DOM.customBgLayer) return; DOM.customBgLayer.style.backgroundImage = 'none'; DOM.customBgLayer.classList.remove('active'); DOM.chatScreen.classList.remove('has-custom-bg'); },
            async applyConversationBackground(bgId = 'default', bgOpacity = DataManager.getCurrentConversation()?.bgOpacity) { if (!DOM.customBgLayer) return; this.applyBgOpacity(bgOpacity); if (!bgId || bgId === 'default') { this.clearConversationBackground(); return; } try { const bgs = await DBManager.getAllBgs(); const bg = bgs.find(item => item.id === bgId); if (bg) { DOM.customBgLayer.style.backgroundImage = 'url(' + bg.dataUrl + ')'; DOM.customBgLayer.classList.add('active'); DOM.chatScreen.classList.add('has-custom-bg'); } else { this.clearConversationBackground(); } } catch(err) { this.clearConversationBackground(); console.error('加载背景失败', err); } },
            async openBgSheet(ctx = 'chat') { bgSheetContext = ctx; DOM.bgSheetTitle.textContent = ctx === 'global' ? '背景图管理' : '换背景'; DOM.bgPreviewWrap.style.display = ctx === 'global' ? 'none' : ''; await this.renderBgGrid(); await this.updateBgPreview(); this.showSheet('bgSheet'); },
            async updateBgPreview() { const role = DataManager.getCurrentRole(), conv = DataManager.getCurrentConversation(); if (!role || !conv) return; setAvatarText(DOM.bgPreviewAv, getInitialChar(role.name)); DOM.bgPreviewAv.style.background = this.getEffectiveAccent(role, conv); DOM.bgPreviewName.textContent = role.name + ' · ' + (conv.name || '新对话'); const hasCustomBg = conv.backgroundId && conv.backgroundId !== 'default'; DOM.bgOpacityControl.style.display = hasCustomBg && bgSheetContext === 'chat' ? '' : 'none'; this.applyBgOpacity(conv.bgOpacity); if (!hasCustomBg) { DOM.bgPreviewImg.style.background = 'linear-gradient(160deg,var(--bg2),var(--surface))'; return; } const bgs = await DBManager.getAllBgs(); const bg = bgs.find(item => item.id === conv.backgroundId); DOM.bgPreviewImg.style.background = bg ? 'url(' + bg.dataUrl + ') center/cover' : 'linear-gradient(160deg,var(--bg2),var(--surface))'; },
            async renderBgGrid() { let bgs = []; try { bgs = await DBManager.getAllBgs(); } catch(e) {} const current = DataManager.getCurrentConversation()?.backgroundId || 'default'; DOM.bgGrid.innerHTML = '<div class="bg-tile default ' + (current === 'default' ? 'on' : '') + '" data-bg-id="default"><div class="img"></div></div>' + bgs.map(bg => '<div class="bg-tile ' + (current === bg.id ? 'on' : '') + '" data-bg-id="' + bg.id + '"><div class="img" style="background-image:url(' + bg.dataUrl + ')"></div><button class="rm" data-delete-bg="' + bg.id + '">×</button></div>').join(''); DOM.bgCountVal.textContent = bgs.length + ' 张'; },
            async pickBackground(id) { if (DOM.bgGrid.classList.contains('editing') || bgSheetContext !== 'chat') return; const conv = DataManager.getCurrentConversation(); if (!conv) return; conv.backgroundId = id; conv.bgOpacity = normalizeBgOpacity(conv.bgOpacity); DataManager.saveData(); await this.applyConversationBackground(id, conv.bgOpacity); await this.renderBgGrid(); await this.updateBgPreview(); },
            async deleteBackground(id) { if (!confirm('确认删除这张历史背景吗？')) return; await DBManager.deleteBg(id); DataManager.roles.forEach(role => role.conversations.forEach(conv => { if (conv.backgroundId === id) conv.backgroundId = 'default'; })); DataManager.saveData(); await this.applyConversationBackground(DataManager.getCurrentConversation()?.backgroundId || 'default'); await this.renderBgGrid(); await this.updateBgPreview(); this.updateBgCount(); },
            processAndSaveImage(file) { const reader = new FileReader(); reader.onload = e => { const img = new Image(); img.onload = async () => { const canvas = document.createElement('canvas'); let width = img.width, height = img.height; const max = 1920; if (width > height && width > max) { height *= max / width; width = max; } else if (height > max) { width *= max / height; height = max; } canvas.width = width; canvas.height = height; canvas.getContext('2d').drawImage(img, 0, 0, width, height); const dataUrl = canvas.toDataURL('image/jpeg', 0.85); const id = 'bg_' + Date.now(); try { await DBManager.saveBg(id, dataUrl); if (bgSheetContext === 'chat') { const conv = DataManager.getCurrentConversation(); if (conv) { conv.backgroundId = id; conv.bgOpacity = normalizeBgOpacity(conv.bgOpacity); } DataManager.saveData(); await this.applyConversationBackground(id, conv?.bgOpacity); } await this.renderBgGrid(); await this.updateBgPreview(); this.updateBgCount(); } catch(err) { alert('图片保存失败，数据库写入错误。'); console.error(err); } }; img.src = e.target.result; }; reader.readAsDataURL(file); },
            async updateBgCount() { try { const bgs = await DBManager.getAllBgs(); DOM.bgCountVal.textContent = bgs.length + ' 张'; } catch(e) { DOM.bgCountVal.textContent = '0 张'; } },
            openAvatarPicker() { if (!DataManager.getCurrentRole()) return; DOM.roleAvatarInput?.click(); },
            loadAvatarFile(file) { if (!file || !file.type?.startsWith('image/')) return; const reader = new FileReader(); reader.onload = e => { const img = new Image(); img.onload = () => this.openAvatarCropper(img); img.onerror = () => alert('头像图片读取失败。'); img.src = e.target.result; }; reader.readAsDataURL(file); },
            openAvatarCropper(image) { this.showSheet('avatarCropSheet'); const stageRect = DOM.avatarCropStage.getBoundingClientRect(); const frameRect = DOM.avatarCropStage.querySelector('.avatar-crop-frame').getBoundingClientRect(); const stageSize = Math.max(1, stageRect.width); const cropSize = Math.max(1, frameRect.width); const minScale = Math.max(cropSize / image.naturalWidth, cropSize / image.naturalHeight); avatarCropState = { image, stageSize, cropSize, scale: minScale, minScale, maxScale: minScale * 4, offsetX: 0, offsetY: 0, pointers: new Map(), gesture: null }; this.constrainAvatarCrop(); this.renderAvatarCrop(); },
            refreshAvatarCropGeometry() { if (!avatarCropState || !DOM.avatarCropStage) return; const stageRect = DOM.avatarCropStage.getBoundingClientRect(); const frameRect = DOM.avatarCropStage.querySelector('.avatar-crop-frame').getBoundingClientRect(); avatarCropState.stageSize = Math.max(1, stageRect.width); avatarCropState.cropSize = Math.max(1, frameRect.width); avatarCropState.minScale = Math.max(avatarCropState.cropSize / avatarCropState.image.naturalWidth, avatarCropState.cropSize / avatarCropState.image.naturalHeight); avatarCropState.maxScale = avatarCropState.minScale * 4; avatarCropState.scale = Math.max(avatarCropState.minScale, Math.min(avatarCropState.maxScale, avatarCropState.scale)); this.constrainAvatarCrop(); },
            constrainAvatarCrop() { const state = avatarCropState; if (!state) return; const imgW = state.image.naturalWidth * state.scale; const imgH = state.image.naturalHeight * state.scale; const halfGapX = Math.max(0, (imgW - state.cropSize) / 2); const halfGapY = Math.max(0, (imgH - state.cropSize) / 2); state.offsetX = Math.max(-halfGapX, Math.min(halfGapX, state.offsetX)); state.offsetY = Math.max(-halfGapY, Math.min(halfGapY, state.offsetY)); },
            renderAvatarCrop() { const state = avatarCropState; const canvas = DOM.avatarCropCanvas; if (!state || !canvas) return; const dpr = window.devicePixelRatio || 1; canvas.width = Math.round(state.stageSize * dpr); canvas.height = Math.round(state.stageSize * dpr); const ctx = canvas.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, state.stageSize, state.stageSize); ctx.fillStyle = '#050409'; ctx.fillRect(0, 0, state.stageSize, state.stageSize); const drawW = state.image.naturalWidth * state.scale; const drawH = state.image.naturalHeight * state.scale; const x = state.stageSize / 2 - drawW / 2 + state.offsetX; const y = state.stageSize / 2 - drawH / 2 + state.offsetY; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(state.image, x, y, drawW, drawH); },
            zoomAvatarCrop(nextScale, centerX = null, centerY = null) { const state = avatarCropState; if (!state) return; const oldScale = state.scale; const scale = Math.max(state.minScale, Math.min(state.maxScale, nextScale)); if (scale === oldScale) return; if (Number.isFinite(centerX) && Number.isFinite(centerY)) { const stageCenter = state.stageSize / 2; state.offsetX = centerX - stageCenter - (centerX - stageCenter - state.offsetX) * (scale / oldScale); state.offsetY = centerY - stageCenter - (centerY - stageCenter - state.offsetY) * (scale / oldScale); } state.scale = scale; this.constrainAvatarCrop(); this.renderAvatarCrop(); },
            handleAvatarPointerDown(e) { if (!avatarCropState) return; e.preventDefault(); DOM.avatarCropStage.setPointerCapture?.(e.pointerId); avatarCropState.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); avatarCropState.gesture = null; },
            handleAvatarPointerMove(e) { const state = avatarCropState; if (!state || !state.pointers.has(e.pointerId)) return; e.preventDefault(); const prev = state.pointers.get(e.pointerId); state.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); const points = Array.from(state.pointers.values()); if (points.length >= 2) { const [a, b] = points; const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; const dist = Math.hypot(a.x - b.x, a.y - b.y); if (!state.gesture || state.gesture.type !== 'pinch') state.gesture = { type: 'pinch', dist, scale: state.scale, mid, offsetX: state.offsetX, offsetY: state.offsetY }; const nextScale = Math.max(state.minScale, Math.min(state.maxScale, state.gesture.scale * (dist / Math.max(1, state.gesture.dist)))); state.scale = nextScale; state.offsetX = state.gesture.offsetX + (mid.x - state.gesture.mid.x); state.offsetY = state.gesture.offsetY + (mid.y - state.gesture.mid.y); this.constrainAvatarCrop(); this.renderAvatarCrop(); return; } if (points.length === 1 && prev) { state.offsetX += e.clientX - prev.x; state.offsetY += e.clientY - prev.y; this.constrainAvatarCrop(); this.renderAvatarCrop(); } },
            handleAvatarPointerUp(e) { if (!avatarCropState) return; avatarCropState.pointers.delete(e.pointerId); avatarCropState.gesture = null; },
            handleAvatarWheel(e) { if (!avatarCropState) return; e.preventDefault(); const rect = DOM.avatarCropStage.getBoundingClientRect(); const factor = e.deltaY < 0 ? 1.08 : 0.92; this.zoomAvatarCrop(avatarCropState.scale * factor, e.clientX - rect.left, e.clientY - rect.top); },
            cancelAvatarCrop() { avatarCropState = null; DOM.avatarCropSheet?.classList.remove('open'); DOM.dlgScrim?.classList.remove('open'); if (DOM.roleAvatarInput) DOM.roleAvatarInput.value = ''; },
            saveAvatarCrop() { const role = DataManager.getCurrentRole(); const state = avatarCropState; if (!role || !state) return; this.refreshAvatarCropGeometry(); const output = document.createElement('canvas'); output.width = 256; output.height = 256; const ctx = output.getContext('2d'); ctx.imageSmoothingQuality = 'high'; const drawW = state.image.naturalWidth * state.scale; const drawH = state.image.naturalHeight * state.scale; const imgX = state.stageSize / 2 - drawW / 2 + state.offsetX; const imgY = state.stageSize / 2 - drawH / 2 + state.offsetY; const cropLeft = (state.stageSize - state.cropSize) / 2; const cropTop = (state.stageSize - state.cropSize) / 2; const sourceSize = state.cropSize / state.scale; const maxX = Math.max(0, state.image.naturalWidth - sourceSize); const maxY = Math.max(0, state.image.naturalHeight - sourceSize); const sx = Math.max(0, Math.min(maxX, (cropLeft - imgX) / state.scale)); const sy = Math.max(0, Math.min(maxY, (cropTop - imgY) / state.scale)); ctx.drawImage(state.image, sx, sy, sourceSize, sourceSize, 0, 0, 256, 256); role.avatarDataUrl = output.toDataURL('image/jpeg', 0.92); DataManager.saveData(); this.renderRoleList(); this.renderProfile(); this.renderChatHeader(); this.cancelAvatarCrop(); },
            openImportSheet() { this.showSheet('importSheet'); },
            exportData() { if (!DataManager.roles?.length) { alert('当前没有可导出的数据。'); return; } const data = { roles: DataManager.roles, globalSettings: DataManager.globalSettings, version: 2, exportedAt: new Date().toISOString() }; const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'DeepSeek_RP_Data_' + new Date().toISOString().slice(0, 10) + '.json'; a.click(); URL.revokeObjectURL(url); },
            importData(file) { if (!file) return; const reader = new FileReader(); reader.onload = event => { try { const data = JSON.parse(event.target.result); const importedRoles = normalizeImportedRoles(data); if (!importedRoles.length) { alert('文件格式错误：未找到有效的角色数据。'); return; } if (confirm('是否覆盖当前所有角色与对话数据？\n点击“确定”覆盖，点击“取消”则追加到现有列表中。')) { DataManager.roles = importedRoles; DataManager.currentRoleId = importedRoles[0]?.id || null; DataManager.currentConversationId = importedRoles[0]?.conversations[0]?.id || null; if (data.globalSettings) DataManager.globalSettings = normalizeGlobalSettings(data.globalSettings); } else { importedRoles.forEach(role => { role.id = DataManager.generateId(); role.conversations.forEach(conv => conv.id = DataManager.generateId()); DataManager.roles.push(role); }); } DataManager.ensureDefaultRoles({ save: false }); DataManager.saveData(); this.loadTheme(); this.renderSettingsUI(); this.renderRoleList(); this.renderChatFeed(); this.closeAllSheets(); alert('数据导入成功！'); } catch(err) { alert('读取文件失败，可能不是合法的 JSON 文件。\n错误信息: ' + err.message); } finally { DOM.importFile.value = ''; } }; reader.readAsText(file); },
            openAboutSheet() { this.showSheet('aboutSheet'); }, updateDefaultBgItemStyle() {}
        };

        const baseRenderMessageNode = UIManager.renderMessageNode.bind(UIManager);
        UIManager.renderMessageNode = function(msg, globalIdx, allMessages) {
            const node = baseRenderMessageNode(msg, globalIdx, allMessages);
            if (msg?.role === 'assistant' && node && !node.querySelector('[data-action="delete-assistant"]')) {
                const deleteBtn = document.createElement('button');
                deleteBtn.dataset.action = 'delete-assistant';
                deleteBtn.dataset.index = String(globalIdx);
                deleteBtn.innerHTML = SVGIcons.delete + '删除';
                const regenBtn = node.querySelector('[data-action="regenerate"]');
                if (regenBtn) regenBtn.before(deleteBtn);
            }
            return node;
        };

        function initDisplayModeClass() { const mq = window.matchMedia('(display-mode: standalone)'); const update = () => { const isStandalone = mq.matches || window.navigator.standalone === true; document.documentElement.classList.toggle('standalone', isStandalone); DOM.device?.classList.toggle('standalone', isStandalone); }; update(); if (mq.addEventListener) mq.addEventListener('change', update); else if (mq.addListener) mq.addListener(update); }
        function initThemeFollowSystem() { const mq = window.matchMedia('(prefers-color-scheme: dark)'); mq.addEventListener('change', e => { if (!localStorage.getItem('deepseek_theme')) UIManager.setDay(!e.matches, true); }); }
        function bindEvents() {
            DOM.addRoleBtn.addEventListener('click', () => UIManager.openNewRolePanel()); document.querySelectorAll('[data-action="theme"]').forEach(btn => btn.addEventListener('click', () => UIManager.toggleTheme())); DOM.roleSearchInput.addEventListener('input', () => UIManager.renderRoleList()); document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => UIManager.switchTab(btn.dataset.tab))); DOM.backBtn.addEventListener('click', () => UIManager.goBack()); DOM.chatAvatar.addEventListener('click', () => UIManager.openProfile()); DOM.profileAv.addEventListener('click', () => UIManager.openAvatarPicker()); DOM.profileScrim.addEventListener('click', () => UIManager.closeProfile()); DOM.chatMenuBtn.addEventListener('click', e => UIManager.toggleChatMenu(e)); DOM.summaryMenuItem.addEventListener('click', () => UIManager.openSummaryControl()); DOM.relationshipArchiveMenuItem?.addEventListener('click', () => UIManager.generateArchiveUpdate()); DOM.insertSceneItem.addEventListener('click', () => UIManager.insertSceneSeparator()); DOM.renameConvItem.addEventListener('click', () => UIManager.renameCurrentConversation()); DOM.clearConvItem.addEventListener('click', () => UIManager.clearCurrentConversation()); DOM.editRoleBtn.addEventListener('click', () => UIManager.openEditRolePanel()); DOM.changeBgBtn.addEventListener('click', () => { UIManager.closeProfile(); setTimeout(() => UIManager.openBgSheet('chat'), 260); }); DOM.roleColorBtn.addEventListener('click', () => { UIManager.closeProfile(); setTimeout(() => UIManager.openColorSheet('role'), 260); }); DOM.profileModelBtn.addEventListener('click', e => UIManager.toggleModelMenu(e)); DOM.profileRenameBtn.addEventListener('click', () => { UIManager.closeProfile(); setTimeout(() => UIManager.renameCurrentConversation(), 260); }); DOM.newConvBtn.addEventListener('click', () => UIManager.addConversation()); DOM.deleteCurrentRoleBtn.addEventListener('click', () => UIManager.deleteRole()); DOM.profileConvList.addEventListener('click', e => { const row = e.target.closest('.conv-row'); if (row) UIManager.switchConversation(DataManager.currentRoleId, row.dataset.convId); }); DOM.closeEditBtn.addEventListener('click', () => UIManager.closeEdit()); DOM.saveEditRoleBtn.addEventListener('click', () => UIManager.saveEditedRole()); document.querySelectorAll('[data-edit-mode]').forEach(btn => btn.addEventListener('click', () => setModeButtons('edit', btn.dataset.editMode))); DOM.closeNewRoleBtn.addEventListener('click', () => UIManager.closeNewRolePanel()); DOM.saveNewRoleBtn.addEventListener('click', () => UIManager.saveNewRole()); document.querySelectorAll('[data-new-mode]').forEach(btn => btn.addEventListener('click', () => setModeButtons('new', btn.dataset.newMode))); DOM.sendBtn.addEventListener('click', () => UIManager.sendMessage()); DOM.chatInput.addEventListener('input', () => adjustChatInputHeight()); DOM.chatInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); UIManager.sendMessage(); } });
            DOM.chatFeed.addEventListener('click', e => { const scene = e.target.closest('.scene[data-index]'); if (scene && !e.target.closest('button')) { const idx = Number(scene.dataset.index); const conv = DataManager.getCurrentConversation(); const msg = conv?.messages[idx]; if (msg?.role === 'scene_separator') openModal({ title: '编辑场景名', type: 'prompt', inputValue: msg.content || '', confirmLabel: '保存', onConfirm: value => { const v = String(value || '').trim(); if (!v) return false; msg.content = v; DataManager.saveData(); UIManager.renderChatFeed(); return true; } }); return; } const btn = e.target.closest('[data-action]'); if (!btn) return; const index = Number(btn.dataset.index); const conv = DataManager.getCurrentConversation(); switch (btn.dataset.action) { case 'toggle-reasoning': UIManager.toggleReasoning(index); break; case 'version': UIManager.changeAssistantVersion(index, Number(btn.dataset.delta)); break; case 'regenerate': UIManager.regenerateAssistantResponse(index); break; case 'edit-user': openEditUserModal(index, conv?.messages[index]?.content || ''); break; case 'edit-assistant': openEditAssistantModal(index, UIManager.getDialogueContent(conv?.messages[index])); break; case 'delete-user': UIManager.deleteUserMessageAndAssistant(index); break; case 'generate-summary': { const slider = document.getElementById('summary-slider-' + index); UIManager.generateStorySummary(index, slider ? Number(slider.dataset.start) : 0, slider ? Number(slider.value) : 0); break; } case 'copy-summary': { const msg = conv?.messages[index]; if (!msg) return; const prefix = '[系统指令]\n你现在需要扮演该角色。在开始对话之前，请先仔细阅读并内化以下【前情提要】。这份前情提要是你和用户之间已经发生过的所有事情的记录，它不是需要你分析或回应的内容，而是你的记忆。请将这份记忆完全融入你对角色的理解中，并基于此继续与用户进行互动。\n\n【前情提要】\n'; copyToClipboard(prefix + getSummaryMemoryText(msg), () => { btn.innerHTML = SVGIcons.check + '复制成功'; setTimeout(() => btn.innerHTML = SVGIcons.copy + '复制内容', 1600); }); break; } case 'regenerate-summary': { const msg = conv?.messages[index]; if (msg?.startOffset !== undefined && msg?.endOffset !== undefined && confirm('重新生成会覆盖当前剧情总结，是否继续？')) UIManager.generateStorySummary(index, msg.startOffset, msg.endOffset); break; } case 'next-volume': UIManager.openNextVolumeFromSummary(index); break; case 'link-conv': UIManager.linkExistingConversationFromSummary(index); break; case 'continue-summary': if (conv && !conv.messages.some(m => m.role === 'system_summary' && m.status !== 'done')) { conv.messages.push({ id: DataManager.generateId(), role: 'system_summary', status: 'warning', content: '', timestamp: new Date().toISOString() }); DataManager.saveData(); UIManager.jumpToLastPage(conv.messages.length); UIManager.renderChatFeed(); } break; case 'prev-page': if (Pagination.currentPage > 1) { Pagination.currentPage--; UIManager.renderChatFeed(); } break; case 'next-page': { const pages = Math.ceil((conv?.messages.length || 0) / Config.PAGE_SIZE); if (Pagination.currentPage < pages) { Pagination.currentPage++; UIManager.renderChatFeed(); } break; } } });
            DOM.chatFeed.addEventListener('input', e => { const slider = e.target.closest('[data-summary-slider]'); if (!slider) return; const text = document.getElementById('range-text-' + slider.dataset.summarySlider); if (text) text.textContent = '存档范围：从第 ' + (Number(slider.dataset.start) + 1) + ' 条 到 第 ' + (Number(slider.value) + 1) + ' 条'; });
            DOM.confirmEditMsgBtn.addEventListener('click', async () => {
                const newContent = DOM.editUserMsgContent.value.trim();
                if (!newContent) return;
                const conv = DataManager.getCurrentConversation();
                if (!conv) return;

                if (editingAssistantMessageIndex !== null) {
                    const msg = conv.messages[editingAssistantMessageIndex];
                    if (!msg || msg.role !== 'assistant') return;
                    if (msg.currentVersion > 0 && msg.regenerations?.[msg.currentVersion - 1]) {
                        msg.regenerations[msg.currentVersion - 1].content = newContent;
                    } else {
                        msg.content = newContent;
                    }
                    DataManager.saveData();
                    UIManager.renderChatFeed();
                    closeModal();
                    editingAssistantMessageIndex = null;
                    return;
                }

                if (editingUserMessageIndex === null) return;
                const msg = conv.messages[editingUserMessageIndex];
                if (!msg || msg.role !== 'user') return;
                if (!confirm('重新生成将删除此条消息之后的所有对话，是否继续？')) {
                    closeModal();
                    editingUserMessageIndex = null;
                    return;
                }
                msg.content = newContent;
                msg.timestamp = new Date().toISOString();
                conv.messages.splice(editingUserMessageIndex + 1);
                DataManager.saveData();
                UIManager.jumpToLastPage(conv.messages.length);
                UIManager.renderChatFeed();
                closeModal();
                const idx = editingUserMessageIndex;
                editingUserMessageIndex = null;
                const role = DataManager.getCurrentRole();
                if (role) await UIManager.generateReplyForUserIndex(conv, idx, role.systemPrompt);
            }); DOM.cancelEditMsgBtn.addEventListener('click', () => { closeModal(); editingUserMessageIndex = null; editingAssistantMessageIndex = null; }); DOM.modalScrim.addEventListener('click', () => closeModal()); DOM.modalCancel.addEventListener('click', () => closeModal()); DOM.modalConfirm.addEventListener('click', () => { const value = DOM.modalInput.style.display === 'block' ? DOM.modalInput.value : undefined; const result = modalState.onConfirm ? modalState.onConfirm(value) : undefined; if (result === false) return; closeModal(); }); DOM.modalInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); DOM.modalConfirm.click(); } else if (e.key === 'Escape') closeModal(); }); DOM.dlgScrim.addEventListener('click', () => UIManager.closeAllSheets()); document.getElementById('closeSummaryBtn').addEventListener('click', () => UIManager.closeAllSheets()); [DOM.hSlider, DOM.sSlider, DOM.lSlider].forEach(slider => slider.addEventListener('input', () => UIManager.updateColorPicker())); DOM.cancelColorBtn.addEventListener('click', () => UIManager.cancelColorSheet()); DOM.saveColorBtn.addEventListener('click', () => UIManager.saveColorSheet()); DOM.savedColorsEditBtn.addEventListener('click', () => { DOM.cpSaved.classList.toggle('editing'); DOM.savedColorsEditBtn.textContent = DOM.cpSaved.classList.contains('editing') ? '完成' : '管理'; }); DOM.savedGrid.addEventListener('click', e => { const remove = e.target.closest('[data-remove-color]'); if (remove && DOM.cpSaved.classList.contains('editing')) { DataManager.globalSettings.savedColors = DataManager.globalSettings.savedColors.filter(c => c !== remove.dataset.removeColor); DataManager.saveData(); UIManager.renderSavedColors(); return; } if (e.target.closest('[data-add-color]')) { const color = normalizeHexColor(DOM.cpHex.textContent.toLowerCase()); if (!DataManager.globalSettings.savedColors.includes(color)) DataManager.globalSettings.savedColors.push(color); DataManager.saveData(); UIManager.renderSavedColors(); return; } const swatch = e.target.closest('[data-color]'); if (swatch && !DOM.cpSaved.classList.contains('editing')) { const [h, s, l] = hexToHsl(swatch.dataset.color); DOM.hSlider.value = h; DOM.sSlider.value = s; DOM.lSlider.value = l; UIManager.updateColorPicker(); } });
            document.getElementById('globalColorRow').addEventListener('click', () => UIManager.openColorSheet('global')); document.getElementById('themeRow').addEventListener('click', () => UIManager.toggleTheme()); document.getElementById('themeSegmented').addEventListener('click', e => { e.stopPropagation(); const btn = e.target.closest('[data-theme]'); if (btn) UIManager.setDay(btn.dataset.theme === 'day'); }); document.getElementById('defaultModelRow').addEventListener('click', () => UIManager.openOptionsSheet('model')); document.getElementById('defaultThinkRow').addEventListener('click', () => UIManager.openOptionsSheet('think')); document.getElementById('contextMemoryRow').addEventListener('click', () => UIManager.openOptionsSheet('context')); document.getElementById('archiveTriggerRow')?.addEventListener('click', () => UIManager.openOptionsSheet('archive')); DOM.optList.addEventListener('click', e => { const row = e.target.closest('[data-option-key]'); if (!row) return; if (optionSheetKind === 'model') UIManager.onModelChange(row.dataset.optionKey, DataManager.currentThinkingMode); else if (optionSheetKind === 'context') UIManager.onContextLimitChange(row.dataset.optionKey); else if (optionSheetKind === 'archive') UIManager.onArchiveTriggerChange(row.dataset.optionKey); else UIManager.onModelChange(DataManager.currentModel, row.dataset.optionKey); UIManager.closeAllSheets(); }); DOM.modelMenu.addEventListener('click', e => { const model = e.target.closest('[data-model]')?.dataset.model; const thinking = e.target.closest('[data-thinking]')?.dataset.thinking; if (model) UIManager.onModelChange(model, DataManager.currentThinkingMode); if (thinking) UIManager.onModelChange(DataManager.currentModel, thinking); if (model || thinking) UIManager.closeModelMenu(); }); document.addEventListener('click', e => { if (!e.target.closest('#chatMenu') && !e.target.closest('#chatMenuBtn')) UIManager.closeChatMenu(); if (!e.target.closest('#modelMenu') && !e.target.closest('#profileModelBtn')) UIManager.closeModelMenu(); }); document.getElementById('bgManageRow').addEventListener('click', () => UIManager.openBgSheet('global')); DOM.bgEditToggle.addEventListener('click', () => { DOM.bgGrid.classList.toggle('editing'); DOM.bgEditToggle.textContent = DOM.bgGrid.classList.contains('editing') ? '完成' : '管理'; }); DOM.bgGrid.addEventListener('click', async e => { const del = e.target.closest('[data-delete-bg]'); if (del) { e.stopPropagation(); await UIManager.deleteBackground(del.dataset.deleteBg); return; } const tile = e.target.closest('[data-bg-id]'); if (tile) await UIManager.pickBackground(tile.dataset.bgId); }); DOM.bgOpacitySlider.addEventListener('input', e => UIManager.applyBgOpacity(Number(e.target.value) / 100)); DOM.bgOpacitySlider.addEventListener('change', e => UIManager.saveBgOpacity(Number(e.target.value) / 100)); DOM.uploadNewBgBtn.addEventListener('click', () => DOM.bgInput.click()); DOM.bgInput.addEventListener('change', e => { const file = e.target.files[0]; if (file) UIManager.processAndSaveImage(file); e.target.value = ''; }); DOM.roleAvatarInput.addEventListener('change', e => { const file = e.target.files[0]; if (file) UIManager.loadAvatarFile(file); }); DOM.avatarCropStage.addEventListener('pointerdown', e => UIManager.handleAvatarPointerDown(e)); DOM.avatarCropStage.addEventListener('pointermove', e => UIManager.handleAvatarPointerMove(e)); DOM.avatarCropStage.addEventListener('pointerup', e => UIManager.handleAvatarPointerUp(e)); DOM.avatarCropStage.addEventListener('pointercancel', e => UIManager.handleAvatarPointerUp(e)); DOM.avatarCropStage.addEventListener('wheel', e => UIManager.handleAvatarWheel(e), { passive: false }); DOM.cancelAvatarCropBtn.addEventListener('click', () => UIManager.cancelAvatarCrop()); DOM.saveAvatarCropBtn.addEventListener('click', () => UIManager.saveAvatarCrop()); window.addEventListener('resize', () => { if (avatarCropState) { UIManager.refreshAvatarCropGeometry(); UIManager.renderAvatarCrop(); } }); document.getElementById('importRow').addEventListener('click', () => UIManager.openImportSheet()); DOM.importDrop.addEventListener('click', () => DOM.importFile.click()); DOM.importDrop.addEventListener('dragover', e => e.preventDefault()); DOM.importDrop.addEventListener('drop', e => { e.preventDefault(); UIManager.importData(e.dataTransfer.files[0]); }); DOM.importFile.addEventListener('change', e => UIManager.importData(e.target.files[0])); DOM.cancelImportBtn.addEventListener('click', () => UIManager.closeAllSheets()); document.getElementById('exportRow').addEventListener('click', () => UIManager.exportData()); document.getElementById('aboutRow').addEventListener('click', () => UIManager.openAboutSheet());
        }
        function bindAssistantDeleteEvent() {
            DOM.chatFeed.addEventListener('click', e => {
                const btn = e.target.closest('[data-action="delete-assistant"]');
                if (!btn) return;
                UIManager.deleteAssistantMessage(Number(btn.dataset.index));
            });
        }
        async function init() { try { await DBManager.init(); } catch(err) { alert('本地数据库初始化失败，背景历史功能将受限。'); console.error(err); } await DataManager.loadData(); bindEvents(); bindAssistantDeleteEvent(); initDisplayModeClass(); UIManager.loadTheme(); UIManager.renderSettingsUI(); UIManager.renderRoleList(); UIManager.renderChatFeed(); UIManager.renderModelMenu(); adjustChatInputHeight(); initThemeFollowSystem(); }
        window.openChat = UIManager.openChat.bind(UIManager); window.goBack = UIManager.goBack.bind(UIManager); window.openProfile = UIManager.openProfile.bind(UIManager); window.closeProfile = UIManager.closeProfile.bind(UIManager); window.switchTab = UIManager.switchTab.bind(UIManager); window.showSheet = UIManager.showSheet.bind(UIManager); window.closeAllSheets = UIManager.closeAllSheets.bind(UIManager);
        init();

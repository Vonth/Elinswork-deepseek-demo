"use strict";

        const Config = {
            WORKER_URL: 'https://still-bread-327a.liaoyilin826.workers.dev/',
            MAX_REGENERATIONS: 5,
            PAGE_SIZE: 50,
            TOKEN_WARNING_LIMIT: 80000 // 8万字符触发范围总结预警
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
        let currentAbortController = null;

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

        async function callChatApi({ model, messages, signal }) {
            const response = await fetch(Config.WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model, messages, stream: false }),
                signal
            });

            let data = null;
            try { data = await response.json(); } catch(e) {}

            if (!response.ok) {
                const message = data?.error?.message || data?.message || `HTTP ${response.status}`;
                throw new Error(message);
            }

            const message = data?.choices?.[0]?.message;
            if (!message || typeof message.content !== 'string') {
                throw new Error('API 返回格式异常，未找到有效回复内容');
            }

            return {
                content: message.content,
                reasoning: typeof message.reasoning_content === 'string' ? message.reasoning_content : null
            };
        }

        function normalizeImportedRoles(data) {
            if (!data || !Array.isArray(data.roles)) return [];

            return data.roles
                .filter(role => role && typeof role === 'object')
                .map(role => {
                    const normalizedRole = {
                        id: role.id || DataManager.generateId(),
                        name: typeof role.name === 'string' && role.name.trim() ? role.name.trim() : '未命名角色',
                        systemPrompt: typeof role.systemPrompt === 'string' && role.systemPrompt.trim() ? role.systemPrompt.trim() : '你是一个乐于助人的AI助手。',
                        conversations: Array.isArray(role.conversations) ? role.conversations.map(conv => ({
                            id: conv?.id || DataManager.generateId(),
                            name: typeof conv?.name === 'string' && conv.name.trim() ? conv.name.trim() : '新对话',
                            messages: Array.isArray(conv?.messages) ? conv.messages.map(normalizeImportedMessage).filter(Boolean) : []
                        })) : []
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
            }

            return normalized;
        }

        const DataManager = {
            roles: [], currentRoleId: null, currentConversationId: null, currentModel: 'deepseek-chat', sidebarOpen: false,
            generateId() { return crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random(); },
            defaultRole: { id: 'default_role', name: '新角色', systemPrompt: '你是一个乐于助人的AI助手。', conversations: [] },
            ensureDefaultRoles() {
                if (!this.roles || this.roles.length === 0) this.roles = [JSON.parse(JSON.stringify(this.defaultRole))];
                for (let role of this.roles) {
                    if (!role.conversations || role.conversations.length === 0) role.conversations = [{ id: this.generateId(), name: '新对话', messages: [] }];
                    for (let conv of role.conversations) {
                        if (!conv.messages) conv.messages = [];
                        if (conv.messages.length === 0) conv.messages.push({ role: 'assistant', content: `你好！我是${role.name}，开始对话吧～`, reasoning: null, regenerations: [], currentVersion: 0, reasoningCollapsed: false, timestamp: new Date().toISOString() });
                        for (let msg of conv.messages) {
                            if (msg.role === 'assistant') {
                                if (!msg.regenerations) msg.regenerations = [];
                                if (msg.currentVersion === undefined) msg.currentVersion = 0;
                                if (msg.reasoningCollapsed === undefined) msg.reasoningCollapsed = false;
                            }
                            if (!msg.timestamp) msg.timestamp = new Date().toISOString();
                        }
                    }
                }
                this.saveData();
            },
            saveData() {
                const data = { roles: this.roles, currentRoleId: this.currentRoleId, currentConversationId: this.currentConversationId, currentModel: this.currentModel };
                // 优先写 IndexedDB，同时保持 localStorage 的轻量备份（只存 ID 和模型，不存消息）
                DBManager.saveAppData(data).catch(() => {
                    // IndexedDB 失败时降级写 localStorage（可能超限，仅作最后保障）
                    try { localStorage.setItem('deepseek_app_data', JSON.stringify(data)); } catch(e) {}
                });
                // localStorage 只存轻量索引，不存消息内容
                try { localStorage.setItem('deepseek_app_index', JSON.stringify({ currentRoleId: this.currentRoleId, currentConversationId: this.currentConversationId, currentModel: this.currentModel })); } catch(e) {}
            },
            async loadData() {
                let data = null;
                try { data = await DBManager.loadAppData(); } catch(e) {}
                // 若 IndexedDB 没有数据，尝试从 localStorage 迁移
                if (!data) {
                    const saved = localStorage.getItem('deepseek_app_data');
                    if (saved) { try { data = JSON.parse(saved); } catch(e) {} }
                }
                if (data) {
                    this.roles = data.roles || [];
                    this.currentRoleId = data.currentRoleId || null;
                    this.currentConversationId = data.currentConversationId || null;
                    this.currentModel = data.currentModel || 'deepseek-chat';
                    modelSelect.value = this.currentModel;
                }
                this.ensureDefaultRoles();
                if (!this.roles.find(r => r.id === this.currentRoleId) && this.roles.length) this.currentRoleId = this.roles[0].id;
                if (this.currentRoleId) { const role = this.getCurrentRole(); if (role && (!this.currentConversationId || !role.conversations.find(c => c.id === this.currentConversationId))) this.currentConversationId = role.conversations[0]?.id || null; }
                this.saveData();
            },
            getCurrentRole() { return this.roles.find(r => r.id === this.currentRoleId); },
            getCurrentConversation() { const role = this.getCurrentRole(); return role ? role.conversations.find(c => c.id === this.currentConversationId) : null; },
            loadSidebarState() { const saved = localStorage.getItem('sidebar_open'); if (saved === 'true') { this.sidebarOpen = true; roleSidebar.classList.add('open'); } else { this.sidebarOpen = false; roleSidebar.classList.remove('open'); } },
            toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; if (this.sidebarOpen) roleSidebar.classList.add('open'); else roleSidebar.classList.remove('open'); localStorage.setItem('sidebar_open', this.sidebarOpen); }
        };

        const DOM = {
            messagesArea: document.getElementById('messagesArea'), messageInput: document.getElementById('messageInput'), sendBtn: document.getElementById('sendBtn'),
            roleListDiv: document.getElementById('roleList'), addRoleBtn: document.getElementById('addRoleBtn'),
            roleModal: document.getElementById('roleModal'), modalTitle: document.getElementById('modalTitle'), roleNameInput: document.getElementById('roleName'),
            rolePromptInput: document.getElementById('rolePrompt'), saveRoleBtn: document.getElementById('saveRoleBtn'), cancelModalBtn: document.getElementById('cancelModalBtn'),
            modelSelect: document.getElementById('modelSelect'), themeToggle: document.getElementById('themeToggle'), renameConvModal: document.getElementById('renameConvModal'),
            newConvNameInput: document.getElementById('newConvName'), confirmRenameBtn: document.getElementById('confirmRenameBtn'), cancelRenameBtn: document.getElementById('cancelRenameBtn'),
            roleSidebar: document.getElementById('roleSidebar'), sidebarToggleBtn: document.getElementById('sidebarToggleBtn'), editUserMsgModal: document.getElementById('editUserMsgModal'),
            editUserMsgContent: document.getElementById('editUserMsgContent'), confirmEditMsgBtn: document.getElementById('confirmEditMsgBtn'), cancelEditMsgBtn: document.getElementById('cancelEditMsgBtn'),
            exportBtn: document.getElementById('exportBtn'), importBtn: document.getElementById('importBtn'), importFile: document.getElementById('importFile'),
            bgSettingBtn: document.getElementById('bgSettingBtn'), bgModal: document.getElementById('bgModal'), bgGrid: document.getElementById('bgGrid'),
            uploadNewBgBtn: document.getElementById('uploadNewBgBtn'), cancelBgModalBtn: document.getElementById('cancelBgModalBtn'), 
            bgInput: document.getElementById('bgInput'), customBgLayer: document.getElementById('customBgLayer')
        };

        let editingUserMessageIndex = null;
        let currentActiveBgId = localStorage.getItem('deepseek_current_bg_id') || 'default';

        const UIManager = {
            resetPagination() { Pagination.currentPage = 1; },
            adjustPaginationAfterDelete(totalMessages) { const totalPages = Math.ceil(totalMessages / Config.PAGE_SIZE); if (Pagination.currentPage > totalPages && totalPages > 0) Pagination.currentPage = totalPages; else if (totalPages === 0) Pagination.currentPage = 1; },
            jumpToLastPage(totalMessages) { const totalPages = Math.ceil(totalMessages / Config.PAGE_SIZE); Pagination.currentPage = totalPages > 0 ? totalPages : 1; },
            
            // 【核心防 400 机制】：智能提取有效上下文，动态截断长对话
            getSafeApiMessages(conv, role, userIndex = null) {
                const rawHistory = userIndex !== null ? conv.messages.slice(0, userIndex + 1) : conv.messages;
                
                let apiMsgs = [];
                // 1. 从所有记录中提取用户发言、助手发言、以及已完成的总结点（让 AI 记忆总结）
                for (let m of rawHistory) {
                    if (m.role === 'system_summary' && m.status === 'done') {
                        apiMsgs.push({ role: 'assistant', content: `[📌 历史剧情总结点]:\n${m.content}` });
                    } else if (m.role === 'user' || m.role === 'assistant') {
                        // 使用当前页面展示的版本内容，而非总是最新生成的内容
                        let displayContent = m.content;
                        if (m.role === 'assistant' && m.currentVersion > 0 && m.regenerations?.length) {
                            displayContent = m.regenerations[m.currentVersion - 1]?.content || m.content;
                        }
                        apiMsgs.push({ role: m.role, content: displayContent });
                    }
                }
                
                // 2. 从后往前截断，控制单次发往大模型的字数，防止 400 报错（安全余量设为 45000 字符）
                const MAX_CHARS_FOR_CHAT = 45000;
                let charCount = 0;
                let truncated = [];
                
                for (let i = apiMsgs.length - 1; i >= 0; i--) {
                    charCount += apiMsgs[i].content.length;
                    if (charCount > MAX_CHARS_FOR_CHAT && truncated.length > 3) {
                        break; 
                    }
                    truncated.unshift(apiMsgs[i]);
                }
                
                // 3. 确保截断后末尾是 user 消息，否则 API 会 400
                while (truncated.length > 0 && truncated[truncated.length - 1].role !== 'user') {
                    truncated.pop();
                }
                // 4. 始终把系统角色设定顶在最前面
                return [{ role: "system", content: role.systemPrompt }, ...truncated];
            },

            // 检测总字数限制，以弹出“预警卡片”
            checkConversationLimit() {
                const conv = DataManager.getCurrentConversation();
                if (!conv) return;
                
                // 寻找上一个总结点，只计算在那之后的字数
                const lastSummaryIdx = conv.messages.findLastIndex(m => m.role === 'system_summary');
                const msgsToCount = lastSummaryIdx !== -1 ? conv.messages.slice(lastSummaryIdx + 1) : conv.messages;
                
                const totalChars = msgsToCount.reduce((acc, msg) => {
                    if (msg.role !== 'user' && msg.role !== 'assistant') return acc;
                    return acc + (msg.content?.length || 0) + (msg.reasoning?.length || 0);
                }, 0);

                // 判断是否已经有正在显示的预警（未完成的总结）
                const hasPendingSummary = conv.messages.some(m => m.role === 'system_summary' && m.status !== 'done');

                if (totalChars > Config.TOKEN_WARNING_LIMIT && !hasPendingSummary) {
                    conv.messages.push({
                        role: 'system_summary',
                        status: 'warning',
                        content: '',
                        timestamp: new Date().toISOString()
                    });
                }
            },
            
            // 智能生成特定范围的剧情总结
            async generateStorySummary(summaryIndex, startOffset, endOffset) {
                const conv = DataManager.getCurrentConversation();
                const role = DataManager.getCurrentRole();
                if (!conv || !role) return;

                const summaryMsg = conv.messages[summaryIndex];
                if (!summaryMsg) return;

                summaryMsg.status = 'generating';
                summaryMsg.startOffset = startOffset;
                summaryMsg.endOffset = endOffset;
                DataManager.saveData();
                this.loadConversationToUI();

                // 筛选出该 summary 卡片之前的有效对话
                const historyMessages = conv.messages.slice(0, summaryIndex)
                    .filter(m => m.role === 'user' || m.role === 'assistant');
                const selectedMessages = historyMessages.slice(startOffset, endOffset + 1);

                // 把对话拼成纯文本，AI 以旁观者身份阅读而非参与者
                const roleLabel = role.name || 'AI角色';
                const MAX_CHARS = 38000;
                const totalChars = selectedMessages.reduce((a, m) => a + (m.content?.length || 0), 0);
                let dialogueText = '';

                if (totalChars > MAX_CHARS) {
                    // 超长：保留前3条建立背景 + 尽量多的末尾内容
                    const headMsgs = selectedMessages.slice(0, 3);
                    let tailMsgs = [];
                    let tailChars = 0;
                    for (let i = selectedMessages.length - 1; i >= 3; i--) {
                        const len = selectedMessages[i].content?.length || 0;
                        if (tailChars + len > MAX_CHARS - 2000) break;
                        tailMsgs.unshift(selectedMessages[i]);
                        tailChars += len;
                    }
                    const skipped = selectedMessages.length - headMsgs.length - tailMsgs.length;
                    const headText = headMsgs.map((m, i) =>
                        `【第${startOffset + i + 1}条】${m.role === 'user' ? '用户' : roleLabel}：${m.content}`
                    ).join('\n\n');
                    const tailStartIdx = startOffset + headMsgs.length + skipped;
                    const tailText = tailMsgs.map((m, i) =>
                        `【第${tailStartIdx + i + 1}条】${m.role === 'user' ? '用户' : roleLabel}：${m.content}`
                    ).join('\n\n');
                    dialogueText = headText + `\n\n……（中间约${skipped}条消息因篇幅省略）……\n\n` + tailText;
                } else {
                    dialogueText = selectedMessages.map((m, i) =>
                        `【第${startOffset + i + 1}条】${m.role === 'user' ? '用户' : roleLabel}：${m.content}`
                    ).join('\n\n');
                }

                const systemPrompt = `你是一位专业的剧情档案整理员。你的工作是阅读用户提供的角色扮演对话记录文本，输出一份结构化的剧情复盘报告。你只能输出报告，绝对不得进行任何角色扮演、续写剧情或回应对话内容。`;

                const userPrompt = `以下是一段角色扮演对话的完整记录，共 ${selectedMessages.length} 条消息。\n角色名称：${roleLabel}\n角色设定参考：${role.systemPrompt}\n\n${'='.repeat(20)}\n${dialogueText}\n${'='.repeat(20)}\n\n请根据以上对话记录，整理输出一份约 2000 字的剧情复盘报告，包含以下四个板块：\n\n1.【核心世界观与主线】故事背景与主线发展全貌\n2.【人物设定与状态】所有出场人物的性格、外貌、身份、相互关系及当前状态\n3.【伏笔与未解之谜】所有暗线、未解冲突、待揭露的真相\n4.【当前焦点事件】故事最后中断时的具体场景、角色动作和对话态势\n\n直接输出报告正文，不要任何开场白。`;

                const apiMessages = [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ];

                if (currentAbortController) currentAbortController.abort();
                currentAbortController = new AbortController();

                try {
                    const reply = await callChatApi({ model: 'deepseek-chat', messages: apiMessages, signal: currentAbortController.signal });

                    summaryMsg.content = reply.content;
                    summaryMsg.status = 'done';
                    DataManager.saveData();
                    this.loadConversationToUI();
                                } catch (err) {
                    if (err.name !== 'AbortError') {
                        alert(`总结生成失败: ${err.message}`);
                        summaryMsg.status = 'warning';
                        DataManager.saveData();
                        this.loadConversationToUI();
                    }
                } finally {
                    currentAbortController = null;
                }
            },

            renderSidebar() {
                DOM.roleListDiv.innerHTML = '';
                for (let role of DataManager.roles) {
                    const roleCard = document.createElement('div');
                    roleCard.className = `role-card ${DataManager.currentRoleId === role.id ? 'active' : ''}`;
                    roleCard.innerHTML = `<div class="role-name">${escapeHtml(role.name)}<div class="role-actions"><button class="icon-btn edit-role-btn" data-id="${role.id}">${SVGIcons.edit}</button><button class="icon-btn delete-role-btn" data-id="${role.id}">${SVGIcons.delete}</button></div></div><div class="role-preview">${escapeHtml(role.systemPrompt.substring(0, 45))}...</div>`;
                    roleCard.addEventListener('click', (e) => { if (!e.target.closest('button')) { this.switchRole(role.id); DataManager.toggleSidebar(); } });
                    roleCard.querySelector('.edit-role-btn').addEventListener('click', (e) => { e.stopPropagation(); this.openEditRoleModal(role.id); });
                    roleCard.querySelector('.delete-role-btn').addEventListener('click', (e) => { e.stopPropagation(); this.deleteRole(role.id); });
                    const convSection = document.createElement('div'); convSection.className = 'conversation-section';
                    convSection.innerHTML = `<div class="section-title">会话历史<button class="add-conv-btn" data-role="${role.id}">+ 新建</button></div><div class="conv-list" id="conv-list-${role.id}"></div>`;
                    roleCard.appendChild(convSection); DOM.roleListDiv.appendChild(roleCard);
                    const convContainer = convSection.querySelector(`.conv-list`);
                    for (let conv of role.conversations) {
                        const convItem = document.createElement('div');
                        convItem.className = `conv-item ${DataManager.currentRoleId === role.id && DataManager.currentConversationId === conv.id ? 'active' : ''}`;
                        convItem.innerHTML = `<span class="conv-name">${escapeHtml(conv.name)}</span><div class="conv-actions"><button class="icon-btn rename-conv" data-role="${role.id}" data-conv="${conv.id}">${SVGIcons.edit}</button><button class="icon-btn delete-conv" data-role="${role.id}" data-conv="${conv.id}">${SVGIcons.delete}</button></div>`;
                        convItem.addEventListener('click', (e) => { if (!e.target.closest('button')) { this.switchConversation(role.id, conv.id); DataManager.toggleSidebar(); } });
                        convItem.querySelector('.rename-conv').addEventListener('click', (e) => { e.stopPropagation(); this.openRenameModal(role.id, conv.id); });
                        convItem.querySelector('.delete-conv').addEventListener('click', (e) => { e.stopPropagation(); this.deleteConversation(role.id, conv.id); });
                        convContainer.appendChild(convItem);
                    }
                    convSection.querySelector('.add-conv-btn').addEventListener('click', (e) => { e.stopPropagation(); this.addConversation(role.id); });
                }
                const curRole = DataManager.getCurrentRole(); 
                const headerRoleName = document.getElementById('headerRoleName');
                if (headerRoleName) {
                    headerRoleName.textContent = curRole ? curRole.name : 'DeepSeek';
                }    
            },
            switchRole(roleId) { if (DataManager.currentRoleId === roleId) return; DataManager.currentRoleId = roleId; DataManager.currentConversationId = DataManager.getCurrentRole()?.conversations[0]?.id || null; DataManager.saveData(); this.resetPagination(); this.renderSidebar(); this.loadConversationToUI(); const curRole = DataManager.getCurrentRole(); document.getElementById('headerRoleName').textContent = curRole ? curRole.name : 'DeepSeek'; },
            switchConversation(roleId, convId) { if (DataManager.currentRoleId !== roleId) DataManager.currentRoleId = roleId; DataManager.currentConversationId = convId; DataManager.saveData(); this.resetPagination(); this.renderSidebar(); this.loadConversationToUI(); },
            addConversation(roleId) { const role = DataManager.roles.find(r => r.id === roleId); if (role) { const newConv = { id: DataManager.generateId(), name: '新对话', messages: [{ role: 'assistant', content: `你好！我是${role.name}，开始对话吧～`, reasoning: null, regenerations: [], currentVersion: 0, reasoningCollapsed: false, timestamp: new Date().toISOString() }] }; role.conversations.push(newConv); DataManager.currentRoleId = roleId; DataManager.currentConversationId = newConv.id; DataManager.saveData(); this.resetPagination(); this.renderSidebar(); this.loadConversationToUI(); } },
            openEditRoleModal(roleId) {
                if (roleId === null) { DOM.modalTitle.textContent = '新建角色'; DOM.roleNameInput.value = ''; DOM.rolePromptInput.value = ''; delete DOM.roleModal.dataset.roleId; DOM.roleModal.style.display = 'flex'; return; }
                const role = DataManager.roles.find(r => r.id === roleId);
                if (role) { DOM.modalTitle.textContent = '编辑角色'; DOM.roleNameInput.value = role.name; DOM.rolePromptInput.value = role.systemPrompt; DOM.roleModal.dataset.roleId = roleId; DOM.roleModal.style.display = 'flex'; }
            },
            openRenameModal(roleId, convId) { const role = DataManager.roles.find(r => r.id === roleId); const conv = role?.conversations.find(c => c.id === convId); if (conv) { DOM.newConvNameInput.value = conv.name; DOM.renameConvModal.dataset.roleId = roleId; DOM.renameConvModal.dataset.convId = convId; DOM.renameConvModal.style.display = 'flex'; } },
            renameConversation() { const roleId = DOM.renameConvModal.dataset.roleId; const convId = DOM.renameConvModal.dataset.convId; const newName = DOM.newConvNameInput.value.trim(); if (!newName) return; const role = DataManager.roles.find(r => r.id === roleId); if (role) { const conv = role.conversations.find(c => c.id === convId); if (conv) { conv.name = newName; DataManager.saveData(); this.renderSidebar(); } } DOM.renameConvModal.style.display = 'none'; },
            deleteRole(roleId) { if (confirm('确定要删除这个角色吗？')) { const index = DataManager.roles.findIndex(r => r.id === roleId); if (index !== -1) { DataManager.roles.splice(index, 1); if (DataManager.currentRoleId === roleId) { DataManager.currentRoleId = DataManager.roles.length ? DataManager.roles[0].id : null; DataManager.currentConversationId = DataManager.currentRoleId ? DataManager.roles[0].conversations[0]?.id : null; } DataManager.saveData(); this.resetPagination(); this.renderSidebar(); this.loadConversationToUI(); } } },
            deleteConversation(roleId, convId) { if (confirm('确定要删除这个对话吗？')) { const role = DataManager.roles.find(r => r.id === roleId); if (role) { const index = role.conversations.findIndex(c => c.id === convId); if (index !== -1) { role.conversations.splice(index, 1); if (DataManager.currentRoleId === roleId && DataManager.currentConversationId === convId) { DataManager.currentConversationId = role.conversations.length ? role.conversations[0].id : null; } DataManager.saveData(); this.resetPagination(); this.renderSidebar(); this.loadConversationToUI(); } } } },
            saveRole() { const name = DOM.roleNameInput.value.trim(); const prompt = DOM.rolePromptInput.value.trim(); if (!name || !prompt) { return; } const roleId = DOM.roleModal.dataset.roleId; if (roleId) { const role = DataManager.roles.find(r => r.id === roleId); if (role) { role.name = name; role.systemPrompt = prompt; } } else { const newId = DataManager.generateId(); DataManager.roles.push({ id: newId, name, systemPrompt: prompt, conversations: [] }); DataManager.ensureDefaultRoles(); } DataManager.saveData(); if (!DataManager.currentRoleId && DataManager.roles.length) DataManager.currentRoleId = DataManager.roles[0].id; this.renderSidebar(); if (DataManager.currentRoleId) this.loadConversationToUI(); this.closeModal(); },
            closeModal() { DOM.roleModal.style.display = 'none'; delete DOM.roleModal.dataset.roleId; },
            loadTheme() { const saved = localStorage.getItem('deepseek_theme'); const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; let isDark = saved ? saved === 'dark' : prefersDark; document.body.classList.toggle('dark', isDark); DOM.themeToggle.innerHTML = isDark ? SVGIcons.sun : SVGIcons.moon; },
            toggleTheme() { const isDark = document.body.classList.contains('dark'); const newIsDark = !isDark; document.body.classList.toggle('dark', newIsDark); localStorage.setItem('deepseek_theme', newIsDark ? 'dark' : 'light'); DOM.themeToggle.innerHTML = newIsDark ? SVGIcons.sun : SVGIcons.moon; UIManager.updateDefaultBgItemStyle(); },
            onModelChange() { DataManager.currentModel = DOM.modelSelect.value; DataManager.saveData(); },
            adjustTextareaHeight() { DOM.messageInput.style.height = 'auto'; DOM.messageInput.style.height = Math.min(DOM.messageInput.scrollHeight, 120) + 'px'; },
            toggleReasoning(assistantIndex) { const conv = DataManager.getCurrentConversation(); if (!conv) return; const msg = conv.messages[assistantIndex]; if (!msg || msg.role !== 'assistant') return; msg.reasoningCollapsed = !msg.reasoningCollapsed; DataManager.saveData(); this.loadConversationToUI(); },
            changeAssistantVersion(assistantIndex, delta) { const conv = DataManager.getCurrentConversation(); if (!conv) return; const assistantMsg = conv.messages[assistantIndex]; if (!assistantMsg || assistantMsg.role !== 'assistant') return; const totalVers = assistantMsg.regenerations.length + 1; let newVer = assistantMsg.currentVersion + delta; if (newVer < 0) newVer = 0; if (newVer >= totalVers) newVer = totalVers - 1; if (newVer === assistantMsg.currentVersion) return; assistantMsg.currentVersion = newVer; DataManager.saveData(); this.loadConversationToUI(); },
            
            async regenerateAssistantResponse(assistantIndex) {
                const conv = DataManager.getCurrentConversation(); const role = DataManager.getCurrentRole(); if (!conv || !role) return;
                const assistantMsg = conv.messages[assistantIndex]; if (!assistantMsg || assistantMsg.role !== 'assistant') return;
                if (assistantMsg.regenerations.length + 1 >= Config.MAX_REGENERATIONS + 1) { alert(`已达到最大重新生成次数（${Config.MAX_REGENERATIONS}次）`); return; }
                let userIndex = assistantIndex - 1; if (userIndex < 0 || conv.messages[userIndex].role !== 'user') return;
                
                // 【应用防 400 机制】
                const apiMessages = this.getSafeApiMessages(conv, role, userIndex);
                
                if (currentAbortController) currentAbortController.abort(); currentAbortController = new AbortController();
                const loadingDiv = document.createElement('div'); loadingDiv.className = 'loading'; loadingDiv.innerHTML = `${SVGIcons.spinner} 生成中...`; DOM.messagesArea.appendChild(loadingDiv); DOM.messagesArea.scrollTop = DOM.messagesArea.scrollHeight;
                try {
                    const reply = await callChatApi({ model: DataManager.currentModel, messages: apiMessages, signal: currentAbortController.signal });
                    // 新版本追加到 regenerations 末尾，保持 1=原始 2=第一次重生成... 的正序
                    const newContent = reply.content;
                    const newReasoning = DataManager.currentModel === 'deepseek-reasoner' ? reply.reasoning : null;
                    assistantMsg.regenerations.push({ content: newContent, reasoning: newReasoning, timestamp: Date.now() });
                    assistantMsg.currentVersion = assistantMsg.regenerations.length; // 自动跳到最新版本
                    
                    this.checkConversationLimit();
                    DataManager.saveData(); this.loadConversationToUI();
                } catch (err) { if (err.name !== 'AbortError') alert(`重新生成失败: ${err.message}`); } finally { loadingDiv.remove(); currentAbortController = null; }
            },
            deleteUserMessageAndAssistant(userIndex) { if (!confirm('确定删除此消息及后续回复吗？')) return; const conv = DataManager.getCurrentConversation(); if (!conv) return; if (userIndex + 1 < conv.messages.length && conv.messages[userIndex+1].role === 'assistant') conv.messages.splice(userIndex, 2); else conv.messages.splice(userIndex, 1); DataManager.saveData(); this.adjustPaginationAfterDelete(conv.messages.length); this.loadConversationToUI(); },
            
            loadConversationToUI() {
                const conv = DataManager.getCurrentConversation(); const curRole = DataManager.getCurrentRole(); const headerRoleName = document.getElementById('headerRoleName'); if (headerRoleName) {
                    headerRoleName.textContent = curRole ? curRole.name : 'DeepSeek';
                }    
                if (!conv) { DOM.messagesArea.innerHTML = '<div class="assistant-message" style="align-self: center; opacity: 0.6; margin-top: 50px;">👈 从左侧选择一个角色和会话开始</div>'; return; }
                const allMessages = conv.messages; const totalMessages = allMessages.length; const totalPages = Math.ceil(totalMessages / Config.PAGE_SIZE);
                if (Pagination.currentPage < 1) Pagination.currentPage = 1; if (totalPages > 0 && Pagination.currentPage > totalPages) Pagination.currentPage = totalPages;
                const startIdx = (Pagination.currentPage - 1) * Config.PAGE_SIZE; const endIdx = Math.min(startIdx + Config.PAGE_SIZE, totalMessages);
                const pageMessages = allMessages.slice(startIdx, endIdx);
                DOM.messagesArea.innerHTML = '';
                
                for (let i = 0; i < pageMessages.length; i++) {
                    const msg = pageMessages[i]; const globalIdx = startIdx + i;
                    const wrapper = document.createElement('div'); wrapper.className = 'message-wrapper';
                    const dateStr = new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    
                    if (msg.role === 'user') {
                        wrapper.innerHTML = `<div class="user-message">${escapeHtml(msg.content)}</div><div class="message-footer user-footer"><span class="message-timestamp">${dateStr}</span><div class="message-actions user-actions"><button class="icon-btn edit-user-msg" data-index="${globalIdx}" title="编辑">${SVGIcons.edit}</button><button class="icon-btn delete-user-msg" data-index="${globalIdx}" title="删除">${SVGIcons.delete}</button></div></div>`;
                        wrapper.querySelector('.edit-user-msg').addEventListener('click', () => { editingUserMessageIndex = globalIdx; DOM.editUserMsgContent.value = msg.content; DOM.editUserMsgModal.style.display = 'flex'; });
                        wrapper.querySelector('.delete-user-msg').addEventListener('click', () => this.deleteUserMessageAndAssistant(globalIdx));
                    } else if (msg.role === 'assistant') {
                        const regenCount = msg.regenerations ? msg.regenerations.length : 0;
                        let content = msg.content, reasoning = msg.reasoning;
                        if (msg.currentVersion > 0 && msg.regenerations) { const regen = msg.regenerations[msg.currentVersion - 1]; if (regen) { content = regen.content; reasoning = regen.reasoning; } }
                        
                        let reasoningHtml = '';
                        if (reasoning) {
                            const toggleIcon = msg.reasoningCollapsed ? SVGIcons.chevronRight : SVGIcons.chevronDown;
                            reasoningHtml = `<div class="reasoning-wrapper"><button class="reasoning-toggle" data-index="${globalIdx}">${toggleIcon} <span>思考过程</span></button><div class="reasoning-content ${msg.reasoningCollapsed ? 'collapsed' : ''}">${escapeHtml(reasoning)}</div></div>`;
                        }

                        wrapper.innerHTML = `<div class="assistant-message">${reasoningHtml}<div class="main-content markdown-body">${renderMarkdown(content)}</div></div><div class="message-footer assistant-footer"><span class="message-timestamp">${dateStr}</span><div class="message-actions assistant-actions"><div class="version-control"><button class="icon-btn version-btn" data-index="${globalIdx}" data-delta="-1">${SVGIcons.chevronLeft}</button><span>${msg.currentVersion + 1}/${regenCount + 1}</span><button class="icon-btn version-btn" data-index="${globalIdx}" data-delta="1">${SVGIcons.chevronRight}</button></div><button class="icon-btn regenerate" data-index="${globalIdx}" title="重新生成">${SVGIcons.regenerate}</button></div></div>`;
                        if (reasoning) wrapper.querySelector('.reasoning-toggle').addEventListener('click', () => this.toggleReasoning(globalIdx));
                        wrapper.querySelectorAll('.version-btn').forEach(btn => btn.addEventListener('click', () => this.changeAssistantVersion(globalIdx, parseInt(btn.dataset.delta))));
                        wrapper.querySelector('.regenerate').addEventListener('click', () => this.regenerateAssistantResponse(globalIdx));
                    } else if (msg.role === 'system_summary') {
                        // 【渲染】智能总结驻留卡片
                        const validMsgs = allMessages.slice(0, globalIdx).filter(m => m.role === 'user' || m.role === 'assistant');
                        const totalValid = validMsgs.length;
                        const maxIdx = Math.max(0, totalValid - 1);
                        
                        // 自动定位起点的逻辑：寻找上一个已完成的 Checkpoint
                        const prevSummaryNodeIdx = allMessages.slice(0, globalIdx).findLastIndex(m => m.role === 'system_summary' && m.status === 'done');
                        let suggestedStart = 0;
                        if (prevSummaryNodeIdx !== -1) {
                            const prevEnd = allMessages[prevSummaryNodeIdx].endOffset;
                            if (prevEnd !== undefined && prevEnd < maxIdx) { suggestedStart = prevEnd + 1; }
                        }
                        
                        // 起点固定为当前卡片记录的值或自动建议的起点
                        const startVal = msg.startOffset !== undefined ? msg.startOffset : suggestedStart;
                        // 终点初始值：如果是完成态则取记录值，否则默认取最新对话
                        const endVal = msg.endOffset !== undefined ? msg.endOffset : maxIdx;

                        wrapper.innerHTML = `
                            <div class="system-summary-message ${msg.status === 'done' ? 'checkpoint-done' : ''}">
                                <div class="summary-header">
                                    <div class="summary-title-wrap">
                                        ${msg.status === 'done' ? '📌 剧情总结点 (Checkpoint)' : SVGIcons.warning + ' <span>记忆过载预警 (已超 8 万字符)</span>'}
                                    </div>
                                </div>
                                ${msg.status === 'warning' ? `
                                    <p style="opacity:0.9; margin-bottom: 10px;">当前对话长度已逼近上下文极限。建议您生成总结节点，以便 AI 后续保持清晰的记忆。</p>
                                    
                                    <div class="range-selector">
                                        <div class="range-info" id="range-text-${globalIdx}">总结范围：从第 ${startVal + 1} 条 到 第 ${endVal + 1} 条</div>
                                        <input type="range" id="summary-slider-${globalIdx}" min="${startVal}" max="${maxIdx}" value="${endVal}">
                                        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-secondary); margin-top:6px;">
                                            <span>起点 (第${startVal + 1}条)</span>
                                            <span>最新进度 (第${maxIdx + 1}条)</span>
                                        </div>
                                    </div>

                                    <button class="summary-btn" id="generateSummaryBtn-${globalIdx}">
                                        ${SVGIcons.sparkles} 生成本次剧情总结
                                    </button>
                                ` : msg.status === 'generating' ? `
                                    <p style="display:flex;align-items:center;gap:8px;opacity:0.9;">${SVGIcons.spinner} 正在提取核心剧情生成总结点，请稍候...</p>
                                ` : `
                                    <p style="opacity:0.9;">已生成从第 ${msg.startOffset + 1} 条至第 ${msg.endOffset + 1} 条的剧情浓缩记录。该范围终点已设为锚点，AI 在后续聊天中会自动纳入此总结。</p>
                                    <div class="summary-text">${escapeHtml(msg.content)}</div>
                                    <div style="display: flex; gap: 8px;">
                                        <button class="copy-summary-btn" id="copySummaryBtn-${globalIdx}" style="flex: 2;">
                                            ${SVGIcons.copy} 一键复制内容
                                        </button>
                                        ${(msg.endOffset !== undefined && msg.endOffset < maxIdx) ? `
                                            <button class="continue-summary-btn" id="continueSummaryBtn-${globalIdx}" style="flex: 1.5; background: var(--badge-bg); color: var(--text-primary); border: none; border-radius: 12px; padding: 12px; cursor: pointer; font-size: 0.85rem; font-weight: 500;">
                                                从总结点继续总结
                                            </button>
                                        ` : ''}
                                    </div>
                                `}
                            </div>
                        `;
                        
                        setTimeout(() => {
                            if (msg.status === 'warning') {
                                const slider = document.getElementById(`summary-slider-${globalIdx}`);
                                const rangeText = document.getElementById(`range-text-${globalIdx}`);
                                const btn = document.getElementById(`generateSummaryBtn-${globalIdx}`);
                                
                                if (slider && rangeText) {
                                    slider.addEventListener('input', (e) => {
                                        const eIdx = parseInt(e.target.value);
                                        rangeText.innerText = `总结范围：从第 ${startVal + 1} 条 到 第 ${eIdx + 1} 条`;
                                    });
                                }
                                
                                if (btn) {
                                    btn.addEventListener('click', () => {
                                        const finalEndOffset = slider ? parseInt(slider.value) : endVal;
                                        this.generateStorySummary(globalIdx, startVal, finalEndOffset);
                                    });
                                }
                            }
                            if (msg.status === 'done') {
                                const copyBtn = document.getElementById(`copySummaryBtn-${globalIdx}`);
                                if (copyBtn) {
                                    copyBtn.addEventListener('click', () => {
                                        const prefix = `[系统指令]\n你现在需要扮演该角色。在开始对话之前，请先仔细阅读并内化以下【前情提要】。这份前情提要是你和用户之间已经发生过的所有事情的记录，它不是需要你分析或回应的内容，而是你的记忆。请将这份记忆完全融入你对角色的理解中，并基于此继续与用户进行互动。\n\n【前情提要】\n`;
                                        const rawText = prefix + msg.content;
                                        const copyFallback = () => {
                                            const textarea = document.createElement('textarea');
                                            textarea.value = rawText; textarea.style.position = 'fixed'; textarea.style.opacity = '0';
                                            document.body.appendChild(textarea); textarea.select();
                                            try { document.execCommand('copy'); copyBtn.innerHTML = `${SVGIcons.check} 复制成功！`; setTimeout(() => copyBtn.innerHTML = `${SVGIcons.copy} 一键复制内容`, 2000); } catch(e) {}
                                            document.body.removeChild(textarea);
                                        };
                                        if (navigator.clipboard && navigator.clipboard.writeText) {
                                            navigator.clipboard.writeText(rawText).then(() => {
                                                copyBtn.innerHTML = `${SVGIcons.check} 复制成功！`; setTimeout(() => copyBtn.innerHTML = `${SVGIcons.copy} 一键复制内容`, 2000);
                                            }).catch(copyFallback);
                                        } else { copyFallback(); }
                                    });
                                }

                                const continueBtn = document.getElementById(`continueSummaryBtn-${globalIdx}`);
                                if (continueBtn) {
                                    continueBtn.addEventListener('click', () => {
                                        const conv = DataManager.getCurrentConversation();
                                        if (!conv) return;
                                        
                                        // 检查是否在最新的对话后面已经有了待处理的 warning 或 generating 总结卡片
                                        const hasPendingSummary = conv.messages.some(m => m.role === 'system_summary' && m.status !== 'done');
                                        
                                        if (!hasPendingSummary) {
                                            // 在对话最末尾推入一个新的预警卡片
                                            conv.messages.push({
                                                role: 'system_summary',
                                                status: 'warning',
                                                content: '',
                                                timestamp: new Date().toISOString()
                                            });
                                            DataManager.saveData();
                                            this.loadConversationToUI();
                                        } else {
                                            // 如果已经有了，直接滚动到底部
                                            DOM.messagesArea.scrollTop = DOM.messagesArea.scrollHeight;
                                        }
                                    });
                                }
                            }
                        }, 0);
                    }
                    DOM.messagesArea.appendChild(wrapper);
                }
                if (totalPages > 1) {
                    const paginationDiv = document.createElement('div'); paginationDiv.className = 'pagination-controls';
                    paginationDiv.innerHTML = `<button class="pagination-btn" id="prevPageBtn" ${Pagination.currentPage === 1 ? 'disabled' : ''}>上一页</button><span class="page-info">${Pagination.currentPage} / ${totalPages}</span><button class="pagination-btn" id="nextPageBtn" ${Pagination.currentPage === totalPages ? 'disabled' : ''}>下一页</button>`;
                    DOM.messagesArea.appendChild(paginationDiv);
                    document.getElementById('prevPageBtn')?.addEventListener('click', () => { if (Pagination.currentPage > 1) { Pagination.currentPage--; this.loadConversationToUI(); } });
                    document.getElementById('nextPageBtn')?.addEventListener('click', () => { if (Pagination.currentPage < totalPages) { Pagination.currentPage++; this.loadConversationToUI(); } });
                }
                DOM.messagesArea.scrollTop = DOM.messagesArea.scrollHeight;
            },
            
            async generateReplyForUserIndex(conv, userIndex, systemPrompt) {
                // 【应用防 400 机制】
                const apiMessages = this.getSafeApiMessages(conv, { systemPrompt: systemPrompt }, userIndex);
                
                if (currentAbortController) currentAbortController.abort(); currentAbortController = new AbortController();
                const loadingDiv = document.createElement('div'); loadingDiv.className = 'loading'; loadingDiv.innerHTML = `${SVGIcons.spinner} 生成中...`; DOM.messagesArea.appendChild(loadingDiv); DOM.messagesArea.scrollTop = DOM.messagesArea.scrollHeight;
                try {
                    const reply = await callChatApi({ model: DataManager.currentModel, messages: apiMessages, signal: currentAbortController.signal });
                    conv.messages.push({ role: 'assistant', content: reply.content, reasoning: DataManager.currentModel === 'deepseek-reasoner' ? reply.reasoning : null, regenerations: [], currentVersion: 0, reasoningCollapsed: false, timestamp: new Date().toISOString() });
                    
                    this.checkConversationLimit();
                    DataManager.saveData(); this.jumpToLastPage(conv.messages.length); this.loadConversationToUI();
                } catch (err) { if (err.name !== 'AbortError') alert(`生成失败: ${err.message}`); } finally { loadingDiv.remove(); currentAbortController = null; }
            },
            updateDefaultBgItemStyle() {
                const defItem = document.getElementById('bgItem-default');
                if (defItem) {
                    if (document.body.classList.contains('dark')) defItem.classList.add('dark-preview');
                    else defItem.classList.remove('dark-preview');
                }
            }
        };

        function initThemeFollowSystem() {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => { 
                if (!localStorage.getItem('deepseek_theme')) { 
                    document.body.classList.toggle('dark', e.matches); 
                    DOM.themeToggle.innerHTML = e.matches ? SVGIcons.sun : SVGIcons.moon; 
                    UIManager.updateDefaultBgItemStyle();
                } 
            });
        }

        DOM.sendBtn.addEventListener('click', async () => {
            const text = DOM.messageInput.value.trim(); if (!text) return;
            if (!DataManager.currentRoleId) { alert('请先选择一个角色'); return; }
            DOM.messageInput.value = ''; UIManager.adjustTextareaHeight();
            DOM.sendBtn.disabled = true; DOM.messageInput.disabled = true;
            const conv = DataManager.getCurrentConversation(); if (!conv) return;
            
            conv.messages.push({ role: 'user', content: text, timestamp: new Date().toISOString() }); 
            UIManager.loadConversationToUI();
            
            const role = DataManager.getCurrentRole();
            // 【应用防 400 机制】确保大模型读取最新的总结点，且总文本不超过上限
            const apiMessages = UIManager.getSafeApiMessages(conv, role);
            
            if (currentAbortController) currentAbortController.abort(); currentAbortController = new AbortController();
            const loadingDiv = document.createElement('div'); loadingDiv.className = 'loading'; loadingDiv.innerHTML = `${SVGIcons.spinner} 生成中...`; DOM.messagesArea.appendChild(loadingDiv); DOM.messagesArea.scrollTop = DOM.messagesArea.scrollHeight;
            try {
                const reply = await callChatApi({ model: DataManager.currentModel, messages: apiMessages, signal: currentAbortController.signal });
                conv.messages.push({ role: 'assistant', content: reply.content, reasoning: DataManager.currentModel === 'deepseek-reasoner' ? reply.reasoning : null, regenerations: [], currentVersion: 0, reasoningCollapsed: false, timestamp: new Date().toISOString() });
                
                UIManager.checkConversationLimit();
                DataManager.saveData(); UIManager.jumpToLastPage(conv.messages.length); UIManager.loadConversationToUI();
            } catch (err) { if (err.name !== 'AbortError') { alert(`生成失败: ${err.message}`); conv.messages.pop(); UIManager.loadConversationToUI(); } } finally { loadingDiv.remove(); currentAbortController = null; DOM.sendBtn.disabled = false; DOM.messageInput.disabled = false; DOM.messageInput.focus(); }
        });

        DOM.messageInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); DOM.sendBtn.click(); } });
        DOM.messageInput.addEventListener('input', UIManager.adjustTextareaHeight);
        DOM.addRoleBtn.addEventListener('click', () => UIManager.openEditRoleModal(null)); DOM.saveRoleBtn.addEventListener('click', UIManager.saveRole.bind(UIManager));
        DOM.cancelModalBtn.addEventListener('click', UIManager.closeModal.bind(UIManager)); DOM.confirmRenameBtn.addEventListener('click', UIManager.renameConversation.bind(UIManager));
        DOM.cancelRenameBtn.addEventListener('click', () => DOM.renameConvModal.style.display = 'none'); DOM.themeToggle.addEventListener('click', UIManager.toggleTheme.bind(UIManager));
        DOM.sidebarToggleBtn.addEventListener('click', DataManager.toggleSidebar.bind(DataManager));
        document.addEventListener('click', (e) => { if (DataManager.sidebarOpen && !DOM.roleSidebar.contains(e.target) && !DOM.sidebarToggleBtn.contains(e.target)) DataManager.toggleSidebar(); });
        DOM.modelSelect.addEventListener('change', UIManager.onModelChange.bind(UIManager));
        DOM.confirmEditMsgBtn.addEventListener('click', async () => {
            const newContent = DOM.editUserMsgContent.value.trim(); if (!newContent) return;
            const conv = DataManager.getCurrentConversation(); if (!conv || editingUserMessageIndex === null) return;
            const userMsg = conv.messages[editingUserMessageIndex]; if (!userMsg || userMsg.role !== 'user') return;
            if (!confirm('重新生成将删除此条消息之后的所有对话，是否继续？')) { DOM.editUserMsgModal.style.display = 'none'; editingUserMessageIndex = null; return; }
            userMsg.content = newContent; userMsg.timestamp = new Date().toISOString(); conv.messages.splice(editingUserMessageIndex + 1);
            DataManager.saveData(); UIManager.jumpToLastPage(conv.messages.length); UIManager.loadConversationToUI();
            DOM.editUserMsgModal.style.display = 'none'; const idx = editingUserMessageIndex; editingUserMessageIndex = null;
            const role = DataManager.getCurrentRole(); if (role) await UIManager.generateReplyForUserIndex(conv, idx, role.systemPrompt);
        });
        DOM.cancelEditMsgBtn.addEventListener('click', () => { DOM.editUserMsgModal.style.display = 'none'; editingUserMessageIndex = null; });
        document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; }));

        // ---- 导入/导出功能实现 ----
        DOM.exportBtn.addEventListener('click', () => {
            if (!DataManager.roles || DataManager.roles.length === 0) { alert('当前没有可导出的数据。'); return; }
            const dataToExport = { roles: DataManager.roles, version: 1, exportedAt: new Date().toISOString() };
            const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = `DeepSeek_RP_Data_${new Date().toISOString().slice(0, 10)}.json`; a.click(); URL.revokeObjectURL(url);
        });

        DOM.importBtn.addEventListener('click', () => DOM.importFile.click());

        DOM.importFile.addEventListener('change', (e) => {
            const file = e.target.files[0]; if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    const importedRoles = normalizeImportedRoles(data);
                    if (importedRoles.length > 0) {
                        if (confirm('是否覆盖当前所有角色与对话数据？\n点击"确定"覆盖，"取消"则追加到现有列表中。')) {
                            DataManager.roles = importedRoles; DataManager.currentRoleId = importedRoles[0]?.id || null; DataManager.currentConversationId = importedRoles[0]?.conversations[0]?.id || null;
                        } else {
                            importedRoles.forEach(role => { role.id = DataManager.generateId(); role.conversations.forEach(c => c.id = DataManager.generateId()); DataManager.roles.push(role); });
                        }
                        DataManager.ensureDefaultRoles(); DataManager.saveData(); UIManager.renderSidebar(); UIManager.loadConversationToUI(); alert('数据导入成功！');
                    } else { alert('文件格式错误：未找到有效的角色数据。'); }
                } catch (err) { alert('读取文件失败，可能不是合法的 JSON 文件。\n错误信息: ' + err.message); }
                e.target.value = ''; 
            };
            reader.readAsText(file);
        });

        // ---- 历史背景管理实现 ----
        function applyCustomBg(dataUrl) {
            if (dataUrl) { DOM.customBgLayer.style.backgroundImage = `url(${dataUrl})`; DOM.customBgLayer.classList.add('active'); } 
            else { DOM.customBgLayer.style.backgroundImage = 'none'; DOM.customBgLayer.classList.remove('active'); }
        }

        function setCurrentBg(id, dataUrl = null) {
            currentActiveBgId = id;
            localStorage.setItem('deepseek_current_bg_id', id);
            applyCustomBg(dataUrl);
            renderBgGrid(); 
        }

        async function renderBgGrid() {
            DOM.bgGrid.innerHTML = '';
            
            const defaultItem = document.createElement('div');
            defaultItem.className = `bg-item bg-item-default ${currentActiveBgId === 'default' ? 'active' : ''}`;
            defaultItem.id = 'bgItem-default';
            if (document.body.classList.contains('dark')) defaultItem.classList.add('dark-preview');
            defaultItem.innerHTML = `默认流体<div class="active-badge">${SVGIcons.check}</div>`;
            defaultItem.addEventListener('click', () => setCurrentBg('default', null));
            DOM.bgGrid.appendChild(defaultItem);

            try {
                const bgs = await DBManager.getAllBgs();
                bgs.forEach(bg => {
                    const item = document.createElement('div');
                    item.className = `bg-item ${currentActiveBgId === bg.id ? 'active' : ''}`;
                    item.style.backgroundImage = `url(${bg.dataUrl})`;
                    item.innerHTML = `
                        <button class="bg-delete-btn" title="删除">${SVGIcons.close}</button>
                        <div class="active-badge">${SVGIcons.check}</div>
                    `;
                    item.addEventListener('click', () => setCurrentBg(bg.id, bg.dataUrl));
                    
                    item.querySelector('.bg-delete-btn').addEventListener('click', async (e) => {
                        e.stopPropagation();
                        if (confirm('确认删除这张历史背景吗？')) {
                            await DBManager.deleteBg(bg.id);
                            if (currentActiveBgId === bg.id) setCurrentBg('default', null);
                            renderBgGrid();
                        }
                    });
                    
                    DOM.bgGrid.appendChild(item);
                });
            } catch (err) {
                console.error("加载历史背景失败", err);
            }
        }

        function processAndSaveImage(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = async function() {
                    const canvas = document.createElement('canvas');
                    let width = img.width; let height = img.height;
                    const MAX_SIZE = 1920; 
                    if (width > height) { if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; } } 
                    else { if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; } }
                    
                    canvas.width = width; canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                    
                    const newId = 'bg_' + Date.now();
                    try {
                        await DBManager.saveBg(newId, dataUrl);
                        setCurrentBg(newId, dataUrl);
                    } catch (err) {
                        alert('图片保存失败，数据库写入错误。');
                        console.error(err);
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        DOM.bgSettingBtn.addEventListener('click', () => { renderBgGrid(); DOM.bgModal.style.display = 'flex'; });
        DOM.cancelBgModalBtn.addEventListener('click', () => { DOM.bgModal.style.display = 'none'; });
        DOM.uploadNewBgBtn.addEventListener('click', () => { DOM.bgInput.click(); });
        DOM.bgInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            processAndSaveImage(file);
            e.target.value = ''; 
            DOM.bgModal.style.display = 'none'; 
        });

        // ---- 程序入口 ----
        async function init() {
            try {
                await DBManager.init();
                if (currentActiveBgId !== 'default') {
                    try {
                        const bgs = await DBManager.getAllBgs();
                        const activeBg = bgs.find(b => b.id === currentActiveBgId);
                        if (activeBg) { applyCustomBg(activeBg.dataUrl); }
                        else { setCurrentBg('default', null); }
                    } catch (err) { console.error("恢复背景失败", err); }
                }
            } catch (err) {
                alert('本地数据库初始化失败，背景历史功能将受限。');
                console.error(err);
            } finally {
                await DataManager.loadData();
                DataManager.loadSidebarState();
                UIManager.loadTheme();
                UIManager.renderSidebar();
                UIManager.loadConversationToUI();
                initThemeFollowSystem();
            }
        }

        init();

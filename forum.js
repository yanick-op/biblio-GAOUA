// --- 1. INITIALISATION DU CHAT ---
function initChat() {
    const sec = document.getElementById('sec-chat');
    if (!sec) return;

    // Structure optimisée avec ton thème
    sec.innerHTML = `
        <div class="chat-container">
            <div class="chat-header">
                <img src="logo.png" alt="Nexus Logo" style="height:35px; margin-bottom:5px;" onerror="this.style.display='none'">
                <h2 style="color: #1a1a1a; margin:0; font-size:1.2em;">Espace Discussion NEXUS</h2>
                <p style="color: #666; font-size:0.8em; margin:5px 0 0;">Échangez avec la communauté de Gaoua</p>
            </div>
            
            <div id="chat-box" class="chat-messages-area"></div>
            
            <div class="chat-input-wrapper">
                <input type="text" id="msgIn" placeholder="Écrivez un message..." onkeypress="handleChatKey(event)">
                <button onclick="envoyerMsg()" class="btn-send">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    
    injectForumStyles();
    chargerMsgs(true); // Charger immédiatement
}

// --- 2. ENVOI DE MESSAGE ---
function envoyerMsg() {
    const input = document.getElementById('msgIn');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const userData = JSON.parse(localStorage.getItem('user_nexus'));
    if (!userData) {
        alert("Connectez-vous pour participer !");
        showSection('profile');
        return;
    }

    const msgs = JSON.parse(localStorage.getItem('chat_gaoua')) || [];
    
    msgs.push({ 
        user: userData.prenom,
        email: userData.email, 
        photo: userData.photo || null,
        text: text, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    });

    // On garde les 60 derniers messages
    localStorage.setItem('chat_gaoua', JSON.stringify(msgs.slice(-60)));
    input.value = "";
    chargerMsgs(true);
}

// --- 3. CHARGEMENT DES MESSAGES ---
function chargerMsgs(forceScroll = false) {
    const box = document.getElementById('chat-box');
    if (!box) return;

    const msgs = JSON.parse(localStorage.getItem('chat_gaoua')) || [];
    const userData = JSON.parse(localStorage.getItem('user_nexus'));
    const currentUserEmail = userData ? userData.email : null;

    const isAtBottom = box.scrollHeight - box.scrollTop <= box.clientHeight + 100;

    box.innerHTML = msgs.map(m => {
        const isMe = m.email === currentUserEmail ? 'msg-me' : 'msg-others';
        
        // Système d'avatar robuste (UI Avatars en secours)
        const imgSource = m.photo ? m.photo : 'logo.png'; 
        const avatar = `<img src="${imgSource}" class="chat-avatar" onerror="this.src='https://ui-avatars.com/api/?name=${m.user}&background=2ecc71&color=fff'">`;

        return `
            <div class="message-row ${isMe}">
                ${isMe === 'msg-others' ? avatar : ''}
                <div class="message-bubble">
                    <span class="chat-user-name">${m.user}</span>
                    <p class="chat-text" style="margin:0;">${m.text}</p>
                    <span class="chat-time">${m.time}</span>
                </div>
                ${isMe === 'msg-me' ? avatar : ''}
            </div>
        `;
    }).join('');

    if (forceScroll || isAtBottom) {
        box.scrollTop = box.scrollHeight;
    }
}

// --- 4. GESTION CLAVIER ---
function handleChatKey(e) {
    if (e.key === 'Enter') envoyerMsg();
}

// --- 5. STYLES (Vert Émeraude & Noir) ---
function injectForumStyles() {
    if (document.getElementById('forum-extra-css')) return;
    const style = document.createElement('style');
    style.id = 'forum-extra-css';
    style.innerHTML = `
        .chat-container { width: 100%; max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; height: 70vh; background: #fff; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); overflow: hidden; border: 1px solid #eee; }
        .chat-header { background: #fff; padding: 15px; border-bottom: 2px solid #2ecc71; text-align: center; }
        .chat-messages-area { flex: 1; padding: 20px; overflow-y: auto; background: #f9f9f9; display: flex; flex-direction: column; gap: 12px; }
        .message-row { display: flex; align-items: flex-end; gap: 10px; max-width: 85%; animation: chatFade 0.3s ease; }
        .msg-me { align-self: flex-end; }
        .msg-others { align-self: flex-start; }
        .message-bubble { padding: 10px 15px; border-radius: 18px; position: relative; font-size: 0.95em; line-height: 1.4; }
        .msg-me .message-bubble { background: #2ecc71; color: white; border-bottom-right-radius: 2px; }
        .msg-others .message-bubble { background: #1a1a1a; color: white; border-bottom-left-radius: 2px; }
        .chat-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .chat-user-name { display: block; font-size: 0.7em; font-weight: bold; margin-bottom: 4px; opacity: 0.9; text-transform: uppercase; }
        .chat-time { font-size: 0.6em; margin-top: 5px; opacity: 0.7; display: block; text-align: right; }
        .chat-input-wrapper { padding: 15px; background: #fff; border-top: 1px solid #eee; display: flex; gap: 10px; }
        .chat-input-wrapper input { flex: 1; padding: 12px 20px; border-radius: 25px; border: 1px solid #ddd; outline: none; transition: 0.3s; }
        .chat-input-wrapper input:focus { border-color: #2ecc71; box-shadow: 0 0 5px rgba(46, 204, 113, 0.3); }
        .btn-send { background: #2ecc71; color: white; border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; }
        .btn-send:hover { background: #27ae60; transform: scale(1.05); }
        
        @keyframes chatFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 600px) {
            .chat-container { height: 80vh; border-radius: 0; }
            .message-row { max-width: 95%; }
        }
    `;
    document.head.appendChild(style);
}

// Rafraîchissement automatique uniquement si la section chat est visible
setInterval(() => {
    const chatSec = document.getElementById('sec-chat');
    if (chatSec && chatSec.style.display !== 'none') {
        chargerMsgs();
    }
}, 4000);
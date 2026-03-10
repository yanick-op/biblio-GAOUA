// --- 1. DONNÉES DES FILIÈRES ---
const filieresCUG = [
    { nom: "Gestion de Patrimoine Culturel et Touristique", modules: ["Histoire de l'Art", "Économie du Tourisme", "Droit du Patrimoine", "Archéologie"] },
    { nom: "Géographie Générale", modules: ["Climatologie", "Géographie Humaine", "Géomorphologie", "Cartographie"] },
    { nom: "Géographie Appliquée", modules: ["Aménagement du Territoire", "SIG", "Environnement", "Télédétection"] },
    { nom: "Sciences Biologiques Appliquées", modules: ["Biochimie", "Botanique", "Microbiologie", "Physiologie"] }
];

// --- 2. NAVIGATION UNIFIÉE ---
function showSection(id) {
    // A. Vérification de sécurité : certaines sections exigent d'être connecté
    const isConnected = localStorage.getItem('user_nexus');
    const privateSections = ['chat', 'filiere', 'books'];
    
    if (privateSections.includes(id) && !isConnected) {
        alert("🔒 Accès réservé. Veuillez vous connecter pour accéder à cet espace.");
        return showSection('profile');
    }

    // B. Fermer la sidebar automatiquement (Style Facebook/Mobile)
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }

    // C. Masquer toutes les sections
    document.querySelectorAll('.page-section').forEach(s => s.style.display = 'none');
    
    // D. Afficher la section cible
    const target = document.getElementById('sec-' + id);
    if (target) {
        target.style.display = 'block';
        window.scrollTo(0, 0);
    }

    // E. --- LOGIQUE DE CHARGEMENT DYNAMIQUE ---
    switch(id) {
        case 'welcome':
            if (typeof initWelcome === 'function') initWelcome();
            break;
        case 'filiere':
            initFilieres();
            break;
        case 'chat':
            if (typeof initChat === 'function') initChat();
            break;
        case 'books':
            if (typeof initialiserLivres === 'function') initialiserLivres();
            break;
        case 'profile':
            const savedUser = JSON.parse(localStorage.getItem('user_nexus'));
            // Si l'utilisateur existe, on dessine sa carte de profil
            if(savedUser && typeof appliquerConnexion === 'function') appliquerConnexion(savedUser);
            break;
    }

    // F. Gestion du bouton retour (Caché sur l'accueil)
    const backBtn = document.getElementById('universal-back-btn');
    if(backBtn) backBtn.style.display = (id === 'welcome') ? 'none' : 'flex';
}

// --- 3. GESTION DES FILIÈRES (ACCORDÉONS) ---
function initFilieres() {
    const list = document.getElementById('filiere-list');
    if (!list) return;

    list.innerHTML = filieresCUG.map((f, index) => `
        <div class="filiere-card-wrapper" style="margin-bottom: 15px;">
            <div class="filiere-header" onclick="toggleModules(${index})">
                <span style="font-weight:bold; color:#1a1a1a;">
                    <i class="fa fa-folder" style="color: #2ecc71; margin-right: 10px;"></i> ${f.nom}
                </span>
                <i class="fa fa-chevron-down" id="arrow-${index}" style="transition: 0.3s; font-size: 0.8em; color:#2ecc71;"></i>
            </div>
            <div id="modules-${index}" class="modules-list" style="display: none; padding: 10px 15px; background: #fff; border: 1px solid #eee; border-top: none; border-radius: 0 0 12px 12px;">
                ${f.modules.map(m => `
                    <div class="module-item" style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid #f9f9f9;">
                        <span style="font-size: 0.95em; color:#333;">${m}</span>
                        <button onclick="window.open('https://wa.me/22665688565?text=Bonjour NEXUS, je souhaite le cours de : ${m}', '_blank')" 
                                style="background: #2ecc71; color: white; border: none; padding: 6px 15px; border-radius: 20px; cursor: pointer; font-size: 0.8em; font-weight:bold;">
                            <i class="fa fa-download"></i> PDF
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function toggleModules(index) {
    const panel = document.getElementById(`modules-${index}`);
    const arrow = document.getElementById(`arrow-${index}`);
    if (panel.style.display === "none") {
        panel.style.display = "block";
        arrow.style.transform = "rotate(180deg)";
    } else {
        panel.style.display = "none";
        arrow.style.transform = "rotate(0deg)";
    }
}

// --- 4. INTERFACE (SIDEBAR & MENU) ---
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('active');
}

function updateMenuVisibility(isConnected) {
    const elements = ['private-menu', 'main-menu-btn', 'logout-btn'];
    elements.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = isConnected ? 'block' : 'none';
    });
}

// --- 5. INITIALISATION AU DÉMARRAGE ---
document.addEventListener('DOMContentLoaded', () => {
    const userJson = localStorage.getItem('user_nexus');
    
    if (userJson) {
        // L'utilisateur est déjà connecté
        const user = JSON.parse(userJson);
        updateMenuVisibility(true);
        
        // On met à jour l'affichage du profil en haut à droite immédiatement
        if (typeof appliquerConnexion === 'function') {
            appliquerConnexion(user);
        }
    } else {
        // Pas de session active
        updateMenuVisibility(false);
    }
    
    // On force l'affichage de l'accueil par défaut
    showSection('welcome');
});
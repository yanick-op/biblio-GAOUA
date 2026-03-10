// --- 1. CONFIGURATION ---
const EMAILJS_SERVICE_ID = "service_iyqvm9o"; 
const EMAILJS_TEMPLATE_ID = "template_70hmscs";

// --- 2. INSCRIPTION ---
function sInscrire() {
    const emailInput = document.getElementById('reg-email').value.trim().toLowerCase();
    const nom = document.getElementById('reg-nom').value.trim();
    const prenom = document.getElementById('reg-prenom').value.trim();
    const ine = document.getElementById('reg-ine').value.trim();

    if(!nom || !emailInput || !prenom || !ine) {
        return alert("⚠️ Remplissez tous les champs, y compris le numéro INE !");
    }

    // --- BASE DE DONNÉES LOCALE : On récupère tous les comptes existants ---
    let tousLesComptes = JSON.parse(localStorage.getItem('nexus_users_db')) || [];

    // Vérifier si l'email existe déjà dans la base
    const verifEmail = tousLesComptes.find(u => u.email === emailInput);
    if (verifEmail) {
        alert("❌ Cet email est déjà enregistré sur NEXUS. Veuillez vous connecter.");
        return toggleAuth(); // Bascule vers le formulaire de connexion
    }

    // Génération du code NEXUS (Ton mot de passe)
    const motDePasseAuto = "NEX-" + Math.random().toString(36).substr(2, 3).toUpperCase();

    const user = {
        nom: nom.toUpperCase(),
        prenom: prenom,
        email: emailInput,
        ine: ine,
        password: motDePasseAuto,
        photo: document.getElementById('img-input')?.getAttribute('data-img') || null
    };

    // --- SAUVEGARDE DOUBLE ---
    // 1. On l'ajoute à la liste globale (pour ne jamais l'oublier)
    tousLesComptes.push(user);
    localStorage.setItem('nexus_users_db', JSON.stringify(tousLesComptes));
    
    // 2. On le définit comme utilisateur actuel (Session active)
    localStorage.setItem('user_nexus', JSON.stringify(user));
    
    // Envoi du Mail via EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: user.email,
        prenom: user.prenom,
        password_genere: user.password 
    }).then(
        () => console.log("Mail NEXUS envoyé"),
        (err) => console.log("Erreur MailJS")
    );

    alert(`✅ Bienvenue chez NEXUS !\n\nVotre code d'accès secret est : ${user.password}\nConservez-le précieusement !`);
    appliquerConnexion(user);
}

// --- 3. CONNEXION ---
function connexion() {
    const emailSaisi = document.getElementById('login-email').value.trim().toLowerCase();
    const passSaisi = document.getElementById('login-pass').value.trim();
    
    // On récupère la liste complète des comptes créés
    const tousLesComptes = JSON.parse(localStorage.getItem('nexus_users_db')) || [];

    // On cherche l'utilisateur qui a cet email ET ce mot de passe
    const userTrouve = tousLesComptes.find(u => u.email === emailSaisi && u.password === passSaisi);

    if(userTrouve) {
        // On définit cet utilisateur comme la session active
        localStorage.setItem('user_nexus', JSON.stringify(userTrouve));
        appliquerConnexion(userTrouve);
        alert("🔓 Accès autorisé. Bon retour " + userTrouve.prenom + " !");
    } else {
        alert("❌ Email ou Code NEXUS incorrect.\nSi vous n'avez pas de compte, inscrivez-vous.");
    }
}

// --- 4. APPLICATION DE LA SESSION (STYLE PROFESSIONNEL) ---
function appliquerConnexion(user) {
    // 1. Activer le menu et les boutons de navigation
    if(typeof updateMenuVisibility === 'function') updateMenuVisibility(true);

    // 2. Mettre à jour l'en-tête (Top Bar à droite)
    const h = document.getElementById('userHeader');
    if (h) {
        const avatarHtml = user.photo 
            ? `<img src="${user.photo}" style="width:30px;height:30px;border-radius:50%;object-fit:cover;border:2px solid #2ecc71;">` 
            : `<i class="fa fa-user-circle" style="font-size:24px; color:#65676b;"></i>`;
        
        h.innerHTML = `
            <span class="user-name">${user.prenom}</span>
            <div class="user-avatar-small">${avatarHtml}</div>
        `;
    }

    // 3. Organiser la Carte de Profil (Section Profil)
    const profileCard = document.getElementById('user-details-card');
    const authForms = document.getElementById('auth-forms');
    
    if (profileCard && authForms) {
        authForms.style.display = 'none'; // Cache le formulaire de connexion
        profileCard.style.display = 'block'; // Affiche la carte
        
        const finalPhoto = user.photo || 'logo.png';

        profileCard.innerHTML = `
            <div class="profile-card">
                <div style="position:relative; margin-bottom:60px; background:var(--black); height:100px; border-radius:10px 10px 0 0;">
                    <img src="${finalPhoto}" style="width:100px; height:100px; border-radius:50%; object-fit:cover; border:5px solid white; position:absolute; bottom:-50px; left:50%; transform:translateX(-50%); background:white;">
                </div>
                
                <h2 style="margin-bottom:5px;">${user.prenom} ${user.nom}</h2>
                <span style="color:var(--accent); font-weight:bold; font-size:0.8em; letter-spacing:1px;">STUDENT @ CUG GAOUA</span>

                <div class="profile-info-grid" style="margin-top:30px; text-align:left; border-top:1px solid #eee; padding-top:20px;">
                    <div style="display:flex; align-items:center; gap:15px; margin-bottom:15px;">
                        <div style="background:#e8f5e9; padding:10px; border-radius:10px; color:var(--accent);"><i class="fa fa-id-badge"></i></div>
                        <div><small style="color:gray; display:block;">Identifiant INE</small><strong>${user.ine}</strong></div>
                    </div>

                    <div style="display:flex; align-items:center; gap:15px; margin-bottom:15px;">
                        <div style="background:#e3f2fd; padding:10px; border-radius:10px; color:#2196f3;"><i class="fa fa-envelope"></i></div>
                        <div><small style="color:gray; display:block;">Email Institutionnel</small><strong>${user.email}</strong></div>
                    </div>

                    <div style="display:flex; align-items:center; gap:15px; margin-bottom:15px;">
                        <div style="background:#fff3e0; padding:10px; border-radius:10px; color:#ff9800;"><i class="fa fa-shield-alt"></i></div>
                        <div><small style="color:gray; display:block;">Code Secret NEXUS</small><strong style="color:var(--accent); font-family:monospace;">${user.password}</strong></div>
                    </div>
                </div>

                <button onclick="deconnexion()" style="width:100%; background:#f0f2f5; color:#4b4b4b; border:none; padding:12px; border-radius:8px; font-weight:600; cursor:pointer; transition:0.3s; margin-top:10px;">
                <i class="fa fa-sign-out-alt" style="margin-right:8px;"></i> Se déconnecter
                </button>
            </div>
        `;
    }

    // Rediriger vers l'accueil après 1.5s si on vient de se connecter
    // showSection('welcome'); // Optionnel : à activer si tu veux changer de page auto
}

// --- 5. BASCULE ENTRE FORMULAIRES ---
function toggleAuth() {
    const login = document.getElementById('login-form');
    const register = document.getElementById('register-form');
    if (login.style.display === "none") {
        login.style.display = "block";
        register.style.display = "none";
    } else {
        login.style.display = "none";
        register.style.display = "block";
    }
}

// --- 6. DÉCONNEXION ---
function deconnexion() {
    if(confirm("Voulez-vous fermer votre session actuelle ?")) {
        localStorage.removeItem('user_nexus'); // Supprime la session, mais garde le compte dans 'nexus_users_db'
        window.location.reload(); 
    }
}

function motDePasseOublie() {
    const email = prompt("Entrez votre email pour recevoir votre code :");
    if (email) {
        const tousLesComptes = JSON.parse(localStorage.getItem('nexus_users_db')) || [];
        const user = tousLesComptes.find(u => u.email === email.toLowerCase().trim());
        
        if (user) {
            // Envoi via EmailJS
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                to_email: user.email,
                prenom: user.prenom,
                password_genere: user.password 
            }).then(() => alert("Votre code secret a été renvoyé par email !"));
        } else {
            alert("Aucun compte trouvé avec cet email.");
        }
    }
}
// --- INITIALISATION DE LA PAGE D'ACCUEIL ---
function initWelcome() {
    const welcomeSection = document.getElementById('sec-welcome');
    if (!welcomeSection) return;

    const userSession = localStorage.getItem('user_nexus');
    const user = userSession ? JSON.parse(userSession) : null;

    // Définition manuelle des couleurs pour sécurité
    const vert = "#2ecc71";
    const noir = "#1a1a1a";

    welcomeSection.innerHTML = `
        <div class="hero-surface" style="animation: slideUp 0.6s ease-out; text-align: center; padding: 40px 20px; background: #fff; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            
            ${user && user.photo 
                ? `<img src="${user.photo}" alt="Profil" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid ${vert}; margin-bottom: 15px;">`
                : `<img src="logo.png" alt="Logo Nexus" class="hero-logo" style="width: 100px; margin-bottom: 20px;" onerror="this.style.display='none'">`
            }

            <h1 style="font-size: 2.2em; color: ${vert}; margin-bottom: 10px; line-height: 1.2; font-weight: bold;">
                ${user ? 'Ravi de vous revoir, <br>' + user.prenom : "L'excellence académique à Gaoua"}
            </h1>

            <p style="color: ${noir}; opacity: 0.8; font-size: 1.1em; max-width: 600px; margin: 0 auto 30px; line-height: 1.5;">
                ${user 
                    ? 'Votre espace membre est actif. Accédez à vos ressources pédagogiques et échangez avec vos camarades.' 
                    : 'Bienvenue sur Biblio-Gaoua, la plateforme numérique du Cercle de Réflexion et d\'Innovation Scientifique (NEXUS).'}
            </p>

            <div class="welcome-actions" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-bottom: 40px;">
                
                <button class="btn-main" style="width: auto; padding: 14px 25px; display: flex; align-items: center; gap: 10px; background: ${vert}; color: white; border: none; border-radius: 30px; cursor: pointer; font-weight: bold;" 
                        onclick="showSection('${user ? 'filiere' : 'profile'}')">
                    <i class="fas ${user ? 'fa-graduation-cap' : 'fa-user-plus'}"></i> 
                    ${user ? 'Mes Cours' : 'Rejoindre NEXUS'}
                </button>

                ${user ? `
                    <button class="btn-main" style="width: auto; padding: 14px 25px; background: transparent; color: ${vert}; border: 2px solid ${vert}; border-radius: 30px; display: flex; align-items: center; gap: 10px; cursor: pointer; font-weight: bold;" 
                            onclick="showSection('chat')">
                        <i class="fas fa-comments"></i> Forum
                    </button>
                ` : `
                    <button class="btn-main" style="width: auto; padding: 14px 25px; background: #f1f3f4; color: ${noir}; border: none; border-radius: 30px; display: flex; align-items: center; gap: 10px; cursor: pointer;" 
                            onclick="showSection('about')">
                        <i class="fas fa-info-circle"></i> À propos
                    </button>
                `}
            </div>
        </div>
        
        <div class="pro-about" style="margin-top: 20px; padding: 25px; background: rgba(46, 204, 113, 0.08); border-radius: 20px; border-left: 5px solid ${vert};">
            <h3 style="color: ${noir}; margin-top: 0; display: flex; align-items: center; gap: 10px;">
                <i class="fa fa-bullhorn" style="color: ${vert};"></i> Actualités
            </h3>
            <p style="font-size: 0.95em; color: ${noir}; opacity: 0.9;">
                La plateforme Biblio-Gaoua est en phase de déploiement. Partagez vos PDF dans la 
                <strong>Bibliothèque</strong> pour soutenir la réussite au Centre Universitaire de Gaoua.
            </p>
            <div style="margin-top: 20px; display: flex; align-items: center; gap: 10px; color: ${vert}; font-weight: bold; font-size: 0.75em; letter-spacing: 1px;">
                <span class="pulse-dot"></span>
                SYSTÈME OPÉRATIONNEL • C.U.G
            </div>
        </div>
    `;
}

// Lancement au chargement
document.addEventListener('DOMContentLoaded', initWelcome);
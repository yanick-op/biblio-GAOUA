// --- 1. BASE DE DONNÉES DES DOCUMENTS (Remplace les liens par tes liens Google Drive) ---
const bibliothequeNexus = [
    { 
        titre: "Histoire de l'Art Africain", 
        auteur: "C.A. Diop", 
        cat: "Culture", 
        lien: "https://drive.google.com/file/d/TON_ID_ICI/view?usp=sharing" 
    },
    { 
        titre: "Géographie du Burkina Faso", 
        auteur: "Dr. Koné", 
        cat: "Géographie", 
        lien: "https://drive.google.com/file/d/TON_ID_ICI/view?usp=sharing" 
    },
    { 
        titre: "Biochimie Fondamentale", 
        auteur: "Pr. Traoré", 
        cat: "Sciences", 
        lien: "https://drive.google.com/file/d/TON_ID_ICI/view?usp=sharing" 
    }
];

// --- 2. INITIALISATION ---
function initialiserLivres() {
    const sec = document.getElementById('sec-books');
    if (!sec) return;

    sec.innerHTML = `
        <div style="padding: 10px;">
            <h2 style="color: #2ecc71; margin-bottom: 5px;"><i class="fa fa-book-open"></i> Bibliothèque Numérique</h2>
            <p style="color: #666; font-size: 0.9em; margin-bottom: 25px;">Téléchargez vos ressources via Google Drive.</p>
            
            <div id="books-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
                </div>
        </div>
    `;

    afficherLivres(bibliothequeNexus);
    injecterStylesBiblio();
}

// --- 3. AFFICHAGE DES CARTES ---
function afficherLivres(liste) {
    const grid = document.getElementById('books-grid');
    if (!grid) return;

    grid.innerHTML = liste.map(livre => `
        <div class="book-card">
            <div class="book-cat">${livre.cat}</div>
            <h3 class="book-title">${livre.titre}</h3>
            <p class="book-author">Auteur : ${livre.auteur}</p>
            <a href="${livre.lien}" target="_blank" class="btn-download">
                <i class="fab fa-google-drive"></i> Ouvrir sur Drive
            </a>
        </div>
    `).join('');
}

// --- 4. STYLES (Vert & Noir) ---
function injecterStylesBiblio() {
    if (document.getElementById('biblio-css')) return;
    const style = document.createElement('style');
    style.id = 'biblio-css';
    style.innerHTML = `
        .book-card {
            background: #ffffff;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border-left: 5px solid #2ecc71;
            transition: 0.3s;
        }
        .book-title { color: #1a1a1a; margin: 10px 0; font-size: 1.1em; font-weight: bold; }
        .book-cat { color: #2ecc71; font-size: 0.7em; font-weight: bold; text-transform: uppercase; }
        .book-author { color: #777; font-size: 0.8em; margin-bottom: 15px; }
        .btn-download {
            background: #1a1a1a; /* Noir */
            color: white;
            text-decoration: none;
            padding: 12px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            font-weight: bold;
            font-size: 0.9em;
            transition: 0.3s;
        }
        .btn-download:hover { background: #2ecc71; transform: scale(1.02); }
    `;
    document.head.appendChild(style);
}
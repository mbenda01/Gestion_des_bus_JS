const lignes = [
    { numero: "L001", nombreKm: 10, tarif: 500 },
    { numero: "L002", nombreKm: 15, tarif: 700 },
    { numero: "L003", nombreKm: 20, tarif: 1000 },
    { numero: "L004", nombreKm: 20, tarif: 1000 }
];

const conducteurs = [
    { matricule: "001", nom: "Diop", prenom: "Abdou" },
    { matricule: "002", nom: "Ndiaye", prenom: "Fatou" },
    { matricule: "003", nom: "Fall", prenom: "Cheikh"},
    { matricule: "004", nom: "Ba", prenom: "Aminata"},
];


const arrets = [
    { numero: "A001", nom: "Arrêt Liberté 6"},
    { numero: "A002", nom: "Arrêt Nord Foire" },
    { numero: "A003", nom: "Arrêt Zone A"},
    { numero: "A004", nom: "Arrêt Foire"},
    { numero: "A005", nom: "Arrêt VDN"},
    { numero: "A006", nom: "Arrêt Sacré Coeur "},
    { numero: "A007", nom: "Arrêt Universite"},
    { numero: "A008", nom: "Arrêt Sahm"},
    { numero: "A009", nom: "Arrêt Dior"},
    { numero: "A010", nom: "Arrêt Yoff"},
    { numero: "A011", nom: "Arrêt Médina"},
    { numero: "A012", nom: "Ville"},
    { numero: "A013", nom: "Arrêt Ouakam"},
    { numero: "A014", nom: "Arrêt Almadies"}
];

function assignDriver() {
    let conducteurOptions = conducteurs.map(c => `<option value="${c.matricule}">${c.nom} ${c.prenom}</option>`).join('');
    document.getElementById("conducteurSelect").innerHTML = conducteurOptions;
    new bootstrap.Modal(document.getElementById('assignDriverModal')).show();
}

function listArrets() {
    let arretCheckboxes = arrets.map(arret => `
        <div>
            <input type="checkbox" id="${arret.numero}" />
            <label for="${arret.numero}">${arret.nom}</label>
        </div>
    `).join('');

    document.getElementById("arretsListContainer").innerHTML = arretCheckboxes;
    new bootstrap.Modal(document.getElementById('listArretsModal')).show();
}

document.getElementById("saveConducteur").addEventListener("click", () => {
    const selectedConducteur = document.getElementById("conducteurSelect").value;
    alert(`Conducteur avec matricule ${selectedConducteur} assigné !`);
});

document.getElementById("saveArrets").addEventListener("click", () => {
    const selectedArrets = Array.from(document.querySelectorAll('#arretsListContainer input:checked'))
                                .map(checkbox => checkbox.id);
    alert(`Arrêts sélectionnés : ${selectedArrets.join(", ")}`);
});

let filteredLignes = [...lignes];  // Par défaut, on affiche toutes les lignes
let selectedLigne = null;
let currentPage = 1;
const itemsPerPage = 5;

// Fonction pour appliquer les filtres
function applyFilters() {
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    filteredLignes = lignes.filter(ligne =>
        ligne.numero.toLowerCase().includes(searchInput)
    );
    renderLigneTable();
}

// Recherche dynamique
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchInput").addEventListener("input", applyFilters);
    renderLigneTable();  // Affiche toutes les lignes par défaut
});

function renderLigneTable() {
    const ligneTable = document.getElementById("ligneTable");
    ligneTable.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const lignesToDisplay = filteredLignes.slice(startIndex, endIndex);

    if (lignesToDisplay.length === 0) {
        ligneTable.innerHTML = `<tr><td colspan="4" class="text-center">Aucune ligne trouvée</td></tr>`;
        return;
    }

    lignesToDisplay.forEach((ligne, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${ligne.numero}</td>
            <td>${ligne.nombreKm} Km</td>
            <td>${ligne.tarif} F CFA</td>
            <td>
                <div class="dropdown">
                    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        &#x22EE;
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" onclick="editLigne(${index + startIndex})">Modifier</a></li>
                        <li><a class="dropdown-item" href="#" onclick="deleteLigne(${index + startIndex})">Supprimer</a></li>
                        <li><a class="dropdown-item" href="#" onclick="listArrets()">Lister Arrêts</a></li>
                        <li><a class="dropdown-item" href="#" onclick="assignDriver()">Assigner un Conducteur</a></li>
                    </ul>
                </div>
            </td>
        `;
        ligneTable.appendChild(row);
    });

    updatePaginationControls();
}

function updatePaginationControls() {
    const totalPages = Math.ceil(filteredLignes.length / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");

    paginationContainer.innerHTML = `
        <button class="btn btn-outline-primary me-2" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(-1)">Page Avant</button>
        <span>Page ${currentPage} / ${totalPages}</span>
        <button class="btn btn-outline-primary ms-2" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(1)">Page Après</button>
    `;
}

function changePage(direction) {
    currentPage += direction;
    renderLigneTable();
}

// Modifier une ligne
function editLigne(index) {
    const ligne = filteredLignes[index];
    const nouveauTarif = prompt("Modifier le tarif de la ligne :", ligne.tarif);

    if (nouveauTarif !== null) {
        lignes[index].tarif = parseInt(nouveauTarif);
        applyFilters();
    }
}

// Supprimer une ligne
function deleteLigne(index) {
    if (confirm("Voulez-vous vraiment supprimer cette ligne ?")) {
        lignes.splice(index, 1);
        applyFilters();
    }
}

// Exporter la liste des lignes en CSV
document.getElementById("exportCSV").addEventListener("click", downloadCSV);
function downloadCSV() {
    const csvContent = [["Numéro", "Nombre de Km", "Tarif"]];
    filteredLignes.forEach(ligne => csvContent.push([ligne.numero, ligne.nombreKm, ligne.tarif]));
    
    const csvString = csvContent.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "lignes.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Ajouter une Nouvelle Ligne
document.getElementById("addLigne").addEventListener("click", () => {
    selectedLigne = null;
    document.getElementById("ligneForm").reset();
    document.getElementById("ligneFormModalLabel").textContent = "Ajouter une Nouvelle Ligne";
    
    const ligneFormModal = new bootstrap.Modal(document.getElementById("ligneFormModal"));
    ligneFormModal.show();
});

document.getElementById("saveLigne").addEventListener("click", () => {
    const numero = document.getElementById("numero").value;
    const nombreKm = document.getElementById("nombreKm").value;
    const tarif = document.getElementById("tarif").value;

    if (!numero || !nombreKm || !tarif) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const newLigne = { numero, nombreKm: parseInt(nombreKm), tarif: parseInt(tarif) };

    if (selectedLigne !== null) {
        lignes[selectedLigne] = newLigne; 
    } else {
        lignes.push(newLigne); 
    }

    selectedLigne = null;
    document.getElementById("ligneForm").reset();
    applyFilters();

    const ligneFormModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("ligneFormModal"));
    ligneFormModal.hide();
});


// Permet d'afficher le modal lorsque l'utilisateur clique sur l'image de profil
document.getElementById('userIcon').addEventListener('click', () => {
    const userProfileModal = new bootstrap.Modal(document.getElementById('userProfileModal'));
    userProfileModal.show();
});

// Permet d'afficher la page de notifications lorsque l'utilisateur clique sur l'icône
document.getElementById('notificationIcon').addEventListener('click', () => {
    window.location.href = "../Arret/notifications.html";
});

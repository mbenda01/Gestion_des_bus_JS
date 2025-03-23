const arrets = [
    { numero: "A001", nom: "Arrêt Liberté 6", lignes: ["L001"] },
    { numero: "A002", nom: "Arrêt Nord Foire", lignes: ["L001", "L002"] },
    { numero: "A003", nom: "Arrêt Zone A", lignes: ["L001"] },
    { numero: "A004", nom: "Arrêt Foire", lignes: ["L001","L002","L004"] },
    { numero: "A005", nom: "Arrêt VDN", lignes: ["L002"] },
    { numero: "A006", nom: "Arrêt Sacré Coeur ", lignes: ["L001"] },
    { numero: "A007", nom: "Arrêt Universite", lignes: ["L002", "L003","L004"] },
    { numero: "A008", nom: "Arrêt Sahm", lignes: ["L001","L002","L004"] },
    { numero: "A009", nom: "Arrêt Dior", lignes: ["L002"] },
    { numero: "A010", nom: "Arrêt Yoff", lignes: ["L003","L004"] },
    { numero: "A011", nom: "Arrêt Médina", lignes: ["L002"] },
    { numero: "A012", nom: "Ville", lignes: ["L002","L004"] },
    { numero: "A013", nom: "Arrêt Ouakam", lignes: ["L003"] },
    { numero: "A014", nom: "Arrêt Almadies", lignes: ["L003"] }
];

let selectedArret = null;
let currentPage = 1;
const itemsPerPage = 5;

// Affichage des arrêts avec pagination
function renderArretTable(filteredArrets = arrets) {
    const arretTable = document.getElementById("arretTable");
    arretTable.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const arretsToDisplay = filteredArrets.slice(startIndex, endIndex);

    if (arretsToDisplay.length === 0) {
        arretTable.innerHTML = `<tr><td colspan="4" class="text-center">Aucun arrêt trouvé</td></tr>`;
        return;
    }

    arretsToDisplay.forEach((arret, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${arret.numero}</td>
            <td>${arret.nom}</td>
            <td>${arret.lignes.join(", ")}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editArret(${index})">Modifier</button>
                <button class="btn btn-danger btn-sm" onclick="deleteArret(${index})">Supprimer</button>
            </td>
        `;
        arretTable.appendChild(row);
    });

    updatePaginationControls(filteredArrets);
}

// Fonction de mise à jour des boutons de pagination
function updatePaginationControls(filteredArrets) {
    const totalPages = Math.ceil(filteredArrets.length / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");

    paginationContainer.innerHTML = `
        <button class="btn btn-outline-primary me-2" id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>Page Avant</button>
        <span>Page ${currentPage} / ${totalPages}</span>
        <button class="btn btn-outline-primary ms-2" id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>Page Après</button>
    `;

    document.getElementById("prevPage").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            applyFilters();
        }
    });

    document.getElementById("nextPage").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            applyFilters();
        }
    });
}

// Fonction pour appliquer les filtres
function applyFilters() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const ligneFilter = document.getElementById("ligneFilter").value;

    const filteredArrets = arrets.filter(arret => {
        const matchesSearch = arret.nom.toLowerCase().includes(searchInput) || arret.numero.toLowerCase().includes(searchInput);
        const matchesLigne = ligneFilter === "Ligne Associée" || arret.lignes.includes(ligneFilter);

        return matchesSearch && matchesLigne;
    });

    renderArretTable(filteredArrets);
}

// Ajouter ou modifier un arrêt
document.getElementById("saveArret").addEventListener("click", () => {
    const numero = document.getElementById("numero").value;
    const nom = document.getElementById("nom").value;
    const lignes = document.getElementById("lignes").value.split(",").map(ligne => ligne.trim());

    if (!numero || !nom || lignes.length === 0) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const newArret = { numero, nom, lignes };

    if (selectedArret !== null) {
        arrets[selectedArret] = newArret; // Modification d'un arrêt existant
    } else {
        arrets.push(newArret); // Ajout d'un nouvel arrêt
    }

    selectedArret = null;
    document.getElementById("arretForm").reset();
    applyFilters();

    const arretFormModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("arretFormModal"));
    arretFormModal.hide();
});

// Afficher le modal d'ajout d'arrêt
document.getElementById("addArret").addEventListener("click", () => {
    selectedArret = null;
    document.getElementById("arretForm").reset();
    document.getElementById("arretFormModalLabel").textContent = "Ajouter un Arrêt";
    
    const arretFormModal = new bootstrap.Modal(document.getElementById("arretFormModal"));
    arretFormModal.show();
});

// Modifier un arrêt
function editArret(index) {
    selectedArret = index;
    const arret = arrets[index];

    document.getElementById("numero").value = arret.numero;
    document.getElementById("nom").value = arret.nom;
    document.getElementById("lignes").value = arret.lignes.join(", ");

    document.getElementById("arretFormModalLabel").textContent = "Modifier un Arrêt";
    new bootstrap.Modal(document.getElementById("arretFormModal")).show();
}

// Supprimer un arrêt
function deleteArret(index) {
    if (confirm("Voulez-vous vraiment supprimer cet arrêt ?")) {
        arrets.splice(index, 1);
        applyFilters();
    }
}

// Recherche dynamique
document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("ligneFilter").addEventListener("change", applyFilters);

// Affichage initial
applyFilters();

// Exporter la liste des arrêts en CSV
function downloadCSV() {
    const csvContent = [
        ["Numéro", "Nom", "Lignes Associées"]
    ];

    arrets.forEach(arret => {
        csvContent.push([
            arret.numero,
            arret.nom,
            arret.lignes.join(", ")
        ]);
    });

    const csvString = csvContent.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "liste_des_arrets.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Bouton d'exportation
document.querySelector(".btn-secondary").addEventListener("click", downloadCSV);

// Permet d'afficher le modal lorsque l'utilisateur clique sur l'image de profil
document.getElementById('userIcon').addEventListener('click', () => {
    const userProfileModal = new bootstrap.Modal(document.getElementById('userProfileModal'));
    userProfileModal.show();
});

// Permet d'afficher la page de notifications lorsque l'utilisateur clique sur l'icône
document.getElementById('notificationIcon').addEventListener('click', () => {
    window.location.href = "notifications.html";
});



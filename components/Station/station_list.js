const stations = [
    { numero: "S001", nom: "Station Nord Foire", adresse: "Rue 1, Médina" },
    { numero: "S002", nom: "Station Sahm", adresse: "Centre Commercial Sahm" },
    { numero: "S003", nom: "Station Dior", adresse: "Marché Dior" },
    { numero: "S004", nom: "Station Ville", adresse: "Boulevard de la République" },
    { numero: "S005", nom: "Station Université", adresse: "Point E" },
    { numero: "S006", nom: "Station Yoff", adresse: "Avenue Blaise Diagne" }
];

let selectedStation = null;
let currentPage = 1;
const itemsPerPage = 5;

// Affichage des stations avec pagination
function renderStationTable(filteredStations = stations) {
    const stationTable = document.getElementById("stationTable");
    stationTable.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const stationsToDisplay = filteredStations.slice(startIndex, endIndex);

    if (stationsToDisplay.length === 0) {
        stationTable.innerHTML = `<tr><td colspan="4" class="text-center">Aucune station trouvée</td></tr>`;
        return;
    }

    stationsToDisplay.forEach((station, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${station.numero}</td>
            <td>${station.nom}</td>
            <td>${station.adresse}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editStation(${index + startIndex})">Modifier</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStation(${index + startIndex})">Supprimer</button>
            </td>
        `;
        stationTable.appendChild(row);
    });

    updatePaginationControls(filteredStations);
}

// Mise à jour des boutons de pagination
function updatePaginationControls(filteredStations) {
    const totalPages = Math.ceil(filteredStations.length / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");

    paginationContainer.innerHTML = `
        <button class="btn btn-outline-primary me-2" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(-1)">Page Avant</button>
        <span>Page ${currentPage} / ${totalPages}</span>
        <button class="btn btn-outline-primary ms-2" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(1)">Page Après</button>
    `;
}

function changePage(direction) {
    currentPage += direction;
    applyFilters();
}

// Fonction pour appliquer les filtres
function applyFilters() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();

    const filteredStations = stations.filter(station =>
        station.nom.toLowerCase().includes(searchInput) ||
        station.numero.toLowerCase().includes(searchInput)
    );

    renderStationTable(filteredStations);
}

// Ajouter ou modifier une station
document.getElementById("saveStation").addEventListener("click", () => {
    const numero = document.getElementById("numero").value;
    const nom = document.getElementById("nom").value;
    const adresse = document.getElementById("adresse").value;

    if (!numero || !nom || !adresse) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const newStation = { numero, nom, adresse };

    if (selectedStation !== null) {
        stations[selectedStation] = newStation;
    } else {
        stations.push(newStation);
    }

    selectedStation = null;
    document.getElementById("stationForm").reset();
    applyFilters();

    const stationFormModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("stationFormModal"));
    stationFormModal.hide();
});

// Affichage du modal pour ajouter une station
document.getElementById("addStation").addEventListener("click", () => {
    selectedStation = null;
    document.getElementById("stationForm").reset();
    document.getElementById("stationFormModalLabel").textContent = "Ajouter une Station";

    const stationFormModal = new bootstrap.Modal(document.getElementById("stationFormModal"));
    stationFormModal.show();
});

// Modifier une station
function editStation(index) {
    selectedStation = index;
    const station = stations[index];

    document.getElementById("numero").value = station.numero;
    document.getElementById("nom").value = station.nom;
    document.getElementById("adresse").value = station.adresse;

    document.getElementById("stationFormModalLabel").textContent = "Modifier une Station";
    new bootstrap.Modal(document.getElementById("stationFormModal")).show();
}

// Supprimer une station
function deleteStation(index) {
    if (confirm("Voulez-vous vraiment supprimer cette station ?")) {
        stations.splice(index, 1);
        applyFilters();
    }
}

// Recherche dynamique
document.getElementById("searchInput").addEventListener("input", applyFilters);

// Affichage initial
applyFilters();

// Exporter la liste des stations en CSV
document.getElementById("exportCSV").addEventListener("click", downloadCSV);
function downloadCSV() {
    const csvContent = [["Numéro", "Nom", "Adresse"]];
    stations.forEach(station => csvContent.push([station.numero, station.nom, station.adresse]));
    const csvString = csvContent.map(row => row.join(",")).join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "stations.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Permet d'afficher le modal lorsque l'utilisateur clique sur l'image de profil
document.getElementById('userIcon').addEventListener('click', () => {
    const userProfileModal = new bootstrap.Modal(document.getElementById('userProfileModal'));
    userProfileModal.show();
});

// Permet d'afficher la page de notifications lorsque l'utilisateur clique sur l'icône
document.getElementById('notificationIcon').addEventListener('click', () => {
    window.location.href = "notifications.html";
});

function logout() {
    // Effacer les données de connexion (si tu utilises localStorage ou sessionStorage)
    localStorage.removeItem('email'); // Par exemple, si tu stockes l'email dans le localStorage
    localStorage.removeItem('password');
    
    // Rediriger vers la page de login
    window.location.href = "../Login/login.html";
}
const trajets = [
    { numero: "T001", type: "aller", conducteur: "Bachir", ligne: "L001", date: "2025-03-24", ticketsDisponibles: 50, ticketsVendus: 30 },
    { numero: "T002", type: "retour", conducteur: "Moussa", ligne: "L002", date: "2025-03-25", ticketsDisponibles: 60, ticketsVendus: 20 },
    { numero: "T003", type: "aller", conducteur: "Alioune", ligne: "L003", date: "2025-03-26", ticketsDisponibles: 40, ticketsVendus: 25 },
    { numero: "T004", type: "retour", conducteur: "Aminata", ligne: "L004", date: "2025-03-27", ticketsDisponibles: 30, ticketsVendus: 15 }
];

let selectedTrajet = null;
let currentPage = 1;
const itemsPerPage = 5;

// Affichage des trajets avec pagination
function renderTrajetTable(filteredTrajets = trajets) {
    const trajetTable = document.getElementById("trajetTable");
    trajetTable.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const trajetsToDisplay = filteredTrajets.slice(startIndex, endIndex);

    if (trajetsToDisplay.length === 0) {
        trajetTable.innerHTML = `<tr><td colspan="8" class="text-center">Aucun trajet trouvé</td></tr>`;
        return;
    }

    trajetsToDisplay.forEach((trajet, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${trajet.numero}</td>
            <td>${trajet.type}</td>
            <td>${trajet.conducteur}</td>
            <td>${trajet.ligne}</td>
            <td>${trajet.date}</td>
            <td>${trajet.ticketsDisponibles}</td>
            <td>${trajet.ticketsVendus}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editTrajet(${index + startIndex})">Modifier</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTrajet(${index + startIndex})">Supprimer</button>
            </td>
        `;
        trajetTable.appendChild(row);
    });

    updatePaginationControls(filteredTrajets);
}

// Mise à jour des boutons de pagination
function updatePaginationControls(filteredTrajets) {
    const totalPages = Math.ceil(filteredTrajets.length / itemsPerPage);
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
    const typeFilter = document.getElementById("typeFilter").value.toLowerCase();
    const ligneFilter = document.getElementById("ligneFilter").value.toLowerCase();

    const filteredTrajets = trajets.filter(trajet =>
        (trajet.numero.toLowerCase().includes(searchInput) ||
        trajet.conducteur.toLowerCase().includes(searchInput)) &&
        (typeFilter === "" || trajet.type.toLowerCase() === typeFilter) &&
        (ligneFilter === "" || trajet.ligne.toLowerCase() === ligneFilter)
    );

    renderTrajetTable(filteredTrajets);
}

// Ajouter ou modifier un trajet
document.getElementById("saveTrajet").addEventListener("click", () => {
    const numero = document.getElementById("numeroTrajet").value;
    const type = document.getElementById("type").value;
    const conducteur = document.getElementById("conducteur").value;
    const date = document.getElementById("date").value;
    const ticketsDisponibles = parseInt(document.getElementById("ticketsDisponibles").value);
    const ticketsVendus = parseInt(document.getElementById("ticketsVendus").value);

    if (!numero || !type || !conducteur || !date || isNaN(ticketsDisponibles) || isNaN(ticketsVendus)) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const newTrajet = { numero, type, conducteur, ligne: "L001", date, ticketsDisponibles, ticketsVendus };

    if (selectedTrajet !== null) {
        trajets[selectedTrajet] = newTrajet;
    } else {
        trajets.push(newTrajet);
    }

    selectedTrajet = null;
    document.getElementById("trajetForm").reset();
    applyFilters();

    const trajetFormModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("trajetFormModal"));
    trajetFormModal.hide();
});

// Modifier un trajet
function editTrajet(index) {
    selectedTrajet = index;
    const trajet = trajets[index];

    document.getElementById("numeroTrajet").value = trajet.numero;
    document.getElementById("type").value = trajet.type;
    document.getElementById("conducteur").value = trajet.conducteur;
    document.getElementById("date").value = trajet.date;
    document.getElementById("ticketsDisponibles").value = trajet.ticketsDisponibles;
    document.getElementById("ticketsVendus").value = trajet.ticketsVendus;

    document.getElementById("trajetFormModalLabel").textContent = "Modifier un Trajet";
    new bootstrap.Modal(document.getElementById("trajetFormModal")).show();
}

// Supprimer un trajet
function deleteTrajet(index) {
    if (confirm("Voulez-vous vraiment supprimer ce trajet ?")) {
        trajets.splice(index, 1);
        applyFilters();
    }
}

// Recherche dynamique et filtres
document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("typeFilter").addEventListener("change", applyFilters);
document.getElementById("ligneFilter").addEventListener("change", applyFilters);

// Affichage initial lors du chargement de la page
window.addEventListener('DOMContentLoaded', applyFilters);

// Affichage du modal pour ajouter un trajet
document.getElementById("addTrajet").addEventListener("click", () => {
    selectedTrajet = null;
    document.getElementById("trajetForm").reset();
    document.getElementById("trajetFormModalLabel").textContent = "Ajouter un Trajet";

    const trajetFormModal = new bootstrap.Modal(document.getElementById("trajetFormModal"));
    trajetFormModal.show();

    // Exporter la liste des trajets en CSV
    document.getElementById("exportCSV").addEventListener("click", downloadCSV);

    // Permet d'afficher le modal lorsque l'utilisateur clique sur l'image de profil
    document.getElementById('userIcon').addEventListener('click', () => {
        const userProfileModal = new bootstrap.Modal(document.getElementById('userProfileModal'));
        userProfileModal.show();
    });

    // Permet d'afficher la page de notifications lorsque l'utilisateur clique sur l'icône de notifications
    document.getElementById('notificationIcon').addEventListener('click', () => {
        window.location.href = "../Arret/notifications.html";
    });

    // ✅ Gestion des clics sur les images
    const userIcon = document.getElementById('userIcon');
    const notificationIcon = document.getElementById('notificationIcon');

    if (userIcon) {
        userIcon.addEventListener('click', () => {
            alert("User Icon Clicked !");
            const userProfileModal = new bootstrap.Modal(document.getElementById('userProfileModal'));
            userProfileModal.show();
        });
    }

    if (notificationIcon) {
        notificationIcon.addEventListener('click', () => {
            alert("Notification Icon Clicked !");
            window.location.href = "../Arret/notifications.html";
        });
    }
});

// Exporter la liste des trajets en CSV
document.getElementById("exportCSV").addEventListener("click", downloadCSV);
function downloadCSV() {
    const csvContent = [["Numéro", "Type", "Conducteur", "Ligne", "Date", "Tickets Disponibles", "Tickets Vendus"]];
    trajets.forEach(trajet => csvContent.push([trajet.numero, trajet.type, trajet.conducteur, trajet.ligne, trajet.date, trajet.ticketsDisponibles, trajet.ticketsVendus]));
    const csvString = csvContent.map(row => row.join(",")).join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "trajets.csv";
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
    window.location.href = "../Arret/notifications.html";
});

function logout() {
    // Effacer les données de connexion (si tu utilises localStorage ou sessionStorage)
    localStorage.removeItem('email'); // Par exemple, si tu stockes l'email dans le localStorage
    localStorage.removeItem('password');
    
    // Rediriger vers la page de login
    window.location.href = "../Login/login.html";
}

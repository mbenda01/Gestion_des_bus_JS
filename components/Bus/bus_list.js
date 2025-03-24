

const buses = [
    { immatriculation: "DK-001", type: "Tata", places: 30, kilometrage: 120, etat: "Actif" },
    { immatriculation: "DK-002", type: "Car rapide", places: 20, kilometrage: 200, etat: "Hors service" },
    { immatriculation: "DK-003", type: "DDK", places: 40, kilometrage: 150, etat: "Actif" },
    { immatriculation: "DK-004", type: "Tata", places: 50, kilometrage: 300, etat: "Hors service" },
];

let selectedBus = null;
let currentPage = 1;
const itemsPerPage = 5;

// Elements du DOM
const busTable = document.getElementById("busTable");
const searchInput = document.getElementById("searchInput");
const stateFilter = document.getElementById("stateFilter");
const typeFilter = document.getElementById("typeFilter");

// Fonction d'affichage du tableau de bus
function renderBusTable(filteredBuses) {
    busTable.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBuses = filteredBuses.slice(startIndex, startIndex + itemsPerPage);

    if (paginatedBuses.length === 0) {
        busTable.innerHTML = `<tr><td colspan="6" class="text-center">Aucun bus trouvé</td></tr>`;
        return;
    }

    paginatedBuses.forEach((bus, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${bus.immatriculation}</td>
            <td>${bus.type}</td>
            <td>${bus.places}</td>
            <td>${bus.kilometrage}</td>
            <td>${bus.etat}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editBus(${index + startIndex})">Modifier</button>
                <button class="btn btn-danger btn-sm" onclick="confirmDelete(${index + startIndex})">Supprimer</button>
            </td>
        `;
        busTable.appendChild(row);
    });
}

// Fonction de filtrage
function applyFilters() {
    let filteredBuses = [...buses];

    const stateValue = stateFilter.value;
    const typeValue = typeFilter.value;
    const searchValue = searchInput.value.trim().toLowerCase();

    if (stateValue !== "État") filteredBuses = filteredBuses.filter(bus => bus.etat === stateValue);
    if (typeValue !== "Type") filteredBuses = filteredBuses.filter(bus => bus.type === typeValue);
    if (searchValue) filteredBuses = filteredBuses.filter(bus =>
        bus.immatriculation.toLowerCase().includes(searchValue)
    );

    renderBusTable(filteredBuses);
}

// Pagination
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        applyFilters();
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage * itemsPerPage < buses.length) {
        currentPage++;
        applyFilters();
    }
});

// Ajouter ou Modifier un bus
document.getElementById("addBus").addEventListener("click", () => {
    selectedBus = null;
    document.getElementById("busForm").reset();
    document.getElementById("busFormModalLabel").textContent = "Ajouter un Bus";
    new bootstrap.Modal(document.getElementById("busFormModal")).show();
});

document.getElementById("saveBus").addEventListener("click", () => {
    const immatriculation = document.getElementById("immatriculation").value;
    const type = document.getElementById("type").value;
    const places = parseInt(document.getElementById("places").value);
    const kilometrage = parseInt(document.getElementById("kilometrage").value);
    const etat = document.getElementById("etat").value;

    const newBus = { immatriculation, type, places, kilometrage, etat };

    if (selectedBus !== null) {
        buses[selectedBus] = newBus;
    } else {
        buses.push(newBus);
    }

    selectedBus = null;
    applyFilters();
    bootstrap.Modal.getInstance(document.getElementById("busFormModal")).hide();
});

// Modifier un bus
function editBus(index) {
    selectedBus = index;
    const bus = buses[index];

    document.getElementById("immatriculation").value = bus.immatriculation;
    document.getElementById("type").value = bus.type;
    document.getElementById("places").value = bus.places;
    document.getElementById("kilometrage").value = bus.kilometrage;
    document.getElementById("etat").value = bus.etat;

    document.getElementById("busFormModalLabel").textContent = "Modifier un Bus";
    new bootstrap.Modal(document.getElementById("busFormModal")).show();
}

// Supprimer un bus
function confirmDelete(index) {
    const bus = buses[index];
    
    // Vérification si l'état du bus est "Actif"
    if (bus.etat === "Actif") {
        alert("Vous ne pouvez pas supprimer un bus qui est actuellement actif.");
        return;
    }

    // Si l'état n'est pas "Actif", afficher le modal de suppression
    selectedBus = index;
    new bootstrap.Modal(document.getElementById("deleteModal")).show();
}

document.getElementById("confirmDelete").addEventListener("click", () => {
    if (selectedBus !== null) {
        buses.splice(selectedBus, 1);
        applyFilters();
        bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();
    }
});

// Recherche & Filtre dynamique
searchInput.addEventListener("input", applyFilters);
stateFilter.addEventListener("change", applyFilters);
typeFilter.addEventListener("change", applyFilters);

// Afficher les bus dès le chargement
applyFilters();

// Récupération des éléments
const etatSelect = document.getElementById("etat");
const motifContainer = document.getElementById("motifContainer");
const motifSelect = document.getElementById("motif");
const saveBusButton = document.getElementById("saveBus");

// Afficher ou cacher le champ "Motif" selon l'état choisi
etatSelect.addEventListener("change", function() {
    if (etatSelect.value === "Hors service") {
        motifContainer.style.display = "block";
        motifSelect.setAttribute("required", "true");
    } else {
        motifContainer.style.display = "none";
        motifSelect.value = ""; // Réinitialiser le motif sélectionné
        motifSelect.removeAttribute("required");
    }
});

// Gestion de l'enregistrement d'un bus
saveBusButton.addEventListener("click", function(event) {
    const immatriculation = document.getElementById("immatriculation").value.trim();
    const type = document.getElementById("type").value;
    const places = document.getElementById("places").value.trim();
    const kilometrage = document.getElementById("kilometrage").value.trim();
    const etat = etatSelect.value;
    const motif = motifSelect.value;

    // Vérifier si tous les champs sont remplis
    if (!immatriculation || !type || !places || !kilometrage || !etat) {
        alert("Tous les champs sont obligatoires.");
        return;
    }

    // Vérification si l'état est "Hors service" et que le motif est manquant
    if (etat === "Hors service" && !motif) {
        alert("Vous devez fournir un motif (Panne ou Vieillesse) pour la mise en hors circulation.");
        return;
    }

    // Logique d'enregistrement ici
    alert("Bus enregistré avec succès !");

    // Réinitialiser le formulaire après l'enregistrement
    document.getElementById("busForm").reset();
    motifContainer.style.display = "none";
});


// Fonction pour télécharger la liste des bus au format CSV
function downloadCSV() {
    const csvContent = [
        ["Immatriculation", "Type", "Nombre de places", "Kilométrage", "État"]
    ];

    buses.forEach(bus => {
        csvContent.push([
            bus.immatriculation,
            bus.type,
            bus.places,
            bus.kilometrage,
            bus.etat
        ]);
    });

    const csvString = csvContent.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "liste_des_bus.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Attacher l'événement au bouton "Exporter"
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

// Permet de prévisualiser l'image choisie
const profileImageInput = document.getElementById('profileImageInput');
const profileImage = document.getElementById('profileImage');

profileImageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function logout() {
    // Effacer les données de connexion (si tu utilises localStorage ou sessionStorage)
    localStorage.removeItem('email'); // Par exemple, si tu stockes l'email dans le localStorage
    localStorage.removeItem('password');
    
    // Rediriger vers la page de login
    window.location.href = "../Login/login.html";
}


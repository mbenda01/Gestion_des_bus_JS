const conducteurs = [
    { matricule: "001", nom: "Diop", prenom: "Abdou", telephone: "778888888", typePermis: "D", dateAffectation: "2025-03-20", statut: "Actif" },
    { matricule: "002", nom: "Ndiaye", prenom: "Fatou", telephone: "776666666", typePermis: "C", dateAffectation: "2025-03-15", statut: "En congé" },
    { matricule: "003", nom: "Fall", prenom: "Cheikh", telephone: "779999999", typePermis: "E", dateAffectation: "2025-03-10", statut: "Actif" },
    { matricule: "004", nom: "Ba", prenom: "Aminata", telephone: "775555555", typePermis: "B", dateAffectation: "2025-03-05", statut: "Suspendu" },
];

let selectedConducteur = null;

// Affichage des conducteurs
function renderConducteurTable(filteredConducteurs = conducteurs) {
    const conducteurTable = document.getElementById("conducteurTable");
    conducteurTable.innerHTML = "";

    if (filteredConducteurs.length === 0) {
        conducteurTable.innerHTML = `<tr><td colspan="8" class="text-center">Aucun conducteur trouvé</td></tr>`;
        return;
    }

    filteredConducteurs.forEach((conducteur, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${conducteur.matricule}</td>
            <td>${conducteur.nom}</td>
            <td>${conducteur.prenom}</td>
            <td>${conducteur.telephone}</td>
            <td>${conducteur.typePermis}</td>
            <td>${conducteur.dateAffectation}</td>
            <td>${conducteur.statut}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editConducteur(${index})">Modifier</button>
                <button class="btn btn-danger btn-sm" onclick="deleteConducteur(${index})">Supprimer</button>
            </td>
        `;
        conducteurTable.appendChild(row);
    });
}

// Fonction pour appliquer les filtres
function applyFilters() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const typePermisFilter = document.getElementById("typePermisFilter").value;

    const filteredConducteurs = conducteurs.filter(conducteur => {
        const matchesSearch = conducteur.nom.toLowerCase().includes(searchInput) ||
                              conducteur.prenom.toLowerCase().includes(searchInput) ||
                              conducteur.telephone.includes(searchInput) ||
                              conducteur.matricule.includes(searchInput);

        const matchesType = typePermisFilter === "Type de Permis" || conducteur.typePermis === typePermisFilter;

        return matchesSearch && matchesType;
    });

    renderConducteurTable(filteredConducteurs);
}

// Ajouter ou modifier un conducteur
document.getElementById("saveConducteur").addEventListener("click", () => {
    const matricule = document.getElementById("matricule").value;
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const telephone = document.getElementById("telephone").value;
    const typePermis = document.getElementById("typePermis").value;
    const dateAffectation = document.getElementById("dateAffectation").value;
    const statut = document.getElementById("statut").value;

    if (!matricule || !nom || !prenom || !telephone || !typePermis || !dateAffectation || !statut) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const newConducteur = { matricule, nom, prenom, telephone, typePermis, dateAffectation, statut };

    if (selectedConducteur !== null) {
        conducteurs[selectedConducteur] = newConducteur; // Modification d'un conducteur existant
    } else {
        conducteurs.push(newConducteur); // Ajout d'un nouveau conducteur
    }

    selectedConducteur = null; // Réinitialisation de la sélection
    document.getElementById("conducteurForm").reset();
    applyFilters();

    // Fermer le modal après enregistrement
    const conducteurFormModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("conducteurFormModal"));
    conducteurFormModal.hide();
});

// Afficher le modal quand on clique sur le bouton "Nouveau Conducteur"
document.getElementById("addConducteur").addEventListener("click", () => {
    selectedConducteur = null; // Réinitialise l'indice de sélection
    document.getElementById("conducteurForm").reset(); // Réinitialise le formulaire
    document.getElementById("conducteurFormModalLabel").textContent = "Ajouter un Conducteur";
    
    // Affiche le modal
    const conducteurFormModal = new bootstrap.Modal(document.getElementById("conducteurFormModal"));
    conducteurFormModal.show();
});


// Modifier un conducteur
function editConducteur(index) {
    selectedConducteur = index;
    const conducteur = conducteurs[index];

    document.getElementById("matricule").value = conducteur.matricule;
    document.getElementById("nom").value = conducteur.nom;
    document.getElementById("prenom").value = conducteur.prenom;
    document.getElementById("telephone").value = conducteur.telephone;
    document.getElementById("typePermis").value = conducteur.typePermis;
    document.getElementById("dateAffectation").value = conducteur.dateAffectation;
    document.getElementById("statut").value = conducteur.statut;

    document.getElementById("conducteurFormModalLabel").textContent = "Modifier un Conducteur";
    new bootstrap.Modal(document.getElementById("conducteurFormModal")).show();
}

// Supprimer un conducteur
function deleteConducteur(index) {
    if (confirm("Voulez-vous vraiment supprimer ce conducteur ?")) {
        conducteurs.splice(index, 1);
        applyFilters();
    }
}

// Recherche dynamique
document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("typePermisFilter").addEventListener("change", applyFilters);

// Affichage initial
applyFilters();

// Exporter la liste des conducteurs en CSV
function downloadCSV() {
    const csvContent = [
        ["Matricule", "Nom", "Prénom", "Téléphone", "Type de Permis", "Date d'Affectation", "Statut"]
    ];

    conducteurs.forEach(conducteur => {
        csvContent.push([
            conducteur.matricule,
            conducteur.nom,
            conducteur.prenom,
            conducteur.telephone,
            conducteur.typePermis,
            conducteur.dateAffectation,
            conducteur.statut
        ]);
    });

    const csvString = csvContent.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "liste_des_conducteurs.csv";
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
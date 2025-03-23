const conducteurs = [
    { id: "001", nom: "Diop", prenom: "Abdou", typePermis: "D", dateAffectation: "2023-01-15", statut: "Actif" },
    { id: "002", nom: "Ndiaye", prenom: "Fatou", typePermis: "C", dateAffectation: "2023-02-20", statut: "En congé" },
    { id: "003", nom: "Fall", prenom: "Cheikh", typePermis: "E", dateAffectation: "2022-12-05", statut: "Actif" },
    { id: "004", nom: "Ba", prenom: "Aminata", typePermis: "B", dateAffectation: "2023-03-10", statut: "Suspendu" },
];

function renderConducteurTable() {
    const conducteurTable = document.getElementById("conducteurTable");
    conducteurTable.innerHTML = conducteurs.map((conducteur, index) => `
        <tr>
            <td>${conducteur.id}</td>
            <td>${conducteur.nom}</td>
            <td>${conducteur.prenom}</td>
            <td>${conducteur.typePermis}</td>
            <td>${conducteur.dateAffectation}</td>
            <td>${conducteur.statut}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editConducteur(${index})">Modifier</button>
                <button class="btn btn-danger btn-sm" onclick="deleteConducteur(${index})">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

function editConducteur(index) {
    const conducteur = conducteurs[index];
    alert(`Modifier le conducteur : ${conducteur.nom} ${conducteur.prenom}`);
}

function deleteConducteur(index) {
    if (confirm("Voulez-vous vraiment supprimer ce conducteur ?")) {
        conducteurs.splice(index, 1);
        renderConducteurTable();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderConducteurTable();
});

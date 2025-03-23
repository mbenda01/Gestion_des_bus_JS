const lignes = [
    { numero: "L001", nombreKm: 10, tarif: 500 },
    { numero: "L002", nombreKm: 15, tarif: 700 },
    { numero: "L003", nombreKm: 20, tarif: 1000 }
];

function renderLigneTable() {
    const ligneTable = document.getElementById("ligneTable");
    ligneTable.innerHTML = lignes.map((ligne, index) => `
        <tr>
            <td>${ligne.numero}</td>
            <td>${ligne.nombreKm} Km</td>
            <td>${ligne.tarif} F CFA</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editLigne(${index})">Modifier</button>
                <button class="btn btn-danger btn-sm" onclick="deleteLigne(${index})">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

function editLigne(index) {
    const ligne = lignes[index];
    alert(`Modification de la ligne : ${ligne.numero}`);
}

function deleteLigne(index) {
    if (confirm("Voulez-vous vraiment supprimer cette ligne ?")) {
        lignes.splice(index, 1);
        renderLigneTable();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderLigneTable();
});

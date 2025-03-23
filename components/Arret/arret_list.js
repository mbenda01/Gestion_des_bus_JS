const arrets = [
    { numero: "A001", nom: "Arrêt Liberté 6", lignes: ["L001", "L002"] },
    { numero: "A002", nom: "Arrêt Colobane", lignes: ["L002", "L003"] },
    { numero: "A003", nom: "Arrêt Grand Yoff", lignes: ["L001"] }
];

function renderArretTable() {
    const arretTable = document.getElementById("arretTable");
    arretTable.innerHTML = arrets.map((arret, index) => `
        <tr>
            <td>${arret.numero}</td>
            <td>${arret.nom}</td>
            <td>${arret.lignes.join(", ")}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editArret(${index})">Modifier</button>
                <button class="btn btn-danger btn-sm" onclick="deleteArret(${index})">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

function editArret(index) {
    const arret = arrets[index];
    alert(`Modification de l'arrêt : ${arret.nom}`);
}

function deleteArret(index) {
    if (confirm("Voulez-vous vraiment supprimer cet arrêt ?")) {
        arrets.splice(index, 1);
        renderArretTable();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderArretTable();
});

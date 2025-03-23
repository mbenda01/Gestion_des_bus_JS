const trajets = [
    { numero: "T001", type: "Aller", conducteur: "Diop Abdou", ligne: "L001", date: "2025-03-23", ticketsDispo: 50, ticketsVendus: 40 },
    { numero: "T002", type: "Retour", conducteur: "Ndiaye Fatou", ligne: "L002", date: "2025-03-23", ticketsDispo: 60, ticketsVendus: 60 }
];

function renderTrajetTable() {
    const trajetTable = document.getElementById("trajetTable");
    trajetTable.innerHTML = trajets.map((trajet, index) => `
        <tr>
            <td>${trajet.numero}</td>
            <td>${trajet.type}</td>
            <td>${trajet.conducteur}</td>
            <td>${trajet.ligne}</td>
            <td>${trajet.date}</td>
            <td>${trajet.ticketsDispo}</td>
            <td>${trajet.ticketsVendus}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editTrajet(${index})">Modifier</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTrajet(${index})">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

function editTrajet(index) {
    const trajet = trajets[index];
    alert(`Modification du trajet : ${trajet.numero}`);
}

function deleteTrajet(index) {
    if (confirm("Voulez-vous vraiment supprimer ce trajet ?")) {
        trajets.splice(index, 1);
        renderTrajetTable();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderTrajetTable();
});

const buses = [
    { immatriculation: "DK-001", type: "Tata", places: 30, kilometrage: 120, etat: "Actif" },
    { immatriculation: "DK-002", type: "Car rapide", places: 20, kilometrage: 200, etat: "Hors service" },
    { immatriculation: "DK-003", type: "DDK", places: 40, kilometrage: 150, etat: "Actif" },
    { immatriculation: "DK-004", type: "Tata", places: 50, kilometrage: 300, etat: "Hors service" },
];

function renderBusTable() {
    const busTable = document.getElementById("busTable");
    busTable.innerHTML = buses.map((bus, index) => `
        <tr>
            <td>${bus.immatriculation}</td>
            <td>${bus.type}</td>
            <td>${bus.places}</td>
            <td>${bus.kilometrage}</td>
            <td>${bus.etat}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editBus(${index})">Modifier</button>
                <button class="btn btn-danger btn-sm" onclick="deleteBus(${index})">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

function editBus(index) {
    const bus = buses[index];
    alert(`Modifier le bus : ${bus.immatriculation}`);
}

function deleteBus(index) {
    if (confirm('Voulez-vous vraiment supprimer ce bus ?')) {
        buses.splice(index, 1);
        renderBusTable();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderBusTable();
});

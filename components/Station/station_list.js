const stations = [
    { numero: "S001", nom: "Station Médina", adresse: "Rue 1, Médina" },
    { numero: "S002", nom: "Station Colobane", adresse: "Boulevard du Centenaire" },
    { numero: "S003", nom: "Station Liberté 6", adresse: "Avenue Blaise Diagne" }
];

function renderStationTable() {
    const stationTable = document.getElementById("stationTable");
    stationTable.innerHTML = stations.map((station, index) => `
        <tr>
            <td>${station.numero}</td>
            <td>${station.nom}</td>
            <td>${station.adresse}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editStation(${index})">Modifier</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStation(${index})">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

function editStation(index) {
    const station = stations[index];
    alert(`Modification de la station : ${station.nom}`);
}

function deleteStation(index) {
    if (confirm("Voulez-vous vraiment supprimer cette station ?")) {
        stations.splice(index, 1);
        renderStationTable();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderStationTable();
});

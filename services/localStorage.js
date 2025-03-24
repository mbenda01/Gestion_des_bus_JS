/*
// LocalStorage Utility Functions

// Sauvegarder les données d'un composant
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Récupérer les données d'un composant
function getFromLocalStorage(key, defaultValue = []) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

// Pour les arrêts (Arret/arrêt_list.js)
function saveArrets_ls(arrets) {
    saveToLocalStorage('arrets', arrets);
}

function getArrets_ls() {
    return getFromLocalStorage('arrets');
}

// Pour les bus (Bus/bus_list.js)
function saveBuses_ls(buses) {
    saveToLocalStorage('buses', buses);
}

function getBuses_ls() {
    return getFromLocalStorage('buses');
}

// Pour les conducteurs (Conducteur/conducteurs.js)
function saveConducteurs_ls(conducteurs) {
    saveToLocalStorage('conducteurs', conducteurs);
}

function getConducteurs_ls() {
    return getFromLocalStorage('conducteurs');
}

// Pour les trajets (Trajet/trajet_list.js)
function saveTrajets_ls(trajets) {
    saveToLocalStorage('trajets', trajets);
}

function getTrajets_ls() {
    return getFromLocalStorage('trajets');
}

// Pour les lignes (Ligne/ligne_list.js)
function saveLignes_ls(lignes) {
    saveToLocalStorage('lignes', lignes);
}

function getLignes_ls() {
    return getFromLocalStorage('lignes');
}

// Pour les stations (Station/station_list.js)
function saveStations_ls(stations) {
    saveToLocalStorage('stations', stations);
}

function getStations_ls() {
    return getFromLocalStorage('stations');
}

// Exporter les fonctions pour les utiliser dans d'autres fichiers
export {
    saveArrets_ls,
    getArrets_ls,
    saveBuses_ls,
    getBuses_ls,
    saveConducteurs_ls,
    getConducteurs_ls,
    saveTrajets_ls,
    getTrajets_ls,
    saveLignes_ls,
    getLignes_ls,
    saveStations_ls,
    getStations_ls
};
*/
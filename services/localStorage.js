// Enregistre des données dans localStorage
export function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Récupère des données depuis localStorage
export function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// Supprime des données du localStorage
export function removeData(key) {
    localStorage.removeItem(key);
}

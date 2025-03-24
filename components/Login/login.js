const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Vérification des identifiants pour RP et RT
    if (email === 'rp' && password === 'rp') {
        window.location.href = '../../components/Bus/bus_list.html'; // Redirection vers la page des bus
    } else if (email === 'rt' && password === 'rt') {
        window.location.href = '../../components/Trajet/trajet_list.html'; // Redirection vers la page des trajets
    } else {
        alert('Identifiants incorrects');
    }
});

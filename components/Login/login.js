const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (
        (email === 'rp' && password === 'rp') || 
        (email === 'rt' && password === 'rt')
    ) {
        window.location.href = '../../components/Bus/bus_list.html';
    } else {
        alert('Identifiants incorrects');
    }
});

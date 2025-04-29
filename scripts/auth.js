// js/auth.js
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

// Verifica si ya está "logueado" al cargar la página de login
if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'app.html'; // Redirige si ya hay sesión
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulación simple: cualquier usuario/contraseña funciona
    if (username && password) {
        console.log('Login simulado exitoso.');
        // Guarda el estado de login en localStorage
        localStorage.setItem('isLoggedIn', 'true');
        // Guarda el usuario (simulado)
        localStorage.setItem('currentUser', username);
        window.location.href = 'app.html'; // Redirige a la app
    } else {
        loginError.style.display = 'block'; // Muestra mensaje de error
    }
});
// Simulación de publicaciones
const posts = [
    { id: 1, title: "Primera Publicación", type: "Noticia" },
    { id: 2, title: "Segunda Publicación", type: "Blog" },
];

// Cargar publicaciones dinámicamente
function loadPosts() {
    const postsContainer = document.getElementById('postsContainer');
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>Tipo: ${post.type}</p>
        `;
        postsContainer.appendChild(postDiv);
    });
}

// Inicializar la carga de publicaciones
document.addEventListener('DOMContentLoaded', loadPosts);

// Función para mostrar el modal de login
document.getElementById('adminLink').addEventListener('click', function (event) {
    event.preventDefault();  // Prevenir el comportamiento predeterminado del enlace
    document.getElementById('loginModal').style.display = 'block';  // Mostrar el modal
});

// Función para cerrar el modal
function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Función para manejar el inicio de sesión
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificar las credenciales de usuario
    if (username === "admin" && password === "admin123") {
        alert("Bienvenido al panel de administración.");
        // Redirige al panel de administración
        window.location.href = "./admin.html";
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

// Mostrar el modal de inicio de sesión cuando se haga clic en "Administrador"
document.getElementById('adminLink').addEventListener('click', function (event) {
    event.preventDefault();  // Prevenir el comportamiento predeterminado del enlace
    document.getElementById('loginModal').style.display = 'block';  // Mostrar el modal
});

// Función para cerrar el modal de inicio de sesión
function closeModal() {
    document.getElementById('loginModal').style.display = 'none';  // Ocultar el modal
}

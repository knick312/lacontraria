// Mostrar u ocultar secciones
function showSection(sectionId) {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

// Abrir el modal para agregar/editar publicaciones
function openPostForm() {
    document.getElementById('postModal').style.display = 'block';
    document.getElementById('postForm').reset();
    document.getElementById('postId').value = ''; // Limpia el ID para indicar una nueva publicación
}

// Cerrar el modal
function closeModal() {
    document.getElementById('postModal').style.display = 'none';
}

// Guardar publicación
function savePost(event) {
    event.preventDefault();
    const postId = document.getElementById('postId').value;
    const postTitle = document.getElementById('postTitle').value;
    const postType = document.getElementById('postType').value;

    // Lógica para guardar (agregar/editar) publicación
    if (postId) {
        console.log(`Editando publicación ${postId}: ${postTitle} (${postType})`);
    } else {
        console.log(`Nueva publicación: ${postTitle} (${postType})`);
    }
    closeModal();
}

// Simulación de cierre de sesión
function logout() {
    alert('Sesión cerrada.');
    window.location.href = './index.html';
}

function verifyAdminAccess(event) {
    event.preventDefault();

    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    // Usuario y contraseña predefinidos
    const validUsername = "admin";
    const validPassword = "admin123";

    if (username === validUsername && password === validPassword) {
        document.getElementById('loginPanel').style.display = 'none';
        document.getElementById('adminPanelContent').style.display = 'block';
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}


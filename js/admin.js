// Simulación de base de datos con SQL.js
let db;

// Función para inicializar la base de datos
function initDatabase() {
    const SQL = window.SQL;
    db = new SQL.Database();

    // Crear la tabla de publicaciones si no existe
    db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, title TEXT, type TEXT, image BLOB)");

    // Crear la tabla de usuarios si no existe
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");

    // Insertar un usuario admin predeterminado si no existe
    const userStmt = db.prepare("SELECT * FROM users WHERE username = ?");
    userStmt.bind(["admin"]);
    if (!userStmt.step()) {
        // Si no existe, insertar el usuario admin
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", ["admin", "admin123"]);
    }
    userStmt.free();

    loadPosts();  // Cargar publicaciones después de inicializar la base de datos
}

// Función para cargar publicaciones en la tabla
function loadPosts() {
    const stmt = db.prepare("SELECT * FROM posts");
    const tableBody = document.getElementById('postTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';  // Limpiar la tabla antes de cargar nuevas publicaciones

    while (stmt.step()) {
        const row = stmt.getAsObject();
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).textContent = row.type;
        newRow.insertCell(1).textContent = row.title;

        // Si hay una imagen en la publicación, mostrarla
        if (row.image) {
            const imageCell = newRow.insertCell(2);
            const img = document.createElement('img');
            img.src = row.image;
            img.style.width = '100px';  // Tamaño de la imagen
            imageCell.appendChild(img);
        }
    }
    stmt.free();
}

// Función para mostrar el modal de agregar publicación
function openPostForm() {
    document.getElementById('postModal').style.display = 'block';
}

// Función para cerrar el modal de agregar publicación
function closePostForm() {
    document.getElementById('postModal').style.display = 'none';
}

// Función para guardar una nueva publicación
function savePost(event) {
    event.preventDefault();

    const title = document.getElementById('postTitle').value;
    const type = document.getElementById('postType').value;

    // Insertar nueva publicación en la base de datos
    const stmt = db.prepare("INSERT INTO posts (title, type) VALUES (?, ?)");
    stmt.run([title, type]);
    stmt.free();

    // Recargar las publicaciones después de guardar
    loadPosts();

    // Cerrar el modal
    closePostForm();
}

// Función para manejar el logout
document.getElementById('logoutLink').addEventListener('click', function () {
    // Resetear la sesión
    document.getElementById('logoutLink').style.display = 'none';
    window.location.href = "./index.html";  // Redirigir al inicio
});

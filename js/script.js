let db;

// Función para inicializar la base de datos
function initDatabase() {
    const SQL = window.SQL;
    db = new SQL.Database();

    // Crear la tabla de publicaciones si no existe
    db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, title TEXT, type TEXT, image BLOB)");

    // Crear la tabla de usuarios si no existe
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");

    // Insertar usuario administrador predeterminado si no existe
    const userStmt = db.prepare("SELECT * FROM users WHERE username = ?");
    userStmt.bind(["admin"]);
    if (!userStmt.step()) {
        // Si no existe, insertar el usuario admin
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", ["admin", "admin123"]);
    }
    userStmt.free();

    loadPosts();  // Cargar publicaciones al inicializar la base de datos
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

// Mostrar el modal de inicio de sesión cuando se haga clic en "Administrador"
document.getElementById('adminLink').addEventListener('click', function (event) {
    event.preventDefault();  // Prevenir el comportamiento predeterminado del enlace
    document.getElementById('loginModal').style.display = 'block';  // Mostrar el modal
});

// Función para cerrar el modal de inicio de sesión
function closeModal() {
    document.getElementById('loginModal').style.display = 'none';  // Ocultar el modal
}

// Función para manejar el inicio de sesión
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Consulta para verificar si el usuario y la contraseña son correctos
    const stmt = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    stmt.bind([username, password]);

    if (stmt.step()) {
        // Usuario y contraseña correctos
        closeModal();  // Cerrar el modal de inicio de sesión
        document.getElementById('logoutLink').style.display = 'inline';  // Mostrar el enlace de cerrar sesión
        window.location.href = "admin.html";  // Redirigir a la página de administración
    } else {
        // Usuario o contraseña incorrectos
        alert("Usuario o contraseña incorrectos.");
    }
    stmt.free();
}

// Función para manejar el cierre de sesión
document.getElementById('logoutLink').addEventListener('click', function () {
    // Resetear la sesión
    document.getElementById('

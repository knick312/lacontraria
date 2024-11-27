let db; // Variable global para la base de datos

// Función para inicializar la base de datos SQLite
function initDatabase() {
    const SQL = window.SQL;
    db = new SQL.Database();

    // Crear tablas si no existen
    db.run(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY, 
            title TEXT, 
            type TEXT, 
            image BLOB
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY, 
            username TEXT, 
            password TEXT
        )
    `);

    // Verificar e insertar usuario administrador predeterminado
    const userStmt = db.prepare("SELECT * FROM users WHERE username = ?");
    userStmt.bind(["admin"]);
    if (!userStmt.step()) {
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", ["admin", "admin123"]);
    }
    userStmt.free();

    // Cargar publicaciones al inicializar la base de datos
    loadPosts();
}

// Función para cargar publicaciones en la tabla de la interfaz
function loadPosts() {
    const stmt = db.prepare("SELECT * FROM posts");
    const tableBody = document.getElementById('postTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Limpiar contenido existente

    while (stmt.step()) {
        const row = stmt.getAsObject();
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).textContent = row.type;
        newRow.insertCell(1).textContent = row.title;

        // Mostrar imagen si existe
        if (row.image) {
            const imageCell = newRow.insertCell(2);
            const img = document.createElement('img');
            img.src = row.image;
            img.style.width = '100px';
            imageCell.appendChild(img);
        }
    }
    stmt.free();
}

// Mostrar el modal de inicio de sesión
document.getElementById('adminLink').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('loginModal').style.display = 'block';
});

// Función para cerrar el modal de inicio de sesión
function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Función para manejar el inicio de sesión
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const stmt = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    stmt.bind([username, password]);

    if (stmt.step()) {
        // Usuario válido: cerrar modal y redirigir
        closeModal();
        document.getElementById('logoutLink').style.display = 'inline';
        alert("Inicio de sesión exitoso");
        window.location.href = "admin.html";
    } else {
        // Usuario o contraseña incorrectos
        alert("Usuario o contraseña incorrectos.");
    }
    stmt.free();
}

// Función para manejar el cierre de sesión
document.getElementById('logoutLink').addEventListener('click', function () {
    // Resetear el estado de sesión (opcional)
    document.getElementById('logoutLink').style.display = 'none';
    alert("Sesión cerrada.");
});

// Inicializar la base de datos al cargar la página
document.addEventListener('DOMContentLoaded', initDatabase);

let isRegistering = false;

function openAdminModal() {
    document.getElementById("adminModal").style.display = "flex";
}

function closeAdminModal() {
    document.getElementById("adminModal").style.display = "none";
}

function toggleAdminForm() {
    isRegistering = !isRegistering;
    document.getElementById("registerFields").style.display = isRegistering ? "block" : "none";
    document.getElementById("modalTitle").textContent = isRegistering ? "Registro" : "Iniciar sesión";
    document.getElementById("submitButton").textContent = isRegistering ? "Registrar" : "Iniciar sesión";
    document.getElementById("toggleFormText").textContent = isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate";
}

function handleAdminAction() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = isRegistering ? document.getElementById("email").value : null;

    if (isRegistering) {
        alert(`Registrado: ${username}, ${email}`);
    } else {
        alert(`Logueado: ${username}`);
        closeAdminModal();
        document.getElementById("logoutLink").style.display = "block";
        openAdminInterface();
    }
}

function logout() {
    document.getElementById("logoutLink").style.display = "none";
    alert("Sesión cerrada");
}

function openAdminInterface() {
    document.getElementById("adminInterface").style.display = "flex";
}

function closeAdminInterface() {
    document.getElementById("adminInterface").style.display = "none";
}

function uploadPost() {
    const image = document.getElementById("postImage").files[0];
    const description = document.getElementById("postDescription").value;

    if (image && description) {
        const reader = new FileReader();
        reader.onload = function () {
            const postsContainer = document.getElementById("postsContainer");
            const post = document.createElement("div");
            post.innerHTML = `<img src="${reader.result}" alt="Publicación" style="width: 100%; border-radius: 5px;"><p>${description}</p>`;
            postsContainer.appendChild(post);
            closeAdminInterface();
        };
        reader.readAsDataURL(image);
    }
}

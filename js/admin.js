function openAdminModal() {
    document.getElementById("adminModal").style.display = "block";
}

function closeAdminModal() {
    document.getElementById("adminModal").style.display = "none";
}

function toggleAdminForm() {
    const registerFields = document.getElementById("registerFields");
    const modalTitle = document.getElementById("modalTitle");
    const submitButton = document.getElementById("submitButton");

    if (registerFields.style.display === "none") {
        registerFields.style.display = "block";
        modalTitle.textContent = "Registrarse";
        submitButton.textContent = "Registrarse";
    } else {
        registerFields.style.display = "none";
        modalTitle.textContent = "Iniciar sesión";
        submitButton.textContent = "Iniciar sesión";
    }
}

function uploadPost() {
    const imageInput = document.getElementById("postImage");
    const descriptionInput = document.getElementById("postDescription");
    const postsContainer = document.getElementById("postsContainer");

    if (imageInput.files.length > 0 && descriptionInput.value.trim() !== "") {
        const post = document.createElement("div");
        post.className = "post";

        const img = document.createElement("img");
        img.src = URL.createObjectURL(imageInput.files[0]);
        img.alt = "Publicación";
        img.style.width = "100%";

        const desc = document.createElement("p");
        desc.textContent = descriptionInput.value.trim();

        post.appendChild(img);
        post.appendChild(desc);
        postsContainer.appendChild(post);

        imageInput.value = "";
        descriptionInput.value = "";

        alert("Publicación subida exitosamente.");
    } else {
        alert("Por favor, llena todos los campos.");
    }
}

function addManualPost() {
    const manualPostInput = document.getElementById("manualPostInput").value.trim();
    const postsContainer = document.getElementById("postsContainer");

    if (manualPostInput) {
        const postElement = document.createElement("div");
        postElement.innerHTML = manualPostInput;

        if (postElement

document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text"; // Show password
        eyeIcon.classList.remove("bi-eye"); // Change icon to eye-slash
        eyeIcon.classList.add("bi-eye-slash");
    } else {
        passwordInput.type = "password"; // Hide password
        eyeIcon.classList.remove("bi-eye-slash"); // Change icon back to eye
        eyeIcon.classList.add("bi-eye");
    }
});

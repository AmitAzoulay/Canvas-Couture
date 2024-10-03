// Function to handle form validation
function handleFormValidation(event) {
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.error').forEach(el => {
        el.style.display = 'none';
        el.innerHTML = '';
    });

    // Validate email
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(emailInput.value)) {
        emailError.innerHTML = 'Email is not valid.';
        emailError.style.display = 'block';
        isValid = false;
    }

    // Validate phone number
    const phoneInput = document.getElementById('phoneNumber');
    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^\+?[0-9]{1,3}[-. ]?[0-9]{3,4}[-. ]?[0-9]{3,4}$/;

    if (!phoneRegex.test(phoneInput.value)) {
        phoneError.innerHTML = 'Phone number is not valid.';
        phoneError.style.display = 'block';
        isValid = false;
    }

    // Validate password
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');

    if (passwordInput.value.length < 6 || !/\d/.test(passwordInput.value) || !/[a-zA-Z]/.test(passwordInput.value)) {
        passwordError.innerHTML = 'Password must be at least 6 characters and include letters and numbers.';
        passwordError.style.display = 'block';
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault(); // Prevent form submission if invalid
    }
}

// Add event listeners for both forms
const registerForm = document.getElementById('registerForm');
const addUserForm = document.getElementById('addUserForm');

if (registerForm) {
    registerForm.addEventListener('submit', handleFormValidation);
}

if (addUserForm) {
    addUserForm.addEventListener('submit', handleFormValidation);
}

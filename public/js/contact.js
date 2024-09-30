document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    form.addEventListener('submit', (event) => {
        let isValid = true;
        
        // Check if email is valid
        if (!validateEmail(emailInput.value)) {
            alert('Please enter a valid email.');
            isValid = false;
        }
        
        // Check if message is empty
        if (messageInput.value.trim() === '') {
            alert('Please enter a message.');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form from submitting if not valid
        }
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }
});

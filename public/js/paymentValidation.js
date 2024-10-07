$(document).ready(function () {
    $('form').on('submit', function (event) {
        // Prevent form submission for validation
        event.preventDefault();

        // Get form values
        const address = $('#address').val().trim();
        const cardName = $('#cardName').val().trim();
        const cardNumber = $('#cardNumber').val().trim();
        const expiryDate = $('#expiryDate').val().trim();
        const cvv = $('#cvv').val().trim();

        // Regular expressions for validation
        const cardNumberPattern = /^\d{16}$/; // 16 digits
        const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
        const cvvPattern = /^\d{3}$/; // 3 digits

        // Validation flags
        let isValid = true;

        // Address validation
        if (address === "") {
            alert("Address is required.");
            isValid = false;
        }

        // Name validation
        if (cardName === "") {
            alert("Name on Card is required.");
            isValid = false;
        }

        // Card Number validation
        if (!cardNumberPattern.test(cardNumber)) {
            alert("Card Number must be 16 digits.");
            isValid = false;
        }

        // Expiry Date validation
        if (!expiryDatePattern.test(expiryDate)) {
            alert("Expiration Date must be in MM/YY format.");
            isValid = false;
        }

        // CVV validation
        if (!cvvPattern.test(cvv)) {
            alert("CVV must be 3 digits.");
            isValid = false;
        }

        // Submit the form if all validations pass
        if (isValid) {
            this.submit(); // Submit the form
        }
    });
});

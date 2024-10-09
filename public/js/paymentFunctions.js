$(document).ready(function () {
    // Fetch and display all payments
    $('#show-payments-btn').click(function () {
        $.get('/admin/payments', function (payments) {
            const paymentsTableBody = $('#payments-table-body');
            paymentsTableBody.empty();
            payments.payments.forEach(payment => {
                const row = `
                    <tr>
                        <td>${payment._id}</td>
                        <td>${payment.userId}</td>
                        <td>${payment.address}</td>
                        <td>${payment.cardName}</td>
                        <td>${payment.cardNumber}</td>
                        <td>${payment.expiryDate}</td>
                        <td>${payment.cvv}</td>
                        <td>${payment.paymentPrice}</td>
                        <td>${payment.createdAt}</td>
                        <td>
                            <button class="btn btn-warning btn-primary btn-edit" data-id="${payment._id}" 
                                    data-address="${payment.address}"
                                    data-cardname="${payment.cardName}" 
                                    data-cardnumber="${payment.cardNumber}" 
                                    data-expirydate="${payment.expiryDate}" 
                                    data-cvv="${payment.cvv}" 
                                    data-paymentprice="${payment.paymentPrice}">Edit</button>
                            <button class="btn btn-danger btn-delete" data-id="${payment._id}">Delete</button>
                        </td>
                    </tr>
                `;
                paymentsTableBody.append(row);
            });
        });
    });

    // Open edit modal and populate fields
    $('#payments-table-body').on('click', '.btn-edit', function () {
        const paymentId = $(this).data('id');
        const address = $(this).data('address');
        const cardName = $(this).data('cardname');
        const cardNumber = $(this).data('cardnumber');
        const expiryDate = $(this).data('expirydate');
        const cvv = $(this).data('cvv');
        const paymentPrice = $(this).data('paymentprice');

        $('#edit_payment_id').val(paymentId);
        $('#edit_address').val(address);
        $('#edit_cardName').val(cardName);
        $('#edit_cardNumber').val(cardNumber);
        $('#edit_expiryDate').val(expiryDate);
        $('#edit_cvv').val(cvv);
        $('#edit_paymentPrice').val(paymentPrice);

        $('#editPaymentModal').modal('show');
    });

    // Validate credit card details
    function isValidCardNumber(cardNumber) {
        const regex = /^\d{13,19}$/;
        return regex.test(cardNumber) && luhnCheck(cardNumber);
    }

    function luhnCheck(cardNumber) {
        let sum = 0;
        let shouldDouble = false;
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber[i]);
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    }

    function isValidExpiryDate(expiryDate) {
        const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!regex.test(expiryDate)) return false;

        const [month, year] = expiryDate.split('/');
        const now = new Date();
        const expiry = new Date(`20${year}`, month);
        return expiry > now;
    }

    function isValidCvv(cvv) {
        const regex = /^\d{3,4}$/;
        return regex.test(cvv);
    }

    // Confirm payment edit
    $('#confirmPaymentEdit').click(function () {
        const cardNumber = $('#edit_cardNumber').val();
        const expiryDate = $('#edit_expiryDate').val();
        const cvv = $('#edit_cvv').val();

        if (!isValidCardNumber(cardNumber)) {
            alert('Invalid card number');
            return;
        }

        if (!isValidExpiryDate(expiryDate)) {
            alert('Invalid expiry date');
            return;
        }

        if (!isValidCvv(cvv)) {
            alert('Invalid CVV');
            return;
        }

        const paymentId = $('#edit_payment_id').val();
        const updatedData = {
            address: $('#edit_address').val(),
            cardName: $('#edit_cardName').val(),
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
            paymentPrice: $('#edit_paymentPrice').val(),
        };

        $.ajax({
            url: `/admin/payment/${paymentId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedData),
            success: function () {
                alert('Payment updated successfully');
                $('#editPaymentModal').modal('hide');
                $('#show-payments-btn').click(); // Refresh the payments list
            },
            error: function () {
                alert('Error updating payment');
            }
        });
    });

    // Delete payment
    $('#payments-table-body').on('click', '.btn-delete', function () {
        const paymentId = $(this).data('id');

        $.ajax({
            url: `/admin/payment/${paymentId}`,
            type: 'DELETE',
            success: function () {
                alert('Payment deleted successfully');
                $('#show-payments-btn').click(); // Refresh the payments list
            },
            error: function () {
                alert('Error deleting payment');
            }
        });
    });
});

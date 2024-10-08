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
                            <button class="btn btn-primary btn-edit" data-id="${payment._id}" 
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

    // Confirm payment edit
    $('#confirmPaymentEdit').click(function () {
        const paymentId = $('#edit_payment_id').val();
        const updatedData = {
            address: $('#edit_address').val(),
            cardName: $('#edit_cardName').val(),
            cardNumber: $('#edit_cardNumber').val(),
            expiryDate: $('#edit_expiryDate').val(),
            cvv: $('#edit_cvv').val(),
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

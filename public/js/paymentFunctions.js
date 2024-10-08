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
                            <button class="btn btn-danger btn-delete" data-id="${payment._id}">Delete</button>
                        </td>
                    </tr>
                `;
                paymentsTableBody.append(row);
            });
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

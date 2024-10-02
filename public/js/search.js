// Select the form and input elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// Add an event listener to handle the form submission
searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission (page reload)

    // Get the search term from the input field
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
        // Redirect to /products/<searchTerm>
        window.location.href = `/products/search/name/${encodeURIComponent(searchTerm)}`;
    }
});
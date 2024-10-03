// filter.js

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('searchInput');
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    const productList = document.getElementById('productList');
    const applyFiltersButton = document.getElementById('applyFilters');

    function applyFilters() {
        const selectedCategories = Array.from(filterCheckboxes)
            .filter(checkbox => checkbox.checked && checkbox.dataset.type === 'category')
            .map(checkbox => checkbox.value);
        const selectedColors = Array.from(filterCheckboxes)
            .filter(checkbox => checkbox.checked && checkbox.dataset.type === 'color')
            .map(checkbox => checkbox.value);
        const selectedSizes = Array.from(filterCheckboxes)
            .filter(checkbox => checkbox.checked && checkbox.dataset.type === 'size')
            .map(checkbox => checkbox.value);
        const selectedPriceRanges = Array.from(filterCheckboxes)
            .filter(checkbox => checkbox.checked && checkbox.dataset.type === 'price')
            .map(checkbox => checkbox.value);

        const productItems = productList.children;

        for (let item of productItems) {
            const category = item.getAttribute('data-category');
            const color = item.getAttribute('data-color');
            const size = item.getAttribute('data-size');
            const price = parseFloat(item.getAttribute('data-price'));

            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
            const matchesColor = selectedColors.length === 0 || selectedColors.includes(color);
            const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(size);
            const matchesPrice = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => {
                const [min, max] = range.split('-').map(Number);
                return price >= min && price <= max;
            });

            item.style.display = (matchesCategory && matchesColor && matchesSize && matchesPrice) ? 'block' : 'none';
        }
    }

    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.trim().toLowerCase();
        Array.from(productList.children).forEach(item => {
            const title = item.querySelector('.product-title').innerText.toLowerCase();
            item.style.display = title.includes(searchTerm) ? 'block' : 'none';
        });
    });

    applyFiltersButton.addEventListener('click', applyFilters);
});

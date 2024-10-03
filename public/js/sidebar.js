// JavaScript to handle sidebar navigation and content switching
document.querySelectorAll('#sidebar .list-group-item').forEach(function(item) {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove 'active' class from all sidebar items
        document.querySelectorAll('#sidebar .list-group-item').forEach(function(el) {
            el.classList.remove('active');
        });
        
        // Add 'active' class to the clicked sidebar item
        this.classList.add('active');

        // Hide all content sections
        document.querySelectorAll('.content-section').forEach(function(section) {
            section.classList.add('d-none');
        });
        
        // Show the corresponding section based on the data-target attribute
        const target = this.getAttribute('data-target');
        document.getElementById(`${target}-section`).classList.remove('d-none');
    });
});
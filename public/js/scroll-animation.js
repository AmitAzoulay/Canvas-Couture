document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const backToShopButton = document.querySelector('.btn-back');

  function handleScroll() {
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    const documentHeight = document.body.offsetHeight;

    // Handle animations for each element
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top + scrollPosition;

      if (scrollPosition + windowHeight > elementPosition + element.offsetHeight / 3) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });

    // Check if back-to-shop button exists before trying to apply classes
    if (backToShopButton) {
      // Show the back-to-shop button when reaching near the bottom of the page
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        backToShopButton.classList.add('show');
      } else {
        backToShopButton.classList.remove('show');
      }
    }
  }

  // Initial check
  handleScroll();

  // Attach scroll event listener
  window.addEventListener('scroll', handleScroll);
});

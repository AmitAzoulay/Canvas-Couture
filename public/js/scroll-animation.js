// JavaScript to handle scroll animations repeatedly
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.animate-on-scroll');
  
    function handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
  
      elements.forEach(element => {
        if (scrollPosition > element.offsetTop + element.offsetHeight / 3) {
          element.classList.add('visible');
        } else {
          element.classList.remove('visible');
        }
      });
    }
  
    // Initial check
    handleScroll();
  
    // Attach event listener
    window.addEventListener('scroll', handleScroll);
  });
  
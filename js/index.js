// Header scroll behavior: show after scrolling down past threshold (~100px)
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 2) {
      header.classList.remove('opacity-0', '-translate-y-full', 'pointer-events-none');
      header.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
    } else {
      header.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
      header.classList.add('opacity-0', '-translate-y-full', 'pointer-events-none');
    }
  });
}


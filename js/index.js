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

document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('homepage-product-scroll');
  
  // Only run this script if the product grid exists on the current page
  if (productGrid) {
    fetch('/products.json')
      .then(response => response.json())
      .then(products => {
        // Clear any existing content just in case
        productGrid.innerHTML = '';
        
        // Loop through each product in the JSON and create a card
        products.forEach(product => {
          const productCard = `
         <a href="${product.url}" class="group block relative overflow-hidden w-[200px] sm:w-[300px] md:w-[400px] flex-none snap-start">            
              <div class="aspect-[4/5] bg-[#EAE8E1] mb-6 overflow-hidden relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
              </div>
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-serif text-xl mb-1">${product.name}</h3>
                  <p class="text-[11px] uppercase tracking-widest text-[#6B6A65]">${product.color}</p>
                </div>
                <span class="text-sm font-medium">€${product.price}</span>
              </div>
            </a>
          `;
          // Inject the finished card into the grid
          productGrid.insertAdjacentHTML('beforeend', productCard);
        });
      })
      .catch(error => console.error('Error loading products:', error));
  }
});
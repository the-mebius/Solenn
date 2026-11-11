let products = []; // 1. Create a variable to hold the fetched data
let currentCategory = 'all';

// 2. Properly handle the fetch response and assign it to the 'products' array
fetch('./products.json')
  .then(response => response.json())
  .then(data => {
    products = data; 
    window.renderProducts(products); // 3. Render ONLY after data has loaded
  })
  .catch(error => console.error('Error fetching products:', error));

window.renderProducts = function(filteredProducts) {
  // 4. Make sure this ID exactly matches your HTML (you mentioned 'productgrid' earlier)
  const grid = document.getElementById('product-grid'); 
  const emptyState = document.getElementById('empty-state');

  if (!grid) return;

  if (filteredProducts.length === 0) {
    grid.innerHTML = '';
    if(emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if(emptyState) emptyState.classList.add('hidden');
 grid.innerHTML = filteredProducts.map(p => `
    <a href="${p.url}" class="group block">
      <div class="relative aspect-[4/5] bg-[#EAE8E1] overflow-hidden mb-6">
        <!-- Changed p.images to p.image to match JSON -->
        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
      </div>
      <div class="flex justify-between items-baseline mb-1">
        <h3 class="font-serif text-2xl group-hover:text-[#7B8B76] transition-colors">${p.name}</h3>
        <span class="text-sm font-medium tracking-wide">€${p.price}</span>
      </div>
      <!-- Changed category/availability to use p.color from JSON -->
      <p class="text-xs text-[#6B6A65] uppercase tracking-widest">${p.color}</p>
    </a>
  `).join('');
};

window.filterProducts = function(category) {
  currentCategory = category;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.remove('bg-[#EAE8E1]', 'text-[#121210]');
      btn.classList.add('bg-[#121210]', 'text-[#F6F4F0]');
    } else {
      btn.classList.remove('bg-[#121210]', 'text-[#F6F4F0]');
      btn.classList.add('bg-[#EAE8E1]', 'text-[#121210]');
    }
  });

  applyFilterAndSort();
};

window.sortProducts = function() {
  applyFilterAndSort();
};

function applyFilterAndSort() {
  let result = [...products];

  if (currentCategory !== 'all') {
    result = result.filter(p => p.category === currentCategory);
  }

  const sortSelect = document.getElementById('sort-select');
  const sortVal = sortSelect ? sortSelect.value : 'featured';
  if (sortVal === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortVal === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  } else if (sortVal === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  window.renderProducts(result);
}
// Remove the final window.renderProducts(products); from the bottom, as it is now inside the fetch block.
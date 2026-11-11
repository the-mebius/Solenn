// SOLENN — Interactive Cart Drawer Component

function initCartDrawer() {
  if (document.getElementById('solenn-cart-drawer')) return;

  const drawerHtml = `
    <div id="solenn-cart-drawer" class="fixed inset-0 z-50 overflow-hidden pointer-events-none transition-opacity duration-300 opacity-0">
      <div id="cart-backdrop" class="absolute inset-0 bg-[#121210]/40 backdrop-blur-sm pointer-events-none transition-opacity"></div>

      <div class="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
        <div id="cart-panel" class="w-screen max-w-md bg-[#F6F4F0] text-[#121210] shadow-2xl transform transition-transform duration-500 ease-in-out translate-x-full pointer-events-none flex flex-col justify-between">

          <!-- Drawer Header -->
          <div class="p-6 border-b border-[#121210]/10 flex justify-between items-center pointer-events-auto">
            <span class="font-serif text-2xl uppercase tracking-wider">Your Shopping Bag</span>
            <button id="close-cart" class="text-xs uppercase tracking-[0.2em] hover:text-[#7B8B76] transition-colors pointer-events-auto">Close [ESC]</button>
          </div>

          <!-- Cart Items Container -->
          <div id="cart-items-container" class="p-6 overflow-y-auto flex-1 space-y-6 pointer-events-auto">
            <!-- Dynamically populated -->
          </div>

          <!-- Drawer Footer -->
          <div class="p-6 border-t border-[#121210]/10 bg-[#EAE8E1] pointer-events-auto">
            <div class="flex justify-between items-baseline mb-4">
              <span class="text-xs uppercase tracking-[0.2em] text-[#6B6A65]">Subtotal</span>
              <span id="cart-subtotal" class="font-serif text-3xl">€0</span>
            </div>
            <p class="text-[11px] text-[#6B6A65] uppercase tracking-widest mb-6">Taxes and shipping calculated at checkout.</p>
            <button id="checkout-btn" class="w-full py-4 bg-[#121210] text-[#F6F4F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#7B8B76] transition-colors pointer-events-auto">
              Proceed to Secure Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  const drawer = document.getElementById('solenn-cart-drawer');
  const panel = document.getElementById('cart-panel');
  const backdrop = document.getElementById('cart-backdrop');
  const closeBtn = document.getElementById('close-cart');
  const checkoutBtn = document.getElementById('checkout-btn');
  const container = document.getElementById('cart-items-container');

  container.addEventListener('click', (e) => {
    const decBtn = e.target.closest('[data-action="decrease"]');
    if (decBtn) {
      const id = decBtn.dataset.id;
      const item = cartService.getCart().items.find(i => i.id === id);
      if (item) cartService.updateQuantity(id, item.quantity - 1);
    }
    const incBtn = e.target.closest('[data-action="increase"]');
    if (incBtn) {
      const id = incBtn.dataset.id;
      const item = cartService.getCart().items.find(i => i.id === id);
      if (item) cartService.updateQuantity(id, item.quantity + 1);
    }
    const removeBtn = e.target.closest('[data-action="remove"]');
    if (removeBtn) {
      const id = removeBtn.dataset.id;
      cartService.removeItem(id);
    }
  });

  function openDrawer() {
    drawer.classList.remove('pointer-events-none', 'opacity-0');
    drawer.classList.add('opacity-100');
    backdrop.classList.remove('pointer-events-none');
    backdrop.classList.add('pointer-events-auto');
    panel.classList.remove('translate-x-full', 'pointer-events-none');
    panel.classList.add('pointer-events-auto');
    renderCartContents();
  }

  function closeDrawer() {
    panel.classList.remove('pointer-events-auto');
    panel.classList.add('translate-x-full', 'pointer-events-none');
    backdrop.classList.remove('pointer-events-auto');
    backdrop.classList.add('pointer-events-none');
    drawer.classList.remove('opacity-100');
    drawer.classList.add('opacity-0');
    setTimeout(() => {
      drawer.classList.add('pointer-events-none');
    }, 300);
  }

  backdrop.addEventListener('click', closeDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  checkoutBtn.addEventListener('click', async () => {
    await cartService.checkout();
    closeDrawer();
  });

  window.addEventListener('cart:updated', (e) => {
    renderCartContents(e.detail);
    updateCartBadge(e.detail.totalQuantity);
  });

  window.openSolennCart = openDrawer;

  renderCartContents(cartService.getCart());
  updateCartBadge(cartService.getCart().totalQuantity);
}

function renderCartContents(cart = cartService.getCart()) {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  if (!container) return;

  subtotalEl.innerText = `€${cart.subtotal}`;

  if (cart.items.length === 0) {
    container.innerHTML = `
      <div class="text-center py-20">
        <p class="font-serif text-2xl mb-2">Your bag is empty.</p>
        <p class="text-xs uppercase tracking-widest text-[#6B6A65]">Explore Drop 01 to add pieces.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.items.map(item => `
    <div class="flex gap-4 pb-6 border-b border-[#121210]/10 items-center">
      <img src="${item.image[0]}" alt="${item.name}" class="w-20 h-24 object-cover bg-[#EAE8E1]">
      <div class="flex-1">
        <h4 class="font-serif text-lg mb-1">${item.name}</h4>
        <p class="text-[11px] uppercase tracking-widest text-[#6B6A65] mb-2">${item.color} &bull; ${item.size}</p>
        <div class="flex justify-between items-center">
          <div class="flex items-center border border-[#121210]/20 text-xs">
            <button data-action="decrease" data-id="${item.id}" class="px-2.5 py-1 hover:bg-[#121210] hover:text-[#F6F4F0] transition-colors">-</button>
            <span class="px-3 py-1">${item.quantity}</span>
            <button data-action="increase" data-id="${item.id}" class="px-2.5 py-1 hover:bg-[#121210] hover:text-[#F6F4F0] transition-colors">+</button>
          </div>
          <span class="font-medium text-sm">€${item.price * item.quantity}</span>
        </div>
      </div>
      <button data-action="remove" data-id="${item.id}" class="text-xs uppercase tracking-widest text-[#6B6A65] hover:text-[#121210] transition-colors">&times;</button>
    </div>
  `).join('');
}

function updateCartBadge(count) {
  const badge = document.getElementById('cart-count-badge');
  if (badge) {
    badge.innerText = count;
  }
}

initCartDrawer();

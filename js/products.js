import { supabase } from './supabase.js';

let loadedProducts = [];

export async function initProducts(gridSelector = '#product-grid') {
  const gridEl = document.querySelector(gridSelector);
  if (!gridEl) return;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('id', { ascending: true });

  if (error) {
    console.error('Supabase fetch error:', error.message);
    gridEl.innerHTML = `<p>Unable to load collection.</p>`;
    return;
  }

  loadedProducts = data || [];

  gridEl.innerHTML = loadedProducts
    .map((cap, index) => {
      const cover =
        Array.isArray(cap.images) && cap.images.length > 0
          ? cap.images[0]
          : cap.image_url;

      return `
        <article class="product-card" data-product-index="${index}" style="cursor: pointer;">
          <div class="product-media">
            <img src="${cover}" alt="${cap.name}" loading="lazy" />
          </div>
          <div class="product-meta">
            <h3>${cap.name}</h3>
            <span>₹${cap.price}</span>
          </div>
          ${cap.color ? `<p class="product-color">${cap.color}</p>` : ''}
        </article>
      `;
    })
    .join('');

  // Open product modal on card click
  gridEl.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = Number(card.dataset.productIndex);
      openProductModal(loadedProducts[idx]);
    });
  });
}

function openProductModal(cap) {
  let modal = document.getElementById('product-modal');
  if (!modal) {
    const modalHtml = `
      <div id="product-modal" style="display:none;position:fixed;inset:0;z-index:999;background:rgba(18,18,16,0.6);backdrop-filter:blur(4px);place-items:center;padding:1rem;">
        <div style="background:#F6F4F0;border:1px solid rgba(18,18,16,0.15);max-width:860px;width:100%;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));position:relative;color:#121210;font-family:Manrope,sans-serif;box-shadow:0 25px 50px -12px rgba(18,18,16,0.25);">
          <button id="modal-close" type="button" style="position:absolute;top:1rem;right:1rem;background:none;border:none;color:#121210;font-size:11px;text-transform:uppercase;letter-spacing:0.2em;cursor:pointer;padding:0.5rem;">Close [ESC]</button>
          <div style="padding:1.5rem;background:#EAE8E1;">
            <img id="modal-main-img" src="" alt="" style="width:100%;aspect-ratio:1/1;object-fit:cover;background:#F6F4F0;" />
            <div id="modal-thumbs" style="display:flex;gap:0.5rem;margin-top:0.75rem;overflow-x:auto;"></div>
          </div>
          <div style="padding:2.5rem;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <p style="font-size:10px;text-transform:uppercase;letter-spacing:0.25em;color:#6B6A65;margin-bottom:0.5rem;">SOLENN Catalogue</p>
              <h2 id="modal-title" style="font-family:'Instrument Serif',serif;font-size:2.25rem;font-weight:300;margin:0 0 0.75rem;line-height:1.1;"></h2>
              <p id="modal-price" style="font-size:1.25rem;font-weight:400;margin:0 0 1.5rem;"></p>
              <div style="border-top:1px solid rgba(18,18,16,0.1);padding-top:1rem;margin-top:1rem;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;color:#6B6A65;">
                <p style="margin-bottom:0.5rem;">Colorway: <span id="modal-color" style="color:#121210;"></span></p>
                <p>Status: <span id="modal-stock" style="color:#121210;"></span></p>
              </div>
            </div>
            <button id="modal-add-to-bag" type="button" style="width:100%;padding:1rem;background:#121210;color:#F6F4F0;border:none;cursor:pointer;text-transform:uppercase;letter-spacing:0.2em;font-size:11px;font-weight:500;">Add to Bag</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    modal = document.getElementById('product-modal');
  }
  if (!modal || !cap) return;

  const gallery =
    Array.isArray(cap.images) && cap.images.length > 0
      ? cap.images
      : [cap.image_url];

  document.getElementById('modal-title').textContent = cap.name;
  document.getElementById('modal-price').textContent = `₹${cap.price}`;
  document.getElementById('modal-color').textContent = cap.color || 'Signature';
  document.getElementById('modal-stock').textContent =
    cap.stock > 0 ? `In Stock (${cap.stock})` : 'Sold Out';

  const mainImg = document.getElementById('modal-main-img');
  const thumbsContainer = document.getElementById('modal-thumbs');

  mainImg.src = gallery[0];
  mainImg.alt = cap.name;

  thumbsContainer.innerHTML = gallery
    .map(
      (url, i) => `
      <button type="button" class="modal-thumb ${i === 0 ? 'active' : ''}" data-url="${url}">
        <img src="${url}" alt="${cap.name} view ${i + 1}" />
      </button>
    `
    )
    .join('');

  thumbsContainer.querySelectorAll('.modal-thumb').forEach((btn) => {
    btn.addEventListener('click', () => {
      mainImg.src = btn.dataset.url;
      thumbsContainer
        .querySelectorAll('.modal-thumb')
        .forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const addToBagBtn = document.getElementById('modal-add-to-bag');
  if (addToBagBtn) {
    const newBtn = addToBagBtn.cloneNode(true);
    addToBagBtn.parentNode.replaceChild(newBtn, addToBagBtn);
    newBtn.addEventListener('click', () => {
      if (window.cartService) {
        window.cartService.addItem(cap);
      }
      if (typeof window.openSolennCart === 'function') {
        window.openSolennCart();
      }
      modal.style.display = 'none';
    });
  }

  modal.style.display = 'grid';
}

// Close handlers
document.addEventListener('click', (e) => {
  const modal = document.getElementById('product-modal');
  if (!modal || modal.style.display === 'none') return;
  if (e.target === modal || e.target.closest('#modal-close')) {
    modal.style.display = 'none';
  }
});

document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('product-modal');
  if (e.key === 'Escape' && modal && modal.style.display !== 'none') {
    modal.style.display = 'none';
  }
});
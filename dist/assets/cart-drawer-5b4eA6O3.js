(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const d=document.getElementById("site-header");d&&window.addEventListener("scroll",()=>{window.scrollY>=2?(d.classList.remove("opacity-0","-translate-y-full","pointer-events-none"),d.classList.add("opacity-100","translate-y-0","pointer-events-auto")):(d.classList.remove("opacity-100","translate-y-0","pointer-events-auto"),d.classList.add("opacity-0","-translate-y-full","pointer-events-none"))});document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("homepage-product-scroll");r&&fetch("/products.json").then(e=>e.json()).then(e=>{r.innerHTML="",e.forEach(s=>{const t=`
         <a href="${s.url}" class="group block relative overflow-hidden w-[200px] sm:w-[300px] md:w-[400px] flex-none snap-start">            
              <div class="aspect-[4/5] bg-[#EAE8E1] mb-6 overflow-hidden relative">
                <img src="${s.image}" alt="${s.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
              </div>
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-serif text-xl mb-1">${s.name}</h3>
                  <p class="text-[11px] uppercase tracking-widest text-[#6B6A65]">${s.color}</p>
                </div>
                <span class="text-sm font-medium">€${s.price}</span>
              </div>
            </a>
          `;r.insertAdjacentHTML("beforeend",t)})}).catch(e=>console.error("Error loading products:",e))});function y(){if(document.getElementById("solenn-cart-drawer"))return;document.body.insertAdjacentHTML("beforeend",`
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
  `);const e=document.getElementById("solenn-cart-drawer"),s=document.getElementById("cart-panel"),t=document.getElementById("cart-backdrop"),n=document.getElementById("close-cart"),a=document.getElementById("checkout-btn");document.getElementById("cart-items-container").addEventListener("click",o=>{const m=o.target.closest('[data-action="decrease"]');if(m){const i=m.dataset.id,c=cartService.getCart().items.find(u=>u.id===i);c&&cartService.updateQuantity(i,c.quantity-1)}const f=o.target.closest('[data-action="increase"]');if(f){const i=f.dataset.id,c=cartService.getCart().items.find(u=>u.id===i);c&&cartService.updateQuantity(i,c.quantity+1)}const x=o.target.closest('[data-action="remove"]');if(x){const i=x.dataset.id;cartService.removeItem(i)}});function g(){e.classList.remove("pointer-events-none","opacity-0"),e.classList.add("opacity-100"),t.classList.remove("pointer-events-none"),t.classList.add("pointer-events-auto"),s.classList.remove("translate-x-full","pointer-events-none"),s.classList.add("pointer-events-auto"),v()}function p(){s.classList.remove("pointer-events-auto"),s.classList.add("translate-x-full","pointer-events-none"),t.classList.remove("pointer-events-auto"),t.classList.add("pointer-events-none"),e.classList.remove("opacity-100"),e.classList.add("opacity-0"),setTimeout(()=>{e.classList.add("pointer-events-none")},300)}t.addEventListener("click",p),n.addEventListener("click",p),document.addEventListener("keydown",o=>{o.key==="Escape"&&p()}),a.addEventListener("click",async()=>{await cartService.checkout(),p()}),window.addEventListener("cart:updated",o=>{v(o.detail),b(o.detail.totalQuantity)}),window.openSolennCart=g,v(cartService.getCart()),b(cartService.getCart().totalQuantity)}function v(r=cartService.getCart()){const e=document.getElementById("cart-items-container"),s=document.getElementById("cart-subtotal");if(e){if(s.innerText=`€${r.subtotal}`,r.items.length===0){e.innerHTML=`
      <div class="text-center py-20">
        <p class="font-serif text-2xl mb-2">Your bag is empty.</p>
        <p class="text-xs uppercase tracking-widest text-[#6B6A65]">Explore Drop 01 to add pieces.</p>
      </div>
    `;return}e.innerHTML=r.items.map(t=>`
    <div class="flex gap-4 pb-6 border-b border-[#121210]/10 items-center">
      <img src="${t.image[0]}" alt="${t.name}" class="w-20 h-24 object-cover bg-[#EAE8E1]">
      <div class="flex-1">
        <h4 class="font-serif text-lg mb-1">${t.name}</h4>
        <p class="text-[11px] uppercase tracking-widest text-[#6B6A65] mb-2">${t.color} &bull; ${t.size}</p>
        <div class="flex justify-between items-center">
          <div class="flex items-center border border-[#121210]/20 text-xs">
            <button data-action="decrease" data-id="${t.id}" class="px-2.5 py-1 hover:bg-[#121210] hover:text-[#F6F4F0] transition-colors">-</button>
            <span class="px-3 py-1">${t.quantity}</span>
            <button data-action="increase" data-id="${t.id}" class="px-2.5 py-1 hover:bg-[#121210] hover:text-[#F6F4F0] transition-colors">+</button>
          </div>
          <span class="font-medium text-sm">€${t.price*t.quantity}</span>
        </div>
      </div>
      <button data-action="remove" data-id="${t.id}" class="text-xs uppercase tracking-widest text-[#6B6A65] hover:text-[#121210] transition-colors">&times;</button>
    </div>
  `).join("")}}function b(r){const e=document.getElementById("cart-count-badge");e&&(e.innerText=r)}y();

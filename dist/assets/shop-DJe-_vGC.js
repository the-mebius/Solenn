import"./cart-drawer-5b4eA6O3.js";let i=[],c="all";fetch("./products.json").then(e=>e.json()).then(e=>{i=e,window.renderProducts(i)}).catch(e=>console.error("Error fetching products:",e));window.renderProducts=function(e){const r=document.getElementById("product-grid"),s=document.getElementById("empty-state");if(r){if(e.length===0){r.innerHTML="",s&&s.classList.remove("hidden");return}s&&s.classList.add("hidden"),r.innerHTML=e.map(t=>`
    <a href="${t.url}" class="group block">
      <div class="relative aspect-[4/5] bg-[#EAE8E1] overflow-hidden mb-6">
        <!-- Changed p.images to p.image to match JSON -->
        <img src="${t.image}" alt="${t.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
      </div>
      <div class="flex justify-between items-baseline mb-1">
        <h3 class="font-serif text-2xl group-hover:text-[#7B8B76] transition-colors">${t.name}</h3>
        <span class="text-sm font-medium tracking-wide">€${t.price}</span>
      </div>
      <!-- Changed category/availability to use p.color from JSON -->
      <p class="text-xs text-[#6B6A65] uppercase tracking-widest">${t.color}</p>
    </a>
  `).join("")}};window.filterProducts=function(e){c=e,document.querySelectorAll(".filter-btn").forEach(r=>{r.dataset.category===e?(r.classList.remove("bg-[#EAE8E1]","text-[#121210]"),r.classList.add("bg-[#121210]","text-[#F6F4F0]")):(r.classList.remove("bg-[#121210]","text-[#F6F4F0]"),r.classList.add("bg-[#EAE8E1]","text-[#121210]"))}),a()};window.sortProducts=function(){a()};function a(){let e=[...i];c!=="all"&&(e=e.filter(t=>t.category===c));const r=document.getElementById("sort-select"),s=r?r.value:"featured";s==="price-low"?e.sort((t,o)=>t.price-o.price):s==="price-high"?e.sort((t,o)=>o.price-t.price):s==="name"&&e.sort((t,o)=>t.name.localeCompare(o.name)),window.renderProducts(e)}

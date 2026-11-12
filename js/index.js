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

// Featured products continuous auto-scroll and binary center pop-out (Homepage horizontal scroll only)
const productGrid = document.querySelector('#product-grid');
if (productGrid && productGrid.classList.contains('overflow-x-auto')) {
  let isPaused = false;
  let scrollSpeed = 0.5; // slowed down automatic scroll speed for luxurious feel
  let singleSetWidth = 0;

  // Ensure product cards have explicit width so they overflow horizontally and scroll
  const applyCardWidth = () => {
    const cards = productGrid.querySelectorAll('.product-card');
    cards.forEach(card => {
      card.style.flex = '0 0 300px';
      card.style.minWidth = '300px';
    });
  };
  applyCardWidth();

  // Duplicate cards for seamless infinite loop (Product 5 followed by Product 1)
  let isDuplicated = false;
  const setupInfiniteLoop = () => {
    const cards = productGrid.querySelectorAll('.product-card');
    if (cards.length > 0 && !isDuplicated) {
      // Record exact width of one full set before cloning
      singleSetWidth = productGrid.scrollWidth;

      cards.forEach(card => {
        const clone = card.cloneNode(true);
        productGrid.appendChild(clone);
      });
      isDuplicated = true;
      applyCardWidth();
    }
  };

  setTimeout(setupInfiniteLoop, 600);

  productGrid.addEventListener('mouseenter', () => { isPaused = true; });
  productGrid.addEventListener('mouseleave', () => { isPaused = false; });
  productGrid.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
  productGrid.addEventListener('touchend', () => { isPaused = false; }, { passive: true });

  const autoScroll = () => {
    if (!isPaused && productGrid) {
      productGrid.scrollLeft += scrollSpeed;

      // Seamless infinite loop wrap-around using modulo for both auto and manual scroll
      if (singleSetWidth > 0) {
        if (productGrid.scrollLeft >= singleSetWidth) {
          productGrid.scrollLeft %= singleSetWidth;
        } else if (productGrid.scrollLeft < 0) {
          productGrid.scrollLeft = (singleSetWidth + (productGrid.scrollLeft % singleSetWidth)) % singleSetWidth;
        }
      }
    }
    updateCardScaling();
    requestAnimationFrame(autoScroll);
  };

  const updateCardScaling = () => {
    const currentCards = productGrid.querySelectorAll('.product-card');
    if (!currentCards.length) return;

    const containerRect = productGrid.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    // Find card closest to center
    let closestCard = null;
    let minDistance = Infinity;

    currentCards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestCard = card;
      }
    });

    // Binary sizing: center card pops out large, all side cards are equal size
    currentCards.forEach((card) => {
      if (card === closestCard && minDistance < 180) {
        card.style.transform = 'scale(1.20) translateY(-12px)';
        card.style.opacity = '1';
        card.style.zIndex = '10';
      } else {
        card.style.transform = 'scale(0.85)';
        card.style.opacity = '0.75';
        card.style.zIndex = '1';
      }
      card.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    });
  };

  productGrid.addEventListener('scroll', () => {
    if (singleSetWidth > 0) {
      if (productGrid.scrollLeft >= singleSetWidth) {
        productGrid.scrollLeft %= singleSetWidth;
      } else if (productGrid.scrollLeft < 0) {
        productGrid.scrollLeft = (singleSetWidth + (productGrid.scrollLeft % singleSetWidth)) % singleSetWidth;
      }
    }
    updateCardScaling();
  }, { passive: true });

  window.addEventListener('resize', updateCardScaling, { passive: true });

  setTimeout(() => {
    setupInfiniteLoop();
    requestAnimationFrame(autoScroll);
  }, 1200);
}

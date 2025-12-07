document.addEventListener("DOMContentLoaded", () => {

  


const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dd => {
dd.querySelector('.dropbtn').addEventListener('click', () => {
if(window.innerWidth <= 768){
dd.classList.toggle('show');
}
});
});

  // HERO SLIDESHOW
  let heroIndex = 0;
  showHeroSlides();
  function showHeroSlides() {
    let slides = document.getElementsByClassName("hero-slide");
    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    heroIndex++;
    if (heroIndex > slides.length) heroIndex = 1;
    slides[heroIndex - 1].style.display = "block";
    setTimeout(showHeroSlides, 3500);
  }

  // ORDER MODAL ELEMENTS
  const modal = document.getElementById("orderModal");
  const closeBtn = document.querySelector(".modal .close");
  const productButtons = document.querySelectorAll(".product-card button");
  const productNameInput = document.getElementById("productName");
  const quantityInput = document.getElementById("quantity");
  const totalPriceInput = document.getElementById("totalPrice");

  let currentPrice = 0;

  // Open modal and set price
  productButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");
      const productTitle = productCard.querySelector("h3").textContent;
      currentPrice = parseFloat(productCard.dataset.price); // get price
      productNameInput.value = productTitle;
      quantityInput.value = 1;
      totalPriceInput.value = `$${currentPrice.toFixed(2)}`;
      modal.style.display = "block";
    });
  });

  // Update total price on quantity change
  quantityInput.addEventListener("input", () => {
    let qty = parseInt(quantityInput.value) || 1;
    totalPriceInput.value = `$${(currentPrice * qty).toFixed(2)}`;
  });

  // Close modal
  closeBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => { if(e.target === modal) modal.style.display = "none"; });

  // Handle form submission
  document.getElementById("orderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert(`Thank you! Your order for "${productNameInput.value}" x ${quantityInput.value} has been placed. Total: ${totalPriceInput.value}`);
    modal.style.display = "none";
    e.target.reset();
  });

});
// Fade-in effect when sections appear
const aboutElements = document.querySelectorAll("#about .about-intro, #about .feature-box");

function revealOnScroll() {
  aboutElements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Initial styles (add using JS)
aboutElements.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "0.8s ease";
});

// =======================
// CHRISTMAS PROMOTION POPUP
// =======================

const promoPopup = document.getElementById("promoPopup");
const promoClose = document.querySelector(".promo-close");
const promoBadge = document.getElementById("promoBadge");
const promoBtn = document.querySelector(".promo-btn");

// Show popup after 2 seconds
setTimeout(() => {
  promoPopup.style.display = "flex";
}, 2000);

// Close popup and show badge
function hidePopup() {
  promoPopup.style.display = "none";
  promoBadge.style.display = "block";
}

promoClose.addEventListener("click", hidePopup);
promoBtn.addEventListener("click", hidePopup);

// Click outside popup
window.addEventListener("click", (e) => {
  if (e.target === promoPopup) hidePopup();
});

// Clicking the floating badge → re-open popup
promoBadge.addEventListener("click", () => {
  promoPopup.style.display = "flex";
});

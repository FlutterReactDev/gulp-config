const cart = document.querySelector(".cart");
const cartOffset = cart?.offsetTop;
const cardHeight = cart?.clientHeight;
const bottomBlock = document.querySelector(".bottom__block");
window.addEventListener("scroll", function () {
  if (window.scrollY >= cartOffset + cardHeight - 20) {
    bottomBlock.classList.add("show");
  } else {
    bottomBlock.classList.remove("show");
  }
});

SmoothScroll();

AOS.init();

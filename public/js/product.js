const priceSlider = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");

priceSlider.addEventListener("input", function () {
  priceValue.textContent = this.value;
});


function showDeleteModal() {
  const overlay = document.getElementById("overlay");
  overlay.classList.add("show");

  // close modal when clicking outside
  overlay.addEventListener("click", (e) => {
    const modal = document.getElementById("hiddenDeleteModal");
    if (!modal.contains(e.target)) {
      overlay.classList.remove("show");
    }
  });
}

// optional: close on "No" button
document.querySelector(".noBtn").addEventListener("click", () => {
  document.getElementById("overlay").classList.remove("show");
});

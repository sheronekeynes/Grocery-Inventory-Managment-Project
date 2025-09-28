const priceSlider = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");

priceSlider.addEventListener("input", function () {
  priceValue.textContent = this.value;
});

let productToDelete = null;
let requiresPassword = false;

function showDeleteModal(productId, isProtected) {
  productToDelete = productId;
  requiresPassword = isProtected;

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

function deleteProduct() {
  const modal = document.getElementById("hiddenDeleteModal");
  const passwordCont = document.getElementById("passwordCont");
  const idField = document.getElementById('deleteProductId');

  idField.value = productToDelete;

  if (requiresPassword) {
    modal.style.width = "300px";
    passwordCont.classList.add("show");

    
   document.querySelector(".yesBtn").onclick=()=>{
     passwordCont.submit();
   }
  } else {
    modal.style.width = "250px";
    passwordCont.classList.remove("show");
    passwordCont.submit();

  }
}


function validatePassword(){
  if(requiresPassword){
    const pass = document.getElementById('password').value;
    if(!pass){
      alert("password required!");
      return false;
    }
  }

  return true;
}


// optional: close on "No" button
document.querySelector(".noBtn").addEventListener("click", () => {
  document.getElementById("overlay").classList.remove("show");
  if (requiresPassword) {
    const modal = document.getElementById("hiddenDeleteModal");
    passwordCont.classList.remove("show");
    modal.style.width = "250px";
  }
});

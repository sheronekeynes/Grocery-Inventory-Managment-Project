  const priceSlider = document.getElementById("priceRange");
  const priceValue = document.getElementById("priceValue");

  priceSlider.addEventListener('input',function(){
    priceValue.textContent = this.value;
  })
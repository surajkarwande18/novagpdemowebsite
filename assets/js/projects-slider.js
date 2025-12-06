// Select all slider blocks
const sliderBlocks = document.querySelectorAll('.before-after-slider-block');

sliderBlocks.forEach((block) => {
  const slides = block.querySelectorAll('.before-after-slide');
  const heading = block.querySelector('.slider-heading');
  let current = 0;

  // Function to show slide
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      slide.querySelector('.after').style.opacity = '0';
    });

    const activeSlide = slides[index];
    activeSlide.classList.add('active');
    heading.textContent = "🔄 पूर्वी";

    setTimeout(() => {
      activeSlide.querySelector('.after').style.opacity = '1';
      heading.textContent = "🔄 नंतर";
    }, 1500);
  }

  // Auto slide every 5 seconds
  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 3000);

  // Initial slide
  showSlide(current);

  // Optional: Click to toggle
  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      const before = slide.querySelector('.before');
      const after = slide.querySelector('.after');
      [before.style.opacity, after.style.opacity] = [after.style.opacity, before.style.opacity];
      heading.textContent = before.style.opacity === '0' ? "🔄 नंतर" : "🔄 पूर्वी";
    });
  });
});

// ==========================
// Mobile Menu Toggle (CLEAN & WORKING)
// ==========================

const menuBtn = document.getElementById("menu-btn");
const mainNav = document.getElementById("main-nav");

menuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("show"); 
  menuBtn.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll("#main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      mainNav.classList.remove("show");
      menuBtn.classList.remove("active");
    }
  });
});

// Dropdown buttons
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(drop => {
    const btn = drop.querySelector('button');
    const links = drop.querySelectorAll('a');

    links.forEach(link => {
        if(link.href === window.location.href){
            btn.classList.add('active'); // button highlight
            link.classList.add('active'); // link highlight
        }
    });
});



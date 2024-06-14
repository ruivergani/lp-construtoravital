// Slides Configuration
const container = document.getElementById("carouselProjeto");
const containerInfo = document.getElementById("carouselInformation");
const containerPlanta = document.getElementById("carouselPlanta");
const containerPerspectiva = document.getElementById("carouselPerspectiva");
const options = { infinite: false, Dots: false };
const options2 = {infinite: false, Dots: true};
new Carousel(containerInfo, options);
new Carousel(containerPlanta, options);
new Carousel(containerPerspectiva, options2);
new Carousel(container, options);
Fancybox.bind('[data-fancybox="gallery"]', {
  l10n: Fancybox.l10n.de,
  hideScrollbar: false,
  Slideshow: {
    playOnStart: true,
  },
});
Fancybox.bind('[data-fancybox="galleryInfo"]', {
  l10n: Fancybox.l10n.de,
  hideScrollbar: false,
  Slideshow: {
    playOnStart: true,
  },
});
Fancybox.bind('[data-fancybox="galleryPlanta"]', {
  l10n: Fancybox.l10n.de,
  hideScrollbar: false,
  Slideshow: {
    playOnStart: true,
  },
});
Fancybox.bind('[data-fancybox="galleryPerspectiva"]', {
  l10n: Fancybox.l10n.de,
  hideScrollbar: false,
  Slideshow: {
    playOnStart: true,
  },
});

// Header Configuration
let links = document.querySelectorAll('.js-link');
let sections = document.querySelectorAll('.section');
const header = document.getElementById("js-header");

window.addEventListener('scroll', () => {
  sections.forEach(section => {
    let top = window.scrollY;
    let offset = section.offsetTop - 100;
    let heightSection = section.offsetHeight;
    let idSection = section.getAttribute('id');

    if (top >= offset && top < offset + heightSection) {
      links.forEach(link => {
        link.classList.remove('active');
        document.querySelector(`header nav a[href*='${idSection}']`).classList.add('active');
      })
    }
    if (window.pageYOffset > 20) {
      header.classList.add("changeBackgroundColor");
    } else {
      header.classList.remove("changeBackgroundColor");
    }
  })
})
function scrollSection(event) {
  event.preventDefault();
  const href = event.currentTarget.getAttribute('href');
  const section = document.querySelector(href)
  let topSection = section.offsetTop - 100;

  window.scrollTo({
    top: topSection,
    behavior: 'smooth'
  })
}
links.forEach(link => {
  link.addEventListener('click', scrollSection)
})

// Add class active to menu button
const menuButton = document.getElementById('js-menu-button');
if(menuButton){
  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('is-active'); // add the CSS configuration on this button
    document.documentElement.classList.toggle('menu-opened');
  })
}
// Close menu button when clicks to the links
const menuMobileNav = document.querySelectorAll('.js-menu-mobile li a');
menuMobileNav.forEach((item) => {
  item.addEventListener('click', function(){
    document.documentElement.classList.remove('menu-opened');
    menuButton.classList.remove('is-active');
  })
})
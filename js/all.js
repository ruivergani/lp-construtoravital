var container=document.getElementById("carouselProjeto"),containerInfo=document.getElementById("carouselInformation"),containerPlanta=document.getElementById("carouselPlanta"),containerPerspectiva=document.getElementById("carouselPerspectiva"),options={infinite:!1,Dots:!1},options2={infinite:!1,Dots:!0},links=(new Carousel(containerInfo,options),new Carousel(containerPlanta,options),new Carousel(containerPerspectiva,options2),new Carousel(container,options),Fancybox.bind('[data-fancybox="gallery"]',{l10n:Fancybox.l10n.de,hideScrollbar:!1,Slideshow:{playOnStart:!0}}),Fancybox.bind('[data-fancybox="galleryInfo"]',{l10n:Fancybox.l10n.de,hideScrollbar:!1,Slideshow:{playOnStart:!0}}),Fancybox.bind('[data-fancybox="galleryPlanta"]',{l10n:Fancybox.l10n.de,hideScrollbar:!1,Slideshow:{playOnStart:!0}}),Fancybox.bind('[data-fancybox="galleryPerspectiva"]',{l10n:Fancybox.l10n.de,hideScrollbar:!1,Slideshow:{playOnStart:!0}}),document.querySelectorAll(".js-link")),sections=document.querySelectorAll(".section"),header=document.getElementById("js-header");function scrollSection(e){e.preventDefault();e=e.currentTarget.getAttribute("href"),e=document.querySelector(e).offsetTop-100;window.scrollTo({top:e,behavior:"smooth"})}window.addEventListener("scroll",function(){sections.forEach(function(e){var n=window.scrollY,t=e.offsetTop-100,o=e.offsetHeight,a=e.getAttribute("id");t<=n&&n<t+o&&links.forEach(function(e){e.classList.remove("active"),document.querySelector("header nav a[href*='".concat(a,"']")).classList.add("active")}),20<window.pageYOffset?header.classList.add("changeBackgroundColor"):header.classList.remove("changeBackgroundColor")})}),links.forEach(function(e){e.addEventListener("click",scrollSection)});var menuButton=document.getElementById("js-menu-button"),menuMobileNav=(menuButton&&menuButton.addEventListener("click",function(){menuButton.classList.toggle("is-active"),document.documentElement.classList.toggle("menu-opened")}),document.querySelectorAll(".js-menu-mobile li a"));menuMobileNav.forEach(function(e){e.addEventListener("click",function(){document.documentElement.classList.remove("menu-opened"),menuButton.classList.remove("is-active")})});

  
      
  // 3. swiper slider
  var swiper = new Swiper(".hero-slider .swiper-container", {
    preloadImages: false,
    loop: true,
    resistance: true,
    resistanceRatio: 0.85,
    parallax: false,
    effect: "slide",
    mousewheel: {
      enable: true,
    },
    grabCursor: true,
    centeredSlides: false,
    speed: 2000,
    spaceBetween: 0,
    init: true,
    pagination: {
      el: ".swiper-slide-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".slide-next",
      prevEl: ".slide-prev",
    },
    autoplay: false,
  });
  var imgSwiper = new Swiper(".hero-slider-img .swiper-container", {
    preloadImages: false,
    loop: true,
    resistance: true,
    parallax: true,
    effect: "slide",
    mousewheel: {
      enable: true,
    },
  });
  swiper.controller.control = imgSwiper;
  imgSwiper.controller.control = swiper;


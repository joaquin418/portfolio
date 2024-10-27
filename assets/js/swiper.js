
  // 3. swiper slider
  var swiper = new Swiper(".hero-slider .swiper-container", {
    preloadImages: true,
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
    lazy: {
      loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
      loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
    },
  });
  var imgSwiper = new Swiper(".hero-slider-img .swiper-container", {
    preloadImages: true,
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


/*
  [JS Index]
  
  ---
  
  Template Name: Doex - Creative Portfolio Template
  Author:  ex-nihilo
  Version: 1.3
*/

/*
  1. preloader
  2. navigation
    2.1. navigation icon
	2.2. navigation panels
	2.3. navigation links
	2.4. navigation hover state
  3. swiper slider
  4. cursor color
*/

$(function () {
  "use strict";



  // =================
  // Page transitions
  // =================

  if ($("body").hasClass("tt-transition")) {
    // Wait until the whole page is loaded.
    $(window).on("load", function () {
      setTimeout(function () {
        HideLoad(); // call out animations.
      }, 0);
    });

    // Transitions In (when "ptr-overlay" slides in).
    // =================
    function RevealLoad() {
      var tl_transitIn = gsap.timeline({
        defaults: { duration: 1.5, ease: Expo.easeInOut },
      });

      if ($("#page-transition").length) {
        tl_transitIn.set("#page-transition", { autoAlpha: 1 });
        tl_transitIn.to(
          ".ptr-overlay",
          { scaleY: 1, transformOrigin: "center bottom" },
          0
        );
        tl_transitIn.to(".ptr-preloader", { autoAlpha: 1 }, 0.4);
      }
      tl_transitIn.to("#content-wrap", { y: -80, autoAlpha: 0 }, 0);
      tl_transitIn.to("#tt-header", { y: -20, autoAlpha: 0 }, 0);
    }
  }

  // Transitions Out (when "ptr-overlay" slides out)
  // ================
  function HideLoad() {
    var tl_transitOut = gsap.timeline();

    if ($("#page-transition").length) {
      tl_transitOut.to(".ptr-preloader", {
        duration: 1.5,
        autoAlpha: 0,
        ease: Expo.easeInOut,
      });
      tl_transitOut.to(
        ".ptr-overlay",
        {
          duration: 1.5,
          scaleY: 0,
          transformOrigin: "center top",
          ease: Expo.easeInOut,
        },
        0.3
      );
    }

    // tt-Header appear
    tl_transitOut.from(
      "#tt-header",
      {
        duration: 1.5,
        y: 20,
        autoAlpha: 0,
        ease: Expo.easeInOut,
        clearProps: "all",
      },
      0.6
    );

    // tt-Footer appear
    tl_transitOut.from(
      "#tt-footer",
      {
        duration: 1.5,
        y: 20,
        autoAlpha: 0,
        ease: Expo.easeInOut,
        clearProps: "all",
      },
      0.2
    );

    // Page header image appear
    if ($(".ph-image").length) {
      if ($("#page-header").hasClass("ph-bg-image")) {
        tl_transitOut.from(
          ".ph-image img, .ph-video",
          {
            duration: 2,
            y: 80,
            autoAlpha: 0,
            stagger: 0.3,
            ease: Expo.easeOut,
            clearProps: "all",
          },
          0.8
        );
      } else {
        tl_transitOut.from(
          ".ph-image",
          {
            duration: 2,
            y: 80,
            autoAlpha: 0,
            stagger: 0.3,
            ease: Expo.easeOut,
            clearProps: "all",
          },
          1.2
        );
      }
    }

    // Page header elements appear (elements with class "ph-appear")
    var $phAppear = $(".ph-appear");
    if ($phAppear.length) {
      tl_transitOut.from(
        $phAppear,
        {
          duration: 2,
          y: 40,
          autoAlpha: 0,
          stagger: 0.3,
          ease: Expo.easeOut,
          clearProps: "all",
        },
        1.5
      );
    }

	/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("tt-header").style.top = "0";
      } else {
        document.getElementById("tt-header").style.top = "-110px";
      }
      prevScrollpos = currentScrollPos;
    };

    // ==================================================
    // Overlay menu
    // ==================================================

    // Add class "tt-header-fixed-on" to <body> if "tt-header-fixed" enabled.
    if ($("#tt-header").hasClass("tt-header-fixed")) {
      $("body").addClass("tt-header-fixed-on");
    }

    // On menu toggle button click
    // ============================
    var $olMenuToggleBtn = $(
      ".tt-ol-menu-toggle-btn-text, .tt-ol-menu-toggle-btn"
    );

    $olMenuToggleBtn.on("click", function () {
      $("html").toggleClass("tt-no-scroll");
      $("body").toggleClass("tt-ol-menu-open").addClass("tt-ol-menu-active");
      if ($("body").hasClass("tt-ol-menu-open")) {
        // Menu step in animations
        $("body").addClass("olm-toggle-no-click"); // Disable toggle button click until the animations last.

        var tl_olMenuIn = gsap.timeline({
          onComplete: function () {
            $("body").removeClass("olm-toggle-no-click");
          },
        });

        tl_olMenuIn.to(".tt-overlay-menu", { duration: 0.4, autoAlpha: 1 });
        tl_olMenuIn.from(".tt-ol-menu-list > li", {
          duration: 0.4,
          y: 80,
          autoAlpha: 0,
          stagger: 0.05,
          ease: Power2.easeOut,
          clearProps: "all",
        });
        if ($(".tt-ol-menu-social").length) {
          tl_olMenuIn.to(
            ".tt-ol-menu-social",
            { duration: 0.4, autoAlpha: 1 },
            "-=0.4"
          );
          tl_olMenuIn.from(
            ".tt-ol-menu-social > li",
            {
              duration: 0.4,
              y: 80,
              autoAlpha: 0,
              stagger: 0.05,
              ease: Power2.easeOut,
              clearProps: "all",
            },
            "-=0.4"
          );
        }
        if ($(".tt-ol-menu-ghost").length) {
          tl_olMenuIn.from(
            ".tt-ol-menu-ghost",
            {
              duration: 0.4,
              y: 80,
              autoAlpha: 0,
              ease: Power2.easeOut,
              clearProps: "all",
            },
            "-=0.4"
          );
        }

        // On menu link click
        $(".tt-overlay-menu a, .tt-logo a")
          .not('[target="_blank"]') // omit from selection
          .not('[href^="#"]') // omit from selection
          .not('[href^="mailto"]') // omit from selection
          .not('[href^="tel"]') // omit from selection
          .on("click", function () {
            gsap.set("#content-wrap, .ttgr-cat-nav", { autoAlpha: 0 }); // Hide before timeline
            var tl_olMenuClick = gsap.timeline();
            tl_olMenuClick.to(".tt-ol-menu-list > li", {
              duration: 0.4,
              y: -80,
              autoAlpha: 0,
              stagger: 0.05,
              ease: Power2.easeIn,
            });
            if ($(".tt-ol-menu-social").length) {
              tl_olMenuClick.to(
                ".tt-ol-menu-social > li",
                {
                  duration: 0.4,
                  y: -80,
                  autoAlpha: 0,
                  stagger: 0.05,
                  ease: Power2.easeIn,
                },
                "-=0.4"
              );
              tl_olMenuClick.to(
                ".tt-ol-menu-social",
                { duration: 0.4, autoAlpha: 0 },
                "-=0.4"
              );
            }
            if ($(".tt-ol-menu-ghost").length) {
              tl_olMenuClick.to(
                ".tt-ol-menu-ghost",
                { duration: 0.4, y: -40, autoAlpha: 0, ease: Power2.easeIn },
                "-=0.4"
              );
            }
          });

        // Hide sliding sidebar
        if ($(".tt-sliding-sidebar-wrap").length) {
          gsap.to(".tt-sliding-sidebar-trigger", {
            duration: 1,
            autoAlpha: 0,
            ease: Expo.easeOut,
          });
        }

        // Move "tt-header" out of "scroll-container" (if Smooth Scroll is enabled and "tt-header-fixed" is NOT enabled)
        // Expl: Since Smooth Scrollbar doesn't support element fixed position inside "scroll-container" move the "tt-header" out of it
        if ($("body").hasClass("tt-smooth-scroll")) {
          if (!$("#tt-header").hasClass("tt-header-fixed")) {
            $("#scroll-container").before($("#tt-header"));
          }
        }

        // Move "tt-ol-menu-social" out of "tt-header"
        // Expl: Due to the conflict with fixed position and ancestor transitions
        if ($(".tt-ol-menu-social").length) {
          function ttOlMenuSocialResize() {
            if (window.matchMedia("(min-width: 768px)").matches) {
              $("#tt-header").before($(".tt-ol-menu-social"));
            } else {
              $(".tt-ol-menu-list").after($(".tt-ol-menu-social"));
            }
          }
          ttOlMenuSocialResize();

          $(window).resize(function () {
            ttOlMenuSocialResize();
          });
        }
      } else {
        // Menu step out animations
        $("body").addClass("olm-toggle-no-click"); // Disable toggle button click until the animations last.

        var tl_olMenuOut = gsap.timeline({
          onComplete: function () {
            $("body").removeClass("olm-toggle-no-click");
          },
        });
        tl_olMenuOut.to(".tt-ol-menu-list > li", {
          duration: 0.4,
          y: -80,
          autoAlpha: 0,
          stagger: 0.05,
          ease: Power2.easeIn,
        });
        if ($(".tt-ol-menu-social").length) {
          tl_olMenuOut.to(
            ".tt-ol-menu-social > li",
            {
              duration: 0.4,
              y: -80,
              autoAlpha: 0,
              stagger: 0.05,
              ease: Power2.easeIn,
            },
            "-=0.4"
          );
          tl_olMenuOut.to(
            ".tt-ol-menu-social",
            { duration: 0.4, autoAlpha: 0, clearProps: "all" },
            "-=0.4"
          );
        }
        if ($(".tt-ol-menu-ghost").length) {
          tl_olMenuOut.to(
            ".tt-ol-menu-ghost",
            { duration: 0.4, y: -60, autoAlpha: 0, ease: Power2.easeIn },
            "-=0.4"
          );
        }
        tl_olMenuOut.to(
          ".tt-overlay-menu",
          { duration: 0.4, autoAlpha: 0, clearProps: "all" },
          "+=0.2"
        );
        tl_olMenuOut.set(
          ".tt-ol-menu-list > li, .tt-ol-menu-social > li, .tt-ol-menu-ghost",
          { clearProps: "all" }
        ); // clearProps only

        // Show sliding sidebar
        if ($(".tt-sliding-sidebar-wrap").length) {
          gsap.to(
            ".tt-sliding-sidebar-trigger",
            {
              duration: 1,
              autoAlpha: 1,
              ease: Expo.easeOut,
              clearProps: "all",
            },
            "-=0.3"
          );
        }

        // Close open submenus
        setTimeout(function () {
          $(".tt-ol-submenu").slideUp(350);
          $(".tt-ol-submenu-trigger").removeClass("tt-ol-submenu-open");
          $("body").removeClass("tt-ol-menu-active");

          // Move "tt-header" back to the "scroll-container" (if Smooth Scroll is enabled and "tt-header-fixed" is NOT enabled)
          if ($("body").hasClass("tt-smooth-scroll")) {
            if (!$("#tt-header").hasClass("tt-header-fixed")) {
              $("#content-wrap").before($("#tt-header"));
            }
          }

          // Move "tt-ol-menu-social" back to the "tt-overlay-menu"
          if ($(".tt-ol-menu-social").length) {
            $(".tt-ol-menu-list").after($(".tt-ol-menu-social"));
          }
        }, 900);
      }

      return false;
    });

    // Menu list hover
    $(".tt-ol-menu-list")
      .on("mouseenter", function () {
        $(this).addClass("tt-ol-menu-hover");
      })
      .on("mouseleave", function () {
        $(this).removeClass("tt-ol-menu-hover");
      });

    // Open submenu if link href contains #
    $(".tt-ol-submenu-trigger > a").on("click", function () {
      if ($(this).is('[href^="#"]')) {
        var $this = $(this).parent();
        if ($this.hasClass("tt-ol-submenu-open")) {
          $this.removeClass("tt-ol-submenu-open");
          $this.next().slideUp(350);
        } else {
          $this
            .parent()
            .parent()
            .find(".tt-ol-submenu")
            .prev()
            .removeClass("tt-ol-submenu-open");
          $this.parent().parent().find(".tt-ol-submenu").slideUp(350);
          $this.toggleClass("tt-ol-submenu-open");
          $this.next().slideToggle(350);
        }
      }
      return false;
    });

    // Open submenu on caret click
    $(".tt-ol-submenu-caret-wrap").on("click", function () {
      var $this = $(this).parent();
      if ($this.hasClass("tt-ol-submenu-open")) {
        $this.removeClass("tt-ol-submenu-open");
        $this.next().slideUp(350);
      } else {
        $this
          .parent()
          .parent()
          .find(".tt-ol-submenu")
          .prev()
          .removeClass("tt-ol-submenu-open");
        $this.parent().parent().find(".tt-ol-submenu").slideUp(350);
        $this.toggleClass("tt-ol-submenu-open");
        $this.next().slideToggle(350);
      }
    });

    
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

    



    // =======================================================================================
    // Defer videos (Youtube, Vimeo)
    // Note: When you have embed videos in your webpages it causes your page to load slower.
    // Deffering will allow your page to load quickly.
    // Source: https://www.feedthebot.com/pagespeed/defer-videos.html
    // =======================================================================================

    function init() {
      var vidDefer = document.getElementsByTagName("iframe");
      for (var i = 0; i < vidDefer.length; i++) {
        if (vidDefer[i].getAttribute("src")) {
          vidDefer[i].setAttribute("src", vidDefer[i].getAttribute("src"));
        }
      }
    }
    window.onload = init;

    //Previous and Next Project Slider
    // fade in-up
    $(".anim-fadeinup").each(function () {
      let tl_FadeInUp = gsap.timeline({
        scrollTrigger: {
          trigger: this,
          start: "top bottom",
          markers: false,
        },
      });

      tl_FadeInUp.from(
        this,
        {
          duration: 2.5,
          autoAlpha: 0,
          y: 100,
          ease: Expo.easeOut,
          clearProps: "all",
        },
        "+=0.3"
      );
    });
  }

});



$(function () {
  "use strict";

// Force page a reload when browser "Back" button click.
		// =====================================================
		window.onpageshow = function (event) {if (event.persisted) {window.location.reload();}}

// Force page scroll position to top on refresh (do not remove!)
	// =============================================
	$(window).on("pagehide", function(){$(window).scrollTop(0);});


  // =================
  // Page transitions
  // =================

  if ($("body").hasClass("tt-transition")) {
    // Wait until the whole page is loaded.
    $(window).on("load", function () {
      setTimeout(function () {
        HideLoad(); // call out animations.
      }, 0);
    });}

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
        0.8
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
          });


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
          ".tt-ol-menu-list > li, .tt-ol-menu-social > li",
          { clearProps: "all" }
        ); // clearProps only

        
        // Move "tt-ol-menu-social" back to the "tt-overlay-menu"
        setTimeout(function () {
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

      var venobox =new VenoBox({selector:".venobox", infinigall:"false", numeration:"false", spinner:"flow", autoplay:"false", navTouch: "true", navKeyboard:"true", navigation:"true",});

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

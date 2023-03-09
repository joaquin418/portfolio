

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
		
			setTimeout(function(){
				HideLoad(); // call out animations.
			}, 0);
		


		// Transitions In (when "ptr-overlay" slides in).
		// =================
		function RevealLoad() {
			var tl_transitIn = gsap.timeline({ defaults: { duration: 1.5, ease: Expo.easeInOut }});

				if ($("#page-transition").length) {
					 tl_transitIn.set("#page-transition", { autoAlpha: 1 });
					 tl_transitIn.to(".ptr-overlay", { scaleY: 1, transformOrigin: "center bottom" }, 0);
					 tl_transitIn.to(".ptr-preloader", { autoAlpha: 1 }, 0.4);
				}}


		// Transitions Out (when "ptr-overlay" slides out)
		// ================
		function HideLoad() {
			var tl_transitOut = gsap.timeline();

				 if ($("#page-transition").length) {
					tl_transitOut.to(".ptr-preloader", { duration: 1.3, autoAlpha: 0, ease: Expo.easeInOut });
					tl_transitOut.to(".ptr-overlay", { duration: 1.5, scaleY: 0, transformOrigin: "center top", ease: Expo.easeInOut }, 0.3);
				 }

				 // Page header image appear
				 if ($(".ph-image").length) {
				 	if ($(".folio-project").hasClass("ph-image")) {
				 		tl_transitOut.from(".ph-image", { duration: 2, y: 80, autoAlpha: 0, stagger: 0.5, ease: Expo.easeOut, clearProps:"all" }, 0.8);
				 	} else {
				 		tl_transitOut.from(".ph-image", { duration: 2, y: 80, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut, clearProps:"all" }, 1.2);
				 	}
				 }
				}


		// On link click
		// ==============
		$("a")
			.not('[target="_blank"]') // omit from selection
			.not('[href^="#"]') // omit from selection
			.not('[href^="mailto"]') // omit from selection
			.not('[href^="tel"]') // omit from selection
			.not(".lg-trigger") // omit from selection
			.not(".tt-btn-disabled") // omit from selection
      		.not(".venobox") // omit from selection
			.not(".no-transition") // omit from selection
			.on('click', function(e) {
				e.preventDefault();

				setTimeout(function (url) {
					window.location = url
				}, 1500, this.href);
				
				RevealLoad(); // call in animations.
		})}

    

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
	var $olMenuToggleBtn = $(".tt-ol-menu-toggle-btn-text, .tt-ol-menu-toggle-btn");
	
	$olMenuToggleBtn.on("click", function() {
		$("html").toggleClass("tt-no-scroll");
		$("body").toggleClass("tt-ol-menu-open").addClass("tt-ol-menu-active");
		if ($("body").hasClass("tt-ol-menu-open")) {

			// Menu step in animations
			$("body").addClass("olm-toggle-no-click"); // Disable toggle button click until the animations last.

			var tl_olMenuIn = gsap.timeline({
				onComplete: function() { 
					$("body").removeClass("olm-toggle-no-click"); 
				}
			});

				 tl_olMenuIn.to(".tt-overlay-menu", { duration: 0.4, autoAlpha: 1 });
				 tl_olMenuIn.from(".tt-ol-menu-list > li", { duration: 0.4, y: 80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeOut, clearProps:"all" });
				 if ($(".tt-ol-menu-social").length) {
				 	tl_olMenuIn.to(".tt-ol-menu-social", { duration: 0.4, autoAlpha: 1 }, "-=0.4");
				 	tl_olMenuIn.from(".tt-ol-menu-social > li", { duration: 0.4, y: 80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeOut, clearProps:"all" }, "-=0.4");
				 }
				 if ($(".tt-ol-menu-ghost").length) {
				 	tl_olMenuIn.from(".tt-ol-menu-ghost", { duration: 0.4, y: 80, autoAlpha: 0, ease: Power2.easeOut, clearProps:"all" }, "-=0.4");
				 }

			// On menu link click
			$(".tt-overlay-menu a, .tt-logo a")
			.not('[target="_blank"]') // omit from selection
			.not('[href^="#"]') // omit from selection
			.not('[href^="mailto"]') // omit from selection
			.not('[href^="tel"]') // omit from selection
			.on('click', function() {
				gsap.set("#content-wrap, .ttgr-cat-nav", { autoAlpha: 0 }); // Hide before timeline
				var tl_olMenuClick = gsap.timeline();
					 tl_olMenuClick.to(".tt-ol-menu-list > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
					 if ($(".tt-ol-menu-social").length) {
					 	tl_olMenuClick.to(".tt-ol-menu-social > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn }, "-=0.4");
					 	tl_olMenuClick.to(".tt-ol-menu-social", { duration: 0.4, autoAlpha: 0 }, "-=0.4");
					 }
					 if ($(".tt-ol-menu-ghost").length) {
					 	tl_olMenuClick.to(".tt-ol-menu-ghost", { duration: 0.4, y: -40, autoAlpha: 0, ease:Power2.easeIn }, "-=0.4");
					 }
			});



			// Move "tt-ol-menu-social" out of "tt-header"
			// Expl: Due to the conflict with fixed position and ancestor transitions
			if ($(".tt-ol-menu-social").length) {
				function ttOlMenuSocialResize() {
					if (window.matchMedia("(min-width: 768px)").matches) {
						$("#tt-header").before($(".tt-ol-menu-social"));
					} else {
						$(".tt-ol-menu-list").after($(".tt-ol-menu-social"));
					}
				};
				ttOlMenuSocialResize();

				$(window).resize(function() {
					ttOlMenuSocialResize();
				});
			}

		} else {	

			// Menu step out animations
			$("body").addClass("olm-toggle-no-click"); // Disable toggle button click until the animations last.

			var tl_olMenuOut = gsap.timeline({
				onComplete: function() { 
					$("body").removeClass("olm-toggle-no-click"); 
				}
			});
				 tl_olMenuOut.to(".tt-ol-menu-list > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
				 if ($(".tt-ol-menu-social").length) {
				 	tl_olMenuOut.to(".tt-ol-menu-social > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn }, "-=0.4");
				 	tl_olMenuOut.to(".tt-ol-menu-social", { duration: 0.4, autoAlpha: 0, clearProps:"all" }, "-=0.4");
				 }
				 if ($(".tt-ol-menu-ghost").length) {
				 	tl_olMenuOut.to(".tt-ol-menu-ghost", { duration: 0.4, y: -60, autoAlpha: 0, ease:Power2.easeIn }, "-=0.4");
				 }
				 tl_olMenuOut.to(".tt-overlay-menu", { duration: 0.4, autoAlpha: 0, clearProps:"all" }, "+=0.2");
				 tl_olMenuOut.set(".tt-ol-menu-list > li, .tt-ol-menu-social > li, .tt-ol-menu-ghost", { clearProps:"all" }); // clearProps only


			// Close open submenus
			setTimeout(function () {

			

				// Move "tt-ol-menu-social" back to the "tt-overlay-menu"
				if ($(".tt-ol-menu-social").length) {
					$(".tt-ol-menu-list").after($(".tt-ol-menu-social"));
				}

			}, 900);
		}
		
		return false;
	});


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

	const cursor = document.querySelector(".cursor"),
    links = document.querySelectorAll("a, .navigation-icon, .hero-slider-bg-controls, .hero-slider-bg-controls-2, .swiper-slide-pagination, .button-the-submit, #about, #project"),
    bounce = "bounce",
    iframes = document.querySelectorAll("#iframe");
var x, y;
const moveMouse = (e) => {
        (x = e.clientX), (y = e.clientY), (cursor.style.top = `${y - 50}px`), (cursor.style.left = `${x - 50}px`);
    },
    enableAnimation = () => {
        cursor.classList.contains(bounce) ? cursor.classList.remove(bounce) : cursor.classList.add(bounce);
    };
document.addEventListener("mousemove", moveMouse), Array.prototype.forEach.call(links, (e) => e.addEventListener("mouseenter", enableAnimation)), Array.prototype.forEach.call(links, (e) => e.addEventListener("mouseleave", enableAnimation));
iframes.forEach(frame =>{ frame.addEventListener("mouseleave", () => {cursor.classList.remove("hide");}); frame.addEventListener("mouseover", () => {cursor.classList.add("hide");});
  
});
  
})

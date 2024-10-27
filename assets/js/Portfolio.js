function scrollToTopOnRefresh() {
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
}

// Call the function when the page loads
window.onload = scrollToTopOnRefresh;
  
  // Page transitions
  if (document.body.classList.contains("tt-transition")) {
	// Wait until the whole page is loaded.
	setTimeout(function() {
	  HideLoad(); // call out animations.
	}, 0);
  
	// Transitions In (when "ptr-overlay" slides in).
	function RevealLoad() {
	  let tl_transitIn = gsap.timeline({ defaults: { duration: 1.5, ease: Expo.easeInOut }});
  
	  let pageTransition = document.getElementById("page-transition");
	  if (pageTransition) {
		tl_transitIn.set(pageTransition, { autoAlpha: 1 });
		tl_transitIn.to(".ptr-overlay", { scaleY: 1, transformOrigin: "center bottom" }, 0);
		tl_transitIn.to(".ptr-preloader", { autoAlpha: 1 }, 0.4);
	  }
	}
  
	// Transitions Out (when "ptr-overlay" slides out)
	function HideLoad() {
	  let tl_transitOut = gsap.timeline();
  
	  let pageTransition = document.getElementById("page-transition");
	  if (pageTransition) {
		tl_transitOut.to(".ptr-preloader", { duration: 1.3, autoAlpha: 0, ease: Expo.easeInOut });
		tl_transitOut.to(".ptr-overlay", { duration: 1.5, scaleY: 0, transformOrigin: "center top", ease: Expo.easeInOut }, 0.3);
	  }
  
	  // Page header image appear
	  let phImages = document.querySelectorAll(".ph-image");
	  if (phImages.length) {
		if (document.querySelector(".folio-project.ph-image")) {
		  tl_transitOut.from(phImages, { duration: 2, y: 80, autoAlpha: 0, stagger: 0.5, ease: Expo.easeOut, clearProps:"all" }, 0.8);
		} else {
		  tl_transitOut.from(phImages, { duration: 2, y: 80, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut, clearProps:"all" }, 1.2);
		}
	  }
  
	  // Page header elements appear (elements with class "ph-appear")
	  let phAppear = document.querySelectorAll(".ph-appear");
	  if (phAppear.length) {
		tl_transitOut.from(phAppear, { duration: 2, y: 40, autoAlpha: 0, stagger: 0.3, ease: Expo.easeOut, clearProps:"all" }, 1.5);
	  }
	}
  
	// On link click
	document.querySelectorAll("a:not([target='_blank']):not([href^='#']):not([href^='mailto']):not([href^='tel']):not(.lg-trigger):not(.tt-btn-disabled):not(#artwork):not(.venobox):not(.no-transition)").forEach(link => {
	  link.addEventListener('click', function(e) {
		e.preventDefault();
  
		setTimeout(function (url) {
		  window.location = url;
		}, 1500, this.href);
		
		RevealLoad(); // call in animations.
	  });
	});
  }
  
  // Hide/show navbar on scroll
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
	let currentScrollPos = window.pageYOffset;
	let header = document.getElementById("tt-header");
	if (prevScrollpos > currentScrollPos) {
	  header.style.top = "0";
	} else {
	  header.style.top = "-110px";
	}
	prevScrollpos = currentScrollPos;
  };
  
// Overlay menu
const header = document.getElementById("tt-header");
if (header && header.classList.contains("tt-header-fixed")) {
  document.body.classList.add("tt-header-fixed-on");
}

// On menu toggle button click
const olMenuToggleBtn = document.querySelector(".tt-ol-menu-toggle-btn");
const overlayMenu = document.querySelector(".tt-overlay-menu");

if (olMenuToggleBtn && overlayMenu) {
  olMenuToggleBtn.addEventListener("click", function() {
    document.documentElement.classList.toggle("tt-no-scroll");
    document.body.classList.toggle("tt-ol-menu-open");
    document.body.classList.add("tt-ol-menu-active");

    if (document.body.classList.contains("tt-ol-menu-open")) {
      // Menu step in animations
      document.body.classList.add("olm-toggle-no-click");

      let tl_olMenuIn = gsap.timeline({
        onComplete: function() { 
          document.body.classList.remove("olm-toggle-no-click"); 
        }
      });

      tl_olMenuIn.to(overlayMenu, { duration: 0.4, autoAlpha: 1 });
      tl_olMenuIn.from(".tt-ol-menu-list > li", { duration: 0.4, y: 80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeOut, clearProps:"all" });
      
      const olMenuSocial = document.querySelector(".tt-ol-menu-social");
      if (olMenuSocial) {
        tl_olMenuIn.to(olMenuSocial, { duration: 0.4, autoAlpha: 1 }, "-=0.4");
        tl_olMenuIn.from(".tt-ol-menu-social > li", { duration: 0.4, y: 80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeOut, clearProps:"all" }, "-=0.4");
      }

      // On menu link click
      const menuLinks = overlayMenu.querySelectorAll("a:not([target='_blank'])");
      menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          gsap.set("#content-wrap, .ttgr-cat-nav", { autoAlpha: 0 });
          let tl_olMenuClick = gsap.timeline();
          tl_olMenuClick.to(".tt-ol-menu-list > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
          
          if (olMenuSocial) {
            tl_olMenuClick.to(".tt-ol-menu-social > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn }, "-=0.4");
            tl_olMenuClick.to(olMenuSocial, { duration: 0.4, autoAlpha: 0 }, "-=0.4");
          }
          
          setTimeout(() => {
            window.location.href = this.getAttribute('href');
          }, 1000);
        });
      });

    } else {    
      // Menu step out animations
      document.body.classList.add("olm-toggle-no-click");

      let tl_olMenuOut = gsap.timeline({
        onComplete: function() { 
          document.body.classList.remove("olm-toggle-no-click"); 
        }
      });
      tl_olMenuOut.to(".tt-ol-menu-list > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn });
      
      const olMenuSocial = document.querySelector(".tt-ol-menu-social");
      if (olMenuSocial) {
        tl_olMenuOut.to(".tt-ol-menu-social > li", { duration: 0.4, y: -80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeIn }, "-=0.4");
        tl_olMenuOut.to(olMenuSocial, { duration: 0.4, autoAlpha: 0, clearProps:"all" }, "-=0.4");
      }
      
      tl_olMenuOut.to(overlayMenu, { duration: 0.4, autoAlpha: 0, clearProps:"all" }, "+=0.2");
      tl_olMenuOut.set(".tt-ol-menu-list > li, .tt-ol-menu-social > li", { clearProps:"all" });
    }
    
    return false;
  });
}
  
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


  


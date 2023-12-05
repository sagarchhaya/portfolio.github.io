var clientLogo = new Swiper(".clientLogoSliderLight", {
  spaceBetween: 40,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 2000,
  },
  breakpoints: {
    576: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    992: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 7,
      spaceBetween: 40,
    },
  },
});
var feedbackTwoDark = new Swiper(".twoColumnFeedbackDark", {
  spaceBetween: 40,
  loop: true,

  pagination: {
    el: ".service-pagination.dev-style.swiper-pagination",
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    576: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1500: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
});

// Accordion
// Get all the accordion headers and bodies
const headers = document.querySelectorAll(".accordion-header");
const bodies = document.querySelectorAll(".accordion-body");

const accrodionControl = (id) => {
  const accrodions = document.querySelectorAll(".accordion-header");
  accrodions.forEach((acc, index) => {
    // Toggle the visibility of the accordion body
    if (id === index) {
      acc.nextElementSibling.classList.remove("hidden");
      // Toggle the transform of the accordion icon
      const icon = acc.querySelector(".accordion-icon svg");
      const number = acc.querySelector(".accordion-number");
      icon.classList.remove("rotate-0");
      icon.classList.add("rotate-180");
      number.classList.add("bg-white");
      number.classList.add("text-interface-100");
    } else {
      acc.nextElementSibling.classList.add("hidden");
      // Toggle the transform of the accordion icon
      const icon = acc.querySelector(".accordion-icon svg");
      const number = acc.querySelector(".accordion-number");
      icon.classList.add("rotate-0");
      icon.classList.remove("rotate-180");
      number.classList.remove("bg-white");
      number.classList.remove("text-interface-100");
    }
  });
};

// Add click event listeners to the headers
headers.forEach((header, index) => {
  header.addEventListener("click", (event) => {
    accrodionControl(index);
  });
});

// on location change
let useMouseWheel = false;
const changeActive = function () {
  const sidebarBtns = document.getElementsByClassName("sidebar");
  const location = window.location.hash;

  if (sidebarBtns) {
    for (let i = 0; i < sidebarBtns.length; i++) {
      const id = sidebarBtns[i].attributes.href.value;
      let hoverClass = "";
      let toggleClass = "";
      if (id === location) {
        for (let j = 0; j < sidebarBtns[i].classList.length; j++) {
          if (sidebarBtns[i].classList[j].includes("hover:bg")) {
            hoverClass = sidebarBtns[i].classList[j].replace("hover:", "");
          }
          if (sidebarBtns[i].classList[j].includes("bg")) {
            if (!sidebarBtns[i].classList[j].includes("hover")) {
              toggleClass = sidebarBtns[i].classList[j];
            }
          }
        }
        if (hoverClass === toggleClass && toggleClass !== "") {
          sidebarBtns[i].classList.toggle(toggleClass);
        } else if (toggleClass !== "") {
          sidebarBtns[i].classList.toggle(toggleClass);
          sidebarBtns[i].classList.toggle(hoverClass);
        } else {
          sidebarBtns[i].classList.toggle(hoverClass);
        }
      } else {
        for (let j = 0; j < sidebarBtns[i].classList.length; j++) {
          if (sidebarBtns[i].classList[j].includes("hover:bg")) {
            hoverClass = sidebarBtns[i].classList[j].replace("hover:", "");
          }
        }
        sidebarBtns[i].classList?.remove(hoverClass);
      }
    }
  }
};

// add animation

const animate = () => {
  const nav = document.querySelectorAll(".nav-bar a");
  nav.forEach((item) => {
    if (item.getAttribute("href") === window.location.hash) {
      document
        .querySelector(item.getAttribute("href"))
        .classList.add("animate");
    } else {
      document
        .querySelector(item.getAttribute("href"))
        .classList.remove("animate");
    }
  });
};

// counter
const counter = (parentid, id, number, delay) => {
  const fdelay = delay / number;
  let initial = 0;
  const division = document.getElementById(id);
  if (
    (division && "#" + parentid === window.location.hash) ||
    (division && !window.location.hash)
  ) {
    const interval = setInterval(() => {
      if (number > 999 && initial < number - 1000) {
        initial += 1000;
      } else {
        initial += 1;
      }

      division.innerText = initial;
      if (number === initial) {
        clearInterval(interval);
      }
    }, fdelay);
  }
};

window.onhashchange = () => {
  changeActive();
  animate();
  counter("home", "count", 5000, 500);
  counter("about", "count95", 95, 2000);
  counter("about", "count85", 85, 2000);
  counter("about", "count90", 90, 2000);
  counter("home", "count45", 45, 1000);
};

counter("home", "count", 5000, 500);
counter("home", "count45", 45, 1000);

// change hash on scroll
const mainSection = document.getElementById("main");
const innerSec = document.querySelectorAll(".slide-sec");
const navbar = document.querySelectorAll(".nav-bar a");
const mobileNav = document.querySelectorAll(".mobile-nav a");
mobileNav.forEach((nav) => {
  nav.addEventListener("click", () => {
    useMouseWheel = false;
  });
});
navbar.forEach((nav) => {
  nav.addEventListener("click", () => (useMouseWheel = false));
});
mainSection.addEventListener("wheel", () => {
  useMouseWheel = true;
});
mainSection.addEventListener("scroll", (event) => {
  let top = mainSection.scrollTop;
  innerSec.forEach((elem) => {
    let offset = elem.offsetTop;
    let height = elem.offsetHeight;
    let id = elem.getAttribute("id");

    if (top + 40 >= offset && top + 40 < offset + height) {
      navbar.forEach((nav) => {
        if (nav.getAttribute("href") === `#${id}`) {
          if (useMouseWheel) {
            window.location.hash = nav.getAttribute("href");
          }
        }
      });
    }
  });
});

// mobile nav

document.getElementById("mobile-control").addEventListener("click", () => {
  const menu = document.getElementById("mobile-control").classList;
  if (menu.value.includes("active-mnav")) {
    menu.remove("active-mnav");
    menu.add("close-mnav");
  } else {
    menu.add("active-mnav");
    menu.remove("close-mnav");
  }
});

document.getElementById("mobile-control2").addEventListener("click", () => {
  const menu = document.getElementById("mobile-control2").classList;
  if (menu.value.includes("active-mnav-right")) {
    menu.remove("active-mnav-right");
    menu.add("close-mnav-right");
  } else {
    menu.add("active-mnav-right");
    menu.remove("close-mnav-right");
  }
});

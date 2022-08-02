let leaveTL = gsap.timeline({
  defaults: { duration: 0.75, ease: "power2.easeOut" },
});
let enterTL = gsap.timeline({
  defaults: { duration: 0.75, ease: "power2.easeOut" },
});

// Function's for leave and entering animations:
function leaveAnimation(current, done) {
  let product = current.querySelector(".image-container");
  let text = current.querySelector(".showcase-text");
  let circles = current.querySelectorAll(".circle");
  let arrow = current.querySelector(".showcase-arrow");
  return (
    leaveTL.fromTo(
      arrow,
      { opacity: 1, y: 0 },
      { opacity: 0, y: 50, onComplete: done }
    ),
    leaveTL.fromTo(product, { opacity: 1, y: 0 }, { opacity: 0, y: 100 }, "<"),
    leaveTL.fromTo(text, { opacity: 1, y: 0 }, { opacity: 0, y: 100 }, "<"),
    leaveTL.fromTo(
      circles,
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -200,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "<"
    )
  );
}

function enterAnimation(next, done, gradient) {
  let product = next.querySelector(".image-container");
  let text = next.querySelector(".showcase-text");
  let circles = next.querySelectorAll(".circle");
  let arrow = next.querySelector(".showcase-arrow");
  return (
    enterTL.fromTo(
      arrow,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, onComplete: done }
    ),
    enterTL.to("body", { background: gradient }, "<"),
    enterTL.fromTo(product, { opacity: 0, y: -100 }, { opacity: 1, y: 0 }, "<"),
    enterTL.fromTo(text, { opacity: 0, y: 100 }, { opacity: 1, y: 0 }, "<"),
    enterTL.fromTo(
      circles,
      { opacity: 0, y: -200 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "back.out(1.7)" },
      "<"
    )
  );
}

function getGradient(name) {
  switch (name) {
    case "handbag":
      return `linear-gradient(260deg, #b75d62, #754d4f)`;
    case "boot":
      return `linear-gradient(260deg, #5d8cd7, #4c4f70)`;
    case "hat":
      return `linear-gradient(260deg, #b27a5c, #7f5450)`;
  }
}

// STEP 1# CONFIGURE YOUR MARKUP
// ! https://barba.js.org/docs/getstarted/markup/
/*
<body data-barba="wrapper">
  <!-- put here content that will not change
  between your pages, like <header> or <nav> -->

  // index.html
  <main data-barba="container" data-barba-namespace="home">
    <!-- put here the content you wish to change
    between your pages, like your main content <h1> or <p> -->
  </main>

  // shop.html
  <main data-barba="container" data-barba-namespace="shop">
    <!-- put here the content you wish to change
    between your pages, like your main content <h1> or <p> -->
  </main>

  // about.html
  <main data-barba="container" data-barba-namespace="about">
    <!-- put here the content you wish to change
    between your pages, like your main content <h1> or <p> -->
  </main>

  <!-- put here content that will not change
  between your pages, like <footer> -->
</body>
*/
/* Wrapper
  The wrapper is the main Barba area that contains all your page structure and
  the Barba container. Everything inside this wrapper and outside the container
  will not be updated by Barba. You can put your <header>, <footer> or <nav>
  safely here. Its mainly defined on the <body> tag.
*/

/* Container
  The container defines a area in which content is updated automatically when
  you navigate between your html pages. Everything inside of the container will
  be updated by Barba. It is mainly defined on the <main> tag, but can be added
  to a <div> or <section> element.
*/

/* Namespace
  The namespace allows you to define a unique name for each html page. Barba can
  mainly use this "namespace" for Transition rules and Views.
*/

// STEP 2# BASIC TRANSITION / RUN FUNCTIONS
barba.init({
  preventRunning: true,
  transitions: [
    //showcase transitions
    {
      name: "default",
      leave(data) {
        // create your stunning leave animation here:
        // console.log("current container", data.current.container);
        let done = this.async();
        let { container, namespace } = data.current;
        leaveAnimation(container, done);
      },
      enter(data) {
        // create your amazing enter animation here:
        // console.log("next container:", data.next.container);
        let done = this.async();
        let { container, namespace } = data.next;
        let gradient = getGradient(namespace);
        enterAnimation(container, done, gradient);
      },
    },
  ],
});
/*
  The `transition array` holds multiple animation within leave / enter functions.
  Our `data` argument holds the current and next `container` object from the html.
  A transition run between two pages of your site, leading the user to see a
  fluid/smooth animation instead of a browser “force reload” with a blank page. A
  basic transition is made of a leave animation, that is executed when leaving the
  current page, and an enter animation that is executed when entering the next
*/

# Frontend Mentor - Coffeeroasters subscription site solution

This is a solution to the [Coffeeroasters subscription site challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/coffeeroasters-subscription-site-5Fc26HVY6). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements throughout the site
- Make selections to create a coffee subscription and see an order summary modal of their choices

### Screenshot

![](preview.jpg)

### Links

- Solution URL: [GitHub](https://github.com/NgocMinhThuNguyen/Coffeeroasters-subscription-site)
- Live Site URL: [Live](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Javascript

### What I learned
- Modal: There is an HTML tag called `dialog` to create a modal which has all the properties of modal, I do not need to use complex CSS to create modal. 
  ```html
  <button class="open-modal">Open modal</button>
  <dialog>
    <h1>Order Summary<h1>
    <p>"I drink coffee Filter, with a Decaf type of bean. 1000g ground ala Wholebean, sent to me every week</p>
    <button>Check out</button>
  </dialog>
  ```
  By default, the modal will be hidden, to open it, using JS, listening for a click event on the open button like this:
  ```js
  cont openModalBtn = document.querySelector(".open-modal");
  const modal = document.quetySelector("dialog");
  openModalBtn.addEventListener("click", () => {
    modal.showModal();
  })
  ```
  To close the modal, using `modal.close()`

  I can also change the background when the open is opened using the `backdrop` pseudo class, however, it is still not widely supported on browsers

  ```css
  dialog::backdrop {
    background-color: hsl( var(--clr-grey) / .5);
  }
  ```

- For this project, I tried to create CSS utilities and components and I realized that it saved a lot of time and codes for a big project like this.

- Mobile menu: to create the moblie navigation:
  - I first create the navigation for tablet/desktop
  - Create the menu button to toggle the navigation, hide the text using `.sr-only` class. The button should have `aria-controls` and `aria-expanded`
    - Use the media queries `@media (max-width: 35rem)` for the mobile nav to reduce duplicated codes
    - `.sr-only`: The menu button is normally visualized using icon like hamburger icon, the screen reader will not know what it is, therefore there should be a text to describe that menu button and hide it using this class
    - `aria-controls`: identify the element/elements control the menu button, here is the `nav`
    - `aria-expanded`: let screen readers know whether to menu is open or not. By default, it is set to false `aria-expanded="false"`, when it menu is open, set it to true

```html
  <button class="mobile-nav-toggle" aria-controls="primary-nav">
    <span class="sr-only" aria-expanded="false">Menu</span>
  </button>

  <nav class="primary-nav" id="primary-nav">
    <ul class="nav flex">
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About Us</a></li>
      <li><a href="plan.html">Create Your Plan</a></li>
    </ul>
  </nav>
```

```css
.sr-only {
  display: none;
  position: absolute; 
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px; 
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap; /* added line */
  border: 0;
}
```

- Add gradient overlay to text: this is an interesting thing I learned during this project, to make it, I need to use three css properties:
  - `background-image`: using linear gradient to create the wished colors
  - `background-clip:text`: render the background where it is text
  - `-webkit-text-fill-color: transparent`: hide the text color to make the gradient background visible

- Overlapping content: instead of using absolute and relative positions to position the content when I want it to be overlapping, I found it is better to use `subgrid` in this project, however, because `subgrid` is still not supported in some browsers, I used `grid` and pseudo-class. The idea is to use `grid` to create the numbers of columns/rows I want, then use the pseudo before or after to add an extra style like this:

```css
  .quality-wrapper::before {
  content: "";
  grid-column: 1/-1;
  grid-row: 2/-1;
  background-image: url("assets/about/mobile/bg-quality.png");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 6px;
}
```

- `object-fit`: this property is to make the image scale responsively, however, to use it, I should have the width and height. If not, it does not seem to work.

### Continued development

- Add animation for a better user experience
- Store user order to the database

### Useful resources

- [How to add a gradient overlay to text with CSS](https://fossheim.io/writing/posts/css-text-gradient/)
- [Tutorial: Let's Build an Accessible Disclosure](https://fedmentor.dev/posts/disclosure-ui/)

## Author

- Website - [Thu Nguyen](https://github.com/NgocMinhThuNguyen)
- Frontend Mentor - [@NgocMinhThuNguyen](https://www.frontendmentor.io/profile/NgocMinhThuNguyen)

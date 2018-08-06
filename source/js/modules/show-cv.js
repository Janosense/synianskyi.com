const openButton = document.querySelector(".hero__button");
const layout = document.querySelector(".layout");
const hero = document.querySelector(".hero");
const cv = document.querySelector(".cv");
const closeButton = document.querySelector(".cv-close");
const social = document.querySelector(".social");

const openCv = () => {
  window.location.hash = 'cv';
  document.body.classList.add("scrollable");
  layout.classList.add("layout--visible");
  hero.classList.add("hero--translated");
  social.classList.add("social--hidden");
  closeButton.addEventListener("click", onCloseButtonClick);
  setTimeout(() => {
    layout.classList.add("layout--collapsed");
  }, 500);
  setTimeout(() => {
    cv.classList.add("cv--visible");
    closeButton.classList.add("cv-close--active");
  }, 650);
};

const onCloseButtonClick = () => {
  window.location.hash = 'home';
  document.body.classList.remove("scrollable");
  layout.classList.remove("layout--collapsed");
  closeButton.classList.remove("cv-close--active");
  cv.classList.remove("cv--visible");
  setTimeout(() => {
    layout.classList.remove("layout--visible");
    hero.classList.remove("hero--translated");
    social.classList.remove("social--hidden");
  }, 500);
  closeButton.removeEventListener("click", onCloseButtonClick);
};

openButton.addEventListener("click", openCv);

if (window.location.hash === "#cv") {
  setTimeout(() => {
    openCv();
  }, 1000);
}
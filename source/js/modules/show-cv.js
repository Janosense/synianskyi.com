const button = document.querySelector(".hero__button");
const layout = document.querySelector(".layout");
const hero = document.querySelector(".hero");
const cv = document.querySelector(".cv");
const closeButton = document.querySelector(".cv-close");

const onCloseButtonClick = () => {
  layout.classList.remove("layout--collapsed");
  cv.classList.remove("cv--visible");
  closeButton.classList.remove("cv-close--active");
  setTimeout(function () {
    layout.classList.remove("layout--visible");
    hero.classList.remove("hero--translated");
  }, 500);
  closeButton.removeEventListener("click", onCloseButtonClick);
};

button.addEventListener("click", function () {
  layout.classList.add("layout--visible");
  hero.classList.add("hero--translated");
  setTimeout(function () {
    layout.classList.add("layout--collapsed");
  }, 500);

  setTimeout(function () {
    cv.classList.add("cv--visible");
    closeButton.addEventListener("click", onCloseButtonClick);
    closeButton.classList.add("cv-close--active");
  }, 650);
});
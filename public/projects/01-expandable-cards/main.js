const images = document.querySelectorAll(".wrapper__img");

images.forEach((image) => {
  checkTitleActive();
  image.addEventListener("click", () => {
    removeActiveClass();
    image.classList.add("active");
    checkTitleActive();
  });
});

function removeActiveClass() {
  images.forEach((image) => {
    image.classList.remove("active");
  });
}

function checkTitleActive() {
  images.forEach((image) => {
    const title = image.querySelector("h2");
    if (image.classList.contains("active")) {
      title.style.display = "block";
    } else {
      title.style.display = "none";
    }
  });
}

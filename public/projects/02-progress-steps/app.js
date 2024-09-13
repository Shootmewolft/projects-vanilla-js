const btns = document.querySelector(".wrapper__btns");
const numbers = document.querySelectorAll(".wrapper__number-page");
const progressBar = document.querySelector(".wrapper__progress");
let currentPage = 1; // initial page
const widthProgress = {
  1: "0%",
  2: "30%",
  3: "70%",
  4: "100%",
};

btns.addEventListener("click", (event) => addProgress(event));

function addProgress(event) {
  const currentBtn = event.target;
  checkCurrentPage(currentBtn);
  toggleClassNumbers(currentPage);
  toggleClassBtns(currentPage);
}

function checkCurrentPage(currentBtn) {
  if (currentBtn.textContent === "Next") {
    currentPage >= 1 && currentPage < numbers.length
      ? currentPage++
      : currentPage;
  } else if (currentBtn.textContent === "Prev") {
    currentPage > 1 && currentPage <= numbers.length
      ? currentPage--
      : currentPage;
  }
}

function toggleClassNumbers(currentPage) {
  progressBar.style.width = widthProgress[currentPage];
  numbers[currentPage - 1].classList.add("active-page");
  if (currentPage < 4){
    numbers[currentPage].classList.remove("active-page");
  }
}

function toggleClassBtns(currentPage) {
  const btn = btns.querySelectorAll(".wrapper__btn");
  if (currentPage < numbers.length && currentPage > 1) {
    btn.forEach((btn) => {
      btn.classList.remove("avaliable-btn", "disabled-btn");
      btn.classList.add("avaliable-btn");
    });
  } else if (currentPage === numbers.length) {
    btn.forEach((btn) => btn.classList.remove("avaliable-btn", "disabled-btn"));
    btn[0].classList.add("avaliable-btn");
    btn[btn.length - 1].classList.add("disabled-btn");
  } else if (currentPage === 1) {
    btn.forEach((btn) => btn.classList.remove("avaliable-btn", "disabled-btn"));
    btn[0].classList.add("disabled-btn");
    btn[btn.length - 1].classList.add("avaliable-btn");
  }
}
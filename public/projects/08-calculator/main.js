const result = document.querySelector(".calculator__result");
const btns = document.querySelectorAll(".calculator__btn");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("btn--del") && (result.textContent.length === 1 || result.textContent === "Error!")) {
      result.textContent = "0";
      return;
    } else if (
      btn.classList.contains("btn--del") &&
      result.textContent.length > 1
    ) {
      result.textContent = result.textContent.slice(0, -1);
      return;
    }

    if (btn.classList.contains('btn--result')){
        try{
            result.textContent = eval(result.textContent)
        } catch{
            result.textContent = "Error!"
        }
        return
    } 

    if (btn.classList.contains("btn--reset")) {
      result.textContent = "0";
      return;
    }

    if (btn.classList.contains("btn--number") && result.textContent === "0" || result.textContent === "Error!") {
      result.textContent = btn.textContent;
    } else {
      result.textContent += btn.textContent;
    }
  });
});

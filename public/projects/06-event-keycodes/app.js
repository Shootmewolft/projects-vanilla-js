document.addEventListener("keydown", (event) => showKeyEvent(event));

function showKeyEvent(event) {
  const windowInitial = document.querySelector(".container__initial-window");
  const windowEventKey = document.querySelector(".container__event-keys");
  const eventsCode = document.querySelectorAll("#eventKey");

  windowInitial.style.display = "none";
  windowEventKey.style.display = "flex";
  eventsCode[0].textContent = event.key
  if (event.key === " "){
    eventsCode[0].textContent = "Space"
  } else{
    eventsCode[0].textContent = event.key
  }
  eventsCode[1].textContent = event.keyCode
  eventsCode[2].textContent = event.code
}

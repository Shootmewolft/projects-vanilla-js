const tasks = document.querySelector(".todo__tasks")
const form = document.querySelector("form")
const filters = document.querySelector(".todo__footer")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const inputValue = document.querySelector("form input")
  addTask(inputValue.value)
  inputValue.parentNode.reset()
})

tasks.addEventListener("click", (e) => {
  const click = e.target
  if (click.classList.contains("todo__btn-delete")) {
    removeTask(e.target)
  } else if (click.classList.contains("todo__check-circle")) {
    const taskText = click.nextElementSibling
    click.classList.toggle("todo__check-active")
    taskText.classList.toggle("task-completed")
    taskText.parentNode.classList.toggle("completed")
  }
})

filters.addEventListener("click", (e) => {
  const click = e.target
  if (click.classList.contains("todo__btn-clear")) {
    clearCompleted(click.classList.contains("todo__filter-btn"))
  } else if (click.classList.contains("todo__filter-btn")) {
    filtersBtns(click)
  }
})

function addTask(inputValue) {
  if (inputValue === "") {
    form.removeEventListener("click", () => {})
  } else {
    const task = document.createElement("div")
    const taskText = document.createElement("p")
    const taskCheckbox = document.createElement("span")
    const taskBtn = document.createElement("img")
    task.classList.add("todo__task")
    taskBtn.classList.add("todo__btn-delete")
    taskText.innerText = inputValue
    taskCheckbox.classList.add("todo__check-circle")
    taskBtn.setAttribute("src", "assets/icon-cross.svg")
    task.append(taskCheckbox, taskText, taskBtn)
    tasks.appendChild(task)
  }
}

function removeTask(btn) {
  btn.parentNode.remove()
}

function clearCompleted() {
  const tasksCompleted = document.querySelectorAll(".completed")
  tasksCompleted.forEach((element) => {
    element.remove()
  })
}

function filtersBtns(btn) {
  const tasks = document.querySelectorAll(".todo__task")
  if (btn.innerText === "Completed") {
    tasks.forEach((element) => {
      element.style.display = "flex"
      if(!element.classList.contains("completed")) {
        element.style.display = "none"
      }
    })
  } else if(btn.innerText === "All"){
    tasks.forEach(element =>{
      element.style.display = "flex"
    })
  } else if(btn.innerText === "Active"){
    tasks.forEach(element =>{
      element.style.display = "flex"
      if(element.classList.contains('completed')){
        element.style.display = "none"
      }
    })
  }
}

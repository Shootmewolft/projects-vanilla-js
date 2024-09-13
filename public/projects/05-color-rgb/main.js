const inputs = document.querySelectorAll('input')
const textInput = document.querySelectorAll('#value-input')
let r=255, g=255 , b=255

inputs.forEach((el, index) =>{
  el.addEventListener('input', () =>{
    const valueElement = el.value
    textInput[index].innerText = `${valueElement}`

    if(el.classList.value === "card__input-red"){
      r = el.value
    } else if(el.classList.value === "card__input-green"){
      g = el.value
    } else if(el.classList.value === "card__input-blue"){
      b = el.value
    }
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
  })
})
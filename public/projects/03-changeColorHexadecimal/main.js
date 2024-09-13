import { changeColor } from './components/changeColor.js'

const background = document.querySelector('body')
const title = document.querySelector('.container__title span')
const button = document.querySelector('.container__button')
button.addEventListener('click', (e) =>{
    const color = changeColor()
    title.innerHTML = color
    background.style.backgroundColor = `#${color}`
})
import { cites } from './consts/cites.js'

const button = document.querySelector('.card__button')
const citeText = document.querySelector('.card__cite')
const autorCite = document.querySelector('.card__autor')

button.addEventListener('click', () => {
  let numberRandom
  let cite
  
  do {
    numberRandom = Math.floor(Math.random() * cites.length)
    cite = cites[numberRandom]
  } while (autorCite.innerText === cite.autor)

  citeText.innerText = `${cite.cite}`
  autorCite.innerText = `${cite.autor}`
})

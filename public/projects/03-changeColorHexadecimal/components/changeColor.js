export function changeColor() {
    let color = ""
    for(let i=0; i<6; i++){
        const numberRandom = Math.floor(Math.random() * 16)
        color+=numberRandom.toString(16)
    }
    return color
}

const display = document.querySelector(".calculator__display");
const controls = document.querySelectorAll(".controls__item");
const allSymbols = document.querySelectorAll(".controls__item");

let firstValue;
let secondValue;
let result;


const calculate = (operator) => {

}

console.log(controls)

for(let button of controls) {
    button.addEventListener("click", () => {
        const {innerText : btnValue} = button

        console.log(btnValue);
    })
}



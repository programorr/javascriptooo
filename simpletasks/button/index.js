let count = 0

const score = document.getElementById("score")
const minusBtn = document.getElementById("minus-button")

if (count <= 0) {
    minusBtn.disabled = true;
    minusBtn.classList.remove("btn");
    minusBtn.classList.add("btn-off")
}

function add1() {
    count += 1
    score.textContent = count
    minusBtn.disabled = false
}

minusBtn.addEventListener('click', function(){
    if (count > 0) {
        count -= 1
        score.textContent = count;
        minusBtn.disabled = false;
        minusBtn.classList.add("btn-off")
    } else {
        // minusBtn.disabled = true;
        // minusBtn.classList.add("btn")
    }
})

// function minus1() {
//     if (count > 0) {
//         count -= 1
//         score.textContent = count
//     }
// }
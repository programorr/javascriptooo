let count = 0

const score = document.getElementById("score")



function add1() {
    // console.log('clicked!')
    count += 1
    score.textContent = count
}

function minus1() {
    count -= 1
    score.textContent = count
}
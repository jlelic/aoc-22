const fs = require('fs')

const inputText = fs.readFileSync('2-live.txt').toString()

const input = inputText.split('\r\n')

const results = {
    X: 0,
    Y: 3,
    Z: 6
}

let score = 0
for (let game of input) {
    if (!game.length) {
        continue
    }
    const [enemy, result] = game.split(' ')
    score += results[result]
    console.log('RESULT SCORE', results[result])
    const eN = enemy.charCodeAt(0) - 65
    console.log(eN, result)
    if (result === 'X') {
        score += (eN + 2) % 3
    } else if (result === 'Y') {
        score += eN
    } else {
        score += (eN + 1) % 3
    }
    score++
    console.log(score)
}

console.log(score)

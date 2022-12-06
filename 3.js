const fs = require('fs')

const inputText = fs.readFileSync('3-live.txt').toString()

const input = inputText.split('\r\n')

const toPrio = x => {
    const code = x.charCodeAt(0)
    if (code < 95) {
        return code - 38
    }
    return code - 96
}

const toLetter = x => {
    if (x < 27) {
        return String.fromCharCode(x + 96)
    }
    return String.fromCharCode(x + 38)
}

let result = 0

let rucksacks = []
for (let rucksack of input) {
    if (!rucksack) {
        break
    }
    rucksacks.push(rucksack)
    if (rucksacks.length < 3) {
        continue
    }
    console.log('------------------')
    const r = [{},{},{}]
    const max = Math.max(rucksacks[0].length, rucksacks[1].length, rucksacks[2].length)
    for (let i = 0; i < max; i++) {
        for (let j = 0; j < 3; j++) {
            if(rucksacks[j].length <= i) {
                continue
            }
            const letter = rucksacks[j][i]
            console.log(j,i,letter)
            const prio = toPrio(letter)
            r[j][prio] = (r[j][prio] || 0) + 1
        }
    }

    for (let i = 0; i <= 52; i++) {
        if (r[0][i] && r[1][i] && r[2][i]) {
            result += i
            console.log(rucksacks[0], rucksacks[1], rucksacks[2])
            console.log(toLetter(i))
            // console.log(i, toLetter(i), result)
        }
    }

    rucksacks = []
}

console.log(result)

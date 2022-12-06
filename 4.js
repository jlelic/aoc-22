const fs = require('fs')

const inputText = fs.readFileSync('4-live.txt').toString()

const input = inputText.split('\r\n')

let result = 0

for (const pair of input) {
    if(!pair) {
        break
    }
    const [first, second] = pair.split(',')
    const [a1, b1] = first.split('-').map(x => parseInt(x))
    const [a2, b2] = second.split('-').map(x => parseInt(x))

    if (a1 <= a2 && b1 >= b2) {
        result++
        // console.log(pair)
        console.log(`${a1} <= ${a2} <= ${b2} <= ${b1}`)
    } else if (a2 <= a1 && b2 >= b1) {
        result++
        // console.log(pair)
        console.log(`${a2} <= ${a1} <= ${b1} <= ${b2}`)
    } else if(a2 <= b1 && b1 <= b2) {
        result++
    } else if(a1 <= b2 && b2 <= b1) {
        result++
    }
}

console.log(result)

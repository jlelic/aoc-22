const fs = require('fs')

const inputText = fs.readFileSync('9-live.txt').toString()

const input = inputText.split('\r\n')

const visited = new Set()
const knots = [
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
    [0,0],
]

const distance = (i, j) => Math.sqrt(Math.pow(knots[i][0] - knots[j][0], 2) + Math.pow(knots[i][1] - knots[j][1], 2))

const isSomethingSame = (i, j) => knots[i][0] !== knots[j][0] && knots[i][1] !== knots[j][1]

const tailPosition = () => `${knots[9][0]}\tx\t${knots[9][1]}`
const markVisit = () => visited.add(tailPosition())

const printState = () => {
    for(let i = 0;i<21;i++) {
        let line = []
        for(let j = 0;j<26;j++) {
            line.push('.')
            const x = j-11
            const y = i-15
            for(let k = 0;k<10;k++) {
                if(knots[k][0] === x && knots[k][1] === y) {
                    line[j] = (k || 'H').toString()
                    break
                }
            }
        }
        console.log(line.join(''))
    }
    console.log()
}

const printTrail = () => {
    for(let i = 0;i<21;i++) {
        let line = []
        for(let j = 0;j<26;j++) {
            const x = j-11
            const y = i-15
            line.push(visited.has(`${x}\tx\t${y}`) ? '#' : '.')
        }
        console.log(line.join(''))
    }
    console.log()
}


const dirs = {
    R: [1, 0],
    L: [-1, 0],
    D: [0, 1],
    U: [0, -1]
}

markVisit()
printState()
for (let line of input) {
    if (!line.length) {
        break
    }
    const [dir, movesStr] = line.split(' ')
    console.log(`== ${line} ==\n`)
    const moves = parseInt(movesStr)
    const [mX, mY] = dirs[dir]
    for (let i = 0; i < moves; i++) {
        knots[0][0] += mX
        knots[0][1] += mY

        for(let k = 1; k<knots.length;k++) {
            if (distance(k-1,k) < 2) {
                continue
            }
            const prevKnot = knots[k-1]
            const knot = knots[k]
            knot[0] += Math.sign(prevKnot[0] - knot[0])
            knot[1] += Math.sign(prevKnot[1] - knot[1])
        }
        markVisit()
    }
    printState()
}
printTrail()
console.log(visited.size)

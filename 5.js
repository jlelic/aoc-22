const fs = require('fs')

const inputText = fs.readFileSync('5-live.txt').toString()

const input = inputText.split('\r\n')

let result = 0
let lineNum = 0

const numStacks = (input[0].length + 1) / 4

let stacks = []
for (let i = 0; i < numStacks; i++) {
    stacks.push([])
}

let line = ''
while (true) {
    line = input[lineNum++]
    if(line[1] == '1') {
        break
    }
    for (let i = 0; i < numStacks; i++) {
        const letter = line[i * 4 + 1]
        if (letter && letter !== ' ') {
            stacks[i].push(letter)
        }
    }
}

stacks = stacks.map(s => s.reverse())

for(lineNum = lineNum+1; lineNum<input.length-1; lineNum++) {
    line = input[lineNum]
    const [_move, quantity, _from, from, _to, to] = line.split(' ').map(x => parseInt(x))
    const crane = []
    for(let i = 0; i<quantity;i++) {
        console.log(line, i)
        crane.push(stacks[from-1].pop())
    }
    for(let i = 0; i<quantity;i++) {
        stacks[to-1].push(crane.pop())
    }
}

console.log(stacks.map(x=>x.slice(-1)).flat().join(''))

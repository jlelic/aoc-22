const fs = require('fs')

const inputText = fs.readFileSync('11-live.txt').toString()


const monkeyInput = inputText.split('\r\n\r\n').map(d => d.split('\r\n'))

const monkeys = []

let totalModulo = 1

for (let data of monkeyInput) {
    const items = data[1].split(':')[1].split(',').map(i => parseInt(i))
    const [operator, operandStr] = data[2].split('new = old ')[1].split(' ')
    const operand = operandStr === 'old' ? 'old' : parseInt(operandStr)
    const divisionTestNum = parseInt(data[3].split('by')[1])
    const ifTrue = parseInt(data[4].split('monkey ')[1])
    const ifFalse = parseInt(data[5].split('monkey ')[1])
    totalModulo *= divisionTestNum
    monkeys.push({
        items,
        operator,
        operand,
        divisionTestNum,
        throwTo: [ifTrue, ifFalse],
        threat: 0
    })
}

const printState = (level) => {
    if (level !== 1 && level !== 20 && level % 1000 !== 0) {
        return
    }
    console.log(`== Level ${level} ==`)
    monkeys.forEach((m, i) => console.log(`Monkey ${i}: [${m.items}]`))
    console.log()
}


const calculateWorryLevel = (old, operator, operand) => {
    operand = operand === 'old' ? old : operand
    let result = old
    if (operator === '+') {
        result += operand
    } else {
        result *= operand
    }
    // return ~~(result / 3)
    return ~~(result % totalModulo)
}

for (let level = 1; level <= 10000; level++) {
    for (let m = 0; m < monkeys.length; m++) {
        const monkey = monkeys[m]
        for (let i = 0; i < monkey.items.length; i++) {
            const worry = calculateWorryLevel(monkey.items[i], monkey.operator, monkey.operand)
            const testResult = Math.sign(worry % monkey.divisionTestNum)
            monkeys[monkey.throwTo[testResult]].items.push(worry)
            monkey.threat++
        }
        monkey.items = []
    }
    printState(level)
}

const sorted = monkeys.sort((a, b) => b.threat - a.threat)
console.log(sorted[0].threat * sorted[1].threat)


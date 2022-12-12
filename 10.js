const fs = require('fs')

const inputText = fs.readFileSync('10-live.txt').toString()

const input = inputText.split('\r\n')

let cycle = 0
const lengths = {
    addx: 2,
    noop: 1,
}
const registers = {
    x: 1
}

let currentCommand
let result = 0
let nextCheck = 20
const crt = []
let crtLine = []

const printCrt = () => {
    crt.forEach(l => {
        console.log(l.join(''))
    })
}

const checkRegister = () => {
    if (cmdId !== lastCmdId) {
        //console.log(`== ${currentCommand} ==`)
    }
    //console.log(`${cycle % 40}\t${registers.x}`)
    crtLine.push(Math.abs((cycle % 40) - registers.x) <= 1 ? '█' : ' ')
    console.log(cycle, cycle % 40)
    if ((cycle+1) % 40 === 0) {
        crt.push(crtLine)
        crtLine = []
    }
    //console.log(cycle, registers.x)
    if (cycle === nextCheck) {
        //console.log('*', cycle, registers.x, cycle * registers.x)
        result += cycle * registers.x
        nextCheck += 40
        // if(nextCheck > 240) {
        if (cycle >= 240) {
            //console.log(result)
            printCrt()
            process.exit(0)
        }
    }
}
let cmdId = 0
let lastCmdId = -1
checkRegister()
for (let line of input) {
    currentCommand = line
    if (!line.length) {
        break
    }

    const [command, paramStr] = line.split(' ')
    const param = parseInt(paramStr)

    for (let i = 1; i < lengths[command]; i++) {
        cycle++
        checkRegister()
        lastCmdId = cmdId
    }
    switch (command) {
        case 'addx':
            registers.x += param
            break
    }
    cycle++
    checkRegister()
    lastCmdId = cmdId
    cmdId++
}
printCrt()

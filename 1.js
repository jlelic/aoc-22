const fs = require('fs')

const inputText = fs.readFileSync('1-live.txt').toString()

const input = inputText.split('\r\n')

let currentCalories = 0
const calories = []
for(let entry of input) {
    if(entry.length) {
        const num = parseInt(entry)
        currentCalories += num
    } else {
        calories.push(currentCalories)
        currentCalories = 0
    }
}
calories.push(currentCalories)


console.log(calories.sort().reverse().slice(0,3).reduce((a,b) => a+b, 0))

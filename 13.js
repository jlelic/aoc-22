const fs = require('fs')

const inputText = fs.readFileSync('13-live.txt').toString()

const input = inputText.split('\r\n\r\n').map(d => d.split('\r\n').filter(x => x).map(s => JSON.parse(s)))

const compare = (a, b, offset) => {
    offset = offset || ''
    const nextOffset = offset + ' '
    // console.log(`${nextOffset}${a ? JSON.stringify(a) : 'nothing'} vs ${b ? JSON.stringify(b) : 'nothing'}`)
    if (typeof a === 'undefined' && typeof b === 'undefined') {
        // console.log('')
        return 0
    }
    if (typeof a === 'undefined') {
        return -1
    }
    if (typeof b === 'undefined') {
        return 1
    }
    if (typeof a === 'number') {
        if (typeof b === 'number') {
            return a - b
        } else {
            return compare([a], b, nextOffset)
        }
    } else {
        if (typeof b === 'number') {
            return compare(a, [b], nextOffset)
        }
    }

    // 2 arrays
    const lengthDiff = a.length - b.length
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        const diff = compare(a[i], b[i], nextOffset)
        if (diff !== 0) {
            return diff
        }
    }
    return 0
}

let result = 0
for (let [index, pair] of input.entries()) {
    const [first, second] = pair
    // console.log()
    // console.log(JSON.stringify(first))
    // console.log(JSON.stringify(second))
    const diff = compare(first, second)
    // console.log(diff === 0 ? '=' : diff < 0 ? '<' : '>')
    if (diff <= 0) {
        console.log(index +1 )
        console.log(first)
        console.log(second)
        result += index + 1
    }
}


console.log(result)
const allPacketsSortedStr = [[[2]],[[6]],...(input.flat())].sort(compare).map(p => JSON.stringify(p))
console.log(
    (allPacketsSortedStr.indexOf('[[2]]') + 1)*
    (allPacketsSortedStr.indexOf('[[6]]') + 1)
)

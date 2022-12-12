const fs = require('fs')

const inputText = fs.readFileSync('8-live.txt').toString()

const input = inputText.split('\r\n')
let visibles = [[], [], [], []]
const trees = input.filter(x => x).map(line => {
    const visibleLeft = []
    const visibleRight = []
    const visibleBottom = []
    const visibleTop = []
    visibles[0].push(visibleLeft)
    visibles[1].push(visibleRight)
    visibles[2].push(visibleBottom)
    visibles[3].push(visibleTop)
    const numArray = []
    for (let i = 0; i < line.length; i++) {
        numArray.push(parseInt(line.charAt(i)))
        visibleLeft.push(0)
        visibleRight.push(0)
        visibleBottom.push(0)
        visibleTop.push(0)
    }
    return numArray
})

const visible = new Set()

const maxX = trees[0].length
const maxY = trees.length;
[[1, 0], [-1, 0], [0, -1], [0, 1]].forEach(([dx, dy], index) => {
    // console.log('GOING', dx, dy)
    const startX = dx >= 0 ? 0 : maxX - 1
    const startY = dy >= 0 ? 0 : maxY - 1
    let x = startX
    let y = startY
    while (x >= 0 && y >= 0 && x < maxX && y < maxY) {
        const heights = new Array(10).fill(0)
        while (x >= 0 && y >= 0 && x < maxX && y < maxY) {
            // console.log('CHECKING', x, y)
            const tree = trees[x][y]
            // if (tree < last) {
            //     max = tree
            //     visibles[x][y]='X'
            //     visible.add(`${x}-${y}`)
            // }
            // console.log(tree, heights[tree])
            visibles[index][x][y] = heights[tree]
            for (let i = 0; i < 10; i++) {
                heights[i] = i > tree ? heights[i] + 1 : 1
            }
            x += dx
            y += dy
        }
        // console.log('LINE CHECKED')
        x = dx === 0 ? x + 1 : startX
        y = dy === 0 ? y + 1 : startY
    }
})

let maxScore = 0
const scores = []
for (let x = 0; x < maxX; x++) {
    const scoreline = []
    scores.push(scoreline)
    for (let y = 0; y < maxY; y++) {
        const score = visibles.map(v => v[x][y]).reduce((a, b) => a * b, 1)
        scoreline.push(score)
        if(score > maxScore) {
            maxScore = score
        }
    }
}
console.log(trees)
console.log(scores)
console.log(maxScore)
// console.log(visibles)
// console.log(visible.size)

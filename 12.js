const fs = require('fs')

const inputText = fs.readFileSync('12-live.txt').toString()


const input = inputText.split('\r\n')
const graph = input
    .filter(line => line.length)
    .map(line => line.split('')
        .map(x => x.charCodeAt(0)))
const path = []
const height = graph.length
const width = graph[0].length
let start, end
const starts = []
for (let y = 0; y < height; y++) {
    const pathLine = []
    path.push(pathLine)
    for (let x = 0; x < width; x++) {
        pathLine.push('.')
        if (graph[y][x] === 69) {
            graph[y][x] = 122
            end = { x, y }
        }
        if (graph[y][x] === 83) {
            graph[y][x] = 97
            start = { x, y }
        }
        if (graph[y][x] === 97) {
            starts.push({ x, y })
        }
    }
}

const visited = new Set(starts)
const visitedFrom = {}
const queue = [...starts]

for (; ;) {
    const { x, y } = queue.shift()
    const value = graph[y][x]
    if (x === end.x && y === end.y) {
        console.log(x, y)
        break
    }
    ([[0, 1], [0, -1], [1, 0], [-1, 0]]).forEach(([dx, dy]) => {
        const nx = x + dx
        const ny = y + dy
        const nStr = `${nx}x${ny}`
        if (visited.has(nStr)) {
            return
        }
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
            return
        }
        const nValue = graph[ny][nx]
        if (nValue > value + 1) {
            return
        }
        if (!visitedFrom[nStr]) {
            visitedFrom[nStr] = { x, y }
        }
        visited.add(nStr)
        queue.push({ x: nx, y: ny })
    })
}

let result = 0
let toNode = end
// while (toNode.x !== start.x || toNode.y !== start.y) {
while (graph[toNode.y][toNode.x] !== 97) {
    const fromNode = visitedFrom[`${toNode.x}x${toNode.y}`]
    let pathChar = 'O'
    if (fromNode.x < toNode.x) {
        pathChar = '>'
    } else if (toNode.x < fromNode.x) {
        pathChar = '<'
    } else if (toNode.y < fromNode.y) {
        pathChar = '^'
    } else if (fromNode.y < toNode.y) {
        pathChar = 'v'
    }
    path[fromNode.y][fromNode.x] = pathChar
    toNode = fromNode
    result++
}
for (let pathLine of path) {
    console.log(pathLine.join(''))
}
console.log(result)

const fs = require('fs')

const inputText = fs.readFileSync('7-live.txt').toString()

const input = inputText.split('\r\n')

const createDir = (name, parent) => ({
    name,
    type: 'dir',
    children: {},
    parent
})

const createFile = (name, size) => ({
    name,
    size,
    type: 'file',
})

const root = createDir('/', null)
let current = root

for (let i = 0; i < input.length; i++) {
    const [dollar, cmd, param] = input[i].split(' ')
    if (dollar !== '$') {
        console.log('END', i, input[i])
        break
    }
    console.log(i + 1, '#', cmd, param)
    switch (cmd) {
        case 'cd':
            if (param === '/') {
                current = root
            } else if (param === '..') {
                current = current.parent
            } else {
                current = current.children[param]
            }
            break
        case 'ls':
            i++
            do {
                const line = input[i++]
                const [info, name] = line.split(' ')
                if (info === 'dir') {
                    current.children[name] = createDir(name, current)
                } else {
                    current.children[name] = createFile(name, parseInt(info))
                }
                console.log('\t', line)
            } while (input[i][0] !== '$')
            i--
    }
}

const sizes = {}

const markSize = (dir, parentPath) => {
    let size = 0
    const path = `${parentPath}/${dir.name}`
    for (let child of Object.values(dir.children)) {
        if (child.type === 'file') {
            size += child.size
        } else {
            size += markSize(child, path)
        }
    }
    sizes[path] = size
    dir.size = size
    return size
}

markSize(root, '')

console.log(sizes)

// const result = Object.values(sizes).filter(x => x < 100000).reduce((a,b) => a + b)


const needToDelete = root.size-40000000
console.log('Need to delete at least',needToDelete)
const result = Object.values(sizes).sort((a,b) => a - b).find(x => x > needToDelete)
console.log(result)

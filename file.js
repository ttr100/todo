const fs = require('fs');

let data = ['Buy milk', 'Pay bills', 'Do homework']

// write -> setiap item di gabungkan, dan dipisahkan dengan baris baru

fs.writeFileSync('testdata.txt', data.join('\n'))

// baca -> pisahkan dengan baris baru

let content = fs.readFileSync('testdata.txt')

let readData = String(content).split('\n')

console.log(readData)

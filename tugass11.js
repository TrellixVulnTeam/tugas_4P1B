console.log('selamat datang di permainan tebak kata, silah kan isi dengan jawaban benar yah!')
const fs = require('fs')
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'jawaban: '
});
const bacaData = fs.readFileSync('data.json', 'utf-8')
var isiData = JSON.parse(bacaData)
var data = 0
console.log(isiData[data].definition)
rl.prompt();

rl.on('line', (jawaban) => {
    if (jawaban.toLowerCase() == isiData[data].term) {
        console.log('jawaban anda benar!')
        data++
        if (data < isiData.length) {
            console.log(isiData[data].definition)
            rl.prompt()
        }
        if (data == isiData.length) {
            console.log('selamat semua benar!')
            rl.close()
        }
    } else if (jawaban.toLowerCase() != isiData[data].term) {
        console.log('jawaban anda kurang tepat!')
        console.log(isiData[data].definition)
        rl.prompt()
    }
})

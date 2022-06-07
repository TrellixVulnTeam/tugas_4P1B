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
var back = 1
console.log(isiData[data].definition)
rl.prompt();

rl.on('line', (jawaban) => {
    if (jawaban.toLowerCase() == isiData[data].term) {
        console.log('anda beruntung!')
        data++
        if (data < isiData.length) {
            console.log(isiData[data].definition)
            rl.prompt()
        }
        if (data == isiData.length) {
            console.log('anda berhasil!')
            rl.close()
        }
    } else if (jawaban.toLowerCase() != isiData[data].term) {
        console.log(`anda kurang beruntung! anda salah ${back} kali, silahkan coba lagi!`)
        console.log(isiData[data].definition)
        rl.prompt()
        return back++
    }

}
)

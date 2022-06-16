
console.log('Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya!')
const fs = require('fs')
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Jawaban:'
});
const file = fs.readFileSync('data.json', 'utf-8')
var soal = JSON.parse(file)
var next = 0
console.log(soal[next].definition)
rl.prompt();

rl.on('line', (jawaban) => {

    if (jawaban.toLowerCase() == soal[next].term) {
        console.log('Jawaban anda Benar!')
        next++
        if (next < soal.length) {
            console.log(soal[next].definition)
            rl.prompt();
        } if (next == soal.length) {
            console.log('Semua Benar')
            rl.close()
        }
    }
    else if (jawaban.toLowerCase() != soal[next].term) {
        console.log('Jawaban anda Salah!')
        console.log(soal[next].definition)
        rl.prompt()
    }
    
})

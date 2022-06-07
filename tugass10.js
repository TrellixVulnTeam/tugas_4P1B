const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'tulis kalimatmu disini>'
});

rl.prompt();

rl.on('line', (line) => {
    
    function stringManipulation(word) {

        if (word.charAt(0) == 'a' ||
            word.charAt(0) == 'i' ||
            word.charAt(0) == 'u' ||
            word.charAt(0) == 'e' ||
            word.charAt(0) == 'o') {
            return word;
        } else {
            return word.substr(1) + word.charAt(0) + 'nyo'
        }
    }
    
    let pisah = line.split(' ');
    let hasil = [];
    for (let i = 0; i < pisah.length; i++) {
        hasil.push(stringManipulation(pisah[i]));
    }
    console.log(hasil.join(' ')); {
    }

    rl.prompt();
}).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
});
    if (!process.argv[2]) {
            console.log('tolong sertakan nama file untuk inputan soalnya')
    }
    // const process = require('process')
    // console.log(process.argv)
    console.log('selamat datang di permainan tebak kata, silah kan isi dengan jawaban benar yah!')
    const fs = require('fs')
    const readline = require('readline');
    // const rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout,
    //     prompt: 'jawaban: '
    // });
    const bacaData = fs.readFileSync(process.argv[2], 'utf8')
    var isiData = JSON.parse(bacaData)
    var patokan = isiData
    // console.log(isiData)
    var data = 0
    var back = 1
    var next = 'skip'
    var benar = 0
    console.log(isiData[data].definition)
    rl.prompt();

    rl.on('line', (jawaban) => {
        if (jawaban.toLowerCase() == isiData[data].term) {
            console.log('anda beruntung!')
            isiData.splice(data, 1)
            if (data == isiData.length) {
                data = 0

            }
            benar++
            if (isiData.length == 0) {
                console.log('anda berhasil!')
                rl.close()
            }
            // console.log(data)
            // console.log(benar)
            if (0 < isiData.length) {
                console.log(isiData[data].definition)
                rl.prompt()
            }


        } else if (jawaban.toLowerCase() == next) {
            data++
            
            console.log(isiData[data].definition)
            rl.prompt()
        } else if (jawaban.toLowerCase() != isiData[data].term) {
            console.log(`anda kurang beruntung! anda salah ${back} kali, silahkan coba lagi!`)
            console.log(isiData[data].definition)
            back++
            rl.prompt()

        }
    }
    )

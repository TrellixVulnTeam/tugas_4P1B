const fs = require('fs');

let real = JSON.parse(fs.readFileSync("todo.json", "utf8"));
let input = process.argv

switch (process.argv[2]) {
    case undefined:
        console.log(
            ">>> JS TODO <<<" +
            "\n node todo.js <command>" +
            "\n node todo.js list" +
            "\n node todo.js task <task_id>" +
            "\n node todo.js add <task_content>" +
            "\n node todo.js delete <task_id>" +
            "\n node todo.js complete <task_id>" +
            "\n node todo.js uncomplete <task_id>" +
            "\n node todo.js list: outstanding asc|desc" +
            "\n node todo.js list: completed asc|desc" +
            "\n node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>" +
            "\n node todo.js filter: <tag_name>"
        );
        process.exit(0);

    case 'add':
        let keluar = '';
        for (let i = 3; i < input.length; i++) {
            keluar += input[i] + ' ';
        }
        real.push({
            "status": false,
            "task_content": keluar,
            "tag": []
        })
        fs.writeFileSync("todo.json", JSON.stringify(real, null, 3))
        console.log(`${keluar} "telah di tambahkan"`);
        process.exit(0);

    case 'complete':
        let index1 = parseInt(input[3]) - 1;
        real[index1].status = true;
        console.log(`${real[index1].task_content} "telah selesai"`);
        fs.writeFileSync("todo.json", JSON.stringify(real, null, 3))
        process.exit(0)

    case 'uncomplete':
        let index2 = parseInt(input[3]) - 1;
        real[index2].status = false;
        console.log(`${real[index2].task_content} "status selesai dibatalkan"`);
        fs.writeFileSync("todo.json", JSON.stringify(real, null, 3))
        process.exit(0)

    case 'delete':
        let index = parseInt(input[3]) - 1;
        let item = real[index];
        real.splice(index, 1);
        console.log(`${item.task_content} "telah dihapus dari daftar"`);
        fs.writeFileSync("todo.json", JSON.stringify(real, null, 3))
        process.exit(0);

    case 'task':
        let index7 = parseInt(input[3]) - 1;
        console.log(`${index7 + 1}. ${real[index7].status ? '[x] ' : '[ ] '}${real[index7].task_content}`);
        process.exit(0);

    case 'list':
        console.log("Daftar Pekerjaan:");
        for (let j = 0; j < real.length; j++) {
            console.log(`${j + 1}.${real[j].status ? '[x] ' : '[ ] '} ${real[j].task_content}`);
        }
        process.exit(0);

    case 'list:outstanding':
        if (input[3] == "asc") {
            for (let g = 0; g < real.length; g++) {
                if (!real[g].status) {
                    console.log(`${g + 1}. ${real[g].status ? '[x] ' : '[ ] '}} ${real[g].task_content}`);
                }
            }
        }
        if (input[3] == "desc") {
            for (let g = real.length - 1; g >= 0; g--) {
                if (!real[g].status) {
                    console.log(`${g + 1}. ${real[g].status ? '[x] ' : '[ ] '} ${real[g].task_content}`);
                }
            }
        }
        process.exit(0);

    case 'list:completed':
        if (input[3] == "asc") {
            for (let g = 0; g < real.length; g++) {
                if (real[g].status) {
                    console.log(`${g + 1}. ${real[g].status ? '[x] ' : '[ ] '} ${real[g].task_content}`);
                }
            }
        }
        if (input[3] == "desc") {
            for (let g = real.length - 1; g >= 0; g--) {
                if (real[g].status) {
                    console.log(`${g + 1}. ${real[g].status ? '[x] ' : '[ ] '} ${real[g].task_content}`);
                }
            }
        }
        process.exit(0);

case 'tag':
        let index4 = parseInt(input[3]) - 1;
        for (let i = 4; i < input.length; i++) {
            if (!real[index4].tag.includes(input[i])) {
                real[index4].tag.push(input[i])
            }
        }
        let coba = real[index4].tag.length - 1;
        console.log(real[index4].tag + ' ' + "telah ditambahkan ke daftar" + ' ' + real[index4].task_content);
        fs.writeFileSync("todo.json", JSON.stringify(real, null, 3))
        process.exit(0);

    case 'help':
        console.log(
            ">>> JS TODO <<<" +
            "\n node todo.js <command>" +
            "\n node todo.js list" +
            "\n node todo.js task <task_id>" +
            "\n node todo.js add <task_content>" +
            "\n node todo.js delete <task_id>" +
            "\n node todo.js complete <task_id>" +
            "\n node todo.js uncomplete <task_id>" +
            "\n node todo.js list: outstanding asc|desc" +
            "\n node todo.js list: completed asc|desc" +
            "\n node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>" +
            "\n node todo.js filter: <tag_name>"
        );
        process.exit(0);
};

name(process.argv[2])

function name() {
    let proses = process.argv[2]
    let proses2 = proses.slice(0, 7)
    if (proses2 == 'filter:') {
        real.map((item, index) => {
            if (item.tag.includes(proses.slice(7))) {
                console.log(`${index + 1}.${item.status ? '[x] ' : '[ ] '} ${item.task_content}`);
            }
        })
    };
};
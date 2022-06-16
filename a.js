function spiral(param1) {
    var array = []
    var counter = 0
    for (let i = 0; i < param1; i++) {
        array[i] = []
        for (let j = 0; j < param1; j++) {
            array[i][j] = counter++
        }
    }
    console.log(array)

    let x = 0
    let y = 0
    let batasAtas = param1
    let batasBawah = 0
    let result = []

    while (result.length < param1 * param1) {

        for (; x < batasAtas; x++) {
            result.push(array[y][x])
        }

        x--;
        y++;
        for (; y < batasAtas; y++) {
            result.push(array[y][x])

        }

        y--;
        x--;
        for (; x >= batasBawah; x--) {
            result.push(array[y][x])

        }

        x++;
        y--;
        for (; y > batasBawah; y--) {
            result.push(array[y][x])

        }

        y++;
        x++;

        batasAtas--;
        batasBawah++;
    }

    console.log(result)
}

spiral(5)
spiral(6)
spiral(7)
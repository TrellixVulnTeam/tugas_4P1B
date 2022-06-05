function spiral(param1) {
    var array = []
    var counter=0
    for (let i = 0; i < param1; i++) {
        array[i]=[]
        for (let j = 0; j < param1; j++) {
            array[i][j]=counter++
            
        }
    }console.log(array)
    console.log('print ke kanan')
    console.log(array[0][0])
    console.log(array[0][1])
    console.log(array[0][2])
    console.log(array[0][3])
    console.log(array[0][4])
    console.log('print ke bawah')
    console.log(array[1][4])
    console.log(array[2][4])
    console.log(array[3][4])
    console.log(array[4][4])

}



spiral(5)
// spiral(6)
// spiral(7)
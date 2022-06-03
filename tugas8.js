function pola(str) {
    //     //write your code here
    let k = str.split(" ")
    // console.log(k)
    let hasil = []
    for (let i = 0; i <= 9; i++) {
        for (let j = 0; j <= 9; j++) {
            // console.log(i, j)
            let awal = Number(k[0].replace("#", i));
            let akhir = Number(k[4].replace("#", j));
            let tengah = k[2];
            // console.log(awal, akhir)

            if (awal * tengah === akhir) {
                hasil.push(i, j);
                return hasil;
            }
        }
    }
}
console.log(pola("42#3 * 188 = 80#204")); // result[8,5]
console.log(pola("8#61 * 895 = 78410#5")); // [7,9]

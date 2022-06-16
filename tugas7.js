function weirdMultiply(sentece) {
    let hasil = ("" + sentece).split("")
    let satu = 1
    for (let i = 0; i < hasil.length; i++) {
        satu *= hasil[i]
    } 
    
    if (satu < 10) {
        return satu;
    } else {
        return weirdMultiply(satu);
    }
}

console.log(weirdMultiply(39)) //-> 3*9=27 -> 2*7=14 -> 1*4=4
console.log(weirdMultiply(3)) //3
console.log(weirdMultiply(999)) // ->9*9*9=729 -> 7*2*9=126 ->1*2*6=12 ->1*2=2
function stringManipulation(word) {

    if (word.charAt(0) == 'a'||
        word.charAt(0) == 'i'||
        word.charAt(0) == 'u'||
        word.charAt(0) == 'e'||
        word.charAt(0) == 'o') {
        return word;
    } else {
        return word.substr(1) + word.charAt(0) + 'nyo'
    }
}

function sentenceManipulation(sentence) {
    let pisah = sentence.split(' ');
    let hasil = [];
    for (let i = 0; i < pisah.length; i++) {
        hasil.push(stringManipulation(pisah[i]));
    }
    console.log(hasil.join(' '));
}

sentenceManipulation('ibu pergi ke pasar bersama aku')
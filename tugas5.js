function stringanipulation(word) {
    if (word.charAt(0) == 'a', word.charAt(0) == 'i', word.charAt(0) == 'u', word.charAt(0) == 'e', word.charAt(0) == 'o') {
        console.log(word);
    } else {
        console.log(word.substr(1) + word.charAt(0) + 'nyo');
    }
}

stringanipulation('ayam') //"ayam"
stringanipulation('bebek') //"ebekbnyo"
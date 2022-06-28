export const Pi = 22/7

export default class MesinHitung {

    constructor(x) {
        this.x = 1
    }
    tambah(x) {
        this.x += x
        return this
    }

    kurang(x) {
        this.x -= x
        return this
    }

    bagi(x) {
        this.x /= x
        return this
    }

    kali(x) {
        this.x *= x
        return this
    }

    akar() {
        this.x = Math.pow(this.x,2)
        return this
    }

    exponen(x) {
        this.x = Math.pow(this.x,x)
        return this
    }

    akarRoot(){
        this.x = Math.sqrt(this.x)
        return this
    }

    result(){
    console.log(this.x)
    }

}
// this.x = Math.pow(this.x,x)
// return this
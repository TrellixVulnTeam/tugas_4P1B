class Car {
    constructor(trye, sit, door,year,model) {
        this.trye = trye;
        this.sit = sit;
        this.door = door;
        this.year = year;
        this.model = model;
        this.engine = CarFactory.generateUUID()
    }
}

class Trye {
    constructor(sizeTrye, brandTrye) {
        this.sizeTrye = sizeTrye;
        this.brandTrye = brandTrye;
    }
}

class Avanza extends Car {
    constructor() {
        super(new Trye(4, 'King'), 7, 5,2020,'Avanza')
        this.garansi = 5;
    }
}

class Supra extends Car {
    constructor() {
        super(new Trye(4, 'BBS'), 2, 3,2019,'Supra')
        this.garansi = 6;
    }
}

class CarFactory {
    constructor(merek1, merek2) {
        this.cars = []

        this.merek1 = merek1;
        this.merek2 = merek2

    }
    static generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

    }

    static random() {
        return Math.floor(Math.random() * 50) + 1;

    }
    produksi(year) {
        let A = 0;
        for (let i = 0; i < CarFactory.random(); i++) {
            const car1 = new Avanza(year);

            this.cars.push(car1)
            A++;
        }

        let b = 0;
        for (let i = 0; i < CarFactory.random(); i++) {
            const car2 = new Supra(year);

            this.cars.push(car2)
            b++;
        }
        console.log(`pada tahun ${year} perusahaan ${this.merek1} menghasilkan sebanyak ${A} mobil/pada tahun ${year} perusahaan ${this.merek2} menghasilkan sebanyak ${b} mobil`)
    }

    garansi(year) {

        for (let i = 0; i < this.cars.length; i++) {
            let rar = year;

            if (rar>(this.cars[i].garansi + this.cars[i].year)) {
                console.log(`mobil ${this.cars[i].model}\ndengan Nomor Engine ${this.cars[i].engine} dan waktu garansi ${this.cars[i].garansi} tahun`)
                console.log(`garansi sekesai di tahun ${rar} dengan awal produksi tahun ${this.cars[i].year}\n `)
            } else {
                console.log(`mobil ${this.cars[i].model}\ndengan Nomor Engine ${this.cars[i].engine} dan waktu garansi ${this.cars[i].garansi} tahun`)
                console.log(`garansi masih ada di tahun ${rar} dengan awal produksi tahun ${this.cars[i].year}\n`)
            }

        }

    }

}

let crew = new CarFactory('Toyota', 'Honda');
crew.produksi(2020);
crew.garansi(2019);
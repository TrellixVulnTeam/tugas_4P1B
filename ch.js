class Tyre {
    constructor(size, btire) {
        this.sizetire = size;
        this.brandtire = btire;
    }
}

class Car {
    constructor(tire, seats, doors, model, year) {
        this.tire = tire
        this.seats = seats;
        this.doors = doors;
        this.model = model;
        this.year = year;
        this.engine = CarFactory.generateUUID()
    }

}

class Avanza extends Car {
    constructor(year) {
        super(new Tyre(17, 'Dunlop'), 8, 4, 'Avanza', year)
        this.garansi = 7
    }
}

class Agya extends Car {
    constructor(year) {
        super(new Tyre(15, 'Mud Country'), 4, 4, 'Agya', year)
        this.garansi = 4
    }
}

class CarFactory {
    constructor(companys1, companys2) {
        this.cars = []

        this.company1 = companys1
        this.company2 = companys2
    }

    static generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxx-xxxx-4xxx-yxxx-xxxxxx'.replace(/[xy]/g, function (c) {
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
        let a = 0
        for (let i = 0; i < CarFactory.random(); i++) {
            const mobil1 = new Agya(year);

            this.cars.push(mobil1)
            a++
        }

        let b = 0
        for (let j = 0; j < CarFactory.random(); j++) {
            const mobil2 = new Avanza(year);

            this.cars.push(mobil2)
            b++
        }
        console.log(`pada tahun ${year} perusahaan ${this.company1} menghasilkan sebanyak ${a} mobil\npada tahun ${year} perusahaan ${this.company2} menghasilkan sebanyak ${b} mobil\n`)
     
    }

    garansi(year) {

        for (let i = 0; i < this.cars.length; i++) {
            let c = year

            if (c > (this.cars[i].garansi + this.cars[i].year)) {
                console.log(`mobil ${this.cars[i].model}\ndengan Nomor Engine ${this.cars[i].engine} dan waktu garansi ${this.cars[i].garansi} tahun`)
                console.log(`garansi hangus di tahun ${c} dengan awal produksi tahun ${this.cars[i].year}\n `)
            } else {
                console.log(`mobil ${this.cars[i].model}\ndengan Nomor Engine ${this.cars[i].engine} dan waktu garansi ${this.cars[i].garansi} tahun`)
                console.log(`garansi masih ada di tahun ${c} dengan awal produksi tahun ${this.cars[i].year}\n`)
            }
        }
    }
}

let factory = new CarFactory('SpaceX', 'Tesla');
factory.produksi(2022);
factory.garansi(2027);
import sqlite3 from 'sqlite3';
import readline from 'readline';
import IndexViews from './views/IndexViews.js';
import userControllers from './controller/userControllers.js';
import jurusanControllers from './controller/jurusancontrollers.js';
import mahasiswaController from './controller/mahasiswaController.js';
import dosenControllers from './controller/dosenController.js';
import matkulControllers from './controller/matkulController.js';
import kontrakControllers from './controller/kontrakControllers.js';

export const db = new sqlite3.Database('university.db', sqlite3.OPEN_READWRITE, err => {
    if (err) {
        console.log('gagal koneksi', err``)
    }
});


export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export default class Main {
    //utama==============================================================================
    static menuUtama() {
        IndexViews.line()
        IndexViews.utama()
        IndexViews.line()
        rl.question('Masukkan salah satu pilihan di atas: ', (opsi) => {
            switch (opsi) {

                case '1':
                    mahasiswaController.menuMahasiswa()
                    break;
                case '2':
                    jurusanControllers.menuJurusan()
                    break;
                case '3':
                    dosenControllers.menuDosen()
                    break;
                case '4':
                    matkulControllers.menuMatkul()
                    break;
                case '5':
                    kontrakControllers.menuKontrak()
                    break;
                case '6':
                    Main.login()
            }
        })
    }
    //welcome==============================================================================
    static login() {
        IndexViews.welcome()
        userControllers.askUser()
    };
}

Main.login()
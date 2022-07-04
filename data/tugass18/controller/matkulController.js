import Main, { rl } from '../tugass18.js'
import Table from 'cli-table';
import IndexViews from '../views/IndexViews.js';
import matkul from '../model/matakuliah.js';
import matkulViews from '../views/matkulViews.js';

export default class matkulControllers {

    static menuMatkul() {
        matkulViews.menu()
        IndexViews.line()
        rl.question('Masukkan salah satu pilihan di atas: ', (opsi) => {
            switch (opsi) {

                case '1':
                    matkulControllers.daftarMatkul()
                    break;
                case '2':
                    matkulControllers.cariMatkul()
                    break;
                case '3':
                    matkulControllers.tambahMatkul()
                    break;
                case '4':
                    matkulControllers.hapusMatkul()
                    break;
                case '5':
                    Main.menuUtama()
                    break;
            }
        })
    }

    //daftar matkul=====================================================================

    static daftarMatkul(callback) {
        matkul.read(function (err, data) {
            if (err) {
                console.log('gagal ambil Matakuliah', err)
                process.exit(1)
            }
            const tableMatkul = new Table({
                head: ['Kode Matkul', 'Matakuliah', 'SKS']
                , colWidths: [20, 40, 10]
            });

            data.forEach(item => {
                tableMatkul.push([item.kodeMk, item.namaMk,item.sks])
            })
            console.log(tableMatkul.toString()) 
            
            if(callback){
                callback()
            } else {
               matkulControllers.menuMatkul()
            }
        })
    }

    //cari matkul=======================================================================

    static cariMatkul() {
        rl.question('Masukkan Kode Matkul: ', (kodeMk) => {
            matkul.search(kodeMk, (err, data) => {
                if (err) {
                    console.log('gagal cari Matakuliah', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log('Mohon maaf! data tidak ditemukan')
                    matkulControllers.menuMatkul()
                } else {
                    matkulViews.detail(data[0])
                    matkulControllers.menuMatkul()
                }
            })
        })
    }

    //tambah matkul=====================================================================
    static tambahMatkul() {
        rl.question('Masukkan Kode Matakuliah: ', (kodeMk) => {
            rl.question('Masukkan Nama Matakuliah: ', (namaMk) => {
                rl.question('Masukkan Jumlah Sks: ', (sks) => {
                    matkul.add(kodeMk, namaMk, sks, (err) => {
                        if (err) {
                            console.log('gagal cari Matakuliah', err)
                            matkulControllers.tambahMatkul()
                        } else {
                            console.log('Matakuliah berhasil ditambahkan')
                            matkulControllers.daftarMatkul()
                        }
                    })
                })
            })
        })
    }

    //hapus matkul=====================================================================
    static hapusMatkul() {
        rl.question('Masukkan Kode Matakuliah: ', (kodeMk) => {
            matkul.remove(kodeMk, (err) => {
                if (err) {
                    console.log('gagal Hapus Matakuliah', err)
                    matkulControllers.menuMatkul()
                } else {
                    console.log(`Matakuliah dengan Kode '${kodeMk}' berhasil di hapus`)
                    matkulControllers.daftarMatkul()
                }
            })
        })
    }
}


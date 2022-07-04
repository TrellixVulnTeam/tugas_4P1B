import Main, { rl } from '../tugass18.js'
import Table from 'cli-table';
import jurusan from '../model/jurusan.js'
import jurusanViews from '../views/jurusanViiews.js';
import IndexViews from '../views/IndexViews.js';

export default class jurusanControllers {

    static menuJurusan() {
        jurusanViews.menu()
        IndexViews.line()
        rl.question('Masukkan salah satu pilihan di atas: ', (opsi) => {
            switch (opsi) {

                case '1':
                    jurusanControllers.daftarJurusan()
                    break;
                case '2':
                    jurusanControllers.cariJurusan()
                    break;
                case '3':
                    jurusanControllers.tambahJurusan()
                    break;
                case '4':
                    jurusanControllers.hapusJurusan()
                    break;
                case '5':
                    Main.menuUtama()
                    break;
            }
        })
    }

    //daftar jurusan=====================================================================

    static daftarJurusan(callback) {
        jurusan.read(function (err, data) {
            if (err) {
                console.log('gagal ambil jurusan', err)
                process.exit(1)
            }
            const tableJurusan = new Table({
                head: ['Kode Jurusan', 'Nama Jurusan']
                , colWidths: [20, 50]
            });

            data.forEach(item => {
                tableJurusan.push([item.kodeJurusan, item.namaJurusan])
            })
            console.log(tableJurusan.toString())
            if(callback){
                callback()
            } else {
               jurusanControllers.menuJurusan()
            }
        })
    }

    //cari jurusan=======================================================================

    static cariJurusan() {
        rl.question('Masukkan Kode Jurusan: ', (kode) => {
            jurusan.search(kode, (err, data) => {
                if (err) {
                    console.log('gagal cari jurusan', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log('Mohon maaf! data tidak ditemukan')
                    jurusanControllers.menuJurusan()
                } else {
                    jurusanViews.detail(data[0])
                    jurusanControllers.menuJurusan()
                }
            })
        })
    }

    //tambah jurusan=====================================================================
    static tambahJurusan() {
        rl.question('Masukkan Kode Jurusan: ', (kode) => {
            rl.question('Masukkan Nama Jurusan: ', (nama) => {
                jurusan.add(kode, nama, (err) => {
                    if (err) {
                        console.log('gagal cari jurusan', err)
                        jurusanControllers.tambahJurusan()
                    } else {
                        console.log('Jurusan berhasil ditambahkan')
                        jurusanControllers.daftarJurusan()
                    }
                })
            })
        })
    }

    //hapus jurusan=====================================================================
    static hapusJurusan() {
        rl.question('Masukkan Kode Jurusan: ', (kode) => {
            jurusan.remove(kode, (err) => {
                if (err) {
                    console.log('gagal Hapus jurusan', err)
                    jurusanControllers.menuJurusan()
                } else {
                    console.log(`Jurusan dengan Kode '${kode}' berhasil di hapus`)
                    jurusanControllers.daftarJurusan()
                }
            })
        })
    }
}


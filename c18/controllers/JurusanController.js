import Main, { rl } from '../main.js'
import Table from 'cli-table'
import Jurusan from '../models/Jurusan.js'
import JurusanView from '../views/JurusanView.js'
import IndexView from '../views/indexView.js'

export default class JurusanController {

    static menuJurusan() {
        JurusanView.menu()
        IndexView.line();
        rl.question('Masukkan salah satu no. dari opsi di atas : ', (opsi) => {
            switch (opsi) {
                case '1':
                    JurusanController.daftarJurusan()
                    break;
                case '2':
                    JurusanController.cariJurusan()
                    break;
                case '3':
                    JurusanController.tambahJurusan()
                    break;
                case '4':
                    JurusanController.hapusJurusan()
                    break;
                case '5':
                    Main.menuUtama()
                    break;
            }
        })
    }

    static daftarJurusan(callback) {
        Jurusan.read(function (err, data) {
            if (err) {
                console.log('gagal ambil jurusan', err)
                process.exit(1)
            }
            const tableJurusan = new Table({
                head: ['Kode Jurusan', 'Nama Jurusan']
                , colWidths: [20, 50]
            });
            data.forEach(item => {
                tableJurusan.push([item.kode_jurusan, item.nama_jurusan])
            })
            console.log(tableJurusan.toString())
            if (callback) {
                callback()
            } else {
                JurusanController.menuJurusan()
            }
        })
    }

    static cariJurusan() {
        rl.question('Masukkan Kode Jurusan : ', (kode) => {
            Jurusan.search(kode, (err, data) => {
                if (err) {
                    console.log('gagal ambil jurusan', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log('data tidak ditemukan')
                    JurusanController.menuJurusan()
                } else {
                    JurusanView.detail(kode, data[0])
                    JurusanController.menuJurusan()
                }
            })
        })
    }

    static tambahJurusan() {
        rl.question('Masukkan Kode Jurusan : ', (kode) => {
            rl.question('Masukkan Nama Jurusan : ', (nama) => {
                Jurusan.add(kode, nama, (err) => {
                    if (err) {
                        console.log('gagal tambah jurusan', err)
                        JurusanController.tambahJurusan()
                    } else {
                        console.log('jurusan telah ditambahkan')
                        JurusanController.daftarJurusan()
                    }
                })
            })
        })
    }

    static hapusJurusan() {
        rl.question('Masukkan Kode Jurusan : ', (kode) => {
            Jurusan.remove(kode, (err) => {
                if (err) {
                    console.log('gagal hapus jurusan', err)
                    JurusanController.menuJurusan()
                } else {
                    console.log(`jurusan dengan kode : ${kode} telah dihapus`)
                    JurusanController.daftarJurusan()
                }
            })
        })
    }

}


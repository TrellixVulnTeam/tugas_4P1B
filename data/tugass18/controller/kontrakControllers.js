import Main, { rl } from '../tugass18.js'
import Table from 'cli-table';
import IndexViews from '../views/IndexViews.js';
import kontrak from '../model/kontrak.js';
import kontrakViews from '../views/kontrakViews.js';
import mahasiswaController from './mahasiswaController.js';
import matkulControllers from './matkulController.js';
import dosenControllers from './dosenController.js';

export default class kontrakControllers {

    static menuKontrak() {
        kontrakViews.menu()
        IndexViews.line()
        rl.question('Masukkan salah satu pilihan di atas: ', (opsi) => {
            switch (opsi) {

                case '1':
                    kontrakControllers.daftarKontrak()
                    break;
                case '2':
                    kontrakControllers.cariKontrak()
                    break;
                case '3':
                    kontrakControllers.tambahKontrak()
                    break;
                case '4':
                    kontrakControllers.hapusKontrak()
                    break;
                case '5':
                    Main.menuUtama()
                    break;
            }
        })
    }

    //daftar kontrak=====================================================================

    static daftarKontrak() {
        kontrak.read(function (err, data) {
            if (err) {
                console.log('gagal ambil kontrak', err)
                process.exit(1)
            }
            const tableKontrak = new Table({
                head: ['ID', 'NILAI', 'NIM', 'KodeMK', 'NIP']
                , colWidths: [20, 20, 20, 20, 20]
            });

            data.forEach(item => {
                tableKontrak.push([item.ID, item.nilai, item.nim, item.kodeMk, item.nip])
            })
            console.log(tableKontrak.toString())
            kontrakControllers.menuKontrak()
        })
    }

    //cari kontrak=======================================================================

    static cariKontrak() {
        rl.question('Masukkan ID Kontrak: ', (ID) => {
            kontrak.search(ID, (err, data) => {
                if (err) {
                    console.log('gagal cari kontrak', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log('Mohon maaf! data tidak ditemukan')
                    kontrakControllers.menuKontrak()
                } else {
                    kontrakViews.detail(data[0])
                    kontrakControllers.menuKontrak()
                }
            })
        })
    }

    //tambah kontrak=====================================================================
    static tambahKontrak() {
        rl.question('Masukkan nilai Kontrak: ', (nilai) => {
            mahasiswaController.daftarMahasiswa(function () {
                rl.question('Masukkan Nim Kontrak: ', (nim) => {
                    matkulControllers.daftarMatkul(function () {
                        rl.question('Masukkan Kode MK Kontrak: ', (kodeMk) => {
                            dosenControllers.daftarDosen(function () {
                                rl.question('Masukkan Nip Kontrak: ', (nip) => {
                                    kontrak.add(nilai, nim, kodeMk, nip, (err) => {
                                        if (err) {
                                            console.log('gagal cari kontrak', err)
                                            kontrakControllers.tambahKontrak()
                                        } else {
                                            console.log('Kontrak berhasil ditambahkan')
                                            kontrakControllers.daftarKontrak()
                                        }
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    //hapus kontrak=====================================================================
    static hapusKontrak() {
        rl.question('Masukkan ID Kontrak: ', (ID) => {
            kontrak.remove(ID, (err) => {
                if (err) {
                    console.log('gagal Hapus kontrak', err)
                    kontrakControllers.menuKontrak()
                } else {
                    console.log(`Kontrak dengan ID '${ID}' berhasil di hapus`)
                    kontrakControllers.daftarKontrak()
                }
            })
        })
    }
}


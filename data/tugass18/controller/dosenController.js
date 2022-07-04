import Main, { rl } from '../tugass18.js'
import Table from 'cli-table';
import IndexViews from '../views/IndexViews.js';
import dosenViews from '../views/dosenViews.js';
import dosen from '../model/dosen.js';

export default class dosenControllers {

    static menuDosen() {
        dosenViews.menu()
        IndexViews.line()
        rl.question('Masukkan salah satu pilihan di atas: ', (opsi) => {
            switch (opsi) {

                case '1':
                    dosenControllers.daftarDosen()
                    break;
                case '2':
                    dosenControllers.cariDosen()
                    break;
                case '3':
                    dosenControllers.tambahDosen()
                    break;
                case '4':
                    dosenControllers.hapusDosen()
                    break;
                case '5':
                    Main.menuUtama()
                    break;
            }
        })
    }

    static daftarDosen(callback) {
        dosen.read(function (err, data) {
            if (err) {
                console.log('gagal ambil dosen', err)
                process.exit(1)
            }
            const tableDosen = new Table({
                head: ['nip', 'Nama Dosen']
                , colWidths: [15, 30]
            });

            data.forEach(item => {
                tableDosen.push([item.nip, item.namaDosen])
            })
            console.log(tableDosen.toString()) 
            if(callback){
                callback()
            } else {
               dosenControllers.menuDosen()
            }
        })
    }

    //cari dosen=======================================================================

    static cariDosen() {
        rl.question('Masukkan Nip Dosen: ', (nip) => {
            dosen.search(nip, (err, data) => {
                if (err) {
                    console.log('gagal cari dosen', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log('Mohon maaf! data tidak ditemukan')
                    dosenControllers.menuDosen()
                } else {
                    dosenViews.detail(data[0])
                    dosenControllers.menuDosen()
                }
            })
        })
    }

    //tambah dosen=====================================================================
    static tambahDosen() {
        rl.question('Masukkan Kode Dosen: ', (nip) => {
            rl.question('Masukkan Nama Dosen: ', (nama) => {
                dosen.add(nip, nama, (err) => {
                    if (err) {
                        console.log('gagal cari dosen', err)
                        dosenControllers.tambahDosen()
                    } else {
                        console.log('Dosen berhasil ditambahkan')
                        dosenControllers.daftarDosen()
                    }
                })
            })
        })
    }

    //hapus dosen=====================================================================
    static hapusDosen() {
        rl.question('Masukkan Kode Dosen: ', (nip) => {
            dosen.remove(nip, (err) => {
                if (err) {
                    console.log('gagal Hapus dosen', err)
                    dosenControllers.menuDosen()
                } else {
                    console.log(`Dosen dengan Kode '${nip}' berhasil di hapus`)
                    dosenControllers.daftarDosen()
                }
            })
        })
    }
}


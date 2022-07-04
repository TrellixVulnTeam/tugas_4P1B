import Main, { rl } from '../tugass18.js'
import Table from 'cli-table';
import IndexViews from '../views/IndexViews.js';
import mahasiswa from '../model/mahasiswa.js';
import mahasiswaViews from '../views/mahasiswaViews.js';
import jurusanControllers from './jurusancontrollers.js';

export default class mahasiswaController {

    static menuMahasiswa() {
        mahasiswaViews.menu()
        IndexViews.line()
        rl.question('Masukkan salah satu pilihan di atas: ', (opsi) => {
            switch (opsi) {

                case '1':
                    mahasiswaController.daftarMahasiswa()
                    break;
                case '2':
                    mahasiswaController.cariMahasiswa()
                    break;
                case '3':
                    mahasiswaController.tambahMahasiswa()
                    break;
                case '4':
                    mahasiswaController.hapusMahasiswa()
                    break;
                case '5':
                    Main.menuUtama()
                    break;
            }
        })
    }


    static daftarMahasiswa(callback) {
        mahasiswa.read(function (err, data) {
            if (err) {
                console.log('gagal ambil Mahasiswa', err)
                process.exit(1)
            }
            const tableMahasiswa = new Table({
                head: ['nim', 'Nama Mahasiswa', 'Alamat', 'kode Jurusan', 'Umur']
                , colWidths: [15, 30, 30, 20, 10]
            });

            data.forEach(item => {
                tableMahasiswa.push([item.nim, item.nama, item.alamat, item.kodeJurusan, item.umur])
            })
            console.log(tableMahasiswa.toString())
            if (callback) {
                callback()
            } else {
                mahasiswaController.menuMahasiswa()
            }
        })
    }


    static cariMahasiswa() {
        rl.question('Masukkan nim mahasiswa: ', (nim) => {
            mahasiswa.search(nim, (err, data) => {
                if (err) {
                    console.log('gagal cari mahasiswa', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log('Mohon maaf! data tidak ditemukan')
                    mahasiswaController.menuMahasiswa()
                } else {
                    mahasiswaViews.detail(data[0])
                    mahasiswaController.menuMahasiswa()
                }
            })
        })
    }


    static tambahMahasiswa() {
        rl.question('Masukkan nim mahasiswa: ', (nim) => {
            rl.question('Masukkan Nama mahasiswa: ', (nama) => {
                rl.question('Masukkan Alamat: ', (alamat) => {
                    jurusanControllers.daftarJurusan(function () {
                        rl.question('Masukkan kodeJurusan: ', (kodeJurusan) => {
                            rl.question('Masukkan Umur: ', (umur) => {
                                mahasiswa.add(nim, nama, alamat, kodeJurusan, umur, (err) => {
                                    if (err) {
                                        console.log('gagal cari mahasiswa', err)
                                        mahasiswaController.tambahMahasiswa()
                                    } else {
                                        console.log('Mahasiswa berhasil ditambahkan')
                                        mahasiswaController.daftarMahasiswa()
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    }


    static hapusMahasiswa() {
        rl.question('Masukkan nim mahasiswa: ', (nim) => {
            mahasiswa.remove(nim, (err) => {
                if (err) {
                    console.log('gagal Hapus mahasiswa', err)
                    mahasiswaController.menuMahasiswa()
                } else {
                    console.log(`Mahasiswa dengan nim '${nim}' berhasil di hapus`)
                    mahasiswaController.daftarMahasiswa()
                }
            })
        })
    }
}


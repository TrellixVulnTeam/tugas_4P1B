import Main, { rl } from '../main.js'
import Table from 'cli-table'
import Mahasiswa from '../models/Mahasiswa.js'
import MahasiswaView from '../views/MahasiswaView.js'
import IndexView from '../views/indexView.js'
import JurusanController from './JurusanController.js'

export default class MahasiswaController {

    static menuMahasiswa() {
        MahasiswaView.menu()
        IndexView.line();
        rl.question('Masukkan salah satu no. dari opsi di atas : ', (opsi) => {
            switch (opsi) {
                case '1':
                    MahasiswaController.daftarMahasiswa()
                    break;
                case '2':
                    MahasiswaController.cariMahasiswa()
                    break;
                case '3':
                    MahasiswaController.tambahMahasiswa()
                    break;
                case '4':
                    MahasiswaController.hapusMahasiswa()
                    break;
                case '5':
                    Main.menuUtama()
                    break;
            }
        })
    }

    static daftarMahasiswa() {
        Mahasiswa.read(function (err, data) {
            if (err) {
                console.log('gagal ambil mahasiswa', err)
                process.exit(1)
            }
            const tableMahasiswa = new Table({
                head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
                , colWidths: [10, 20, 15, 20, 10, 20]
            });
            data.forEach(item => {
                tableMahasiswa.push([
                    item.nim,
                    item.nama,
                    item.tanggal_lahir,
                    item.alamat,
                    item.kode_jurusan,
                    item.nama_jurusan
                ])
            })
            console.log(tableMahasiswa.toString())
            MahasiswaController.menuMahasiswa()
        })
    }

    static cariMahasiswa() {
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            Mahasiswa.search(nim, (err, data) => {
                if (err) {
                    console.log('gagal ambil mahasiswa', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log('data tidak ditemukan')
                    MahasiswaController.menuMahasiswa()
                } else {
                    MahasiswaView.detail(nim, data[0])
                    MahasiswaController.menuMahasiswa()
                }
            })
        })
    }

    static tambahMahasiswa() {
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            rl.question('Masukkan Nama Mahasiswa : ', (nama) => {
                rl.question('Masukkan Tanggal Lahir Mahasiswa : ', (tanggal_lahir) => {
                    rl.question('Masukkan Alamat Mahasiswa : ', (alamat) => {
                        JurusanController.daftarJurusan(function () {
                            rl.question('Masukkan Kode Jurusan : ', (kode_jurusan) => {
                                Mahasiswa.add(nim, nama, tanggal_lahir, alamat, kode_jurusan, (err) => {
                                    if (err) {
                                        console.log('gagal tambah mahasiswa', err)
                                        MahasiswaController.tambahMahasiswa()
                                    } else {
                                        console.log('mahasiswa telah ditambahkan')
                                        MahasiswaController.daftarMahasiswa()
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
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            Mahasiswa.remove(nim, (err) => {
                if (err) {
                    console.log('gagal hapus mahasiswa', err)
                    MahasiswaController.menuMahasiswa()
                } else {
                    console.log(`mahasiswa dengan NIM : ${nim} telah dihapus`)
                    MahasiswaController.daftarMahasiswa()
                }
            })
        })
    }

}


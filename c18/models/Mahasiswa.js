import { db } from '../main.js'

export default class Mahasiswa {
    static read(callback) {
        db.all('SELECT * FROM mahasiswa LEFT JOIN jurusan ON mahasiswa.jurusan = jurusan.kode_jurusan', (err, data) => {
            callback(err, data)
        });
    }

    static add(nim, nama, tanggal_lahir, alamat, kode_jurusan, callback) {
        db.run('INSERT INTO mahasiswa VALUES (?, ?, ?, ?, ?)', [nim, nama, alamat, kode_jurusan, tanggal_lahir], (err) => {
            callback(err)
        });
    }

    static search(nim, callback) {
        db.all('SELECT * FROM mahasiswa LEFT JOIN jurusan ON mahasiswa.jurusan = jurusan.kode_jurusan WHERE nim = ?', [nim], (err, data) => {
            callback(err, data)
        });
    }

    static remove(nim, callback) {
        db.run('DELETE FROM mahasiswa WHERE nim = ?', [nim], (err) => {
            callback(err)
        });
    }
}
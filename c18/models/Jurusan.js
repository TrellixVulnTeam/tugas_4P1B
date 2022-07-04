import { db } from '../main.js'

export default class Jurusan {
    static read(callback) {
        db.all('SELECT * FROM jurusan', (err, data) => {
            callback(err, data)
        });
    }

    static add(kode, nama, callback) {
        db.run('INSERT INTO jurusan VALUES (?, ?)', [kode, nama], (err) => {
            callback(err)
        });
    }

    static search(kode, callback) {
        db.all('SELECT * FROM jurusan WHERE kode_jurusan = ?', [kode], (err, data) => {
            callback(err, data)
        });
    }

    static remove(kode, callback) {
        db.run('DELETE FROM jurusan WHERE kode_jurusan = ?', [kode], (err) => {
            callback(err)
        });
    }
}
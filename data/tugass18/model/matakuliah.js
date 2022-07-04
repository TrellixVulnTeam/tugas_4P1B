import { db } from '../tugass18.js'

export default class matkul {
    static read(callback) {
        db.all('SELECT matauliah.kodeMK, matauliah.namaMk, matauliah.sks FROM matauliah', (err, data) => {
            callback(err, data)
        });
    }

    static add(kodeMk, namaMk, sks, callback) {
        db.run('INSERT INTO matauliah VALUES (?, ?, ?) ', [kodeMk, namaMk, sks], (err) => {
            callback(err)
        });
    }

    static search(kodeMk, callback) {
        db.all('SELECT * FROM matauliah WHERE kodeMk = ?', [kodeMk], (err, data) => {
            callback(err, data)
        });
    }

    static remove(kodeMk, callback) {
        db.run('DELETE FROM matauliah WHERE kodeMk  = ?', [kodeMk], (err) => {
            callback(err)
        });
    }
}
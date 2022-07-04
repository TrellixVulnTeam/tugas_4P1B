import { db } from '../tugass18.js'

export default class kontrak {
    static read(callback) {
        db.all('SELECT * FROM Kontrak', (err, data) => {
            callback(err, data)
        });
    }

    static add(nilai, nim, kodeMk, nip, callback) {
        db.run('INSERT INTO Kontrak(nilai, nim, kodeMk, nip) VALUES (?, ?, ?, ?) ', [nilai, nim, kodeMk, nip,], (err) => {
            callback(err)
        });
    }

    static search(ID, callback) {
        db.all('SELECT * FROM Kontrak WHERE ID = ?', [ID], (err, data) => {
            callback(err, data)
        });
    }

    static remove(ID, callback) {
        db.run('DELETE FROM Kontrak WHERE ID  = ?', [ID], (err) => {
            callback(err)
        });
    }
}
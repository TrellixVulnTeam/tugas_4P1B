import {db} from '../tugass18.js'

export default class jurusan {
    static read( callback ){
        db.all('SELECT * FROM Jurusan', (err, data) => {
            callback(err, data)
        });
    }
    
    static add(kode, nama, callback){
        db.run('INSERT INTO Jurusan VALUES (?, ?) ', [kode, nama], (err) => {
            callback(err)
        });
    }

    static search(kode,callback){
        db.all('SELECT * FROM Jurusan WHERE kodeJurusan = ?', [kode], (err, data)=> {
            callback(err, data)
        });
    }

    static remove(kode, callback){
        db.run('DELETE FROM Jurusan WHERE kodeJurusan  = ?', [kode], (err) => {
            callback(err)
        });
    }
}
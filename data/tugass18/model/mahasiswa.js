import {db} from '../tugass18.js'

export default class mahasiswa {
    static read( callback ){
        db.all('SELECT mahasiswa.nim, mahasiswa.nama, mahasiswa.alamat, jurusan.kodeJurusan, mahasiswa.umur FROM jurusan JOIN mahasiswa ON mahasiswa.kodeJurusan=jurusan.kodeJurusan;', (err, data) => {
            callback(err, data)
        });
    }
    
    static add(nim, nama, alamat,kodeJurusan, umur, callback){
        db.run('INSERT INTO mahasiswa VALUES (?, ?, ?, ?, ?) ', [nim, nama, alamat, kodeJurusan, umur], (err) => {
            callback(err)
        });
    }

    static search(nim,callback){
        db.all('SELECT * FROM mahasiswa WHERE nim = ?', [nim], (err, data)=> {
            callback(err, data)
        });
    }

    static remove(nim, callback){
        db.run('DELETE FROM mahasiswa WHERE nim = ?', [nim], (err) => {
            callback(err)
        });
    }
}
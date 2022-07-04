import { db } from '../main.js'

export default class User {
    static findByUsername(username, callback) {
        db.all(`SELECT * FROM users WHERE username =?`, [username], (err, data) => {
            callback(err, data)
        });
    }
}
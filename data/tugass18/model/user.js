import {db} from '../tugass18.js'

export default class User {
    static findByAskUser(username, callback ){
        db.all('SELECT * FROM users WHERE username =?', [username], (err, data) => {
            callback(err, data)
        });
    }
}
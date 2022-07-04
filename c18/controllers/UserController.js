import User from '../models/User.js'
import Main, { rl } from '../main.js'

export default class UserController {
    static askUsername() {
        rl.question('username : ', (username) => {
            User.findByUsername(username, (err, data) => {
                if (err) {
                    console.log('gagal cari username', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log('username tidak terdaftar')
                    UserController.askUsername()
                }
                UserController.askPassword(data[0])
            })
        })
    }

    static askPassword(user) {
        rl.question('password : ', (password) => {
            if (password == user.password) {
                console.log(`welcome, ${user.username}. Your access level is : ${user.role.toUpperCase()} `)
                Main.menuUtama()
            } else {
                console.log('password salah')
                UserController.askPassword(user)
            }
        })
    }
} 
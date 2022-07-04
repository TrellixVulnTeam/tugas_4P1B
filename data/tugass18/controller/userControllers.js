import User from "../model/user.js"
import Main, { rl } from "../tugass18.js"

export default class userControllers {
    static askUser() {
        rl.question('username: ', (username) => {
            User.findByAskUser(username, (err, data) => {
                if (err) {
                    console.log('gagal cari username', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log('username tidak terdaftar')
                    userControllers.askUser()
                }
                userControllers.askPassword(data[0])
            })
        })
    }

    static askPassword(user) {
        rl.question('Password: ', (password) => {
            if (password == user.password) {
                console.log(`welcome ${user.username}.Your access level is:${user.role.toUpperCase()}`)
                Main.menuUtama()
            } else {
                console.log('password salah')
                userControllers.askPassword(user)
            }
        })
    }
}
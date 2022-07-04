export default class IndexViews {

    static line() {
        console.log('================================================')
    }

    static utama() {
        console.log(`
    Silahkan pilih menu di bawah ini:\n
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar
`)
    }

    static welcome() {
        IndexViews.line()
        console.log('welcome to university Pendidikan Indonesia\njl sukabhudi No. 255')
        IndexViews.line()
    }

}
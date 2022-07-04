export default class IndexView {

    static line() {
        console.log('=============================================')
    }

    static menuUtama() {
        console.log(`
silahkan pilih opsi di bawah ini :
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar
    `);
    }

    static welcome() {
        IndexView.line()
        console.log('Welcome to Universitas Pendidikan Indonesia')
        console.log('Jl. Setiabudhi No. 255')
        IndexView.line()
    }
}
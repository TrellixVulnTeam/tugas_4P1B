export default class mahasiswaViews {
    static menu() {
        console.log(`
    Silahkan pilih menu di bawah ini: 
[1] Daftar Mahasiswa
[2] Cari Mahasiswa
[3] Tambah Mahasiswa
[4] Hapus Mahasiswa
[5] Kembali
`)
    }

    static detail(Mahasiswa, kode) {
        console.log(`
        Hasil pencarian mahasiswa dengan kode '${kode}' berhasil ditemukan:
        Nim             : ${Mahasiswa.nim}
        Nama Mahasiswa  : ${Mahasiswa.nama}
        Alamat          : ${Mahasiswa.alamat}
        Umur            : ${Mahasiswa.umur}
                    `)
    }

}
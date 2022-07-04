export default class matkulViews {
    static menu() {
        console.log(`
    Silahkan pilih menu di bawah ini: 
[1] Daftar Matakuliah
[2] Cari Matakuliah
[3] Tambah Matakuliah
[4] Hapus Matakuliah
[5] Kembali
`)
    }

    static detail(matauliah,kodeMk) {
        console.log(`
        Hasil pencarian Matakuliah dengan nip '${kodeMk}' berhasil ditemukan:
        Kode Matakuliah ; ${matauliah.kodeMk}
        Nama Matakuliah : ${matauliah.namaMk}
        SKS             : ${matauliah.sks}
                    `)
    }

}
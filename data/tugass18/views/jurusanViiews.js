export default class jurusanViews {
    static menu() {
        console.log(`
    Silahkan pilih menu di bawah ini: 
[1] Daftar Jurusan
[2] Cari Jurusan
[3] Tambah Jurusan
[4] Hapus Jurusan
[5] Kembali
`)
    }

    static detail(jurusan, kode) {
        console.log(`
        Hasil pencarian jurusan dengan kode '${kode}' berhasil ditemukan:
        Kode Jurusan ; ${jurusan.kodeJurusan}
        Nama Jurusan : ${jurusan.namaJurusan}
                    `)
    }

}
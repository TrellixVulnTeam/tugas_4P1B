export default class dosenViews {
    static menu() {
        console.log(`
    Silahkan pilih menu di bawah ini: 
[1] Daftar Dosen
[2] Cari Dosen
[3] Tambah Dosen
[4] Hapus Dosen
[5] Kembali
`)
    }

    static detail(dosen, nip) {
        console.log(`
        Hasil pencarian dosen dengan nip '${nip}' berhasil ditemukan:
        Kode Dosen ; ${dosen.nip}
        Nama Dosen : ${dosen.namaDosen}
                    `)
    }

}
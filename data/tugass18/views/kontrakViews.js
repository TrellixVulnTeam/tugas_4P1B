export default class kontrakViews {
    static menu() {
        console.log(`
    Silahkan pilih menu di bawah ini: 
[1] Daftar Kontrak
[2] Cari Kontrak
[3] Tambah Kontrak
[4] Hapus Kontrak
[5] Kembali
`)
    }

    static detail(kontrak, ID) {
        console.log(`
        Hasil pencarian kontrak dengan kode '${ID}' berhasil ditemukan:
        ID                  ; ${kontrak.ID}
        NILAI               : ${kontrak.nilai}
        NIM                 : ${kontrak.nim}
        Kode Matakuliah     : ${kontrak.kodeMk}
        NIP                 : ${kontrak.nip}

                    `)
    }
}
export default class JurusanView {
    static menu() {
        console.log(`
silahkan pilih opsi di bawah ini :
[1] Daftar Jurusan
[2] Cari Jurusan
[3] Tambah Jurusan
[4] Hapus Jurusan
[5] Kembali
        `);
    }

    static detail(kode, jurusan) {
        console.log(`
Hasil Pencarian jurusan dengan kode jurusan '${kode}' :
Kode Jurusan    : ${jurusan.kode_jurusan}
Nama Jurusan    : ${jurusan.nama_jurusan}
                `);
    }
}
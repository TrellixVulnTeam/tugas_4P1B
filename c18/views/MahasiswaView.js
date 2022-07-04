export default class MahasiswaView {

    static menu() {
        console.log(`
silahkan pilih opsi di bawah ini :
[1] Daftar Mahasiswa
[2] Cari Mahasiswa
[3] Tambah Mahasiswa
[4] Hapus Mahasiswa
[5] Kembali
        `);
    }

    static detail(nim, mahasiswa) {
        console.log(`
Hasil Pencarian mahasiswa dengan NIM '${nim}' :
NIM     : ${mahasiswa.nim}
Nama    : ${mahasiswa.nama}
Alamat  : ${mahasiswa.alamat}
Jurusan : ${mahasiswa.nama_jurusan}
                `);
    }
}
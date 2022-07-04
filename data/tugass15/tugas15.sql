CREATE TABLE jurusan(
    kodeJurusan varchar(4) NOT NULL PRIMARY KEY, --pk
    namaJurusan varchar(50) NOT NULL
);

CREATE TABLE mahasiswa(
    nim varchar(10) NOT NULL PRIMARY KEY,
    nama varchar(50) NOT NULL,
    alamat text,
    kodeJurusan varchar(4) NOT NULL,
    FOREIGN KEY (kodeJurusan) REFERENCES jurusan(kodeJurusan)
);

CREATE TABLE matauliah(
    kodeMk varchar (4) NOT NULL PRIMARY KEY,
    namaMk varchar(50) NOT NULL,
    sks INTEGER NOT NULL
);

CREATE TABLE dosen(
    nip varchar(6) NOT NULL PRIMARY KEY,
    namaDosen varchar(50) NOT NULL
);

CREATE TABLE user(
    userName VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    role varchar(20)NOT NULL
)

CREATE TABLE kontrak(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    nilai varchar(50)NULL,
    nim varchar(10) NOT NULL,
    kodeMk varchar(4) NOT NULL,
    nip varchar(6) NOT NULL,
    id INT NOT  NULL,
    FOREIGN KEY (id) REFERENCES username (id),
    FOREIGN KEY (nim) REFERENCES mahasiswa (nim),
    FOREIGN KEY (kodeMk) REFERENCES matauliah (kodeMk),
    FOREIGN KEY (nip) REFERENCES dosen (nip)
);

INSERT INTO jurusan VALUES ('2136', 'seni');
INSERT INTO jurusan VALUES ('2137', 'psikologi');
INSERT INTO jurusan VALUES ('2138', 'arsitektur');
INSERT INTO jurusan VALUES ('2139', 'sastra dan bahasa');
INSERT INTO jurusan VALUES ('2140', 'kimia');
INSERT INTO jurusan VALUES ('2141', 'teknik sipil');

INSERT INTO user VALUES ('Rahmat28','rahmat2822','user');


INSERT INTO mahasiswa VALUES ('2002182028','Nur Cahyani','Antang,Makasaar','2136');
INSERT INTO mahasiswa VALUES ('2002182029','Nardi','lassang,Takalar','2137');
INSERT INTO mahasiswa VALUES ('2002182030','Palakka','Maros,Makassar','2138');
INSERT INTO mahasiswa VALUES ('2002182031','Hendra','Palangga,Gowa','2139');
INSERT INTO mahasiswa VALUES ('2002182032','putri Utami','Borombaji,Takalar','2140');
INSERT INTO mahasiswa VALUES ('2002182033','muh Ilham','Panjokjo,Takalar','2141');

INSERT INTO matauliah VALUES ('SN20','seni budaya',3);
INSERT INTO matauliah VALUES ('SN21','logika',2);
INSERT INTO matauliah VALUES ('SN22','sejarah arsitektur',3);
INSERT INTO matauliah VALUES ('SN23','bahasa indonesia',2);
INSERT INTO matauliah VALUES ('SN24','teknik sipil',2);
INSERT INTO matauliah VALUES ('SN25','biokimia',3);
INSERT INTO matauliah VALUES ('SN28','data mining',4)

INSERT INTO dosen VALUES ('209020','Rahmat');
INSERT INTO dosen VALUES ('209021','Abdul Rajab');
INSERT INTO dosen VALUES ('209022','Hajar Hafsari');
INSERT INTO dosen VALUES ('209023','Agung NZ');
INSERT INTO dosen VALUES ('209024','Bastari');
INSERT INTO dosen VALUES ('209025','Dudi Hariwijaya');

INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('A','2002182028','SN20','209020');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('D','2002182029','SN21','209021');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('B','2002182030','SN22','209022');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('A','2002182031','SN23','209023');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('B','2002182032','SN24','209024');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('D','2002182033','SN25','209025');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('A','2002182028','SN21','209021');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('A','2002182028','SN22','209022');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('A','2002182028','SN23','209023');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('A','2002182028','SN24','209024');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('A','2002182029','SN28','209021');

ALTER TABLE mahasiswa ADD umur varchar(2);
UPDATE mahasiswa SET umur = '21' WHERE nama = 'Nur Cahyani'; -- UPDATE TABLE DATABASE
UPDATE mahasiswa SET umur = '19' WHERE nama = 'Nardi';
UPDATE mahasiswa SET umur = '18' WHERE nama = 'Palakka';
UPDATE mahasiswa SET umur = '20' WHERE nama = 'Hendra';
UPDATE mahasiswa SET umur = '22' WHERE nama = 'putri Utami';
UPDATE mahasiswa SET umur = '21' WHERE nama = 'muh Ilham';

SELECT mahasiswa.nim, mahasiswa.nama, mahasiswa.alamat, jurusan.namaJurusan 
FROM jurusan 
JOIN mahasiswa ON mahasiswa.kodeJurusan=jurusan.kodeJurusan;-- no 1

SELECT mahasiswa.nama, mahasiswa.umur 
FROM mahasiswa 
WHERE umur<20;--no 2

SELECT mahasiswa.nim, mahasiswa.nama, kontrak.nilai 
FROM mahasiswa 
JOIN kontrak ON kontrak.nim=mahasiswa.nim 
WHERE nilai='B' or nilai='A';--NO 3

SELECT mahasiswa.nama, kontrak.nim, SUM(matauliah.sks) 
FROM kontrak 
JOIN mahasiswa ON mahasiswa.nim=kontrak.nim 
JOIN matauliah ON matauliah.kodeMk=kontrak.kodeMk 
GROUP BY mahasiswa.nama 
HAVING SUM(matauliah.sks)>10;--no4

SELECT mahasiswa.nama, kontrak.nim, matauliah.namaMk 
FROM kontrak 
JOIN mahasiswa ON mahasiswa.nim=kontrak.nim 
JOIN matauliah ON matauliah.kodeMk=kontrak.kodeMk 
WHERE matauliah.namaMK='data mining';--no5

SELECT kontrak.nip, dosen.namaDosen, COUNT( DISTINCT kontrak.nim),mahasiswa.nama 
FROM kontrak 
JOIN mahasiswa ON mahasiswa.nim=kontrak.nim 
JOIN dosen ON dosen.nip=kontrak.nip 
GROUP BY dosen.nip; -- no 6

SELECT mahasiswa.nama, mahasiswa.umur 
FROM mahasiswa 
ORDER BY umur ASC;--no 7

-- no 8 
SELECT * 
FROM kontrak 
JOIN dosen ON dosen.nip=kontrak.nip 
JOIN mahasiswa ON mahasiswa.nim=kontrak.nim 
WHERE nilai='D' or nilai='E'; 
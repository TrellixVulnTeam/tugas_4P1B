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

CREATE TABLE kontrak(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    nilai varchar(50)NULL,
    nim varchar(10) NOT NULL,
    kodeMk varchar(4) NOT NULL,
    nip varchar(6) NOT NULL,
    FOREIGN KEY (nim) REFERENCES mahasiswa (nim),
    FOREIGN KEY (kodeMk) REFERENCES matauliah (kodeMk),
    FOREIGN KEY (nip) REFERENCES dosen (nip)
);

INSERT INTO jurusan VALUES ('2136', 'seni');
INSERT INTO jurusan VALUES ('2137', 'psikologi');
INSERT INTO jurusan VALUES ('2138', 'arsitektur');
INSERT INTO jurusan VALUES ('2139', 'sastra dan bahasa');
INSERT INTO jurusan VALUES ('2140', 'kimia');
INSERT INTO jurusan VALUES ('2141', 'PTSP');

INSERT INTO mahasiswa VALUES ('2002182028','Nur Cahyani','Antang,Makasaar','2136');
INSERT INTO mahasiswa VALUES ('2002182029','Nardi','lassang,Takalar','2137');
INSERT INTO mahasiswa VALUES ('2002182030','Palakka','Maros,Makassar','2138');
INSERT INTO mahasiswa VALUES ('2002182031','Hendra','Palangga,Gowa','2139');
INSERT INTO mahasiswa VALUES ('2002182032','putri Utami','Borombaji,Takalar','2140');
INSERT INTO mahasiswa VALUES ('2002182033','muh Ilham','Panjokjo,Takalar','2141');

INSERT INTO matauliah VALUES ('SN20','seni budaya',20);
INSERT INTO matauliah VALUES ('SN21','logika',20);
INSERT INTO matauliah VALUES ('SN22','sejarah arsitektur',24);
INSERT INTO matauliah VALUES ('SN23','bahasa indonesia',20);
INSERT INTO matauliah VALUES ('SN24','teknik sipil',18);
INSERT INTO matauliah VALUES ('SN25','biokimia',22);

INSERT INTO dosen VALUES ('209020','Rahmat');
INSERT INTO dosen VALUES ('209021','Abdul Rajab');
INSERT INTO dosen VALUES ('209021','Hajar Hafsari');
INSERT INTO dosen VALUES ('209021','Agung NZ');
INSERT INTO dosen VALUES ('209021','Bastari');
INSERT INTO dosen VALUES ('209021','Dudi Hariwijaya');

INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('A','2002182028','SN20','209020');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('A','2002182029','SN21','209021');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('B','2002182029','SN21','209021');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('A','2002182029','SN21','209021');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('B','2002182029','SN21','209021');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('A','2002182029','SN21','209021');

UPDATE mahasiswa SET umur=21 WHERE Nur Cahyani
UPDATE mahasiswa SET umur=20 WHERE Nardi
UPDATE mahasiswa SET umur=18 WHERE Palakka
UPDATE mahasiswa SET umur=19 WHERE Hendra
UPDATE mahasiswa SET umur=20 WHERE putri Utami
UPDATE mahasiswa SET umur=21 WHERE muh Ilham
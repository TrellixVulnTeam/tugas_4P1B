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

INSERT INTO mahasiswa VALUES ('2002182028','Nur Cahyani','Antang,Makasaar','2136');
INSERT INTO mahasiswa VALUES ('2002182029','Nardi','lassang,Takalar','2137');

INSERT INTO matauliah VALUES ('SN20','seni budaya',20);
INSERT INTO matauliah VALUES ('SN21','logika',20);

INSERT INTO dosen VALUES ('209020','Rahmat');
INSERT INTO dosen VALUES ('209021','Abdul Rajab');

INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('98','2002182028','SN20','209020');
INSERT INTO kontrak(nilai, nim, kodeMk, nip) VALUES ('98','2002182029','SN21','209021');


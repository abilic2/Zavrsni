import mysql, { createPool } from 'mysql2'
const pool=mysql.createPool({
    host: '127.0.0.1',
    user:'root',
    password:'139271710',
    database:'zavrsni'
}).promise()


//student tablica

// Funkcije za tablicu "studenti"
export async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM studenti");
  return rows;
}

export async function getNote(id) {
  const [row] = await pool.query(`SELECT * FROM studenti WHERE ID = ${id}`);
  return row;
}

export async function createStudent(studentData) {
  const [result] = await pool.query(
    'INSERT INTO studenti (ime, prezime, godina_studiranja, prosjek, studijski_smijer, ECTS_bodovi, semestar, primljena, uklonjen, izbor1, izbor2, izbor3, bodovi1, bodovi2, bodovi3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [studentData.ime, studentData.prezime, studentData.godina_studiranja, studentData.prosjek, studentData.studijski_smijer, studentData.ECTS_bodovi, studentData.semestar, studentData.primljena, studentData.uklonjen, studentData.izbor1, studentData.izbor2, studentData.izbor3, studentData.bodovi1, studentData.bodovi2, studentData.bodovi3]
);
  return result;
}

export async function hvatanjeid() {
  const [idResult] = await pool.query('SELECT LAST_INSERT_ID() AS id');
  return idResult[0]
}
// Funkcije za tablicu "predmeti"
export async function getSubjects() {
  const [rows] = await pool.query("SELECT * FROM predmeti");
  return rows;
}

export async function getSubject(id) {
  const [row] = await pool.query(`SELECT * FROM predmeti WHERE ID = ${id}`);
  return row;
}

export async function createSubject(a) {
  const [result] = await pool.query(`
    INSERT INTO predmeti (id, naziv, ECTS)
    VALUES (?, ?, ?)`, 
    [a.id, a.naziv, a.ECTS]);
  return result;
}

// Funkcije za tablicu "izbori"
export async function getChoices() {
  const [rows] = await pool.query("SELECT * FROM izbori");
  return rows;
}

export async function getChoice(id) {
  const [row] = await pool.query(`SELECT * FROM izbori WHERE ID = ${id}`);
  return row;
}

export async function createChoice(a) {
  const [result] = await pool.query(`
    INSERT INTO izbori (id, naziv)
    VALUES (?, ?)`, 
    [a.id, a.naziv]);
  return result;
}

// Funkcije za tablicu "student_izbori"
export async function getStudentChoices() {
  const [rows] = await pool.query("SELECT * FROM student_izbori");
  return rows;
}

export async function getStudentChoice(id) {
  const [row] = await pool.query(`SELECT * FROM student_izbori WHERE ID = ${id}`);
  return row;
}

export async function createStudentChoice(a) {
  const [result] = await pool.query(`
    INSERT INTO student_izbori (id, student_id, izbor_id, bodovi, mjesto)
    VALUES (?, ?, ?, ?, ?)`, 
    [a.id, a.student_id, a.izbor_id, a.bodovi, a.mjesto]);
  return result;
}

// Funkcije za tablicu "ocjene"
export async function getGrades() {
  const [rows] = await pool.query("SELECT * FROM ocjene");
  return rows;
}

export async function getGrade(id) {
  const [row] = await pool.query(`SELECT * FROM ocjene WHERE student_ID = ${id}`);
  return row;
}

export async function createGrade(a) {
  const [result] = await pool.query(`
    INSERT INTO ocjene (id, student_id, nastava_id, ocjena)
    VALUES (?, ?, ?, ?)`, 
    [a.id, a.student_id, a.nastava_id, a.ocjena]);
  return result;
}

//ocjene dilomski 
export async function diplocj() {
  const [rows] = await pool.query("SELECT * FROM ocjene_diplomski");
  return rows;
}

export async function dipocjena(id) {
  const [row] = await pool.query(`SELECT * FROM ocjene_diplomski WHERE student_ID = ${id}`);
  return row;
}


// Funkcije za tablicu "nastava"
export async function getLectures() {
  const [rows] = await pool.query("SELECT * FROM nastava");
  return rows;
}

export async function getLecture(id) {
  const [row] = await pool.query(`SELECT * FROM nastava WHERE ID = ${id}`);
  return row;
}

export async function createLecture(a) {
  const [result] = await pool.query(`
    INSERT INTO nastava (id, predmeti_id, profesor_id, naziv_instanca)
    VALUES (?, ?, ?, ?)`, 
    [a.id, a.predmeti_id, a.profesor_id, a.naziv_instanca]);
  return result;
}

// Funkcije za tablicu "profesori"
export async function getprofesor(id) {
  const [row] = await pool.query(`SELECT * FROM profesori WHERE id = ?`, [id]);
  return row;
}
export async function getprofesori() {
  const [rows] = await pool.query("SELECT * FROM profesori");
  return rows;
}
export async function createProfessor(professor) {
  const [result] = await pool.query(`
      INSERT INTO profesori (ime, prezime, polozaj, email, kontakt, ured, odjel, lozinka)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [professor.ime, professor.prezime, professor.polozaj, professor.email, professor.kontakt, professor.ured, professor.odjel, professor.lozinka]
  );
  return result;
}
export async function hvatanjeprofid() {
  const [idResult] = await pool.query('SELECT LAST_INSERT_ID() AS id');
  return idResult[0]
}
export async function updateprofesori(prof) {
  const [result] = await pool.query(`
    UPDATE profesori
    SET ime = ?, prezime = ?, polozaj = ?, email = ?, kontakt = ?, ured = ?, odjel = ?, lozinka = ?
    WHERE id = ?`,
    [prof.ime, prof.prezime, prof.polozaj, prof.email, prof.kontakt, prof.ured, prof.odjel, prof.lozinka, prof.id]);

  return result;
}

//brisaje studenata
export async function deleteStudent(id) {
  const [result] = await pool.query("DELETE FROM studenti WHERE id = ?", [id]);
  return result;
}

//put studenti
export async function updateStudent(a) {
  const [result] = await pool.query(`
    UPDATE studenti
    SET ime = ?, prezime = ?, godina_studiranja = ?, prosjek = ?, studijski_smijer = ?, ECTS_bodovi = ?, semestar = ?, primljena = ?, uklonjen = ?, izbor1 = ?, izbor2 = ?, izbor3 = ?, bodovi1 = ?, bodovi2 = ?, bodovi3 = ?
    WHERE id = ?`, 
    [a.ime, a.prezime, a.godina_studiranja, a.prosjek, a.studijski_smijer, a.ECTS_bodovi, a.semestar, a.primljena, a.uklonjen, a.izbor1, a.izbor2, a.izbor3, a.bodovi1, a.bodovi2, a.bodovi3, a.id]);

  return result;
}
//diplomski post
export async function createDiplomskiStudent(student) {
  const [result] = await pool.query(`
    INSERT INTO studenti_diplomski (id,ime, prezime, godina_studiranja, prosjek, studijski_smijer, ECTS_bodovi, semestar, primljena)
    VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)`, 
    [student.id,student.ime, student.prezime, student.godina_studiranja, student.prosjek, student.studijski_smijer, student.ECTS_bodovi, student.semestar, student.primljena]);

  return result;
}

export async function getdiplomskistud() {
  const [rows] = await pool.query('SELECT * FROM studenti_diplomski');
  return rows;
}

//put stud_dip
export async function updateStudentDiplomski(studentData) {
  const [result] = await pool.query(`
    UPDATE studenti_diplomski
    SET ime = ?, prezime = ?, godina_studiranja = ?, prosjek = ?, studijski_smijer = ?, ECTS_bodovi = ?, semestar = ?, primljena = ?
    WHERE id = ?`,
    [studentData.ime, studentData.prezime, studentData.godina_studiranja, studentData.prosjek, studentData.studijski_smijer, studentData.ECTS_bodovi, studentData.semestar, studentData.primljena, studentData.id]);

  return result;
}
export async function deleteStudentdip(id) {
  const [result] = await pool.query("DELETE FROM studenti_diplomski WHERE id = ?", [id]);
  return result;
}

//brisanje ocjene studenata 
export async function deleteOcjene(studentId) {
  const [result] = await pool.query(`
    DELETE FROM ocjene
    WHERE student_id = ?`,
    [studentId]);

  return result;
}
//brisanje ocjene studentima dipl
export async function deleteOcjeneDiplomski(studentId) {
  const [result] = await pool.query(`
    DELETE FROM ocjene_diplomski
    WHERE student_id = ?`,
    [studentId]);

  return result;
}

//post za profesore 
export async function getUserByUsername(username) {
  const [rows] = await pool.query('SELECT * FROM profesori WHERE email = ?', [username]);
  return rows[0];
}



//administratorii

export async function loginadministrator(username) {
  const [rows] = await pool.query('SELECT * FROM administratori WHERE email = ?', [username]);
  return rows[0];
}

//get profesori

//unos ocjena za prediplomske
export async function createOcjena(ocjena) {
  const [result] = await pool.query(`
    INSERT INTO ocjene (student_id, predmet_id, ocjena)
    VALUES (?, ?, ?)`,
    [ocjena.student_id, ocjena.predmet_id, ocjena.ocjena]
  );
  return result;
}

//kreiranje predmeta
export async function createPredmet(predmet) {
  const [result] = await pool.query(`
    INSERT INTO predmeti (naziv, ECTS, profesor_id)
    VALUES (?, ?, ?)`,
    [predmet.naziv, predmet.ECTS, predmet.profesor_id]
  );
  return result;
}
// Funkcija za ažuriranje postojeće ocjene
export async function azuriranjeOcjene(ocjenaData) {
  const [updateResult] = await pool.query(`
    UPDATE ocjene
    SET ocjena = ?
    WHERE student_id = ? AND predmet_id = ?`,
    [ocjenaData.ocjena, ocjenaData.student_id, ocjenaData.predmet_id]
  );
  return updateResult;
}


export async function dodajIliAzurirajOcjenu(ocjena) {

  const [existingOcjena] = await pool.query('SELECT * FROM ocjene WHERE student_id = ? AND predmet_id = ?', [ocjena.student_id, ocjena.predmet_id]);
  
  if (existingOcjena.length > 0) {
    return azuriranjeOcjene(ocjena);
  } else {
    return createOcjena(ocjena);
  }
}

//unos ocjena za diplomske
export async function createOcjenadip(ocjena) {
  const [result] = await pool.query(`
    INSERT INTO ocjene_diplomski (student_id, predmet_id, ocjena)
    VALUES (?, ?, ?)`,
    [ocjena.student_id, ocjena.predmet_id, ocjena.ocjena]
  );
  return result;
}


export async function azuriranjeOcjenedip(ocjenaData) {
  const [updateResult] = await pool.query(`
    UPDATE ocjene_diplomski
    SET ocjena = ?
    WHERE student_id = ? AND predmet_id = ?`,
    [ocjenaData.ocjena, ocjenaData.student_id, ocjenaData.predmet_id]
  );
  return updateResult;
}


export async function dodajIliAzurirajOcjenudip(ocjena) {

  const [existingOcjena] = await pool.query('SELECT * FROM ocjene_diplomski WHERE student_id = ? AND predmet_id = ?', [ocjena.student_id, ocjena.predmet_id]);
  
  if (existingOcjena.length > 0) {
    return azuriranjeOcjenedip(ocjena);
  } else {
    return createOcjenadip(ocjena);
  }
}
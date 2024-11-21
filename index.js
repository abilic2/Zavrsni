
//Uključujemo paket "express"
let idPopisa=1039;
let idprof=10010;
let iddipl=101;
import express from 'express';


import { 
  getNotes, 
  getNote, 
  createStudent, 
  updateStudent,
  getSubjects, 
  getSubject, 
  diplocj,
  getprofesori,
  hvatanjeprofid,
  dipocjena,
  deleteOcjene,
  deleteOcjeneDiplomski,
  deleteStudentdip,
  updateStudentDiplomski,
  updateprofesori,
  createDiplomskiStudent,
  loginadministrator,
  getdiplomskistud,
  getUserByUsername,
  createSubject, 
  getChoices, 
  getChoice, 
  createChoice, 
  getStudentChoices, 
  getStudentChoice, 
  createStudentChoice, 
  getGrades, 
  getGrade, 
  createPredmet,
  createGrade, 
  getLectures, 
  getLecture, 
  dodajIliAzurirajOcjenu,
  dodajIliAzurirajOcjenudip,
  createLecture,  
  createProfessor,
  deleteStudent, 
  hvatanjeid
} from "./baza.js";
// i stvaramo novu aplikaciju
const app = express();

app.use(function (req, res, next) {
  // Stranice (izvori) koji imaju pristup
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Dozvoljene metode zahtjeva
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Dozvoljena zaglavlja zahjteva
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Postaviti na TRUE ako je potrebno slanje cookie-ja uz zahtjev API-ju
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Nastavi na iduci sloj
  next();
});

import body_parser from "body-parser";
// obradjuje zahtjeve tipa (application/json content-type)
app.use(body_parser.json());

// Definiramo osnovnu rutu za GET zahtjev
app.get("/", (req, res) =>
  res.send("Dobrodošli na server!")
);
app.get("/baza", async(req, res) =>{
  const studenti=await getNotes()
  res.send(studenti);
});
app.get("/baza/:id", async(req, res) =>{
  const id=req.params.id;
  const student=await getNote(id)
  res.send(student);
});

app.get("/ocjena", async(req, res) =>{
  const id=req.params.id;
  const ocjena=await getGrades(id)
  res.send(ocjena);
});

app.get("/ocjena/:id", async(req, res) =>{
  const id=req.params.id;
  const ocjena=await getGrade(id)
  res.send(ocjena);
});
app.get("/ocjena_dip/:id", async(req, res) =>{
  const id=req.params.id;
  const ocjena=await dipocjena(id)
  res.send(ocjena);
});

app.get("/nastava", async(req, res) =>{
  const id=req.params.id;
  const nastava=await getLectures()
  res.send(nastava);
});
app.get("/nastava/:id", async(req, res) =>{
  const id=req.params.id;
  const nastava=await getLecture(id)
  res.send(nastava);
});

app.get('/studenti_diplomski', async (req, res) => {
  try {
    const studenti = await getdiplomskistud();
    res.json(studenti);
  } catch (error) {
    console.error('Greška prilikom dohvaćanja podataka:', error);
    res.status(500).json({ error: 'Greška pri dohvaćanju podataka' });
  }
});

app.post("/baza/novi", async (req, res) => {
  try {
    const { student } = req.body;

    // Kreiraj novog studenta
    const note = await createStudent(student);

    // Dohvati ID zadnje unesene stavke
    const zadnji = await hvatanjeid();

    // Vratiti ID novog studenta kao odgovor
    res.status(201).json({ id: zadnji.id, message: 'Student uspješno unesen!' });
  } catch (error) {
    console.error('Greška pri unosu studenta:', error);
    res.status(500).send({ message: 'Došlo je do pogreške pri unosu studenta.' });
  }
});
app.post("/stud_dip/novi", async (req, res) => {
  try {
    const { student } = req.body;

    // Kreiraj novog studenta
    const note = await createDiplomskiStudent(student);

    // Dohvati ID zadnje unesene stavke
    const zadnji = await hvatanjeid();

    // Vratiti ID novog studenta kao odgovor
    res.status(201).json({ id: zadnji.id, message: 'Student uspješno unesen!' });
  } catch (error) {
    console.error('Greška pri unosu studenta:', error);
    res.status(500).send({ message: 'Došlo je do pogreške pri unosu studenta.' });
  }
});
app.post("/profesori/novi", async (req, res) => {
  try {
      const { profesor } = req.body;
    console.log(profesor);
      if (!profesor) {
          return res.status(400).send({ message: 'Podaci o profesoru nisu prosleđeni.' });
      }

      const result = await createProfessor(profesor);
      const zadnji = await hvatanjeprofid();  // Treba da se obezbedi da ova funkcija vraća ID poslednjeg unosa

      res.status(201).json({ id: zadnji.id, message: 'Profesor uspješno unesen!' });
  } catch (error) {
      console.error('Greška pri unosu profesora:', error);
      res.status(500).send({ message: 'Došlo je do pogreške pri unosu profesora.' });
  }
});

app.post("/predmeti/novi", async (req, res) => {
  try {
    const { predmet } = req.body;
    
    // Pozivanje funkcije createPredmet za unos predmeta u bazu
    const result = await createPredmet(predmet);

    // Provjera da li je unos uspješan
    if (result.affectedRows > 0) {
      res.status(201).send({ message: "Predmet uspješno unesen", predmetId: result.insertId });
    } else {
      res.status(500).send({ message: "Došlo je do pogreške prilikom unosa predmeta" });
    }
  } catch (err) {
    console.error('Greška pri unosu predmeta:', err);
    res.status(500).send({ message: "Greška pri unosu predmeta" });
  }
});
app.get("/izbor", async(req, res) =>{
  const izbori=await getChoices()
  res.send(izbori);
});
app.get("/profesori", async(req, res) =>{
  const prof=await getprofesori();
  res.send(prof);
});

app.get("/studenti_izbor", async(req, res) =>{
  const izbori=await getStudentChoices();
  res.send(izbori);
});


app.get("/predmeti", async(req, res) =>{
  const predmeti=await getSubjects()
  res.send(predmeti);
});
app.get("/predmeti/:id", async(req, res) =>{
  const id=req.params.id;
  const predmet=await getSubject(id)
  res.send(predmet);
});


app.delete('/studenti/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteStudent(id);
    if (result.affectedRows > 0) {
      res.status(200).send({ message: `Student s ID-om ${id} je uspješno obrisan.` });
    } else {
      res.status(404).send({ message: `Student s ID-om ${id} nije pronađen.` });
    }
  } catch (error) {
    console.error('Greška pri brisanju studenta:', error);
    res.status(500).send({ message: 'Došlo je do pogreške pri brisanju studenta.' });
  }
});
app.delete('/studenti_diplomskog/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteStudentdip(id);
    if (result.affectedRows > 0) {
      res.status(200).send({ message: `Student s ID-om ${id} je uspješno obrisan.` });
    } else {
      res.status(404).send({ message: `Student s ID-om ${id} nije pronađen.` });
    }
  } catch (error) {
    console.error('Greška pri brisanju studenta:', error);
    res.status(500).send({ message: 'Došlo je do pogreške pri brisanju studenta.' });
  }
});
app.put('/studenti/:id', async (req, res) => {
  const { id } = req.params; 
  const studentData = req.body;

  try {
    studentData.id = id; 
    const result = await updateStudent(studentData);

    if (result.affectedRows > 0) {
      res.status(200).send({ message: `Student s ID-om ${id} je uspješno ažuriran.` });
    } else {
      res.status(404).send({ message: `Student s ID-om ${id} nije pronađen.` });
    }
  } catch (error) {
    console.error('Greška pri ažuriranju studenta:', error);
    res.status(500).send({ message: 'Došlo je do pogreške pri ažuriranju studenta.' });
  }
});
app.post('/studenti_diplomski/novi', async (req, res) => {
  const studentData = req.body; // Podaci o studentu iz tijela zahtjeva
  try {
    // Primljena vrijednost (ako nije dana, postavi na 'false')
    if (studentData.primljena === undefined) {
      studentData.primljena = false;
    }
    
    // Pozivanje funkcije za unos novog studenta
    const result = await createDiplomskiStudent(studentData);

    // Provjera uspješnosti unosa
    if (result.affectedRows > 0) {
      res.status(201).send({ message: `Student ${studentData.ime} ${studentData.prezime} je uspješno dodan.` });
    } else {
      res.status(500).send({ message: 'Došlo je do pogreške pri unosu studenta.' });
    }
  } catch (error) {
    console.error('Greška pri unosu studenta:', error);
    res.status(500).send({ message: 'Došlo je do pogreške pri unosu studenta.' });
  }
});
app.post('/loginprofesori', async (req, res) => {
  const { email, password } = req.body;  // Ovdje koristi 'password', a ne 'lozinka'

  try {
    const user = await getUserByUsername(email);
    
    if (user.email==email && password==user.lozinka) {
      res.json({ success: true, user });  // Vrati korisnika (user) da bi ga frontend mogao koristiti
    } else {
      res.json({ success: false, email,password });
    }
  } catch (error) {
    console.error('Greška pri prijavi:', error);
    res.status(500).send({ message: 'Došlo je do pogreške pri prijavi.' });
  }
});
app.post('/loginadministrator', async (req, res) => {
  const { email, password } = req.body;  // Ovdje koristi 'password', a ne 'lozinka'

  try {
    const user = await loginadministrator(email);

    if (user.email==email && password==user.lozinka) {
      res.json({ success: true, user });  // Vrati korisnika (user) da bi ga frontend mogao koristiti
    } else {
      res.json({ success: false,email,password });
    }
  } catch (error) {
    console.error('Greška pri prijavi:', error);
    res.status(500).send({ message: 'Došlo je do pogreške pri prijavi.' });
  }
});
app.put('/studenti_diplomski/:id', async (req, res) => {
  const { id } = req.params; // ID studenta iz URL parametra
  const studentData = req.body; // Podaci koje želite ažurirati

  try {
    studentData.id = id; // Osiguravamo da ID iz URL-a bude korišten za ažuriranje
    const result = await updateStudentDiplomski(studentData);

    if (result.affectedRows > 0) {
      res.status(200).send({ message: `Student s ID-om ${id} je uspješno ažuriran.` });
    } else {
      res.status(404).send({ message: `Student s ID-om ${id} nije pronađen.` });
    }
  } catch (error) {
    console.error('Greška pri ažuriranju studenta diplomskih studija:', error);
    res.status(500).send({ message: 'Došlo je do pogreške pri ažuriranju studenta diplomskih studija.' });
  }
});
app.put('/profesori/:id', async (req, res) => {
  const { id } = req.params; // ID studenta iz URL parametra
  const profesorData = req.body; // Podaci koje želite ažurirati

  try {
    profesorData.id = id; // Osiguravamo da ID iz URL-a bude korišten za ažuriranje
    const result = await updateprofesori( profesorData);

    if (result.affectedRows > 0) {
      res.status(200).send({ message: `Student s ID-om ${id} je uspješno ažuriran.` });
    } else {
      res.status(404).send({ message: `Student s ID-om ${id} nije pronađen.` });
    }
  } catch (error) {
    console.error('Greška pri ažuriranju studenta diplomskih studija:', error);
    res.status(500).send({ message: 'Došlo je do pogreške pri ažuriranju studenta diplomskih studija.' });
  }
});
app.delete('/ocjene/:studentId', async (req, res) => {
  const { studentId } = req.params; // ID studenta iz URL parametra

  try {
    const result = await deleteOcjene(studentId);

    if (result.affectedRows > 0) {
      res.status(200).send({ message: `Ocjene za studenta s ID-om ${studentId} su uspješno izbrisane.` });
    } else {
      res.status(404).send({ message: `Ocjene za studenta s ID-om ${studentId} nisu pronađene.` });
    }
  } catch (error) {
    console.error('Greška pri brisanju ocjena:', error);
    res.status(500).send({ message: 'Došlo je do pogreške pri brisanju ocjena.' });
  }
});
app.delete('/ocjene_dip/:studentId', async (req, res) => {
  const { studentId } = req.params; // ID studenta iz URL parametra

  try {
    const result = await deleteOcjeneDiplomski(studentId);

    if (result.affectedRows > 0) {
      res.status(200).send({ message: `Ocjene za studenta s ID-om ${studentId} su uspješno izbrisane.` });
    } else {
      res.status(404).send({ message: `Ocjene za studenta s ID-om ${studentId} nisu pronađene.` });
    }
  } catch (error) {
    console.error('Greška pri brisanju ocjena:', error);
    res.status(500).send({ message: 'Došlo je do pogreške pri brisanju ocjena.' });
  }
});
app.post('/ocjene/novi', async (req, res) => {
  const ocjenaData = req.body; // Podaci o ocjeni iz tijela zahtjeva
  console.log(ocjenaData);

  try {
    // Provjera da li su svi potrebni podaci prisutni
    if (!ocjenaData.student_id || !ocjenaData.predmet_id || ocjenaData.ocjena === undefined) {
      return res.status(400).send({ message: 'Nedostaju podaci za unos ocjene.', success: false });
    }

    // Pozivanje funkcije koja će umetnuti ili ažurirati ocjenu
    const result = await dodajIliAzurirajOcjenu(ocjenaData);

    if (result.affectedRows > 0) {
      if (result.changedRows > 0) {
        // Ako je ažurirano, vrati poruku i `false` jer je to ažuriranje
        return res.status(200).send({ 
          message: `Ocjena za studenta ID ${ocjenaData.student_id} i predmet ID ${ocjenaData.predmet_id} je uspješno ažurirana.`,
          success: false
        });
      } else {
        // Ako je umetnuto, vrati poruku i `true` jer je to unos
        return res.status(201).send({ 
          message: `Ocjena za studenta ID ${ocjenaData.student_id} i predmet ID ${ocjenaData.predmet_id} je uspješno dodana.`,
          success: true
        });
      }
    } else {
      return res.status(500).send({ message: 'Došlo je do pogreške pri unosu ili ažuriranju ocjene.', success: false });
    }
  } catch (error) {
    console.error('Greška pri unosu ili ažuriranju ocjene:', error);
    res.status(500).send({ message: 'Došlo je do pogreške pri unosu ili ažuriranju ocjene.', success: false });
  }
});

app.post('/ocjene_dip/novi', async (req, res) => {
  const ocjenaData = req.body; // Podaci o ocjeni iz tijela zahtjeva
  try {
    // Provjera da li su svi potrebni podaci prisutni
    if (!ocjenaData.student_id || !ocjenaData.predmet_id || ocjenaData.ocjena === undefined) {
      return res.status(400).send({ message: 'Nedostaju podaci za unos ocjene.', success: false });
    }

    // Pozivanje funkcije koja će umetnuti ili ažurirati ocjenu
    const result = await dodajIliAzurirajOcjenudip(ocjenaData);

    if (result.affectedRows > 0) {
      if (result.changedRows > 0) {
        // Ako je ažurirano
        return res.status(200).send({ 
          message: `Ocjena za studenta ID ${ocjenaData.student_id} i predmet ID ${ocjenaData.predmet_id} je uspješno ažurirana.`,
          success: true
        });
      } else {
        // Ako je umetnuto
        return res.status(201).send({ 
          message: `Ocjena za studenta ID ${ocjenaData.student_id} i predmet ID ${ocjenaData.predmet_id} je uspješno dodana.`,
          success: false
        });
      }
    } else {
      return res.status(500).send({ message: 'Došlo je do pogreške pri unosu ili ažuriranju ocjene.', success: false });
    }
  } catch (error) {
    console.error('Greška pri unosu ili ažuriranju ocjene:', error);
    res.status(500).send({ message: 'Došlo je do pogreške pri unosu ili ažuriranju ocjene.', success: false });
  }
});




// Osluškuje konekcije za zadanom portu
app.listen(4000, () => console.log("Server sluša port 4000!"));


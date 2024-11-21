var lista=[];
var inf=[];
var infiteh=[];
var baze=[];

function prikazstud(items) {
    const list = document.getElementById("lista");
    list.innerHTML="";
    let novi = `
        <table>
            <thead>
                <tr>
                    <th>br.</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Studijski smjer</th>
                    <th>Prosjek</th>
                    <th>Detalji</th>
                    <th>Brisanje</th>
                </tr>
            </thead>
            <tbody>
    `;

    items.forEach((i, index) => {
        novi += `
            <tr>
                <td>${index + 1}.</td>
                <td>${i.ime}</td>
                <td>${i.prezime}</td>
                <td>${i.studijski_smijer}</td>
                <td>${i.prosjek}</td>
                <td class="kaolink" onclick="prikaziDetalje(${i.id}, this)">Detalji</td>
                <td class="kaolink" onclick="brisanje(${i.id}, this)">Brisanje</td
                </tr>`;
    });

    novi += "</tbody></table>";
    list.innerHTML = novi;
}
document.addEventListener('DOMContentLoaded',(e)=> {
    e.preventDefault();
    async function preddip() {
        try {
            // Fetch baza
            let res = await fetch("http://localhost:4000/baza", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });
            let data = await res.json();
    
            // Prolaz kroz studente
            for (let i of data) {
                // Fetch ocjena za svakog studenta
                let ocjeneRes = await fetch(`http://localhost:4000/ocjena/${i.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*"
                    }
                });
                let ocjene = await ocjeneRes.json();
                i.predmeti = ocjene;
    
                // Prolaz kroz predmete studenta
                for (let j = 0; j < ocjene.length; j++) {
                    let predmetiRes = await fetch(`http://localhost:4000/predmeti/${ocjene[j].predmet_id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "*/*"
                        }
                    });
                    let predmetData = await predmetiRes.json();
                    i.predmeti[j].naziv = predmetData[0].naziv;
                    i.predmeti[j].ECTS = predmetData[0].ECTS;
                }
    
                lista.push(i); // Dodaj studenta u listu nakon fetch-ova
            }
    
            prikazstud(lista)
        } catch (err) {
            console.log("Greška: ", err);
        }
    }
    preddip();
    
})




document.getElementById("provjera").addEventListener("click",(e)=>{
    e.preventDefault();
    const listinf=document.getElementById("tablicainf");
    const listinfiteh=document.getElementById("tablicainfiteh");
    const listbaze=document.getElementById("tablicabaze");
   
    listinfiteh.innerHTML="";
    listbaze.innerHTML="";
    listinf.innerHTML="";
    for(let i=0;i<lista.length;i++){
        if(lista[i].primljena==false && lista[i].semestar==6 && lista[i].uklonjen==false){
        upad(i,0);
        }
    }
    for(let i=0;i<lista.length;i++){
        if(lista[i].primljena==false && lista[i].semestar==6 && lista[i].uklonjen==false){
        upad(i,1);
        }
    }
    for(let i=0;i<lista.length;i++){
        if(lista[i].primljena==false && lista[i].semestar==6 && lista[i].uklonjen==false){
            upad(i,2);
        }
    }
    
    sortprikaz(inf);
    sortprikaz(infiteh);
    sortprikaz(baze);
    
    
})
document.getElementById("reg").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'registracija.html';
})

document.getElementById("popprof").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href='profesori.html'
})
function prikaziDetalje(id,element) {
    const roditelj = element.closest('tr');
    let detalji = roditelj.nextElementSibling;
    if (detalji && detalji.classList.contains('detalji-row')) {
        detalji.remove();
    } else {
        detalji = document.createElement('tr');
        detalji.classList.add('detalji-row');
        const novi = document.createElement('td');
        novi.colSpan = 6;  // Postavlja koliko kolona ovaj <td> pokriva
        for(let i of lista){
        if(id==i.id){
                    novi.innerHTML = `
        <div class="detalji-container">
            <p><strong>Ime:</strong> ${i.ime}</p>
            <p><strong>Prezime:</strong> ${i.prezime}</p>
            <p><strong>Studijski smjer:</strong> ${i.studijski_smijer}</p>
            <p><strong>Prosjek:</strong> ${i.prosjek}</p>
            <p><strong>Godina:</strong>${i.godina_studiranja}</p>
            <p><strong>Semestar:</strong>${i.semestar}</p>
            <p><strong>ECTS bodovi:</strong> ${i.ECTS_bodovi}</p>
            <h3>Izbori</h3>
            <p><strong>1. ${i.izbor1}</strong> Broj bodova: <strong>${i.bodovi1}</strong></p>
            <p><strong>2. ${i.izbor2}</strong> Broj bodova: <strong>${i.bodovi2}</strong></p>
            <p><strong>3. ${i.izbor3}</strong> Broj bodova: <strong>${i.bodovi3}</strong></p>
            <h3>Predmeti</h3>
            ${i.predmeti.map(predmet => `
                <p><strong>${predmet.naziv}</strong> ocjena: <strong>${predmet.ocjena}</strong></p>
            `).join('')}
        </div>
    `;
        }
        }
        detalji.appendChild(novi);
        
        roditelj.insertAdjacentElement('afterend', detalji);
    }
}
document.getElementById("pretrazivanje").addEventListener("keyup", (e) => {
    const searchData = e.target.value.toLowerCase();
    const filterData = lista.filter((item) => {
        return (
            item.ime.toLowerCase().includes(searchData) ||
            item.prezime.toLowerCase().includes(searchData) ||
            item.studijski_smijer.toLowerCase().includes(searchData) 
        );
    });
    prikazstud(filterData); 
});



var visagod=[];

function prikazPopisaStudenata(lista) {
    const modalContent = document.getElementById("li");
    modalContent.textContent="";
    let popis ="";
    
    lista.forEach((student, index) => {
        
        popis += `
        <li>
            <strong>${index + 1}.</strong> ${student.ime} ${student.prezime}<br>
            Studijski smjer: ${student.studijski_smijer}<br>
            Prosjek: ${student.prosjek}<br>
            <span class="kaolink" onclick="ukloni2(${student.id})">Ukloni</span>
        </li>`;
        
    });

    popis += "</ul>";
    modalContent.innerHTML += popis;
    
}

function prikaziStudentePoSemestru(semestar) {
    console.log(lista);
    //console.log(semestar)
    console.log(lista);
    let filteredStudents = lista.filter(student => parseInt(student.semestar, 10) == semestar);
    console.log(filteredStudents);
    prikazstud(filteredStudents);
}
document.querySelectorAll('#semestar-options li').forEach(option => {
    option.addEventListener('click', function() {
        const semestar = parseInt(this.getAttribute('value'), 10);
        console.log(semestar);
        prikaziStudentePoSemestru(semestar);
    });
});
function prikaziStudentePoSmjeru(smjer) {
    const filteredStudents = lista.filter(student => student.studijski_smijer === smjer);
    console.log(filteredStudents);
    prikazstud(filteredStudents);
}

document.querySelectorAll('#smjer-options li').forEach(option => {
    option.addEventListener('click', function() {
        const smjer = this.getAttribute('value');
        console.log(smjer);
        prikaziStudentePoSmjeru(smjer);
    });
});

function prikaziStudentePoIzboru(izbor) {
    const filteredStudents = lista.filter(student => student.izbor1.toLowerCase() === izbor);
    console.log(filteredStudents);
    prikazstud(filteredStudents);
}

document.querySelectorAll('#izbor-options li').forEach(option => {
    option.addEventListener('click', function() {
        const izbor = this.getAttribute('value');
        console.log(izbor);
        prikaziStudentePoIzboru(izbor.toLowerCase());
    });
});

document.getElementById("godine").addEventListener("click", (e) => {
    e.preventDefault();
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
    visagodina(lista);
    for(let student of lista){
        if(student.primljena==true && student.semestar!=6){
            
            visagod.push(student);
     }
    }
    prikazPopisaStudenata(visagod);
    document.getElementById("close").addEventListener("click",(e)=>{
        e.preventDefault();
        let modal = document.getElementById('modal');
        modal.style.display = 'none'; 
        visagod=[];
        
    })
});


function visagodina(lista){
    for(let i of lista){
        if(i.semestar==1){
            if(i.ECTS_bodovi<10){
                i.primljena=false;
                
            }
            else{
                i.primljena=true;
                
            }
        }
        if(i.semestar==2){
            if(i.ECTS_bodovi<20){
                i.primljena=false;
            }
            else{
                i.primljena=true;
                i.godina_studiranja++;
                
            }
        }
        if(i.semestar==3){
            console.log(i.semestar);
            if(i.ECTS_bodovi<30){
                console.log(i.ECTS_bodovi);
                i.primljena=false;
            }
            else{
                console.log(i.ECTS);
                i.primljena=true;
               
            }
        }
        if(i.semestar==4){
            if(i.ECTS_bodovi<4){
                i.primljena=false;
            }
            else{
                i.primljena=true;
                i.godina_studiranja++;
                
            }
        }
        if(i.semestar==5){
            if(i.ECTS_bodovi<4){
                i.primljena=false;
            }
            else{
                i.primljena=true;
                i.godina_studiranja++;
                
            }
        }
    }
}
function ukloni2(a){
    for(let i=0;i<visagod.length;i++){
        if(visagod[i].id==a){
            visagod.splice(i,1);
            prikazPopisaStudenata(visagod);
        }
    }
}
document.getElementById("visa").addEventListener("click",(e)=>{
    e.preventDefault();
    
    for(let i=0;i<visagod.length;i++){
        visagod[i].primljena=false;
        visagod[i].semestar++;
        fetch(`http://localhost:4000/studenti/${visagod[i].id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(visagod[i])
        })
        .then(res=>{
            if(res.status==200){
                return true;
            }
            else{
                return false;
            }
            
        })
        .then(data=>{
            console.log("dodan je novi podatak");
        })
        .catch(err=>{
            console.log("Podatak sa tim idom je updatean");
        }
        )
    }
    window.location="stranica.html";
    visagod=[];
})

document.getElementById("odjava").addEventListener("click",(e)=>{
    e.preventDefault();
    alert("zelite se odjaviti");
    window.location="pocetna_prof.html";
})
document.getElementById("popisdip").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href='dipl.html'
})
document.getElementById("popis").addEventListener("click",(e)=>{
    e.preventDefault();
    prikazstud(lista);
})
document.getElementById("provjera").addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("sdg");
    window.location="visa.html"
})
document.getElementById("naslov").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location="stranica.html";
})
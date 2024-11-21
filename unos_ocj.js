var lista=[];
var listaprof=[];
function ucitavanje(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
let podatak = parseInt(ucitavanje('podatak'));
console.log( podatak);
console.log(listaprof);
let logirani={};
console.log(lista);
function prikazstud(items) {
    const list = document.getElementById("lista");
    let novi = `
        <table>
            <thead>
                <tr>
                    <th>br.</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>id</th>
                    <th>Unos ocjene</th>
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
                <td>${i.id}</td>
                <td class="kaolink" onclick="ocjene(${i.id}, this)">Unos ocjene</td>
            </tr>
        `;
    });

    novi += "</tbody></table>";
    list.innerHTML = novi;
}

function bodovanje(i,e,g,list){
    let zbroj=0;
    let b=0;
    if(i=="Nastavnički informatika i tehnika"){
        for(let j=0;j<list.length;j++){
            if(list[j].predmet_id==1){
                zbroj+=list[j].ocjena;
            }
            if(list[j].predmet_id==4){
                zbroj+=list[j].ocjena;
            }
            if(lista[j].predmet_id==7){
                zbroj+=list[j].ocjena;
            }
            if(lista[j].predmet_id==11){
                zbroj+=list[j].ocjena;
            }
        }
        b=(e*((zbroj)/2))/g;
        console.log(b);
        return b;
    }
    else if(i=="Nastavnički informatika"){
        for(let j=0;j<list.length;j++){
            if(list[j].predmet_id==1){
                zbroj+=list[j].ocjena;
            }
            if(list[j].predmet_id==4){
                zbroj+=list[j].ocjena;
            }
            if(list[j].predmet_id==5){
                zbroj+=list[j].ocjena;
            }
            if(lista[j].predmet_id==7){
                zbroj+=list[j].ocjena;
            }
        }
        b=(e*((zbroj)/2))/g;

        console.log(b);

        return b;
    }
    else{
        for(let j=0;j<list.length;j++){
            if(list[j].predmet_id==1){
                zbroj+=list[j].ocjena;
            }
            if(list[j].predmet_id==2){
                zbroj+=list[j].ocjena;
            }
            if(list[j].predmet_id==4){
                zbroj+=list[j].ocjena;
            }
            if(lista[j].predmet_id==7){
                zbroj+=list[j].ocjena;
            }
        }
        b=(e*((zbroj)/2))/g;

        console.log(b);
        return b;
    }
}
document.addEventListener('DOMContentLoaded',(e)=> {
    e.preventDefault();
    document.getElementById("lista").innerHTML="";
    async function dohvatiPodatke() {
        try {
          
          const response = await fetch("http://localhost:4000/baza", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept": "*/*"
            }
          });
      
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
      
          const data = await response.json();
      
          
          for (let i of data) {
            lista.push(i);
          }
          prikazstud(lista);
      
        } catch (error) {
          
          console.error('Greška pri dohvaćanju podataka:', error);
        }
      }
      
      dohvatiPodatke();
})
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
var predmetiLista = document.getElementById('predmetiLista');
var bod=0;
function ocjene(a){
    async function loadAndDisplayData(podatak, a) {
        var listapred = [];
        
        try {
          
            const response = await fetch("http://localhost:4000/predmeti", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
    
            listapred = data.filter(i => i.profesor_id == podatak);
    
            console.log(listapred);
    
            let logirani = null;
            for (let i of listaprof) {
                if (i.id == podatak) {
                    logirani = i;
                    console.log(logirani);
                    break;
                }
            }
    
            var stud = {};
            for (let i of lista) {
                if (i.id == a) {
                    stud = i;
                    break;
                }
            }
            bod=stud.ECTS_bodovi;
            console.log(bod);
            var prbod=0;
            const predmetiLista = document.getElementById('predmetiLista');
            for (let i = 0; i < listapred.length; i++) {
                let li = document.createElement('li');
                li.className = listapred[i].ECTS;
                prbod=listapred[i].ECTS;
                console.log(prbod);
                li.innerHTML = listapred[i].naziv;
    
                let inputOcjena = document.createElement('input');
                inputOcjena.type = 'number';
                inputOcjena.min = '2';
                inputOcjena.max = '5';
                inputOcjena.placeholder = 'Unesi ocjenu';
                inputOcjena.id = "ocj";
    
                let unesi = document.createElement('button');
                unesi.className = "unos";
                unesi.onclick = () => klik(unesi);
                unesi.innerHTML = 'Unesi ocjenu';
    
                li.appendChild(inputOcjena);
                li.appendChild(unesi);
                predmetiLista.appendChild(li);
            }
    
            console.log(stud);
            let modal = document.getElementById('modal');
            modal.style.display = 'block';
    
            function klik(e) {
                let rod = e.parentElement;
                let originalText = rod.textContent;
                let naziv = originalText.replace(e.textContent, '').trim();
                let oc = parseInt(rod.querySelector('input').value);
            
                // Dodaj potvrdu prije unosa ocjene
                let potvrda = confirm("Jeste li sigurni da želite unijeti ocjenu?");
                
                if (!potvrda) {
                    // Ako korisnik klikne "Ne", prekini funkciju
                    return;
                }
                
                for (let i of listapred) {
                    if (i.naziv == naziv) {
                        
                        async function postOcjena(ocjena) {
                            try {
                                const response = await fetch("http://localhost:4000/ocjene/novi", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Accept": "*/*"
                                    },
                                    body: JSON.stringify(ocjena)
                                });
            
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
            
                                const data = await response.json();
                                console.log(data);
                                if (data.success) {
                                    bod += prbod;
                                    console.log(bod);
                                    alert("Uspješno unesena ocjena  " + ocjena.ocjena + "  studentu " + stud.ime + " " + stud.prezime);
                                } else {
                                    alert("Ocjena za studenta " + stud.ime + " " + stud.prezime + " je uspješno ažurirana.");
                                }
            
                                // Ostatak koda ostaje isti...
            
                            } catch (error) {
                                console.error('Greška pri unosu:', error);
                                alert('Došlo je do greške pri unosu ocjene.');
                            }
                        }
                        
                        const ocjena = {
                            student_id: a,
                            predmet_id: i.id,
                            ocjena: oc
                        };
                        console.log(ocjena);
                        postOcjena(ocjena);
                    }
                }
            
                let modal = document.getElementById('modal');
                modal.style.display = 'none';
                predmetiLista.textContent = "";
            }
    
        } catch (error) {
            console.error('Greška pri dohvaćanju podataka:', error);
        }
    }
    
    
    loadAndDisplayData(podatak, a);
    
    
    
            
}
    

document.getElementById("close").addEventListener("click",(e)=>{
    e.preventDefault();
    let modal = document.getElementById('modal');
    modal.style.display = 'none'; 
    predmetiLista.textContent="";
})

document.addEventListener('DOMContentLoaded',(e)=> {
    e.preventDefault();
    fetch("http://localhost:4000/profesori",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        
    })
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        for(let i of data){
            listaprof.push(i);
        }
    
    })
})
document.getElementById("promjena").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location=`promjena.html?podatak=${podatak}`;
})
document.getElementById("odjava").addEventListener("click",(e)=>{
    e.preventDefault();
    alert("zelite se odjaviti");
    window.location="pocetna_prof.html";
})
document.getElementById("popisdip").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location=`unos_ocj_dip.html?podatak=${podatak}`;
})
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

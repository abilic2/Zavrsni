var lista=[];
var inf=[];
var infiteh=[];
var baze=[];
function sortprikaz(listasort,a) {
   
    if(a==1){
        list = document.getElementById("tablicainf");
    }
    else if(a==2){
        list = document.getElementById("tablicainfiteh");

    }
    else{
        list = document.getElementById("tablicabaze");

    }
    let br = 0;
    let novi = `
        <table>
            <thead>
                <tr>
                    <th>br.</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Studijski smjer</th>
                    <th>Prosjek</th>
                    <th>Broj bodova</th>
                    <th>Uklanjanje</th>
                </tr>
            </thead>
            <tbody>
    `;

    listasort.forEach((student, index) => {
        
        br++;
        novi += `
            <tr>
                <td>${br}.</td>
                <td>${student.ime}</td>
                <td>${student.prezime}</td>
                <td>${student.studijski_smijer}</td>
                <td>${student.prosjek}</td>
                <td>${student.bodovi1,student.bodovi2,student.bodovi3}</td>
                <td class="kaolink" onclick="uklanjanje(${student.id})">Ukloni</td>
            </tr>
        `;
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
                    i.uklonjen=false;
                    i.predmeti[j].naziv = predmetData[0].naziv;
                    i.predmeti[j].ECTS = predmetData[0].ECTS;
                }
    
                lista.push(i); // Dodaj studenta u listu nakon fetch-ova
            }
    
            izvrsiNakonFetch();
        } catch (err) {
            console.log("Greška: ", err);
        }
    }
    
    function izvrsiNakonFetch() {
        console.log(lista);
    
        const listinf = document.getElementById("tablicainf");
        const listinfiteh = document.getElementById("tablicainfiteh");
        const listbaze = document.getElementById("tablicabaze");
    
        listinfiteh.innerHTML = "";
        listbaze.innerHTML = "";
        listinf.innerHTML = "";
    
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].primljena == false && lista[i].semestar == 6 && lista[i].uklonjen == false) {
                upad(i, 0); // Prikazivanje u tablicainf
            }
        }
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].primljena == false && lista[i].semestar == 6 && lista[i].uklonjen == false) {
                upad(i, 1); // Prikazivanje u tablicainfiteh
            }
        }
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].primljena == false && lista[i].semestar == 6 && lista[i].uklonjen == false) {
                upad(i, 2); // Prikazivanje u tablicabaze
            }
        }
    
        sortprikaz(inf,1);
        sortprikaz(infiteh,2);
        sortprikaz(baze,3);
    }
    
    preddip();
    
})


function upad(a,b){
    let id=0;
    let min=lista[a].bodovi1;
    let prosjek1=lista[a].prosjek;
    let ind=0;
    let pr=false;
    let niz=[];
    let smijer="";

    if(b==0){
        if(lista[a].izbor1=="Nastavnički informatika"){
            niz=inf;
            smijer="Nastavnički informatika";
            if(niz.length<7){
                lista[a].primljena=true;
                niz.push(lista[a]);
                return true;
            }
        }
        else if(lista[a].izbor1=="Nastavnički informatika i tehnika"){
            niz=infiteh;
            smijer="Nastavnički informatika i tehnika";
            if(niz.length<8){
                lista[a].primljena=true;
                niz.push(lista[a]);
                return true;
            }
        }
        else{
            niz=baze;
            smijer="Informatika baze podataka";
            if(niz.length<8){
                lista[a].primljena=true;
                niz.push(lista[a]);
                return true;
    
            }
        }
    }
    else if(b==1){
        if(lista[a].izbor2=="Nastavnički informatika"){
            niz=inf;
            smijer="Nastavnički informatika";
            if(niz.length<7){
                lista[a].primljena=true;
                niz.push(lista[a]);
                return true;
            }
        }
        else if(lista[a].izbor2=="Nastavnički informatika i tehnika"){
            niz=infiteh;
            smijer="Nastavnički informatika i tehnika";
            if(niz.length<8){
                lista[a].primljena=true;
                niz.push(lista[a]);
                return true;
            }
        }
        else{
            niz=baze;
            smijer="Informatika baze podataka";
            if(niz.length<8){
                lista[a].primljena=true;
                niz.push(lista[a]);
                return true;
    
            }
        }
    }
    else{
        if(lista[a].izbor3=="Nastavnički informatika"){
            niz=inf;
            smijer="Nastavnički informatika";
            if(niz.length<7){
                lista[a].primljena=true;
                niz.push(lista[a]);
                return true;
            }
        }
        else if(lista[a].izbor3=="Nastavnički informatika i tehnika"){
            niz=infiteh;
            smijer="Nastavnički informatika i tehnika";
            if(niz.length<8){
                lista[a].primljena=true;
                niz.push(lista[a]);
                return true;
            }
        }
        else{
            niz=baze;
            smijer="Informatika baze podataka";
            if(niz.length<8){
                lista[a].primljena=true;
                niz.push(lista[a]);
                return true;
    
            }
        }
    }
    for(let j=0;j<niz.length;j++){
        console.log(niz[j].ime);
        for(let h=1;h<4;h++){
            if(niz[j].izbor+h==smijer){
                console.log(id);
                if(niz[j].bodovi+h<min){
                    min=niz[j].bodovi+h;
                    ind=j;
                    id=niz[j].id;
                    pr=true;
                    prosjek1=niz[j].prosjek;
                }
                else if(niz[j].bodovi+h==min){
                    if(prosjek1>niz[j].prosjek){
                        min=niz[j].izbor[h].bodovi;
                        ind=j;
                        id=niz[j].id;
                        pr=true;
                        prosjek1=niz[j].prosjek;
                    }
                }

            }
        }
    }
    if(pr){
        if(b==1){

            if(lista[a].izbori1=="Nastavnički informatika"){
                lista[a].primljena=true;
                inf[ind]=lista[a];
            }
            else if(lista[a].izbori1=="Nastavnički informatika i tehnika"){
                lista[a].primljena=true;
                infiteh[ind]=lista[a];
            }
            else{
                lista[a].primljena=true;
                baze[ind]=lista[a];
            }
            for(let j=0;j<lista.length;j++){
                if(lista[j].id==id){
                    lista[j].primljena=false;
                }
            }
        }  
        if(b==2){
            if(lista[a].izbori2=="Nastavnički informatika"){
                lista[a].primljena=true;
                inf[ind]=lista[a];
            }
            else if(lista[a].izbori2=="Nastavnički informatika i tehnika"){
                lista[a].primljena=true;
                infiteh[ind]=lista[a];
            }
            else{
                lista[a].primljena=true;
                baze[ind]=lista[a];
            }
            for(let j=0;j<lista.length;j++){
                if(lista[j].id==id){
                    lista[j].primljena=false;
                }
            }
        }
        else{
            if(lista[a].izbori3=="Nastavnički informatika"){
                lista[a].primljena=true;
                inf[ind]=lista[a];
            }
            else if(lista[a].izbori3=="Nastavnički informatika i tehnika"){
                lista[a].primljena=true;
                infiteh[ind]=lista[a];
            }
            else{
                lista[a].primljena=true;
                baze[ind]=lista[a];
            }
            for(let j=0;j<lista.length;j++){
                if(lista[j].id==id){
                    lista[j].primljena=false;
                }
            }
        }
}
}

function uklanjanje(a){
    a.ECTS_bodovi=0;
    for(let i=0;i<inf.length;i++){
        if(inf[i].id==a){
            inf.splice(i,1);
            
        }
    }
    for(let i=0;i<infiteh.length;i++){
        if(infiteh[i].id==a){
            infiteh.splice(i,1);
           
        }
    }
    for(let i=0;i<baze.length;i++){
        if(baze[i].id==a){
            baze.splice(i,1);
            
        }
    }
    let mj={};
    for(let j=0;j<lista.length;j++){
        if(lista[j].id==a){
            lista[j].uklonjen=true;
            lista[j].primljena=false;
            mj=lista[j];
        }
    }
    const listinf=document.getElementById("tablicainf");
    const listinfiteh=document.getElementById("tablicainfiteh");
    const listbaze=document.getElementById("tablicabaze");
    console.log(mj);
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
    sortprikaz(inf,1);
    sortprikaz(infiteh,2);
    sortprikaz(baze,3);
    
    fetch(`http://localhost:4000/studenti/${a}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: JSON.stringify(mj)
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
document.getElementById("up").addEventListener("click",(e)=>{
    e.preventDefault();

    for(let i=0;i<inf.length;i++){{
        inf[i].studijski_smijer="Nastavnički informatika";
        inf[i].ECTS_bodovi=0;
        inf[i].godina_studiranja++;
        inf[i].semestar=7;
        inf[i].primljena=false;
        inf[i].predmeti=[];

            fetch("http://localhost:4000/studenti_diplomski/novi",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify(inf[i])
            })
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                
                console.log(data);
                console.log("uneseno");
            })
            .catch(err=>{
                console.log(err);
            })
            fetch(`http://localhost:4000/studenti/${inf[i].id}`,{
                method: "DELETE",
                headers:{ 'Content-Type': 'application/json',
                'Accept': '*/*'}
            })
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                console.log(data);
                window.location.href = window.location.href;
            })
            .catch(err=>{
                console.log("greska");
            })
        }
    }
    for(let i=0;i<infiteh.length;i++){{
        infiteh[i].studijski_smijer="Nastavnički informatika i tehnika";
        infiteh[i].ECTS_bodovi=0;
        infiteh[i].semestar=7;
        infiteh[i].godina_studiranja++;
        infiteh[i].primljena=false;
        infiteh[i].predmeti=[];
        
            fetch("http://localhost:4000/studenti_diplomski/novi",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify(infiteh[i])
            })
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                
                console.log(data);
                console.log("uneseno");
            })
            .catch(err=>{
                console.log(err);
            })
            fetch(`http://localhost:4000/studenti/${infiteh[i].id}`,{
                method: "DELETE",
                headers:{ 'Content-Type': 'application/json',
                'Accept': '*/*'}
            })
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                console.log(data);
                window.location.href = window.location.href;
            })
            .catch(err=>{
                console.log("greska");
            })
        }
    }
    for(let i=0;i<baze.length;i++){
        baze[i].studijski_smijer="Baze podataka";
        baze[i].ECTS_bodovi=0;
        baze[i].godina_studiranja++;
        baze[i].semestar=7;
        baze[i].primljena=false;
        baze[i].predmeti=[];

            fetch("http://localhost:4000/studenti_diplomski/novi",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify(baze[i])
            })
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                
                console.log(data);
                console.log("uneseno");
            })
            .catch(err=>{
                console.log(err);
            })
            fetch(`http://localhost:4000/studenti/${baze[i].id}`,{
                method: "DELETE",
                headers:{ 'Content-Type': 'application/json',
                'Accept': '*/*'}
            })
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                console.log(data);
                window.location.href = window.location.href;
            })
            .catch(err=>{
                console.log("greska");
            })
        }
    }

    
)
document.getElementById("pretrazivanjeinf").addEventListener("keyup", (e) => {
    const searchData = e.target.value.toLowerCase();
    const filterData = inf.filter((item) => {
        return (
            item.ime.toLowerCase().includes(searchData) ||
            item.prezime.toLowerCase().includes(searchData) ||
            item.studijski_smijer.toLowerCase().includes(searchData) 
        );
    });
    sortprikaz(filterData,1); 
});
document.getElementById("pretrazivanjeinfiteh").addEventListener("keyup", (e) => {
    const searchData = e.target.value.toLowerCase();
    const filterData = infiteh.filter((item) => {
        return (
            item.ime.toLowerCase().includes(searchData) ||
            item.prezime.toLowerCase().includes(searchData) ||
            item.studijski_smijer.toLowerCase().includes(searchData) 
        );
    });
    sortprikaz(filterData,2); 
});
document.getElementById("pretrazivanjebaze").addEventListener("keyup", (e) => {
    const searchData = e.target.value.toLowerCase();
    const filterData = baze.filter((item) => {
        return (
            item.ime.toLowerCase().includes(searchData) ||
            item.prezime.toLowerCase().includes(searchData) ||
            item.studijski_smijer.toLowerCase().includes(searchData) 
        );
    });
    sortprikaz(filterData,3); 
});
document.getElementById("reg").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'registracija.html';
})

document.getElementById("popprof").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href='profesori.html'
})
document.getElementById("popisdip").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href='dipl.html'
})
document.getElementById("popis").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href='stranica.html'
})
document.getElementById("odjava").addEventListener("click",(e)=>{
    e.preventDefault();
    alert("zelite se odjaviti");
    window.location="pocetna_prof.html";
})
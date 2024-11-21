let lista=[];
document.addEventListener('DOMContentLoaded',(e)=> {
    e.preventDefault();
    document.getElementById("lista").innerHTML="";
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
        lista=data
        prikaziTabelu(lista);

    })
})
document.getElementById("reg").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = 'registracija.html';
})

function prikaziDetalje(id,element) {
    let pr=loadAndDisplayData(id);
    console.log(pr);
    const roditelj = element.closest('tr');
    let detalji = roditelj.nextElementSibling;
    if (detalji && detalji.classList.contains('detalji-row')) {
        detalji.remove();
    } else {
        detalji = document.createElement('tr');
        detalji.classList.add('detalji-row');
        const novi = document.createElement('td');
        novi.colSpan = 6; 
        for(let i of lista){
            if(id==i.id){
                let novinnerHTML = `
            <div class="detalji-container">
            <p><strong>Ime:</strong> ${i.ime}</p>
            <p><strong>Prezime:</strong> ${i.prezime}</p>
            <p><strong>Polozaj:</strong> ${i.polozaj}</p>
            <p><strong>E-mail:</strong> ${i.email}</p>
            <p><strong>Ured</strong> ${i.ured}</p>
            <p><strong>Odjel</strong> ${i.odjel}</p>
            <h3>Predmeti predavanja</h3> 
        
            `;
            for (let j = 0; j < pr.length; j++) {
                novinnerHTML += `<p> <strong>${pr[j].naziv}</strong> ECTS <strong>${pr[j].ECTS}</strong></p>`;
            }
            novinnerHTML+=`</div>`
            novi.innerHTML=novinnerHTML;

            }
        }
        detalji.appendChild(novi);
        
        roditelj.insertAdjacentElement('afterend', detalji);
    }
}
const displeyItem = (items) => {
    document.getElementById("ispis").innerHTML = items.map((item) => {
        const { ime, prezime, polozaj } = item;
        return `<p>${ime} ${prezime} - ${polozaj}</p>`;
    }).join("");
};

document.getElementById("pretrazivanje").addEventListener("keyup", (e) => {
    const searchData = e.target.value.toLowerCase();
    const filterData = lista.filter((item) => {
        return (
            item.ime.toLowerCase().includes(searchData) ||
            item.prezime.toLowerCase().includes(searchData) ||
            item.polozaj.toLowerCase().includes(searchData)
        );
    });
    prikaziTabelu(filterData); 
});


function prikaziTabelu(items) {
    const list = document.getElementById("lista");
    let novi = `
        <table>
            <thead>
                <tr>
                    <th>br.</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Položaj</th>
                    <th>Odjel</th>
                    <th>Kontakt</th>
                    <th>Ured</th>
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
                <td>${i.polozaj}</td>
                <td>${i.odjel}</td>
                <td>${i.kontakt}</td>
                <td>${i.ured}</td>
                <td class="kaolink" onclick="prikaziDetalje(${i.id}, this)">Detalji</td>
                <td class="kaolink" onclick="brisanjeprof(${i.id}, this)">Brisanje</td>
            </tr>
        `;
    });

    novi += "</tbody></table>";
    list.innerHTML = novi;
}
function brisanjeprof(id){
    
    if(confirm('Da li ste sigurni da želite obrisati?')){
            fetch(`http://localhost:4000/profesori/${id}`,{
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
    else{
        alert("odustali ste od brisanja");
    }
}
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
    
        
function loadAndDisplayData(podatak) {
    var listapred = [];

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:4000/predmeti", false); 
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "*/*");

    try {
        xhr.send();
        
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            listapred = data.filter(i => i.profesor_id == podatak);
            console.log(listapred);
            return listapred;
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Greška pri dohvaćanju podataka:', error);
    }
}

function prikaziProfesorepoOdjelu(odjel) {
    const filteredProfesori = lista.filter(profesor => profesor.odjel.toLowerCase() === odjel);
    console.log(filteredProfesori);
    prikaziTabelu(filteredProfesori);
}

document.querySelectorAll('#odjel-options li').forEach(option => {
    option.addEventListener('click', function() {
        const Odjel = this.getAttribute('value');
        console.log(Odjel);
        prikaziProfesorepoOdjelu(Odjel.toLowerCase());
    });
});

function prikaziProfesorepoPolozaju(polozaj) {
    const filteredProfesori = lista.filter(profesor => profesor.polozaj.toLowerCase() === polozaj);
    console.log(filteredProfesori);
    prikaziTabelu(filteredProfesori);
}

document.querySelectorAll('#polozaj-options li').forEach(option => {
    option.addEventListener('click', function() {
        const Polozaj = this.getAttribute('value');
        console.log(Polozaj);
        prikaziProfesorepoPolozaju(Polozaj.toLowerCase());
    });
});

document.querySelectorAll('#semestar-options li').forEach(option => {
    option.addEventListener('click', function() {
        let semestar = this.getAttribute('value'); 
        window.location.href = `stranica.html?semestar=${encodeURIComponent(semestar)}`;
    });
});
document.getElementById("naslov").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location="profesori.html";
})
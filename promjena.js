var listaprof=[];
function ucitavanje(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
let podatak = parseInt(ucitavanje('podatak'));
console.log( podatak);
console.log(listaprof);
let logirani={};
document.addEventListener("DOMContentLoaded",(e)=> {
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
            
            if(i.id==podatak){
                logirani=i;
                console.log(logirani);
            }
        }
    
    })
})
document.getElementById("lozinka1").addEventListener("click",(e)=>{
    e.preventDefault();
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
    let div=document.getElementById("lozinka");
    div.style.display="block";
})
document.getElementById("ured1").addEventListener("click",(e)=>{
    e.preventDefault();
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
    let div=document.getElementById("ured");
    div.style.display="block";
})
document.getElementById("kontakt1").addEventListener("click",(e)=>{
    e.preventDefault();
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
    let div=document.getElementById("kontakt");
    div.style.display="block";
    
})
document.getElementById("close").addEventListener("click",(e)=>{
    e.preventDefault();
    let modal = document.getElementById('modal');
    modal.style.display = 'none'; 
    let div=document.getElementById("kontakt");
    div.style.display="none";
    let div2=document.getElementById("ured");
    div2.style.display="none";
    let div3=document.getElementById("lozinka");
    div3.style.display="none";
})
function provjeraaloz(a,b){
    if(a==logirani.lozinka && b.length>=8){
        return true;
    }
    return false;
    
}
document.getElementById("promjeni-lozinku").addEventListener("click",(e)=>{
    e.preventDefault();
    let stara=document.getElementById("staralozinka").value;
    let nova=document.getElementById("nova-lozinka").value;
    if(provjeraaloz(stara,nova)){
        logirani.lozinka=nova;
        fetch(`http://localhost:4000/profesori/${logirani.id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(logirani)
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
            console.log(data);
        })
        .catch(err=>{
            console.log("Podatak sa tim idom je updatean");
        }
        )
        alert("uspjesno promjenjena lozinka"+nova);
    }
    else{
        alert("Kriva lozinka");
    }
    
})
document.getElementById("promjeni-ured").addEventListener("click",(e)=>{
    e.preventDefault();
    let ur=document.getElementById("novi-ured").value;
    if(ur!=logirani.ured){
        logirani.ured=ur;
        fetch(`http://localhost:4000/profesori/${logirani.id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(logirani)
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
            console.log(data);
        })
        .catch(err=>{
            console.log("Podatak sa tim idom je updatean");
        }
        )
        alert("uspjesno promjenjen ured "+ur);
    }
    else{
        alert("Taj ured je već postojan!");
    }
    
})
document.getElementById("promjeni-kontakt").addEventListener("click",(e)=>{
    e.preventDefault();
    let kon=document.getElementById("novi-kontakt").value;
   
        logirani.kontakt=kon;
        fetch(`http://localhost:4000/profesori/${logirani.id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(logirani)
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
            console.log(data);
        })
        .catch(err=>{
            console.log("Podatak sa tim idom je updatean");
        }
        )
        alert("uspjesno ste promjenili kontakt "+kon);
    }
    
    
)
document.getElementById("odjava").addEventListener("click",(e)=>{
    e.preventDefault();
    alert("zelite se odjaviti");
    window.location="pocetna_prof.html";
})
document.getElementById("popisdip").addEventListener("click",(e)=>{
    e.preventDefault();
    window.location=`unos_ocj_dip.html?podatak=${podatak}`;
})
document.getElementById("popis").addEventListener("click",(e)=>{
    e.preventDefault();

    window.location=`unos_ocj.html?podatak=${podatak}`;
})
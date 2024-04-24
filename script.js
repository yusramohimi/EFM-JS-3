class Stagiaire{
    constructor(id, nom, note, filiere){
        this.id = id,
        this.nom = nom,
        this.note = note,
        this.filiere = filiere
    }
}



// declaration 
let stagiaires = []

const stagiaire1 = new Stagiaire(2,"Mohimi",8,"TDM")
const stagiaire2 = new Stagiaire(3,"Mohimi2",17,"TDM")
const stagiaire3 = new Stagiaire(4,"Mohimi3",6,"TDI")
const stagiaire4 = new Stagiaire(5,"Mohimi4",18,"TRI")
stagiaires.push(stagiaire1)
stagiaires.push(stagiaire2)
stagiaires.push(stagiaire3)
stagiaires.push(stagiaire4)


const form = document.getElementById("form");
const id = document.getElementById("id");
const nom = document.getElementById("nom");
const note = document.getElementById("note");
let filiere = "";
    let radioBtns = document.getElementsByName('filiere')
    for (let i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].checked) {
            filiere = radioBtns[i].id.toUpperCase()
        }
    }

// events 

document.getElementById('form').addEventListener('submit', function(e) {
    if (!validation()) {
        e.preventDefault()
    }
});
document.getElementById("save").addEventListener('click',save)
document.getElementById("ajouter").addEventListener("click",add)
document.getElementById("lire").addEventListener("click",search)

// functions


//fonction pour la validation en js sachant que les champs id nom et note sont obligatoire
function validation(){
    let valid = true;
    if(id.value.trim() === ""){
        document.getElementById("id-error").textContent = "Le champ ID est obligatoire !"
        valid = false
    }else{
        document.getElementById("id-error").textContent = ""
    }

    if(nom.value.trim() === ""){
        document.getElementById("nom-error").textContent = "Le champ NOM est obligatoire !"
        valid = false
    }else{
        document.getElementById("nom-error").textContent = ""
    }

    if(note.value.trim() ===""){
        document.getElementById("note-error").textContent = "Le champ NOTE est obligatoire !"
        valid = false
    }else{
        document.getElementById("note-error").textContent = ""
    }

    return valid
}


 //enregistrer les données saisies dans une liste
function save(e) {
    e.preventDefault();
    let idV = document.getElementById("id").value;
    let nomV = document.getElementById("nom").value;
    const noteV = parseFloat(document.getElementById("note").value); 
    let filiereV = "";
    let radioBtns = document.getElementsByName('filiere')
    for (let i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].checked) {
            filiereV = radioBtns[i].id.toUpperCase()
        }
    }
    let stagiaire = new Stagiaire(idV, nomV, noteV, filiereV)
    stagiaires.push(stagiaire)
    console.log(stagiaires)
    
    add()
   

}


function add(e) {   
    e.preventDefault()
    let content = "";
for (let i = 0; i < stagiaires.length; i++) {
    let noteValue = stagiaires[i].note;

    let color;
    if (noteValue < 10) {
        color = 'red';
    } else if (noteValue >= 10) {
        color = 'green';
    }

    content +=
        `<tr>
            <th>${stagiaires[i].id}</th>
            <td>${stagiaires[i].nom}</td>
            <td class="note">${noteValue}</td>
            <td>${stagiaires[i].filiere}</td>
            <td><button class="btn-supprimer">Supprimer</button></td>
        </tr>`;
}

document.getElementById('tdata').innerHTML = content;

// Appliquer la couleur à chaque cellule de note
const noteCells = document.querySelectorAll('.note');
noteCells.forEach(cell => {
    let noteValue = parseFloat(cell.textContent);

    let color;
    if (noteValue < 10) {
        color = 'red';
    } else if (noteValue >= 10) {
        color = 'green';
    }

    cell.style.color = color;
});


    // Remove row when delete button is clicked
    const deleteButtons = document.querySelectorAll('.btn-supprimer');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = button.parentNode.parentNode;
            row.remove();
        });
    });
    actualiserMaxNote()
}



    // ajouter un ecouteur au bouton "lire" et ecrire le code qui permet de lire les donnees d un stagiaire apres la saisie de l id

function search(e){
    e.preventDefault()
    let idSaisi = document.getElementById("id").value.trim();
    idSaisi = parseInt(idSaisi) 

    let stagiaireTrouve = stagiaires.find(function(stagiaire) {
        return stagiaire.id === idSaisi;
    })

    
    if (stagiaireTrouve) {
        
        document.getElementById("nom").value = stagiaireTrouve.nom;
        document.getElementById("note").value = stagiaireTrouve.note;
        
        let radioButtons = document.getElementsByName("filiere"); // ne fonctionne pas !!!!!!
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].value === stagiaireTrouve.filiere) {
                radioButtons[i].checked = true;
                
            }
        }
       
    } else {
        
        alert("Aucun stagiaire trouvé avec l'ID saisi . Merci de saisir les données de ce stagiaire à nouveau !");
        
    }
}


// fonction actualiser max note
function actualiserMaxNote() {
    let noteMaximale = 0;

    stagiaires.forEach(stagiaire => {
        if (stagiaire.note > noteMaximale) {
            noteMaximale = stagiaire.note;
        }
    })

    document.getElementById('best-note').innerText = noteMaximale;
}

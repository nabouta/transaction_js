const Clients = [
    {
        nom: "sow", prenom: "cheikh", email: "sow@gmail.com", telephone: "773457698", photo: "https://images.unsplash.com/photo-1679919996303-1824ae520235?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80", solde: 200000,
        transactions: [

        ]
    },
    {
        nom: "fall", prenom: "khady", email: "fall@gmail.com", photo: "https://images.unsplash.com/photo-1591304990819-138eb98a3a6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBlcnNvbiUyMGlkZW50aXR5JTIwKiUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", telephone: "769764335", solde: 505000,
        transactions: [

        ]
    },

    {
        nom: "diop", prenom: "awa", email: "awa@gmail.com", photo: "https://media.istockphoto.com/id/1431366219/photo/young-hispanic-pensive-woman-holding-smartphone.jpg?s=612x612&w=0&k=20&c=Z9B9NqwX0AoUXCLYSbRBcfTfJ57e24g8B03bUXr_fHk=", telephone: "757664308", solde: 450000,
        transactions: [

        ]
    },
    {
        nom: "mbaye", prenom: "moussa", email: "mabye@gmail.com", photo: "https://media.istockphoto.com/id/1159113569/photo/portrait-stylish-girl.jpg?s=612x612&w=0&k=20&c=ujyGiT1kPkCbhzkuFx6p9uO55ib8IJsoL_anhoNMYSg=", telephone: "705764371", solde: 350000,
        transactions: [

        ]
    },
];
let nextBtn = document.querySelector('.next')
let infoUser = document.querySelector(".info flex2 dflex fdc jcsb");
let nomClient = document.querySelector("#lastname");
let prenomClient = document.querySelector("#firstname");
let numeroClient = document.querySelector("#phone");
let emailClient = document.querySelector("#email");
let soldeClient = document.querySelector('#solde');
let photoClient = document.querySelector('img');
let enregistre = document.querySelector('button[type="button"]');
let flex2 = document.querySelector(".flex2");
let nombreTransaction = document.querySelector('code');
let typeTransaction = document.querySelector('select');
let input = document.querySelector('#mnt');
let btnDetail = document.querySelector("#btnDetail");
let form = document.querySelector(".form");
let tbody = document.querySelector('tbody');
let envoi = document.querySelector("#envoi");
let container = document.querySelector(".container");
let searchNum = document.querySelector('.search-num');
let ajoutClient = document.querySelector('.save');
let annuler = document.querySelector('.cancel');
let openModal = document.querySelector('.open-modal');
const nom = document.querySelector('#nom')
const prenom = document.querySelector('#prenom')
const mail = document.querySelector('#mail')
const newPhone = document.querySelector('#new-tel')
const searchClientContainer = document.querySelector('.recherche-client')
const searchClientInput = document.querySelector('#search-client-input')
const tof = document.querySelector('#tof')
let ClientModal = document.querySelector('.flutter');
const annulTrans = document.querySelector('#annulTrans')
let clientActu = 0;
let asup;

btnDetail.addEventListener('click', () => {
    form.style.display = "block";

});


printInfosClient(Clients[0]);

nextBtn.addEventListener('click', () => {
    clientActu = Math.floor(Math.random() * Clients.length)

    printInfosClient(Clients[clientActu]);
});
openModal.addEventListener('click', () => ClientModal.style.display = 'block')
annuler.addEventListener('click', () => ClientModal.style.display = 'none')
ajoutClient.addEventListener('click', () => {
    const prenom1 = prenom.value
    const nom1 = nom.value
    const telephone = newPhone.value
    const newtof = tof.value
    console.log(telephone);
    const email = mail.value
    if (mail.value == '' || prenom.value == '' || newPhone.value == '' || nom.value == '' || tof.value == '') {
        asup = createNotification("veillez saisir tous les champs");


        setTimeout(() => {
            asup.remove()

        }, 2000);


        return


    }

    else if (!numeroaccepte(telephone)) {
        asup = createNotification("Veillez saisir un numero valide ");


        setTimeout(() => {
            asup.remove()

        }, 2000);


        return

    }

    else if (!emailValid(email)) {
        asup = createNotification("Votre email est invalide");


        setTimeout(() => {
            asup.remove()

        }, 2000);


        return

    }

    else if (
        Clients.forEach(client => {
            if (client.telephone == telephone)
                asup = createNotification("Ce numero existe déja");


            setTimeout(() => {
                asup.remove()

            }, 2000);


            return
        })

    );

    const nClient = {
        nom: nom1,
        prenom: prenom1,
        telephone: telephone,
        email: email,
        solde: 0,
        transactions: [],
        photo: newtof
    }

    Clients.push(nClient)
    printInfosClient(nClient)
    ClientModal.style.display = 'none'


});
enregistre.addEventListener('click', () => {
    let sens = typeTransaction.value;
    let mnt = +input.value;
    let num;
    const echange = {
        Numero: num,
        Date: new Date().toLocaleDateString(),
        Sens: sens,
        Montant: mnt
    };
    if (Clients[clientActu].transactions.length == 0) { echange.Numero = 1 }
    else { echange.Numero = Clients[clientActu].transactions[(Clients[clientActu].transactions.length) - 1].Numero + 1 }


    if (mnt < 500) {
        asup = createNotification("transaction à partir de 500");

        setTimeout(() => {
            asup.remove()

        }, 2000);

        return
    }
    // else if (!numeroaccepte(envoi.value)) {
    //     asup = createNotification("Numero incorecte");
    //     setTimeout(() => {
    //         asup.remove()

    //     }, 2000);

    //     return
    // }
    else if ((typeTransaction.value == 'r')) {
        if (Clients[clientActu].solde >= mnt) {
            Clients[clientActu].solde = Clients[clientActu].solde - mnt
        }
        else

            asup = createNotification("Solde insuffisant pour faire ce retrait ");


        setTimeout(() => {
            asup.remove()

        }, 2000);


        return
        
    }


});
function createNotification(notif) {
    let notification = creerElement("div", { class: 'notification' }, notif)
    container.append(notification);
    return notification
};
function creerElement(nomElement, attributElement, containElement) {
    let element = document.createElement(nomElement);
    for (const key in attributElement) {
        element.setAttribute(key, attributElement[key]);
    }
    element.textContent = containElement;
    return element;
};
function printInfosClient(client) {
    nomClient.innerHTML = client.nom;
    prenomClient.innerHTML = client.prenom;
    numeroClient.innerHTML = client.telephone;
    emailClient.innerHTML = client.email;
    soldeClient.innerHTML = client.solde;
    photoClient.src = client.photo;
    tbody.innerHTML = '';
    client.transactions.forEach(t => {
        let operation = writeTransaction(t.Numero, t.Date, t.Sens, t.Montant);
        tbody.appendChild(operation);
    });
    nombreTransaction.innerHTML = client.transactions.length;

};
function justNumbers(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57))
        return true;
    else
        return false;
};
function telephoneByClient(tel) {
    let Client = Clients.find(client => client.telephone == tel)
    return Client

}

function createSearchNum(phone) {
    return creerElement('li', {}, phone)
}
function rechercheNumero(phone) {
    for (const client of Clients) {
        if (client.telephone.startsWith(phone)) {
            const li = createSearchNum(client.telephone)
            searchNum.appendChild(li)

            li.addEventListener('click', () => {
                envoi.value = client.telephone
                searchNum.innerHTML = ''
            })
        }
    }
}
searchClientInput.addEventListener('input', () => {
    const nom = searchClientInput.value

    searchClientContainer.innerHTML = ''

    if (nom != '') {
        ResultClient(nom)
    }
})

function ResultClient(nom) {
    for (const client of Clients) {
        if (client.nom.toLocaleLowerCase().includes(nom.toLocaleLowerCase())) {
            const li = createClientItem(client.prenom, client.nom, client.imgProfil)
            searchClientContainer.appendChild(li)
            li.addEventListener('click', () => {
                printInfosClient(client)
                searchClientContainer.innerHTML = ''
            })
        }
    }
}
function createClientItem(prenom, nom, img) {
    const li = creerElement('li', {})
    const fullName = creerElement('span', { class: 'nom' }, `${prenom} ${nom}`)
    const image = creerElement('img', { class: 'image' })
    image.style.backgroundImage = `url(${img})`
    li.append(fullName, image)
    return li
};

function numeroaccepte(tel) {
    const numValide = new RegExp("7{1}(7|6|5|0|8){1}[0-9]{7}")
    return numValide.test(tel)
}

function emailValid(email) {
    const mailControle = new RegExp("[A-Za-z]+[0-9a-zA-Z._-]*@[a-zA-Z]\.[a-zA-Z]{2,}")
    return mailControle.test(email)

};

function telephoneByClient(tel) {
    let Client = Clients.find(client => client.telephone == tel)
    return Client

}

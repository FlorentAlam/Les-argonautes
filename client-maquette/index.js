const input = document.getElementsByTagName('input')[0];
const submitButton = document.getElementsByTagName('button')[0];
const listContainer = document.getElementsByClassName('member-list')[0];

let argonautes = [];
let inputValue = "";

input.addEventListener('change', (e) => {
    inputValue = e.target.value.trim();
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    createArgonaute();
});

async function createArgonaute(){
    let val = await fetch('/argonautes', {
        method: 'post',
        body: JSON.stringify({data: inputValue}),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if(val.status === 200){
        argonautes.push(inputValue);
        addArgonauteToListe();
        inputValue = "";
        input.value = "";
    }
}

async function getArgonautes(){
    const res = await fetch('/argonautes');
    const argonautesList = await res.json();
    argonautes = [...Object.values(argonautesList)];
    populateArgonautesList();
}

function populateArgonautesList(){
    argonautes.map(argonaute => {
        addArgonauteToListe(argonaute);
    });
}

function addArgonauteToListe(name){
    const div = document.createElement('div');
    div.classList.add('member-item');
    div.innerText = name || inputValue;
    listContainer.appendChild(div);
}

window.onload = function(){
    getArgonautes();
}


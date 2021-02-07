import ErrorSystem from "./ErrorSystem.js";

const MAX_NUMBER_OF_ARGONAUTES = 50;

class Argonautes{
    constructor(){
        this._argonautes = [];
        this._inputValue = "";

        this._errorSystem = new ErrorSystem();

        this._initDomVariables();
        this._initEvents();
        this._loadArgonautes();
    }
    _initDomVariables = () => {
        this._nameInput = document.getElementById('argonaute_name');
        this._submitBtn = document.getElementById('submit_button');
        this._listeContainer = document.getElementById('liste_membres');
        this._argonauteNumber = document.getElementById('argonautes_length');
    }
    _initEvents = () => {
        this._nameInput.addEventListener('change', (e) => {
            this._inputValue = e.target.value;
        });

        this._submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(this._errorSystem.isInputValid(this._inputValue)){
                this._createArgonaute();
            } 
        });
    }
    _loadArgonautes = async () => {
        const res = await fetch('/argonautes');
        const argonautes = await res.json();
        this._argonautes = [...Object.values(argonautes)];
        this._populateArgonautesList();
    }
    _createArgonaute = async () => {
        if(this._argonautes.length < MAX_NUMBER_OF_ARGONAUTES){
            let val = await fetch('/argonautes', {
                method: 'post',
                body: JSON.stringify({data: this._inputValue}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(this._errorSystem.isArgonauteCreated(val.status)){
                this._argonautes.push(this._inputValue);
                this._addNameToList();
                this._inputValue = "";
                this._nameInput.value = "";
            }
        } else {
            this._errorSystem.maxMembersLimit();
        }
    }
    _populateArgonautesList = () => {
        this._argonautes.map(argonaute => {
            this._addNameToList(argonaute);
        })
    }
    _addNameToList = (name) => {
        this._argonauteNumber.innerText = this._argonautes.length;

        const list_item = document.createElement('li');
        list_item.innerText = name || this._inputValue;
        this._listeContainer.appendChild(list_item);
    }
}

export default Argonautes;
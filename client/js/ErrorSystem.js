const MINIMUM_INPUT_LENGTH = 1;
const ERROR_STATUS = 400; // Code d'erreur renvoyé par le serveur.

class ErrorSystem{
    constructor(){
        this._errorContainer = document.getElementById('error_message');
        this._successContainer = document.getElementById('success_message');
    }

    isArgonauteCreated = (status) => {
        try{
            if(status === ERROR_STATUS) throw new Error("Erreur lors de l'ajout de l'Argonaute à la liste.")
            this._successContainer.style.display = "block";
            return true;
        } catch (error){
            this._successContainer.style.display = "none";
            this._toggleErrorMessageVisibility(error.message);
            return false;
        }
    }

    isInputValid = (value) => {
        try{
            if(!this._isLengthCorrect(value)) throw new Error("Veuillez remplir le nom de l'argonaute choisi.");
            if(!this._isValidCharacters(value)) throw new Error("Veuillez n'utiliser que des lettres, espace ou tiret -");
            
            this._toggleErrorMessageVisibility();
            return true;
        } catch(error){
            this._successContainer.style.display = "none";
            this._toggleErrorMessageVisibility(error.message);
            return false;
        }
    }
    maxMembersLimit = () => {
        this._successContainer.style.display = 'none';
        this._toggleErrorMessageVisibility("Votre liste est complète, vous êtes prêt à embarquer !");
    }

    _isLengthCorrect = (value) => {
        return value.length >= MINIMUM_INPUT_LENGTH;
    }

    _isValidCharacters = (value) => {
        // Ce regex cherche les lettres, les espaces et le tiret -, tout autre caractère est interdit.
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]*$/;
        return regex.test(value);
    }

    _toggleErrorMessageVisibility = (message) => {
        this._errorContainer.innerText = message || "";
        this._errorContainer.style.display = message ? "block" : "none";
    }
}

export default ErrorSystem;
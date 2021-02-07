const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const admin = require('firebase-admin');
const serviceAccount = process.env.PROJECT_ID ? require('./firebase-credential-public.js') : require('./les-argonautes-secret.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://les-argonautes-3ab51-default-rtdb.europe-west1.firebasedatabase.app"
});
var db = admin.database();
var ref = db.ref("argonautes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/maquette', express.static('./client-maquette'));
app.use('/', express.static('./client'));


app.get('/argonautes', (req, res) => {
    ref.once("value", (data) => {
        let names = data.val();
        res.status(200).send(names);
    });
});

app.post('/argonautes', (req, res) => {
    const name = req.body.data;
    ref.push().set(name.trim());
    res.status(200).send();
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Le serveur a été lancé.");
});
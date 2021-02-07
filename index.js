const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const admin = require('firebase-admin');
const serviceAccount = process.env.PROJECT_ID ? {
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
} : require('./les-argonautes-secret.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://les-argonautes-3ab51-default-rtdb.europe-west1.firebasedatabase.app"
});
var db = admin.database();
var ref = db.ref("argonautes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./client'));

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
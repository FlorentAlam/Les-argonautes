const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const ref = require('./firebase_init.js');

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
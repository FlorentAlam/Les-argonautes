const admin = require('firebase-admin');
const serviceAccount = process.env.PROJECT_ID ? require('./firebase-credential-public.js') : require('./les-argonautes-secret.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://les-argonautes-3ab51-default-rtdb.europe-west1.firebasedatabase.app"
});
var db = admin.database();
var ref = db.ref("argonautes");

module.exports = ref;
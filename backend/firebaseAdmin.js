const admin = require("firebase-admin");
const serviceAccount = require("./cesa-website-a696a-firebase-adminsdk-fbsvc-3b013d123a.json"); // path to your Firebase Admin JSON

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
module.exports = { db };

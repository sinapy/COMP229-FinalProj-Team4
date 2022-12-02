let fbAdmin = require('firebase-admin');
const {applicationDefault} = require("firebase-admin/app");
require('dotenv').config()
module.exports = function(){
    fbAdmin.initializeApp(
        {
            credential: fbAdmin.credential.cert(JSON.parse(process.env.GCLOUD_SERVICE_ACCOUNT))

        }
    )
    console.log("=====> connected to firebase")
}

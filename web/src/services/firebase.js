import firebase from 'firebase';

require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env" : ".env"
})

const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY_FIREBASE,
    authDomain: process.env.VUE_APP_API_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL_FIREBASE,
    projectId: process.env.VUE_APP_PROJECT_ID_FIREBASE,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET_FIREBASE,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_ID_APP_FIREBASE
};

export default{
    iniciarFirebase(){
        firebase.initializeApp(firebaseConfig); 
    }      
}
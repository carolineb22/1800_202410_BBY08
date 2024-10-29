//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyBHJRrQzbd79Gn523o1LvOXENEO5_YQVaI",
    authDomain: "pathways-2914c.firebaseapp.com",
    projectId: "pathways-2914c",
    storageBucket: "pathways-2914c.appspot.com",
    messagingSenderId: "1026663479537",
    appId: "1:1026663479537:web:8a19d8986a69aac6445150"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
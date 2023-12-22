import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAwT3gVUJG0RiUb_HGQtUorysDJfDxbPWY",
    authDomain: "react-blog-8207a.firebaseapp.com",
    projectId: "react-blog-8207a",
    storageBucket: "react-blog-8207a.appspot.com",
    messagingSenderId: "108745635367",
    appId: "1:108745635367:web:025e86d4c6b008a6180002"
};

firebase.initializeApp(firebaseConfig);

export default firebase
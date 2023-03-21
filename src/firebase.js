import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCjT-MeZoVp8SmTmIBmpITGXSyJ2hYtEQ0",
    authDomain: "budget-tracker-tw.firebaseapp.com",
    projectId: "budget-tracker-tw",
    storageBucket: "budget-tracker-tw.appspot.com",
    messagingSenderId: "772054309755",
    appId: "1:772054309755:web:369400e801bf673ca2bbde"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export const singInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        console.log(result);
        const username = result.user.displayName;
        const email = result.user.email;
        const pic = result.user.photoURL;
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("gender", "gender");
        localStorage.setItem("birthday", "birthday");
        localStorage.setItem("pic", pic);
        window.location.href = '/user';
    }).catch((error) => {
        console.log(error);
    })
};

const db = getFirestore(app);
export { db };
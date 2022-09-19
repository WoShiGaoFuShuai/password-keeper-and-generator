import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
   apiKey: "AIzaSyADSVA4C9Khsry63oeZ44PwTDuTGWbx4Wg",
   authDomain: "pass-keeper-93095.firebaseapp.com",
   projectId: "pass-keeper-93095",
   storageBucket: "pass-keeper-93095.appspot.com",
   messagingSenderId: "972160910767",
   appId: "1:972160910767:web:108a951d7403a7a43ddb5a"
 };

 initializeApp(firebaseConfig)

 const auth = getAuth();
 const db = getFirestore();

 export {db, auth}
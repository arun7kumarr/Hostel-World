import { initializeApp } from "firebase/app";
import {getFirestore,collection} from "firebase/firestore" 

const firebaseConfig = {
  apiKey: "AIzaSyCUNZ_Mp2jAo8-PlnmK0cF2nKF3fE07LgU",
  authDomain: "filmyverse-81d20.firebaseapp.com",
  projectId: "filmyverse-81d20",
  storageBucket: "filmyverse-81d20.appspot.com",
  messagingSenderId: "190229078366",
  appId: "1:190229078366:web:075c51108f190117ecefcf"
};


const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
 export const  moviesref = collection(db,'movies');
 export const  reviewsRef = collection(db,'reviews');
 export const  usersRef = collection(db,'users');

export default app;
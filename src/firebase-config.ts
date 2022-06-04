import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtZDkoQ06h3bDW0vpzYqmI2QM3ew5zNFI",
  authDomain: "tiki-clone-app-439e7.firebaseapp.com",
  databaseURL: "https://tiki-clone-app-439e7-default-rtdb.firebaseio.com",
  projectId: "tiki-clone-app-439e7",
  storageBucket: "tiki-clone-app-439e7.appspot.com",
  messagingSenderId: "537854000136",
  appId: "1:537854000136:web:6bdca53b4fcbc43dc865bd",
  measurementId: "G-NEJ1Z8T6PZ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const authentication = getAuth(app)

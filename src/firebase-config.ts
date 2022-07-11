import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_App_API_KEY,
  authDomain: process.env.REACT_App_AUTH_DOMAIN,
  databaseURL: process.env.REACT_App_DATABASE_URL,
  projectId: process.env.REACT_App_PROJECT_ID,
  storageBucket: process.env.REACT_App_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_App_MESSAGING_SENDER_ID,
  appId: process.env.REACT_App_APP_ID,
  measurementId: process.env.REACT_App_MEASUREMENT_ID
};

console.log(
  firebaseConfig
)
// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const authentication = getAuth(app)

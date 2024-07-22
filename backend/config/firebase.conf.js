import {initializeApp} from 'firebase/app'


const firebaseConfig = {
    apiKey: "AIzaSyAYkWeYQL2VqRLmW2ohoXiHwE3Ngr9337Y",
    authDomain: "social-app-892c7.firebaseapp.com",
    projectId: "social-app-892c7",
    storageBucket: "social-app-892c7.appspot.com",
    messagingSenderId: "82949224144",
    appId: "1:82949224144:web:4db3b071dc39a48af050d5",
    measurementId: "G-M9QHQ8P1S1"
  };


  const app = initializeApp(firebaseConfig);
  export default app
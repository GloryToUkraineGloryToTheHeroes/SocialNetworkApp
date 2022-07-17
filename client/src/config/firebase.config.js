import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB4b_TNuUTfgH0R5xWoJZMweHxOrKzBLiM",
    authDomain: "notesgram-a8735.firebaseapp.com",
    projectId: "notesgram-a8735",
    storageBucket: "notesgram-a8735.appspot.com",
    messagingSenderId: "945426953403",
    appId: "1:945426953403:web:7f0e45bd212ce4741ba59e"
    //databaseURL: "https://notesgram-a8735-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)

export const fireDB = getFirestore(app)
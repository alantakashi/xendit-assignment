import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3Uerkc0BgRv3sO6MkD3E4--p1xlOdmVE",
  authDomain: "xendit-242a3.firebaseapp.com",
  projectId: "xendit-242a3",
  storageBucket: "xendit-242a3.appspot.com",
  messagingSenderId: "2862383056",
  appId: "1:2862383056:web:0363f4e7c2349376c583d5",
  measurementId: "G-QGJ38MMD9C"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

// firestore
const firestoreDb = () => firebaseApp.firestore()

const getServerTime = () => firebase.firestore.FieldValue.serverTimestamp()

export {
  firebaseApp,
  firestoreDb,
  getServerTime
}
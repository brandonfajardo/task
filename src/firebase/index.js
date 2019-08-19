import firebase from 'firebase'

export const firebaseConfig = {
  apiKey: "AIzaSyCh4awKNVFK9l09PqXiZyPKqlYN2Wp-Rpk",
  authDomain: "test-446ea.firebaseapp.com",
  databaseURL: "https://test-446ea.firebaseio.com",
  projectId: "test-446ea",
  storageBucket: "",
  messagingSenderId: "811037280169",
  appId: "1:811037280169:web:3e5aa72da5b92a5d"
}

firebase.initializeApp(firebaseConfig)

export const dbAuth = firebase.auth()
export const firestore = firebase.firestore();

export default firebase
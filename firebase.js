const firebase = require('firebase/app')
const firestore = require('firebase/firestore')
const database = require('firebase/database')


const firebaseConfig = {
  apiKey: "AIzaSyD7t4w0YqoHZNWNTSiM7bqpK6x_kw_2vFo",
  authDomain: "cardappio-digital.firebaseapp.com",
  databaseURL: "https://cardappio-digital.firebaseio.com",
  projectId: "cardappio-digital",
  storageBucket: "cardappio-digital.appspot.com",
  messagingSenderId: "854537578823",
  appId: "1:854537578823:web:c9423f8a74fc5b109e8462",
  measurementId: "G-T9VFZYW0H0"
};
// initialize Firebase from settings
let $fbApp

$fbApp = firebase.initializeApp(firebaseConfig);

const $firestore = firebase.firestore();
const $db = firebase.database()

exports.firebase = firebase
exports.$firestore = $firestore
exports.$db = $db
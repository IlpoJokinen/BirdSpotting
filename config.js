import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAMEQcyVwI1Oj5SOKFNY18a7QNHWDla11c",
    authDomain: "birdspotting-25cbd.firebaseapp.com",
    databaseURL: "https://birdspotting-25cbd.firebaseio.com",
    projectId: "birdspotting-25cbd",
    storageBucket: "birdspotting-25cbd.appspot.com",
    messagingSenderId: "408406393053",
    appId: "1:408406393053:web:e9c400caee9416cae89b34",
    measurementId: "G-0TLV1XGL29"
  }

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
import firebase from 'firebase/app'
import 'firebase/firestore'
// import 'firebase/storage'
// import 'firebase/functions'

import { firebaseConfig } from './config'

// Your web app's Firebase configuration
// let firebaseConfig = config

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

// export const auth = firebaseApp.auth()
// export const productionStorage = firebaseApp.storage()

// Initializing Firebase Cloud Functions for productionDB
// export const cloudFunctions = firebaseApp.functions()
export const cloudStore = firebaseApp.firestore()
// Export firebase to be used in other parts of the application
// export default firebaseApp.firestore()

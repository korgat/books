import firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/auth'

var firebaseConfig = {
	apiKey: "AIzaSyDj-njfnmrh2Yk7ayeGNpc_PJyKsJ4VyrU",
	authDomain: "my-library-5ae3e.firebaseapp.com",
	projectId: "my-library-5ae3e",
	storageBucket: "my-library-5ae3e.appspot.com",
	messagingSenderId: "784473889903",
	appId: "1:784473889903:web:b3d9738b9a73519357419a",
	measurementId: "G-XYZ53R27CK"
};

firebase.initializeApp(firebaseConfig);

export default firebase

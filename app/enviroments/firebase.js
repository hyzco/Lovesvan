import * as firebase from 'firebase';

const config = {
	apiKey: "AIzaSyCZzaObGxCqreamYRuiKkasnodHFqrQu2g",
		authDomain: "lovesvan-8c81a.firebaseapp.com",
		databaseURL: "https://lovesvan-8c81a.firebaseio.com",
		projectId: "lovesvan-8c81a",
		storageBucket: "lovesvan-8c81a.appspot.com",
		messagingSenderId: "1012906199802"
};

let instance = null;
const locationRef = null;
const userRef = null;

class FirebaseService {
  constructor() {
    if (!instance) {
      this.app = firebase.initializeApp(config);
      instance = this;
    }
    return instance;
  }
}


const firebaseService = new FirebaseService().app;
export default firebaseService;

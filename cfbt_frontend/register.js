
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8atiiA6w_oxp6bXvtGyvS9YEyNDynd5k",
  authDomain: "consumerbusinessfinancetool.firebaseapp.com",
  projectId: "consumerbusinessfinancetool",
  storageBucket: "consumerbusinessfinancetool.appspot.com",
  messagingSenderId: "597030601042",
  appId: "1:597030601042:web:080c023e8fd493edfbfa8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// submit Button
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault()

  //inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //sign up
      const user = userCredential.user;
      alert("Account Created")

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
    });
})


// function for checking username and password



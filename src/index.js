import { traerDatos } from "./data.js";
import { auth } from "./firestore.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"



document.getElementById('main-content').hidden = true
document.getElementById('autentication').hidden = false

/*----Cambio entre SignIn y SignUp----*/
let signIn = document.getElementById('signIn')
let signUp = document.getElementById('signUp')
signUp.hidden = true
let signUpButton = document.getElementById('signUpButton')
signUpButton.addEventListener('click', () => {
    signIn.hidden = true
    signUp.hidden = false
})
let signInButton = document.getElementById('signInButton')
signInButton.addEventListener('click', () => {
    signIn.hidden = false
    signUp.hidden = true
})

/*----Sign In form------*/
let signInForm = document.getElementById('SignInForm')
let googleSignInButton = document.getElementById('googleSignIn')
let facebookSignInButton = document.getElementById('facebookSignIn')

googleSignInButton.addEventListener('click', async(e) => {
    console.log('Sign in with google')
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth,provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user
    }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.email
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log(errorCode,errorMessage,email,credential)
    })
})
facebookSignInButton.addEventListener('click', async (e) => {
    console.log('sing in with facebook')
    const provider = new FacebookAuthProvider
    await signInWithPopup(auth,provider)
    .then((result) => {
        const user = result.user
        const credential = FacebookAuthProvider.credentialFromResult
        const accessToken = credential.accessToken
    }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.email
        const credential = FacebookAuthProvider.credentialFromError
        console.log(errorMessage, errorCode, email, credential)
    })
})
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let email = signInForm['signInEmail'].value
    let password = signInForm['signInPassword'].value
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode)
            console.log(errorMessage)
            alert(errorMessage, errorCode)
        })
    console.log(email, password)
    signInForm.reset()
})
/*-----Sign Up form----*/
let signUpForm = document.getElementById('SignUpForm')
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let email = signUpForm["signUpEmail"].value
    let password = signUpForm["signUpPassword"].value
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode)
            console.log(errorMessage)
            alert(errorMessage, errorCode)
        })
    console.log('signUp', signUpForm['signUpEmail'].value, signUpForm['signUpPassword'].value)
    signUpForm.reset()
})

/*----Log Out----*/
let logOut = document.getElementById('logOut')
logOut.addEventListener('click', async (e) => {
    signOut(auth).then(() => {
        console.log('Sign out successful')
    }).catch((error) => {
        console.log(error, 'an error happened')
    })
})

/*----Auth state changes---*/ 
onAuthStateChanged(auth, (user) => {
    if(user) {
        console.log('user is signed in')
        document.getElementById('main-content').hidden = false
        document.getElementById('autentication').hidden = true
        traerDatos();
    } else {
        console.log('user is not signed in')
        document.getElementById('main-content').hidden = true
        document.getElementById('autentication').hidden = false
    }
})
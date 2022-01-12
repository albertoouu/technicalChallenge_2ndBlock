import { traerDatos } from "./data.js";

traerDatos();

document.getElementById('main-content').hidden = true

/*----Cambio entre SignIn y SignUp----*/
let signIn = document.getElementById('signIn')
let signUp = document.getElementById('signUp')
signUp.hidden=true
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
googleSignInButton.addEventListener('click', () => {
    console.log('Sign in with google')
})
facebookSignInButton.addEventListener('click', () => {
    console.log('sing in with facebook')
})
signInForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('SignIn',signInForm['signInEmail'].value , signInForm['signInPassword'].value)
    signInForm.reset()
})
/*-----Sign Up form----*/
let signUpForm = document.getElementById('SignUpForm')
let googleSignUpButton = document.getElementById('googleSignUp')
let facebookSignUpButton = document.getElementById('facebookSignUp')
googleSignUpButton.addEventListener('click', () => {
    console.log('Sign up with google')
})
facebookSignUpButton.addEventListener('click', () => {
    console.log('sing up with facebook')
})
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('signUp',signUpForm['signUpEmail'].value , signUpForm['signUpPassword'].value)
    signUpForm.reset()
})
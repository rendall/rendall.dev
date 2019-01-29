import GoTrue from 'gotrue-js'

const USER_API_URL = "https://www.rendall.tv/.netlify/identity"

const auth = new GoTrue({
  APIUrl: USER_API_URL,
  audience: "",
  setCookie: false
})

const user = auth.currentUser()
if (user===null) {
  // setup signup / login UI 
}
else {
  const jwt = user.jwt()
  jwt
    .then(response =>
      console.log(
        "This is a JWT token",
        response
      )
    )
    .catch(error => {
      console.log("Error fetching JWT token", error)
      throw error
    })
}

const onSignup = (response) => { console.log("onSignup", response) }
const onSignupError = (error) => { console.error("signupError", error)}
const onLogin = (response) => { console.log("onLogin", response); return { name:"Rendall"} } // return user object
const onLoginError = (error) => {  console.error("loginError", error)}

const onSubmit = (e:MouseEvent) => new Promise((resolve, reject) => {

  e.preventDefault()
  const password = (document.querySelector('#password') as HTMLInputElement).value
  const email = (document.querySelector('#email') as HTMLInputElement).value
  const isSignup = (document.querySelector('#isSignup') as HTMLInputElement).checked
  const name = (document.querySelector('#name') as HTMLInputElement).value

  console.log(password, email, isSignup, name)

  const login = () => auth.login(email, password, true).then(onLogin).then(() => resolve()).catch(onLoginError)
  const signup = () => auth.signup(email, password, { name }).then(onSignup).then(login).catch(onSignupError)

  if (isSignup) signup() 
  else login()
})

document.querySelector("#submit-btn")!.addEventListener("click", onSubmit)
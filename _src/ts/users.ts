import GoTrue from "gotrue-js";

const USER_API_URL = "https://www.rendall.tv/.netlify/identity";

const auth = new GoTrue({
  APIUrl: USER_API_URL,
  audience: "",
  setCookie: false,
});

const displayError = (errorMessage: string) => {
  const messageDisplay = document.getElementById(
    "message-display"
  ) as HTMLParagraphElement;
  const errMessage = errorMessage.startsWith("invalid_grant:")
    ? errorMessage.slice(14)
    : errorMessage;
  messageDisplay.innerText = errMessage;
  messageDisplay.classList.add("error");
};

const displayMessage = (message: string) => {
  const messageDisplay = document.getElementById(
    "message-display"
  ) as HTMLParagraphElement;
  messageDisplay.innerText = message;
  messageDisplay.classList.remove("error");
};

const onSignup = () => {
  updateUI();
};
const onSignupError = (error: Error) => displayError(error.message);
const onLogin = () => {
  updateUI();
}; // return user object
const onLoginError = (error: Error) => displayError(error.message);
const onLogoutError = (error: Error) => displayError(error.message);
const onLogout = (e: Event) =>
  auth
    .currentUser()!
    .logout()
    .then(() => updateUI())
    .catch((error: Error) => onLogoutError(error));

const onSubmit = (e: Event) => {
  e.preventDefault();
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const isSignup = (document.getElementById("isSignup") as HTMLInputElement)
    .checked;
  const full_name = (document.getElementById("name") as HTMLInputElement).value;

  const login = () =>
    auth.login(email, password, true).then(onLogin).catch(onLoginError);
  const signup = () =>
    auth
      .signup(email, password, { full_name })
      .then(onSignup)
      .then(login)
      .catch(onSignupError);

  if (isSignup) signup();
  else login();
};

const onRecovery = () => {
  const email = (document.getElementById("email") as HTMLInputElement).value;
  if (email === "") displayError("Please enter an email to recover");
  else {
    auth
      .requestPasswordRecovery(email)
      .then(() => displayMessage("Recovery email sent"))
      .catch((error: Error) => displayError(error.message));
  }
};
const updateUI = () => {
  const loginForm = document.getElementById("login-form") as HTMLFormElement;
  const recoveryButton = document.getElementById(
    "recovery-btn"
  ) as HTMLButtonElement;
  const logoutButton = document.getElementById(
    "logout-btn"
  ) as HTMLButtonElement;

  document.getElementById("message-display")!.innerText = "";
  document.getElementById("message-display")!.classList.remove("error");

  if (auth.currentUser() === null) {
    loginForm.classList.remove("is-hidden");
    logoutButton.classList.add("is-hidden");

    const checkbox = document.getElementById("isSignup")! as HTMLInputElement;
    const buttonText = checkbox.checked ? "Sign up" : "Log in";
    document.getElementById("submit-btn")!.innerText = buttonText;

    if (checkbox.checked) {
      document.querySelector("input#name")!.removeAttribute("disabled");
    } else {
      document
        .querySelector("input#name")!
        .setAttribute("disabled", "disabled");
    }
  } else {
    loginForm.classList.add("is-hidden");
    logoutButton.classList.remove("is-hidden");
  }
};

document.getElementById("submit-btn")!.addEventListener("click", onSubmit);
document.getElementById("logout-btn")!.addEventListener("click", onLogout);
document.getElementById("recovery-btn")!.addEventListener("click", onRecovery);
document.getElementById("isSignup")!.addEventListener("change", updateUI);
updateUI();

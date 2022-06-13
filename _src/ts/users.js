import GoTrue from "gotrue-js";
var USER_API_URL = "https://www.rendall.tv/.netlify/identity";
var auth = new GoTrue({
    APIUrl: USER_API_URL,
    audience: "",
    setCookie: false,
});
var displayError = function (errorMessage) {
    var messageDisplay = document.getElementById("message-display");
    var errMessage = errorMessage.startsWith("invalid_grant:")
        ? errorMessage.slice(14)
        : errorMessage;
    messageDisplay.innerText = errMessage;
    messageDisplay.classList.add("error");
};
var displayMessage = function (message) {
    var messageDisplay = document.getElementById("message-display");
    messageDisplay.innerText = message;
    messageDisplay.classList.remove("error");
};
var onSignup = function () {
    updateUI();
};
var onSignupError = function (error) { return displayError(error.message); };
var onLogin = function () {
    updateUI();
};
var onLoginError = function (error) { return displayError(error.message); };
var onLogoutError = function (error) { return displayError(error.message); };
var onLogout = function (e) {
    return auth
        .currentUser()
        .logout()
        .then(function () { return updateUI(); })
        .catch(function (error) { return onLogoutError(error); });
};
var onSubmit = function (e) {
    e.preventDefault();
    var password = document.getElementById("password")
        .value;
    var email = document.getElementById("email").value;
    var isSignup = document.getElementById("isSignup")
        .checked;
    var full_name = document.getElementById("name").value;
    var login = function () {
        return auth.login(email, password, true).then(onLogin).catch(onLoginError);
    };
    var signup = function () {
        return auth
            .signup(email, password, { full_name: full_name })
            .then(onSignup)
            .then(login)
            .catch(onSignupError);
    };
    if (isSignup)
        signup();
    else
        login();
};
var onRecovery = function () {
    var email = document.getElementById("email").value;
    if (email === "")
        displayError("Please enter an email to recover");
    else {
        auth
            .requestPasswordRecovery(email)
            .then(function () { return displayMessage("Recovery email sent"); })
            .catch(function (error) { return displayError(error.message); });
    }
};
var updateUI = function () {
    var loginForm = document.getElementById("login-form");
    var recoveryButton = document.getElementById("recovery-btn");
    var logoutButton = document.getElementById("logout-btn");
    document.getElementById("message-display").innerText = "";
    document.getElementById("message-display").classList.remove("error");
    if (auth.currentUser() === null) {
        loginForm.classList.remove("is-hidden");
        logoutButton.classList.add("is-hidden");
        var checkbox = document.getElementById("isSignup");
        var buttonText = checkbox.checked ? "Sign up" : "Log in";
        document.getElementById("submit-btn").innerText = buttonText;
        if (checkbox.checked) {
            document.querySelector("input#name").removeAttribute("disabled");
        }
        else {
            document
                .querySelector("input#name")
                .setAttribute("disabled", "disabled");
        }
    }
    else {
        loginForm.classList.add("is-hidden");
        logoutButton.classList.remove("is-hidden");
    }
};
document.getElementById("submit-btn").addEventListener("click", onSubmit);
document.getElementById("logout-btn").addEventListener("click", onLogout);
document.getElementById("recovery-btn").addEventListener("click", onRecovery);
document.getElementById("isSignup").addEventListener("change", updateUI);
updateUI();

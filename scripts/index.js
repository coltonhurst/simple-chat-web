import * as apiHandler from "./api-handler.js";

/* Ensure fresh form on start. */
clearUsername();
clearRegisterError();
giveUsernameFocus();

/* Set up the event listeners. */
document.getElementById("registerButton").addEventListener("click", register);
document.getElementById("username").addEventListener("onchange", clearRegisterError); // NOT WORKING?
document.getElementById("username").onkeydown = function (e) {
    const ENTER_KEY = "Enter";
    if (e.key === ENTER_KEY) {
        register();
    }
};

/*
    Register the username if it's valid and not taken.
*/
function register() {
    const username = document.getElementById("username").value.trim();

    if (isValidUsername(username)) {
        const response = apiHandler.registerUsername(username);

        if (response.errorText == null) {
            // The username is valid and we have registered it with the database
            // Save the username and key from the api and move to the chat window
            localStorage.setItem("username", response.username);
            localStorage.setItem("userGuid", response.userGuid);

            document.location.href = "./chat.html";
        } else {
            showRegisterError(response.errorText);
        }
    } else {
        if (username == "")
            showRegisterError("Please enter a username!");
        else if (username.length < 3)
            showRegisterError("Username must be at least 3 characters in length.");
        else if (username.length > 20)
            showRegisterError("Username must be less than 20 characters in length.");
        else
            showRegisterError("Please only use letters and numbers in the username.");
    }
}

/*
    Only letters and numbers are valid for a username.
    A username must be between 3 - 20 characters in length,
    inclusive.
*/
function isValidUsername(username) {
    const regex = new RegExp(/^[A-Za-z0-9]{3,20}$/);
    return regex.test(username) && username.length;
}

/*
    Show an error with the registration.
*/
function showRegisterError(errorText) {
    document.getElementById("error-text").innerHTML = errorText;
}

/*
    Clear any registration errors.
*/
function clearRegisterError() {
    document.getElementById("error-text").innerHTML = "";
}

/*
    Clear the username field.
*/
function clearUsername() {
    document.getElementById("username").value = "";
}

/*
    Give the username the focus.
*/
function giveUsernameFocus() {
    document.getElementById("username").focus();
}

import * as apiHandler from "./api-handler.js";

// set the "chatting as" username
document.getElementById("chatting-as").innerHTML = localStorage.getItem("username");

/* Set up the event listeners. */
document.getElementById("submit").addEventListener("click", sendMessage);
document.getElementById("message-input").onkeydown = function (e) {
    const ENTER_KEY = "Enter";
    if (e.key === ENTER_KEY) {
        sendMessage();
    }
};

/*
    Send a message to the chat.
*/
function sendMessage() {
    const message = document.getElementById("message-input").value;

    // If there is a message to send, send it!
    if ((message != null) && (message.trim() != "")) {

        const username = localStorage.getItem("username");
        const userGuid = localStorage.getItem("userGuid");

        apiHandler.sendMessage(username, userGuid, message);
        appendMessageToChatbox(message, username, 1);

        // Clear the message input box
        document.getElementById("message-input").value = "";
    }
}

/*
    Append a given message to the chatbox.

    message (string) -> the contents of the message
    isFromUser (bool) -> if the message is from the current user

    We change the color of the username tag in the chat based
    on who the message is from (using the isFromUser tag).
*/
function appendMessageToChatbox(message, messageAuthor, isFromUser) {
    
    // Prep the elements we will add
    let chatbox = document.getElementById("chatbox");
    let messageDiv = document.createElement("div");
    let usernameTag = document.createElement("span");
    let messageSpan = document.createElement("span");
    messageDiv.className = "message";
    usernameTag.innerHTML = messageAuthor + ": ";
    messageSpan.innerHTML = message;

    // If it's from this user, make the message blue. If not, green.
    if (isFromUser) {
        usernameTag.className = "current-username-tag";
    } else {
        usernameTag.className = "other-username-tag";
    }

    // Add the elements to the page
    messageDiv.appendChild(usernameTag);
    messageDiv.appendChild(messageSpan);
    chatbox.appendChild(messageDiv);
}

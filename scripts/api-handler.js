/*
    This function attempts to "register" a username for the chat.
    The function will return an object in this form:
    {
        "username": string,
        "userKey": guid,
        "errorText": string
    }
    If it is successful, username and userkey will be set, and errorText
    will be null. If the registration is unsuccessful, errorText will be set,
    and username and userKey will be null.
*/
function registerUsername(username) {
    console.log("registering the user: " + username);

    // TODO: register via the api here

    const chatUser = {
        "username": username,
        "userGuid": "9ca6660d-4ee5-4e35-b921-79ce45c85d42",
        "errorText": null
    };

    return chatUser;
};

/*
    This function sends a message to the chat api.
*/
function sendMessage(username, userGuid, message) {
    console.log("sending the message from: " + username);

    // TODO: send the message to the API here
}

export { registerUsername, sendMessage };
window.addEventListener("load", () => {
    //fetch messages every 2 second, polling
   setInterval(() => {
    refreshMsgs();
   }, 2000);

    let chatForm = document.getElementById("chat-form");
    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let chatName = document.getElementById("chat-name").value;
        let chatMsg = document.getElementById("chat-msg").value;
        console.log("chat sent!", chatName, chatMsg);

        let msgObj = {
            "name": chatName,
            "msg": chatMsg,
        };

        let msgObjJSON = JSON.stringify(msgObj);
        console.log(msgObjJSON);
        fetch("/message",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: msgObjJSON
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
           
        })
    })
}) 

function refreshMsgs(){
    //clear out the HTML div that contains the messages
    //add all the new messages that we have
    fetch("/messages")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.getElementById("chat-msgs").innerHTML = "";
        let allChats = data.msgs;
        allChats.forEach((chat) => {
            let chatContainer = document.createElement("li");
            let nameElt = document.createElement("p");
            let chatElt = document.createElement("p");
            nameElt.innerHTML = chat.name;
            chatElt.innerHTML = chat.msg;

            //append all teh elements as per their hieracy
            chatContainer.appendChild(nameElt);
            chatContainer.appendChild(chatElt);
            document.getElementById("chat-msgs").appendChild(chatContainer);
        })
        
    })
}

/*what happens on form submission?
1. get the value of waht the user typed
2. store the message on server
3. display the chat message on screen
*/
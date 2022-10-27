//initialising express app
let express = require("express");
let app = express();

app.use("/", express.static("public"));

//create an http server on express app
let http = require("http");
let server = http.createServer(app);
server.listen(5000, ()=> {
    console.log("listen on port 5000");
})

//add scoekts on top of the http server
let io = require("socket.io");
io = new io.Server(server);

io.sockets.on("connect", (socket)=> { //listening for connection
    console.log("New connection: ", socket.id);

    //when server gets data from client
    socket.on("mouseData", (data) =>{
        console.log(data);
        io.sockets.emit("serverData", data);
    })
    //for when c dc
    socket.on("disconnect", () => {
        console.log("Socket disconnected: ", socket.id);
    })
})



/*infomration flow

Basic connection setup
client(C) - initiate connection to S, and then ack. when C connects 
server(S) - recognize client connection and then ack. when c connets
S- also tell when C disconnects
C- ack.when connection has been established


On to the whiteboard
C - .emit mx, my("mouseData") to server
S  -  .on getting "mouseData", .emits to all C "serverData"
C - .on getting "serverData", draw ellipse
*/
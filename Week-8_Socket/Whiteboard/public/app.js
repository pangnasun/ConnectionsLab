let socket = io();
socket.on("connect", () => {
    console.log("Connection established to server via sockets");
})

socket.on("serverData", (data) => {
    
    drawPainting(data);
})


function setup() {
    createCanvas(400,400);
   let  r = random(255); // r is a random number between 0 - 255
   let  g = random(100,200); // g is a random number betwen 100 - 200
   let  b = random(100); // b is a random number between 0 - 100
   let  a = random(200,255); // a is a random number between 200 - 255
    background("#7332ef");
    stroke(r,g,b,a);
    //noStroke();
}

function mouseDragged(){
   // ellipse(mouseX, mouseY, 10);
    let mouseObj = {
        x : mouseX,
        y : mouseY,
        px : pmouseX,
        py : pmouseY
    }

    socket.emit("mouseData", mouseObj);
}

function drawPainting(data){
    line(data.x, data.y,data.px, data.py);
}
let express = require('express');
let app = express();
let PORT = 3000;


const fs = require('fs');
let info;
fs.readFile('./people.json', 'utf8', (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
   // console.log(JSON.parse(data));
   console.log(data);
   info = data;

})

let midterms = {
    "cso": {
        "name": "Computer Systems Organization",
        "date": "12-Oct-22"
    },
    "cn": {
        "name": "Computer Networks",
        "date": "12-Oct-22"
    },
    "geb": {
        "name": "global economic politics",
        "date": "12-Oct-22"
    }
}

// app.get('/', (request, response) => {
//     response.send("Home Page");
// });
app.use('/', express.static("public"));

app.get('/next', (request, response) => {
    //response.send("Next Midterm");
    response.json(JSON.parse(info).Abc);
});

app.get('/midterm', (request, response) => {
    //response.send(midterms);
    console.log(request.query.course);
    let courseName = request.query.course;
    // response.json(midterms); //send in json format
    if(midterms[courseName]){
        response.json(midterms[courseName]); 
    }else{
        console.log("error");
    }
});

app.listen(PORT, () => {
    console.log("app is listening at localhost:" + PORT);
});
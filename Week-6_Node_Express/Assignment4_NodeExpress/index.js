let express = require('express');
let app = express();
let PORT = 3000;

//read data from json file
const fs = require('fs');
let info;
fs.readFile('./forest_area.json', 'utf8', (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    info = JSON.parse(data);
})

app.use('/', express.static("public"));

//accessing and providing requested data
app.get('/countries/:countryEntity', (request, response) => {
    let currCountry = request.params.countryEntity;
    let minYear = request.query.minYear;
    let maxYear = request.query.maxYear;
    let index = info.findIndex(country => country.Entity == currCountry);
    let arr =[];
    
    //console.log(info[index].Entity);
    while (index != -1 && info[index].Entity == currCountry) {
        //console.log(info[index].Year);
        if(info[index].Year >= minYear && info[index].Year <= maxYear) arr.push(info[index]);
        index++;
    }
    response.json(arr);
    
});

app.listen(PORT, () => {
    console.log("app is listening at localhost:" + PORT);
});
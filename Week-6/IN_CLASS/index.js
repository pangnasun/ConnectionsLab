let express = require(‘express’);
let app = express();
app.get('/', (request, response) => {
    response.send("Hello");
});

app.listen(3000, () => {
    console.log("app is listening at localhost:3000");
});
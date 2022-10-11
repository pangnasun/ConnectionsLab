let express = require('express');
let app = express();
let PORT = 3000;


app.use('/', express.static("public"));



app.listen(PORT, () => {
    console.log("app is listening at localhost:" + PORT);
});
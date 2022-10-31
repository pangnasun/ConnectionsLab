let express = require("express");
let app = express();

let Datastore = require("nedb");
let db = new Datastore({filename: "chats.db", timestampData:true});
db.loadDatabase();

app.use(express.json());


app.use('/', express.static('public'));

let msgs = [];
app.post('/message', (req,res) =>{
    // console.log(req);
   // msgs.push(req.body);
    db.insert(req.body, (err, newDoc) => {
        if(err){
            res.send({"task": "failed"})
        }else{
            res.send({"task": "successful"});
        }
    })
   console.log(msgs);
    
})

// app.get('/messages', (req,res) => {
//     // res.json({
//     //    "msgs": msgs
//     // })
//     db.find({}, (err, docs) => {
//         if(err){
//             res.send({"task": "failed"})
//         }else{
//             console.log(docs);
//             res.send({"msgs": docs});
//         }
//     })
// })

app.get('/messages', (req, res) => {
    db.find({}).sort({ updateAt: 1 }).exec(function (err, docs) {
        if (err) {
            res.json({ task: "task failed" })
        } else {
            let obj = { msgs: docs };
            res.json(obj);
        }
    });

})

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening at ', port);
});



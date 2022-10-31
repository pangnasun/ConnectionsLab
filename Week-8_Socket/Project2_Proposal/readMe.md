# Project 2 Proposal: Let's Cook!

### Concept
Like the name suggests, *Let's Cook!* is a multiplayer-capable online game that allows people to cook together, compete and have fun. Players are provided with various ingredients and cooking utensils to cook their dreaed foods. The game has two modes: chill and time-based. The chill mode allows players to cook food at their own pace without any time restriction. This mode is best for people who wants to relax and test out different combinations of ingredients. On the other hand, the time-based mode is very competitive because players are under a timer. The objective is to cook as many different foods as possible under the given time. The team with the highest number will claim the leaderboard. 

### Planning
Below are the sketches of what the webpage will look like. The main components are the *P5js* interface and the chatbox. The *P5js* interface is where the game interactions happen. The chatbox is a feature that will let users to communicate with each other during the cooking session. Besides sending texts, they will be able to voice chat as well. Thus, *socket.io* will be implemented to transfer in-game and chat data between users. *NeDb* will also be used to store users' data. 

![wireframe1](images/p2_wireframe1.png)

![p5js](images/p2_p5js.png)

### Journey
#### 1. Testing audio chat
I am working with *Peerjs* to try to create real time communication on my webpage. 

*index.js* 
```
var express = require('express');
var router = express.Router();

var config = require('./config');
var Call = require('./call');

// Create a new Call instance, and redirect
router.get('/new', function(req, res) {
  var call = Call.create();
  res.redirect('/' + call.id);
});

// Add PeerJS ID to Call instance when someone opens the page
router.post('/:id/addpeer/:peerid', function(req, res) {
  var call = Call.get(req.param('id'));
  if (!call) return res.status(404).send('Call not found');
  call.addPeer(req.param('peerid'));
  res.json(call.toJSON());
});

// Remove PeerJS ID when someone leaves the page
router.post('/:id/removepeer/:peerid', function(req, res) {
  var call = Call.get(req.param('id'));
  if (!call) return res.status(404).send('Call not found');
  call.removePeer(req.param('peerid'));
  res.json(call.toJSON());
});

// Return JSON representation of a Call
router.get('/:id.json', function(req, res) {
  var call = Call.get(req.param('id'));
  if (!call) return res.status(404).send('Call not found');
  res.json(call.toJSON());
});

// Render call page
router.get('/:id', function(req, res) {
  var call = Call.get(req.param('id'));
  if (!call) return res.redirect('/new');

  res.render('call', {
    apiKey: config.peerjs.key,
    call: call.toJSON()
  });
});

// Landing page
router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
```


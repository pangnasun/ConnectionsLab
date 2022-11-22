# Assignment 5: Working with p5.play

I wanted to build a webpage with p5.play because this library holds so much potential when it comes to creating 2D games. I started this process by exploring various existing [examples](https://p5play.org/demos/). After learning from these examples, I tried to create my own project with p5.play.

### Process
#### 1. Embedding p5.play in HTML
Testing the demos on the official p5.play was not as tedious as testing them with VS Cod because I needed to embed the library in HTML. My first attemp was not successful because I used V2 version of p5.play:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/addons/p5.sound.min.js"></script>
<script src="https://p5play.org/v2/p5.play.js"></script>
```
I changed to p5.play V3 to successfully embed this library:
```html
<script src="https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@latest/lib/addons/p5.sound.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/planck@latest/dist/planck.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5.play@3/p5.play.js"></script>
```
#### 2. Create animations with sprite
I learned to upload multiple sprite images to create numerous, unique animations. For instance, I upload a set of sprite images for when my character is remaining idle, another set for walking, another set for running, etc. I found the *addAni* function very useful because I only needed to upload the first frame of the animation and specified the number of frames to be included. This function then included all the frames I needed. However, in order for this to week, I needed to name the frames appropriately, like frame001, frame002, frame003, etc.
```javascript
function preload() {
    //upload sprites
    dino = new Sprite(400, 400);
    dino.addAni( 'idle', 'assets/dino/Idle001.png', 10);
    dino.addAni('walk', 'assets/dino/Walk001.png', 10);
    dino.addAni('run', 'assets/dino/RUn001.png', 8);
    dino.addAni('jump', 'assets/dino/Jump001.png', 12);
    dino.ani = 'idle';
}
```

#### 3. Controlling the animations
After I successfully uploaded the required, I used keyboard inputs to control when certain animations should happen. When I was implementing this, I thought of it as a 2D game. For instance, the character should remain idle when players are away from the keyboard. WASD shold be the keyboard keys for control the character movement, SPACE for jump, and SHIFT for running. Thus, I added these controls to this assignment. 
```javascript
 //keys control actions
    if (kb.presses('a')) {
        dino.ani = 'walk';
        dino.mirror.x = true;
    } else if (kb.presses('d')) {
        dino.ani = 'walk';
        dino.mirror.x = false;
    }else if(kb.presses(' ')){
        dino.ani = 'jump';
    }else if(kb.presses('shift')){
        dino.ani = 'run';
    }

    if (kb.pressing('a')) {
        dino.vel.x = -2;
    } else if (kb.pressing('d')) {
        dino.vel.x = 2;
    } 
    else {
        dino.vel.x = 0;
    }

    if (abs(dino.vel.x) < 0.1) dino.ani = 'idle';;
```

I added the ```javascript mirror.x``` function later to turn my character's direction.


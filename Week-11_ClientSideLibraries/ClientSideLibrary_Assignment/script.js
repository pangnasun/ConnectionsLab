console.log("here");

let instructions = 'Press \'a\' and \'d\' to move right and left. Hold these keys with SPACE to jump and SHIFT to run.';
let dino;

function preload() {
    //upload sprites
    dino = new Sprite(400, 400);
    dino.addAni( 'idle', 'assets/dino/Idle001.png', 10);
    dino.addAni('walk', 'assets/dino/Walk001.png', 10);
    dino.addAni('run', 'assets/dino/RUn001.png', 8);
    dino.addAni('jump', 'assets/dino/Jump001.png', 12);
    dino.ani = 'idle';
    // dino.ani.looping = false;
}

function setup() {
    new Canvas(innerWidth,innerHeight );
    
}

function draw() {
    background(255);

    //instruction
    fill(0);
    text(instructions, 24, 24);

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

}
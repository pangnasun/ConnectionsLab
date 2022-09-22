let astros;
let dataIsReady = false;
window.addEventListener('load',()=>{
    console.log('loaded');
    //callback: active listening for them to let u know the order is ready //chaining event 
   
    //promises: token that promises your order is ready, kick off the process and have token to let u know ur order is ready or not
    //chaining callback is nightmare
    //callback doesnt have a catch
    //promise has success and failure builtin
    //hanle asynchronous events

     //acces json
    fetch('people.json') //access json, url can be from online
    fetch('http://api.open-notify.org/astros.json')
    // .then(function(response){ //access response and pass on promise
    //     return response.json();
    // })
    .then(response => response.json())
    .then(data=>{ //access data if the promise is fulfilled
        console.log(data);
       // debugger;//code to pause to debug
        //object.keys(data.)
       // let fitstEle = data.Abc;
        console.log(data);
        astros = data.people;
        dataIsReady = true;
        
    })
    .catch(function(e){  //if pomised is rejected
        console.log('error',e);
    })
    .finally(function(){   /// run even if fulfilled or rejected
        console.log('runned either way');
    })
})


// function add(){
//     let a = 1;
//     let b = 24353;
//     console.log(a+b);
// }

// add() => {
//     let a = 1;
//     let b = 24353;
//     console.log(a+b);
// }

// () => {
//     return 10;
// }

// () =>10


// thus, 
// responose =>  response.json();

function setup()
{
    createCanvas(window.innerWidth, window.innerHeight);
    background(230,124,34);
}

function draw()
{
    
    fill(32, 200, 64);
    if(dataIsReady){
        for(let i = 0;  i <astros.length; i++)
        {
            ellipse(random(width/2), random(height/2), 50, 50);
        }
        dataIsReady = false;
    }
   
}
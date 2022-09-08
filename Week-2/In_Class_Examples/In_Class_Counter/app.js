// let text = "hello world "; //add event listener
// console.log(text);  //browser console
// window.addEventListener("load",pageLoaded);
// window.addEventListener("load", function(){
//     pageLoaded();

// });
let count = 0;


window.addEventListener('load', () => {
    pageLoaded();
    let counterResult = document.getElementById('counter-result');
    counterResult.innerHTML = count;
    let addButton = document.getElementById('counter-button-add');
    addButton.addEventListener('click', ()=>{       
        count++;
        counterResult.innerHTML = count;
        console.log(count);
    });
});

function pageLoaded(){
    console.log('page loaded');
}
window.addEventListener('load', ()=>{
    // let inputTitle = document.getElementById('input-title');
    // let notesTitle = document.getElementById('notes-title');
    // inputTitle.addEventListener('input',(e)=>{
    //     //save title of notes
    //     console.log(e.target.value);
       
    //     notesTitle.innerHTML = e.target.value;
    //     //inputTitle.value = '';
    // })

    // let inputPage = document.getElementById('input-page');
    // inputPage.addEventListener('input',(e)=>{
    //     //save title of notes
    //     if(isNaN(e.target.value))
    //     {
    //         console.log('not number;')
    //     }
    //     //console.log(e.target.value);
    //     //let listid = e.target.value.replace(/\s/g,'');
    //     //inputPage.value = '';
    // })
    let inputTitle = document.getElementById('input-title');
    let notesTitle = document.getElementById('notes-title');
    let inputPage = document.getElementById('input-page');
    let notesPage = document.getElementById('notes-page');
    let startButton = document.getElementById('start-button');
    startButton.addEventListener('click',()=>{
        console.log(document.getElementById('input-title').value);
        
        if(inputPage.value.length == 0)
         {
            console.log('empty page');
            alert('Please enter page number');
            return;
        }
        notesPage.innerHTML = 'Current page number: ' + inputPage.value;
        notesTitle.innerHTML = inputTitle.value;
    })

    let inputNotes = document.getElementById('input-note');
    inputNotes.addEventListener('change',()=>{

    })

    let textarea = document.getElementById("notes-area");
    textarea.addEventListener("keydown", function (e) {
    if (e.key == 'Enter') { // keyCode 13 corresponds to the Enter key
        e.preventDefault(); // prevents inserting linebreak
        textarea.value = '';
    }
    });
})
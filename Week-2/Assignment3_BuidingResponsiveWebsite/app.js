let data = [];
window.addEventListener('load', ()=>{
   
    
    let container_div = document.getElementById('container');
    let container2_div =  document.getElementById('container2');
    let lineWrap_div = document.createElement('div');
    lineWrap_div.classList.add('line-wrap');
    let inputTitle = document.getElementById('input-title');
    let notesTitle = document.createElement('p');  
    let inputPage = document.getElementById('input-page');
   // let notesPage = document.getElementById('notes-page');
    let startButton = document.getElementById('start-button');
    let saveTitle = document.getElementById('save-title');
    //new inputs
    let inputNotes = document.createElement('input');
    let updatePage = document.createElement('input');
    let inst_div = document.createElement('div');
    let emp_div = document.createElement('div');

    //new button
    let doneButton = document.createElement('button');
    startButton.addEventListener('click',()=>{
        console.log(document.getElementById('input-title').value);
        
        if(inputPage.value.length == 0)
         {
            console.log('empty page');
            alert('Please enter page number');
            return;
        }

        //remoe input for title page
        inputTitle.parentElement.remove();
        inputPage.parentElement.remove();
        startButton.parentElement.remove();

        //add title        

        notesTitle.classList.add('notes-title');
        lineWrap_div.appendChild(notesTitle);
        container_div.appendChild(lineWrap_div);
        notesTitle.innerHTML = inputTitle.value + '              p. ' + inputPage.value;
        saveTitle.innerHTML = inputTitle.value;

        
        emp_div.classList.add('line-wrap');
        let empLine = document.createElement('p');       
        empLine.classList.add('notes-title');
        emp_div.appendChild(empLine);
        container_div.appendChild(emp_div);

        //add new input 
        inputNotes.classList.add('notes-line');
        inputNotes.type = 'text';
        inputNotes.placeholder = 'Enter your notes';
        let lineWrap_div1 = document.createElement('div');
        lineWrap_div1.classList.add('line-wrap');
        lineWrap_div1.appendChild(inputNotes);
        container_div.appendChild(lineWrap_div1);

        updatePage.classList.add('page-line');
        updatePage.type = 'number';
        updatePage.placeholder = 'Update page number';
        let lineWrap_div2 = document.createElement('div');
        lineWrap_div2.classList.add('line-wrap');
        lineWrap_div2.appendChild(updatePage);
        container_div.appendChild(lineWrap_div2);

        
        inst_div.classList.add('line-wrap');
        let instLine = document.createElement('p');       
        instLine.classList.add('notes-title');
        instLine.innerHTML = 'Press Enter after each entry to save';
        instLine.style.fontSize = 'small';
        inst_div.appendChild(instLine);
        container_div.appendChild(inst_div);

        let btn_div = document.createElement('div');
        btn_div.classList.add('m-line-wrap');
        
        doneButton.classList.add('start-button');
        doneButton.innerHTML = 'Done';
        btn_div.appendChild(doneButton);
        container_div.appendChild(btn_div);
        

        
    })

    let listTitles = document.getElementById('list');
    inputNotes.addEventListener('keydown',(e)=>{
        if(e.key == 'Enter')
        {
            console.log('enter');
            let save_ul = document.createElement('ul');
            save_ul.classList.add('line-wrap');
            save_ul.style.listStyle = 'none';
            let saveLine = document.createElement('li');
            saveLine.classList.add('notes-title');
            saveLine.innerHTML = ' p. ' + inputPage.value + inputNotes.value  ;
            save_ul.appendChild(saveLine);
            listTitles.appendChild(save_ul);
            inputNotes.value = '';
        }
       

    })

    updatePage.addEventListener('keydown', (e)=>{
        if(e.code=='Enter')
        {
            notesTitle.innerHTML = inputTitle.value + ' p. ' + updatePage.value;
            inputPage.value = updatePage.value;
            updatePage.value='';

            if(inputNotes.value.length != 0){
                let save_ul = document.createElement('ul');
                save_ul.classList.add('line-wrap');
                save_ul.style.listStyle = 'none';
                let saveLine = document.createElement('li');
                saveLine.classList.add('notes-title');
                saveLine.innerHTML = ' p. ' + inputPage.value + inputNotes.value;
                save_ul.appendChild(saveLine);
                listTitles.appendChild(save_ul);
                inputNotes.value = '';
            }
        }
        
    })

    
    doneButton.addEventListener('click', (e)=>{
        
        notesTitle.parentElement.remove();
        doneButton.parentElement.remove();  
        inputNotes.parentElement.remove();
        updatePage.parentElement.remove();
        inst_div.remove();
        //emp_div.remove();
    })

    let lamp1 = document.getElementById('lamp1');
    let lamp1_0 = document.getElementById('lamp1-0');
    let lamp1_1 = document.getElementById('lamp1-1');
    let lamp2 = document.getElementById('lamp2');
    let lamp2_0 = document.getElementById('lamp2-0');
    let lamp2_1 = document.getElementById('lamp2-1');
    document.addEventListener('scroll',(e)=>{
        if(lamp1_0.style.display == 'none'){
            lamp1_0.style.display = 'inline';
            lamp1_1.style.display = 'none';
            lamp1.style.display = 'none';
            lamp2_0.style.display = 'inline';
            lamp2_1.style.display = 'none';
            lamp2.style.display = 'none';
        }
        else if(lamp1_1.style.display == 'none')
        {
            lamp1_0.style.display = 'none';
            lamp1_1.style.display = 'inline';
            lamp1.style.display = 'none';
            lamp2_0.style.display = 'none';
            lamp2_1.style.display = 'inline';
            lamp2.style.display = 'none';
        }
        else
        {
            lamp1_0.style.display = 'none';
            lamp1_1.style.display = 'none';
            lamp1.style.display = 'inline';
            lamp2_0.style.display = 'none';
            lamp2_1.style.display = 'none';
            lamp2.style.display = 'inline';
        }
    })

    
})
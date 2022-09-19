window.addEventListener('load', ()=>{

    let listInfo = document.getElementById('list-info');
    listInfo.style.display = 'none';
    //acessing data
    fetch('forest_area.json')    
    .then(response => response.json())
    .then(data => { 
        //console.log(data); 
        let areaArr = data;      
        // console.log(areaArr.findIndex(ele => ele.Code == 'BEL'));

        let inputCountry = document.getElementById('input-country');
        let searchButton = document.getElementById('search-button');
        inputCountry.addEventListener('keydown',(e) =>{
            //console.log('input');
            if(e.key == 'Enter')
            {
                searchCountry(areaArr, inputCountry.value,listInfo);
                inputCountry.value = '';
            }
           
        }) 

        searchButton.addEventListener('click', ()=>{
            searchCountry(areaArr, inputCountry.value,listInfo);
            inputCountry.value = '';
        })

        

    })
    .catch(function (e) {  //if pomised is rejected
        console.log('error', e);
    })

    
    
})

function searchCountry(arr, inCountry, listInfo) {

    let properCaseName = toTitleCase(inCountry);
    let index = arr.findIndex(country => country.Entity == properCaseName);
    //console.log(arr[startIndex]);
    // console.log(arr);
    listInfo.innerHTML = '';
    listInfo.style.display = 'inline';
    if(index == -1) {
        let lis = document.createElement('p');
        lis.innerHTML = inCountry + ' is not a valid country. Pls try again.';
        listInfo.appendChild(lis);
        return;
    }
    
    
    while (arr[index].Entity == properCaseName) {
        //console.log(arr[index]);
        let lis = document.createElement('li');
        lis.innerHTML = arr[index].Year + ': ' + arr[index]['Forest area'] + ' hectares';
        listInfo.appendChild(lis);
        index++;
    }
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
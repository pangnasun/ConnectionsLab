window.addEventListener('load', ()=>{

    let listInfo = document.getElementById('list-info');
    listInfo.style.display = 'none';
         
    let inputCountry = document.getElementById('input-country');
    let inputYearMin = document.getElementById('input-year-min');
    let inputYearMax = document.getElementById('input-year-max');
    let searchButton = document.getElementById('search-button');
    inputCountry.addEventListener('keydown',(e) =>{
        //console.log('input');
        if(e.key == 'Enter')
        {
            //DisplayInfo(areaArr, inputCountry.value,listInfo);
            e.preventDefault();
            FetchData(inputCountry.value,inputYearMin.value,inputYearMax.value,listInfo);
            //inputCountry.value = '';
            
        }    
    }) 

    searchButton.addEventListener('click', () => {
        //DisplayInfo(data, countryEntity, listInfo);
        FetchData(inputCountry.value, inputYearMin.value, inputYearMax.value, listInfo);
        //inputCountry.value = '';
    })
    
    
})

//fetch data from server api
function FetchData(inCountry, inputYearMin, inputYearMax, listInfo){
    let countryEntity = toTitleCase(inCountry);
    // let url = "/country?countryEntity=" + countryEntity;
    let url = "/countries/" + countryEntity + "?minYear=" + inputYearMin + "&maxYear=" + inputYearMax;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            DisplayInfo(data, countryEntity, listInfo, inputYearMin, inputYearMax);
        })
    
}

//diplay info on html
function DisplayInfo(arr, inCountry, listInfo, inputYearMin, inputYearMax)
 {
    
    listInfo.innerHTML = '';
    listInfo.style.display = 'inline';
    let lis = document.createElement('p');
    if(arr.length == 0) {
        lis.innerHTML = "No data for " + inCountry + ' from ' + inputYearMin + '-' + inputYearMax + '. Pls try again.';
        listInfo.appendChild(lis);
        return;
    }
    lis.innerHTML = inCountry  + '\'s Forest Area' ;
    listInfo.appendChild(lis);
    
    for(const e of arr) {
        //console.log(arr[index]);
        let lis = document.createElement('li');
        lis.innerHTML = e.Year + ': ' + e['Forest area'] + ' hectares';
        listInfo.appendChild(lis);
        
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
# Project 1: Prototype

[Preview](https://pangnasun.github.io/ConnectionsLab/Week-3_JSON_Fetch/Project1_Prototype/)

### Concept

My first project will be a webpage that displays the world’s forest area over the last two decades (1990-2020). My aim is to make people aware of deforestation and to encourage them to help reduce deforestation. 

My webpage will use p5js to create an interactive map that users can click on each country and get information about that country’s forest area over the years. Users will also be able to change the years (1990-2020) to see how the world’s forest area changes from one year to another. In term of data, I will use two json datasets: one for the world’s forest area and another for each country’s latitude and longitude. 

### Progress
#### Working with *json* dataset

I started my prototype by working with a *json* dataset of the world's forest area. 

```
    //fetching json file
    fetch('forest_area.json')    
    .then(response => response.json())
    .then(data => { 

        let areaArr = data;      
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
    
    //function to use the data
    function searchCountry(arr, inCountry, listInfo) 
    {
        let properCaseName = toTitleCase(inCountry);
        let index = arr.findIndex(country => country.Entity == properCaseName);
        //console.log(arr[startIndex]);
        // console.log(arr);
        listInfo.innerHTML = '';
        listInfo.style.display = 'inline';
        let lis = document.createElement('p');
        if(index == -1) {
            lis.innerHTML = inCountry + ' is not a valid country. Pls try again.';
            listInfo.appendChild(lis);
            return;
        }
        lis.innerHTML = properCaseName  + '\'s Forest Area' ;
        listInfo.appendChild(lis);

        while (arr[index].Entity == properCaseName) {
            //console.log(arr[index]);
            let lis = document.createElement('li');
            lis.innerHTML = arr[index].Year + ': ' + arr[index]['Forest area'] + ' hectares';
            listInfo.appendChild(lis);
            index++;
        }
    }

```

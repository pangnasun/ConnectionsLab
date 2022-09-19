# Project 1: Prototype

[Preview](https://pangnasun.github.io/ConnectionsLab/Week-3_JSON_Fetch/Project1_Prototype/)

### Concept

My first project will be a webpage that displays the world’s forest area over the last two decades (1990-2020). My aim is to make people aware of deforestation and to encourage them to help reduce deforestation. 

My webpage will use p5js to create an interactive map that users can click on each country and get information about that country’s forest area over the years. Users will also be able to change the years (1990-2020) to see how the world’s forest area changes from one year to another. In term of data, I will use two json datasets: one for the world’s forest area and another for each country’s latitude and longitude. 

### Progress
#### Working with *json* dataset

'''
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

'''


let areaArr;
let readyData = false;
window.addEventListener('load',()=>{
  fetch('https://sheetdb.io/api/v1/yobjwc36o8crm')
  .then(response => response.json())
  .then(data => { 

      areaArr = data;      
      readyData = true;
      // searchCountry(areaArr,'Cambodia');
      

  })
  .catch(function (e) {  //if pomised is rejected
      console.log('error', e);
  })
})

//let size = 0.6;
let countryPolygons = [];
let countries = [];
let erased = false;

function convertPathToPolygons(path, size) {
  let coord_point = [0, 0];
  let polygons = [];
  let currentPolygon = [];

  //For loop para calcular os pontos do vertex
  for (const node of path) {
    if (node[0] == "m") {
      coord_point[0] += node[1] * size;
      coord_point[1] += node[2] * size;
      currentPolygon = [];
    } else if (node[0] == "M") {
      coord_point[0] = node[1] * size;
      coord_point[1] = node[2] * size;
      currentPolygon = [];
    } else if (node == "z") {
      currentPolygon.push([...coord_point]);
      polygons.push(currentPolygon);
    } else {
      currentPolygon.push([...coord_point]);
      coord_point[0] += node[0] * size;
      coord_point[1] += node[1] * size;
    }
  }
  
  return polygons;
}

function detectCollision(polygon, x, y) {
  let c = false;
  // for each edge of the polygon
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    // Compute the slope of the edge
    let slope = (polygon[j][1] - polygon[i][1]) / (polygon[j][0] - polygon[i][0]);
    
    // If the mouse is positioned within the vertical bounds of the edge
    if (((polygon[i][1] > y) != (polygon[j][1] > y)) &&
        // And it is far enough to the right that a horizontal line from the
        // left edge of the screen to the mouse would cross the edge
        (x > (y - polygon[i][1]) / slope + polygon[i][0])) {
      
      // Flip the flag
      c = !c;
    }
  }
  
  return c;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(windowWidth);
  let size;
  if(windowWidth / windowHeight > 2.304){
    size = windowHeight * 0.0010368;
  }else{
    size = windowWidth * 0.00045;
  }
  
  for (let i = 0; i < country.length; i++) {
    countryPolygons.push(convertPathToPolygons(
      country[i].vertexPoint,size
    ));
    countries.push(country[i].name);
  }
  for(let i = 0; i <countries.length; i++){
    console.log(countries[i]);
  }
  
  
}

function draw() {
  background(153,234,255); 
  // if(readyData)searchCountry(areaArr,'Cambodia');
 // textSize(32);
  stroke(255);
  strokeWeight(0.1);
  let collision = false;
  for (let i = 0; i < countryPolygons.length; i++) {
    fill(100);
    if (!collision && mouseIsPressed) {
      collision = countryPolygons[i].some(poly => detectCollision(poly, mouseX, mouseY));
      if (collision) {
        fill('black');
        console.log(countries[i]);
        if(readyData)
        {
          text(searchCountry(areaArr,countries[i]),mouseX,mouseY);
          //text(countries[i],mouseX,mouseY);
          // console.log(countries[i]);
        }
        fill('green');
      }
    }
    
    for (const poly of countryPolygons[i]) {
      beginShape();
      for (const vert of poly) {
        vertex(...vert);
      }
      endShape();
      if(collision) {
        // if(readyData)
        // {
        //   text(searchCountry(areaArr,'Cambodia'),mouseX,mouseY);
        //   //text(countries[i],mouseX,mouseY);
        //   // console.log(countries[i]);
        // }
      }
    }

    
  }
  // clear();
  //erase();
  
  
  
  
}

function windowResized(){
  // clear();
  countryPolygons = [];
  resizeCanvas(windowWidth, windowHeight);
  let size;
  if(windowWidth / windowHeight > 2.304){
    size = windowHeight * 0.0010368;
  }else{
    size = windowWidth * 0.00045;
  }
  for (let i = 0; i < country.length; i++) {
    countryPolygons.push(convertPathToPolygons(
      country[i].vertexPoint,size
    ));
  }
  
}

function searchCountry(arr, inCountry)
 {
    
    let index = arr.findIndex(country => country.Entity == inCountry);
    //console.log(arr[startIndex]);
    // console.log(arr);
    
   
    if(index == -1) {
        return;
    }
    let info = inCountry;
    while (arr[index].Entity == inCountry) {
        //console.log(arr[index]);
        info = info + '\n' + arr[index].Year + ': ' + arr[index]['Forest area'] + ' hectares';
        
        index++;
    }
    //onsole.log(info);
    return info;
}


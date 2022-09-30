let areaArr, prev, next, back, info,countryName,bContainer;
let readyData = false;
let displayMap = true;
let dIndex = 0;
let maxIndex = 10;

window.addEventListener('load',()=>{
  let info = document.getElementById('info');
  let back = document.getElementById('back');
  let next = document.getElementById('next');
  let prev = document.getElementById('prev');
  let bContainer = document.getElementById('buttons-container');
  back.addEventListener('click',()=>{
    displayMap = true;
    okay = true;
    size2 = windowWidth * 0.00045;
    maxSize = false;
    dIndex = 0;
    info.style.display = 'none';
    bContainer.style.display = 'none';
  })

  prev.addEventListener('click', ()=>{
    if(dIndex - 1 >= 0) dIndex--;
  })
  next.addEventListener('click', ()=>{
    if(dIndex + 1 < maxIndex) dIndex++;
    console.log(dIndex);
  })
  //info.innerHTML = "Year: 1990" + '<br>' + "country: Canada <br>" ;
  fetch('https://sheetdb.io/api/v1/xy54jy17vz6i8')
  // fetch('forest_area.json')
  .then(response => response.json())
  .then(data => { 
      areaArr = data;  
      readyData = true;
      

  })
  .catch(function (e) {  //if pomised is rejected
      console.log('error', e);
  })


})

let countryPolygons = [];
let countries = [];
let erased = false;

function convertPathToPolygons(path, size) {  
  
  let coord_point = [0, windowHeight * 0.1];
  let polygons = [];
  let currentPolygon = [];

  //For loop para calcular os pontos do vertex
  for (const node of path) {
    if (node[0] == "m") {
      let xc = windowWidth/2 - node[1];
      let yc = windowHeight/2 - node[2];
      coord_point[0] += (node[1] ) * size ;
      coord_point[1] += (node[2]  ) * size  ;
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


//detect whether a point is in a polygon
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

let size2; // variable to change the size of the map
function setup() {
  createCanvas(windowWidth, windowHeight);
  let size;
  if(windowWidth / windowHeight > 2.304){
    size = windowHeight * 0.0010368;
  }else{
    size = windowWidth * 0.00045;
    // size = windowWidth * 0.00145;
  }
  
  for (let i = 0; i < country.length; i++) {
    countryPolygons.push(convertPathToPolygons(
      country[i].vertexPoint,size
    ));
    countries.push(country[i].name);
  }
  size2 = windowWidth * 0.00045;
  countryName = select('#country-name');
  info = select('#info');
  bContainer = select('#buttons-container');
  
}

let nScale = 1;
let newVertices = [];
let maxSize = false;
let startX, startY;
let currIndex, currCountry;
let okay = true;
let tSize = 0.04;

function draw() {
  background(153,234,255); 

  stroke(255);
  strokeWeight(0.1);

  if(displayMap){ //display all countries
    let collision = false;
    for (let i = 0; i < countryPolygons.length; i++) {
      fill(100);
      if (!collision) {
        collision = countryPolygons[i].some(poly => detectCollision(poly, mouseX, mouseY)); //mouse hover change color
        if (collision) {
          countryName.style('display','block');
          countryName.html(countries[i]);
          fill('green');
          cursor(HAND);
        }else{
          countryName.style('display','none');
          cursor(ARROW);
        }

      }
      
      for (const poly of countryPolygons[i]) { //draw countries polygons
        beginShape();
        for (const vert of poly) {
          vertex(...vert);
        }
        endShape();
      }
      
    }
  }else{  //when a country is selected
    cursor(ARROW);
    countryName.style('display','block');
   

    if(okay){
      size2 += 0.05;
      let newPolygons = convertPathToPolygons(country[currIndex].vertexPoint,size2); 
      let j = 0;
      let cx = 0, cy= 0;
    
      for(const poly of newPolygons){
        for(const vert of poly){
          cx+=vert[0];
          cy+=vert[1];
          j++;
        }
      }
    
      cx = cx/j;
      cy = cy/j;
      let xc = windowWidth/3- cx; 
      let yc = windowHeight/2 - cy; 

    
      for(const poly of newPolygons){
        for(const vert of poly){
          if(vert[0] + xc >= windowWidth * 0.9 || vert[0] + xc <=  windowWidth - windowWidth * 0.9 ){
            console.log('too big');
            okay = false;
            maxSize =true;
            break;
          }
          
          if(vert[1] + yc >= windowHeight * 0.9|| vert[1] + yc <= windowHeight - windowHeight * 0.9 ){
            okay = false;
            maxSize = true;
            break;
          }
        }
        if(!okay)break;
      }
      if (okay) currCountry = newPolygons;

    }
    let j = 0;
    let cx = 0, cy= 0;
    for(const poly of currCountry){
      for(const vert of poly){
        cx+=vert[0];
        cy+=vert[1];
        j++;
      }
    }

    cx = cx/j;
    cy = cy/j;
    let xc = windowWidth/3- cx; 
    let yc = windowHeight/2 - cy; 
    
    let ppoly = [];
    for (const poly of currCountry) {
      beginShape();
      let npoly = [];
      for (const vert of poly) {
        vertex(vert[0] +xc ,vert[1] + yc );
        let coor = [vert[0]+xc, vert[1] + yc];
        npoly.push(coor);
        
      }
      ppoly.push(npoly);
      endShape();
      
    }
    
    newVertices[0]= ppoly;
    if(maxSize){
      info.style('display','block');
      bContainer.style('display','flex');
      let countryData = searchCountry(areaArr,countries[currIndex]);
      info.html('Year: '+ countryData[dIndex][0] + '<br><br><br><br>' + countryData[dIndex][1] + '<br><br> hectares');

      let butPosX = windowWidth * 0.8;
      let butPosY = windowHeight * 0.2;
  
      let xPos =  windowWidth/3;
      let yPos = windowHeight/2;
      while(newVertices[0].some(poly => detectCollision(poly, xPos - img1.width * tSize, yPos))){
        xPos = xPos - img1.width * tSize;
      }
      while(newVertices[0].some(poly => detectCollision(poly, xPos , yPos - img1.height * tSize))){
        yPos = yPos - img1.height * tSize;
      }
      
      startX = xPos;
      startY = yPos;
      let running = 1;
      while(running <= countryData[dIndex][1] / 10000 ){
        if(newVertices[0].some(poly => detectCollision(poly, xPos, yPos))){
          image(img1, xPos - img1.width/2 * tSize  ,yPos - img1.height/1.2 * tSize, img1.width * tSize, img1.height * tSize);
          xPos = xPos + img1.width * tSize;
        }else if(xPos + img1.width * tSize < windowWidth * 0.9 ){
          xPos = xPos + img1.width * tSize;
          
        }else{
          yPos = yPos + img1.height * tSize;
          xPos = startX;
        }
        running++;
      }
      
    }

  }

  //check if country is clicked on
  if(mouseIsPressed){
    let collision = false;
    for (let i = 0; i < countryPolygons.length; i++) {
      fill(100);
      if (!collision && mouseIsPressed) {
        collision = countryPolygons[i].some(poly => detectCollision(poly, mouseX, mouseY));
        if (collision) {
          displayMap  = false;
          currIndex = i;
          currCountry = countryPolygons[currIndex];
        }
      }    
    }
  } 
}

//resize map according to screen size
function windowResized(){
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

//search data based on country name
function searchCountry(arr, inCountry)
 {    
    let index = arr.findIndex(country => country.Entity == inCountry);
    if(index == -1) {
        return;
    }
    let info = inCountry;
    let countryData = [];
    maxIndex = 0;
    while (arr[index] != null && arr[index].Entity == inCountry) {
        info = info + '\n' + arr[index].Year + ': ' + arr[index]['Forest area'] + ' hectares';
        countryData.push([arr[index].Year,arr[index]['Forest area']]);
        index++;
        maxIndex++;
    }
    return countryData;
}

function preload() {
  img1 = loadImage('images/forest_tree.png');
}

let areaArr;
let readyData = false;
window.addEventListener('load',()=>{
  fetch('https://sheetdb.io/api/v1/yobjwc36o8crm')
  .then(response => response.json())
  .then(data => { 

      areaArr = data;  
      // console.log(data);
      readyData = true;
      // console.log(searchCountry(areaArr,'Zimbabwe'));
      

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
      let xc = windowWidth/2 - node[1];
      // console.log(windowWidth/);
      // console.log(xc);
       let yc = windowHeight/2 - node[2];
      coord_point[0] += (node[1] ) * size ;
      // coord_point[0] += 5;
      coord_point[1] += (node[2]  ) * size  ;
      // coord_point[1] += 5;
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

let size2; //= windowWidth * 0.00045;
function setup() {
  createCanvas(windowWidth, windowHeight);
  // console.log(windowWidth);
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
  // for(let i = 0; i <countries.length; i++){
  //   console.log(countries[i]);
  // }
  size2 = windowWidth * 0.00045;
  
}

let nScale = 1;

function draw() {
  // scale(nScale);
  background(153,234,255); 
  // if(readyData)searchCountry(areaArr,'Cambodia');
 // textSize(32);
  stroke(255);
  strokeWeight(0.1);
  let collision = false;

  /// draw canada
  let index = countries.findIndex(country => country == "Belgium");
  // console.log(index);
  
  // translate(window,10);
  // translate(61,61);
  let j = 0;
  // console.log(countryPolygons[index]);
  // translate(windowWidth/2, wind)

  translate(windowWidth/2, windowHeight/2);
  nScale(nScale);
  translate(-windowWidth/2, -windowHeight/2);
  translate();
  let xc = windowWidth/2- countryPolygons[index][0][0][0];
      let yc = windowHeight/2 - countryPolygons[index][0][0][1];
  for (const poly of countryPolygons[index]) {
    // console.log('test',poly[0][0]);
    // console.log('info',poly);
    
      // j++;
    beginShape();
    for (const vert of poly) {
      //console.log(...vert);
      // console.log(vert[0]);
      // vertex(...vert);
      
      // console.log(vert[0] + xc,vert[1] + yc);
      vertex(vert[0] +xc ,vert[1] + yc );
      // text(vert[0],vert[0],vert[1]);
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

  /*
  for (let i = 0; i < countryPolygons.length; i++) {
    fill(100);
    if (!collision && mouseIsPressed) {
      collision = countryPolygons[i].some(poly => detectCollision(poly, mouseX, mouseY));
      if (collision) {
        
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
    collision = false;
    if (!collision && mouseIsPressed) {
      collision = countryPolygons[i].some(poly => detectCollision(poly, mouseX, mouseY));
      if (collision) {
        fill('black');
        // console.log(countries[i]);
        if(readyData)
        {
          text(searchCountry(areaArr,countries[i]),mouseX,mouseY);
          //text(countries[i],mouseX,mouseY);
          // console.log(countries[i]);
        }
        //fill('green');
      }
    }

    
  }
  */
  // clear();
  //erase();
  if(mouseIsPressed){
    // translate(windowWidth/2, windowHeight/2);
    nScale += 0.1;
    let size;
  if(windowWidth / windowHeight > 2.304){
    size = windowHeight * 0.0010368;
  }else{
    // size = windowWidth * 0.00045;
    // size = windowWidth * 0.00145;
    size2 += 0.01;
    console.log(size2);
  }
  // countryPolygons = [];   
  // for (let i = 0; i < country.length; i++) {
  //   countryPolygons.push(convertPathToPolygons(
  //     country[i].vertexPoint,size2
  //   ));
  //   countries.push(country[i].name);
  // }
    //clear();
  }
  
  
  
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
    
  //  console.log(inCountry);
    if(index == -1) {
        return;
    }
    // console.log(arr[index].Entity);
    let info = inCountry;
    while (arr[index] != null && arr[index].Entity == inCountry) {
        //console.log(arr[index]);
        info = info + '\n' + arr[index].Year + ': ' + arr[index]['Forest area'] + ' hectares';
        
        index++;
    }
    //onsole.log(info);
    return info;
}


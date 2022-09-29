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
  // let countryName = document.getElementById('country-name');
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
      // console.log(data);
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
  
  
  let coord_point = [0, windowHeight * 0.1];
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
  //next.mousePressed(displayInfo);
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
  // scale(nScale);
  background(153,234,255); 

 
  // if(readyData)searchCountry(areaArr,'Australia');
 // textSize(32);
  stroke(255);
  strokeWeight(0.1);

  if(displayMap){
    let collision = false;
    for (let i = 0; i < countryPolygons.length; i++) {
      fill(100);
      if (!collision) {
        collision = countryPolygons[i].some(poly => detectCollision(poly, mouseX, mouseY));
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
      
      for (const poly of countryPolygons[i]) {
        beginShape();
        for (const vert of poly) {
          vertex(...vert);
        }
        endShape();
      }
      // if (countryPolygons[i].some(poly => detectCollision(poly, mouseX, mouseY))) {text(countries[i],mouseX,mouseY);}
      
    }
  }else{
    cursor(ARROW);
    // countryName.html(countries[currIndex]);
    countryName.style('display','block');
   

    if(okay){
      size2 += 0.05;
      let newPolygons = convertPathToPolygons(country[currIndex].vertexPoint,size2); 
      //let collision = false;

      /// draw Australia
      //let index = countries.findIndex(country => country == "Australia");
      // console.log(index);
      
      // translate(window,10);
      // translate(61,61);
      let j = 0;
      // console.log(countryPolygons[index]);
      // translate(windowWidth/2, wind)
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
    //  push();
    
      // translate(windowWidth/2, windowHeight/2);
      // scale(nScale);
      // translate(-windowWidth/2, -windowHeight/2);
      // translate();
      let xc = windowWidth/3- cx; //countryPolygons[index][0][0][0];
      let yc = windowHeight/2 - cy; //countryPolygons[currIndex][0][0][1];

    
      for(const poly of newPolygons){
        for(const vert of poly){
          if(vert[0] + xc >= windowWidth * 0.9 || vert[0] + xc <=  windowWidth - windowWidth * 0.9 ){
            console.log('too big');
            //stop = true;
            okay = false;
            maxSize =true;
            break;
          }
          
          if(vert[1] + yc >= windowHeight * 0.9|| vert[1] + yc <= windowHeight - windowHeight * 0.9 ){
            // countryPolygons[index] = newPolygons;
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
      // console.log(countryPolygons[index]);
      // translate(windowWidth/2, wind)
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
    //  push();
    
      // translate(windowWidth/2, windowHeight/2);
      // scale(nScale);
      // translate(-windowWidth/2, -windowHeight/2);
      // translate();
      let xc = windowWidth/3- cx; //countryPolygons[index][0][0][0];
      let yc = windowHeight/2 - cy; //countryPolygons[currIndex][0][0][1];
    
    let ppoly = [];
    // image(img1, windowWidth/2 ,windowHeight/2 , img1.width * tSize, img1.height * tSize);
    // let stop = false;
    // for(const poly of countryPolygons[currIndex]){
    //   for(const vert of poly){
    //     if(vert[0] + xc >= windowWidth || vert[0] + xc <= 0 ){
    //      // console.log('too big');
    //       stop = true;
    //     }
    //   }
    // }
    for (const poly of currCountry) {
      // console.log('test',poly[0][0]);
      // console.log('info',poly);
      
        // j++;
        //if(stop) break;
      beginShape();
      let npoly = [];
      for (const vert of poly) {
        //console.log(...vert);
        // console.log(vert[0]);
        // vertex(...vert);
        
        // console.log(vert[0] + xc,vert[1] + yc);
        vertex(vert[0] +xc ,vert[1] + yc );
        // text(vert[0],vert[0],vert[1]);
        let coor = [vert[0]+xc, vert[1] + yc];
        // image(img1, coor[0] - img1.width * 0.1 ,coor[1] - img1.height * 0.1, img1.width * 0.1, img1.height * 0.1);
        npoly.push(coor);
        
      }
      ppoly.push(npoly);
      endShape();
      for(const ver of npoly){
        // image(img1, ver[0]  ,ver[1] , img1.width * tSize, img1.height * tSize);
      }
      // if(collision) {
      //   // if(readyData)
      //   // {
      //   //   text(searchCountry(areaArr,'Australia'),mouseX,mouseY);
      //   //   //text(countries[i],mouseX,mouseY);
      //   //   // console.log(countries[i]);
      //   // }
      // }
    }
     // image(img1, windowWidth/2 ,windowHeight/2 , img1.width * tSize, img1.height * tSize);
  // image(img1, windowWidth/2 + img1.width * tSize ,windowHeight/2 , img1.width * tSize, img1.height * tSize);
  // image(img1, windowWidth/2 + img1.width * tSize *2 ,windowHeight/2 , img1.width * tSize, img1.height * tSize);
  // pop();
  newVertices[0]= ppoly;
  if(maxSize){
    info.style('display','block');
    bContainer.style('display','flex');
    let countryData = searchCountry(areaArr,countries[currIndex]);
    // console.log(countryData);
    info.html('Year: '+ countryData[dIndex][0] + '<br><br><br><br>' + countryData[dIndex][1] + '<br><br> hectares');
    // resizeCanvas(windowWidth * .8, windowHeight);
    // background(153,234,255); 
    let butPosX = windowWidth * 0.8;
    let butPosY = windowHeight * 0.2;
    // let button1 = createButton('1990');
    // button1.position(butPosX,butPosY);
    // button1.mousePressed(displayInfo());
    // let topMost = newVertices[0][0][0][1];
    // // console.log(topMost);
    // for(const poly of newVertices[0]){
    //   for(const vert of poly){
    //     console.log(vert[1]);
    //     if(topMost > vert[1]){
    //       console.log(vert[1]);
    //       topMost = vert[1];
    //     }
    //   }
      
    // }
    // // console.log(topMost);
    // text('here',topMost, topMost);
    let xPos =  windowWidth/3;
    let yPos = windowHeight/2;
    while(newVertices[0].some(poly => detectCollision(poly, xPos - img1.width * tSize, yPos))){
      xPos = xPos - img1.width * tSize;
      //yPos = yPos - img1.width * tSize;
    }
    // xPos = xPos + img1.width * tSize;
    while(newVertices[0].some(poly => detectCollision(poly, xPos , yPos - img1.height * tSize))){
     // xPos = xPos - img1.width * tSize;
      yPos = yPos - img1.height * tSize;
    }
    // yPos = yPos - img1.height * tSize;
    startX = xPos;
    startY = yPos;
    //image(img1, xPos  ,yPos - img1.height * tSize , img1.width * tSize, img1.height * tSize);
   // maxSize = false;
   let running = 1;
   while(running <= countryData[dIndex][1] / 10000 ){
    if(newVertices[0].some(poly => detectCollision(poly, xPos, yPos))){
      //xPos = xPos + img1.width * tSize;
      image(img1, xPos - img1.width/2 * tSize  ,yPos - img1.height/1.2 * tSize, img1.width * tSize, img1.height * tSize);
      xPos = xPos + img1.width * tSize;
    }else if(xPos + img1.width * tSize < windowWidth * 0.9 ){
      // while(!newVertices[0].some(poly => detectCollision(poly, xPos + img1.width * tSize, yPos) && xPos + img1.width * tSize < windowWidth * 0.9){
      //   xPos = xPos + img1.width * tSize;
      // }
      xPos = xPos + img1.width * tSize;
      
    }else{
      yPos = yPos + img1.height * tSize;
      xPos = startX;
    }
    running++;
   }
   
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
        //   text(searchCountry(areaArr,'Australia'),mouseX,mouseY);
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
    // console.log('new',newVertices[0]);
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
    
    
    // translate(windowWidth/2, windowHeight/2);
  //   nScale += 0.1;
  //   let size;
  // if(windowWidth / windowHeight > 2.304){
  //   size = windowHeight * 0.0010368;
  // }else{
  //   // size = windowWidth * 0.00045;
  //   // size = windowWidth * 0.00145;
  //   size2 += 0.05;
  //   // console.log(size2);
  // }
  // console.log('pressed');
  // for (const poly of countryPolygons[index]) {
  //   let collision = poly.some(poly1 => detectCollision(poly1, mouseX, mouseY));
  //   if(collision){
  //     console.log('inner perssed');
  //   }
  // }
  // let index = countries.findIndex(country => country == "Australia");
  // let collision = newVertices[0].some(poly => detectCollision(poly, mouseX, mouseY));
  // // console.log(collision);
  // console.log('old',countryPolygons[index]);
  // if(collision){
  //   console.log('inner perssed');
  // }else{
  //   console.log('not');
  // }

  //countryPolygons = [];  


  //   let newPolygons = convertPathToPolygons(country[currIndex].vertexPoint,size2); 

  //   let j = 0;
  //   // console.log(countryPolygons[index]);
  //   // translate(windowWidth/2, wind)
  //   let cx = 0, cy= 0;

  //   for(const poly of newPolygons){
  //     for(const vert of poly){
  //       cx+=vert[0];
  //       cy+=vert[1];
  //       j++;
  //     }
  //   }

  //   cx = cx/j;
  //   cy = cy/j;
  // // push();

  //   // translate(windowWidth/2, windowHeight/2);
  //   // scale(nScale);
  //   // translate(-windowWidth/2, -windowHeight/2);
  //   // translate();
  //   let xc = windowWidth/3- cx; //countryPolygons[index][0][0][0];
  //       let yc = windowHeight/2 - cy; countryPolygons[currIndex][0][0][1];
  //   let ppoly = [];
  //   let okay = true;
  //   for(const poly of newPolygons){
  //     for(const vert of poly){
  //       if(vert[0] + xc >= windowWidth * 0.9 || vert[0] + xc <=  windowWidth - windowWidth * 0.9 ){
  //         console.log('too big');
  //         //stop = true;
  //         okay = false;
  //         maxSize =true;
  //         break;
  //       }
        
  //       if(vert[1] + yc >= windowHeight * 0.9|| vert[1] + yc <= windowHeight - windowHeight * 0.9 ){
  //         // countryPolygons[index] = newPolygons;
  //         okay = false;
  //         maxSize = true;
  //         break;
  //       }
  //     }
  //   }
  //   if (okay) countryPolygons[currIndex] = newPolygons;
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
    let countryData = [];
    //dIndex = 0;
    maxIndex = 0;
    while (arr[index] != null && arr[index].Entity == inCountry) {
        //console.log(arr[index]);
        info = info + '\n' + arr[index].Year + ': ' + arr[index]['Forest area'] + ' hectares';
        countryData.push([arr[index].Year,arr[index]['Forest area']]);
        index++;
        maxIndex++;
    }
    //onsole.log(info);
    // return info;
    return countryData;
}

function preload() {
  img1 = loadImage('images/forest_tree.png');
}

function displayInfo(){
  text('1990', windowWidth * .8, windowHeight * 0.3);
}
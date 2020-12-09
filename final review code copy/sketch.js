
let img;
let thisimg;
let detector;

let zoneOne = [];
let zoneTwo = [];
let zoneThree = [];
let zoneFour = [];
let zoneFive = [];
let zoneSix = [];
let zoneSeven = [];
let zoneEight = [];
let zoneNine = [];
let zoneTen = [];
let zoneEleven = [];
let zoneTwelve = [];
let zoneThirteen = [];
let zoneFourteen = [];
let zoneFifteen = [];
let zoneSixteen = [];


// Empty array to put ml5 frames (rectangle properties {x, y, width, height, area})
let boxInfo = [];

// Empty array to put ml5 frames info when you click in the frame
let imageDrawArray = [];


function preload() {
  img = loadImage('coffeeshop copy.jpg');
  //img = loadImage('applestore copy.jpg');
  //img = loadImage('busyapplestore copy.jpg');
  //img = loadImage('cardealer2.jpg');
  //img = loadImage('peoplepark copy.jpg');
  //img =loadImage('peopleandcouch.jpg');
  //img =loadImage('peopleandcouch2.jpg');
  //img =loadImage('cardealership3.jpg');
  //img =loadImage('lalaland copy.jpeg');
  //img =loadImage('bball2.jpg');
  //img =loadImage('sheep1.jpg');
  //img =loadImage('horses1.jpg');
  //img =loadImage('cars1.jpg');
  //img =loadImage('cars2.jpg');
  //img =loadImage('cars3.jpg');
  //img =loadImage('coffee4.jpg');
  //img =loadImage('bar2.jpg');
  //img =loadImage('bar4.jpg');
  //img =loadImage('bar5.jpg');
  //img =loadImage('bar6.jpg');
  //img =loadImage('bar3.jpg');
  //img = loadImage('nfl2.jpg');

  //zoneOne
  for (let i = 1; i < 6; i++) {
    zoneOne[i] = loadImage('folderOne/one' + i + '.jpg');
  }
  //zoneTwo
  for (let i = 1; i < 6; i++) {
    zoneTwo[i] = loadImage('folderTwo/two' + i + '.jpg');
  }
  //zoneThree
  for (let i = 1; i < 6; i++) {
    zoneThree[i] = loadImage('folderThree/three' + i + '.jpg');
  }
  //zoneFour
  for (let i = 1; i < 6; i++) {
    zoneFour[i] = loadImage('folderFour/four' + i + '.jpg');
  }
  //zoneFive
  for (let i = 1; i < 6; i++) {
    zoneFive[i] = loadImage('folderFive/five' + i + '.jpg');
  }
  //zoneSix
  for (let i = 1; i < 6; i++) {
    zoneSix[i] = loadImage('folderSix/six' + i + '.jpg');
  }
  // //zoneSeven
  for (let i = 1; i < 6; i++) {
    zoneSeven[i] = loadImage('folderSeven/seven' + i + '.jpg');
  }
  //zoneEight
  for (let i = 1; i < 6; i++) {
    zoneEight[i] = loadImage('folderEight/eight' + i + '.jpg');
  }
  //zoneNine
  for (let i = 1; i < 6; i++) {
    zoneNine[i] = loadImage('folderNine/nine' + i + '.jpg');
  }
  //zoneTen
  for (let i = 1; i < 6; i++) {
    zoneTen[i] = loadImage('folderTen/ten' + i + '.jpg');
  }
  //zoneEleven
  for (let i = 1; i < 6; i++) {
    zoneEleven[i] = loadImage('folderEleven/eleven' + i + '.jpg');
  }
  //zoneTwelve
  for (let i = 1; i < 6; i++) {
    zoneTwelve[i] = loadImage('folderTwelve/twelve' + i + '.jpg');
  }
  //zoneThirteen
  for (let i = 1; i < 6; i++) {
    zoneThirteen[i] = loadImage('folderThirteen/thirteen' + i + '.jpg');
  }
  //zoneFourteen
  for (let i = 1; i < 6; i++) {
    zoneFourteen[i] = loadImage('folderFourteen/fourteen' + i + '.jpg');
  }
  //zoneFifteen
  for (let i = 1; i < 6; i++) {
    zoneFifteen[i] = loadImage('folderFifteen/fifteen' + i + '.jpg');
  }
  //zoneSixteen
  for (let i = 1; i < 6; i++) {
    zoneSixteen[i] = loadImage('folderSixteen/sixteen' + i + '.jpg');
  }

  detector = ml5.objectDetector('cocossd');
}


function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  // console.log(results);


  strokeWeight(2);
  for (let i = 0; i < results.length; i++) {
    let object = results[i];

    // Chnage stroke based on confidence degree
    if (object.confidence >= .9 && object.confidence < 1){
      stroke(201, 24, 24);
    }
    else if (object.confidence >= .8 && object.confidence < .9){
      stroke(201, 122, 24);
    }
    else if (object.confidence >= .7 && object.confidence < .8){
      stroke(113, 201, 24);
    }
    else if (object.confidence > .6 && object.confidence < .7){
      stroke(24, 201, 116);
    }
    else if (object.confidence >= .5 && object.confidence < .6){
      stroke(24, 169, 201);
    }
    else if (object.confidence >= .1 && object.confidence < .5){
      stroke(30, 24, 201);
    }

    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    //text(object.label, object.x + 10, object.y+24);
    textSize(14);

    boxInfo[i] = {
      boxX: object.x,
      boxY: object.y,
      boxWidth: object.width,
      boxHeight: object.height,
      boxArea: parseInt(object.width * object.height),
    }
  }
}


function setup() {
  createCanvas(640, 480);
  image(img, 0, 0);
  detector.detect(img, gotDetections);
}

function mousePressed() {

  // Sort data in relation to boxArea
  boxInfo.sort(compareValues('boxArea'));

  // Empty array stores the ml5 properties that is being clicked
  let tempArray = [];

  // For loop to store ml5 frame properties in tempArray
  for (i = 0; i < boxInfo.length; i++) {
    if (mouseX > boxInfo[i].boxX && mouseX < (boxInfo[i].boxX + boxInfo[i].boxWidth) && mouseY > boxInfo[i].boxY && mouseY < (boxInfo[i].boxY + boxInfo[i].boxHeight)) {
      tempArray.push(boxInfo[i]);
    }
  }

  // If 2 or more frames are selected, organize array to select the smallest frame.
  // First, sort the array according to area.
  tempArray.sort(compareValues('boxArea'));
  // Second, add ml5 properties (JavaScript Object) to the array imageDrawArray
  // Only add one image at a time (we don't want to select both small and big image)
  imageDrawArray.push(tempArray[0]);

  // Remove duplicates from imageDrawArray
  // Took snippet from: https://www.codementor.io/@nitinhepat/how-to-remove-duplicates-in-array-using-javascript-es6-15lc7px4g1
  let dataArr = imageDrawArray.map(item=>{
    return [item.boxArea,item]
  }); // creates array of array

  let maparr = new Map(dataArr); // create key value pair from array of array

  let result = [...maparr.values()]; // converting back to arry from mapobject


  // Result is the list of arrays that contains the ml5 frame properties
  result.sort(compareValues('boxArea'));
  result.reverse();

  console.log(result);


  for (i = 0; i < result.length; i++) {
    // Rectangle frame around image

    // zoneOne
    if (result[i].boxX + (result[i].boxWidth/2) >= 0 && result[i].boxX + (result[i].boxWidth/2) < 160 && result[i].boxY + (result[i].boxHeight/2) >= 0 && result[i].boxY + (result[i].boxHeight/2) < 120) {
      // console.log('one')
      if (mouseX < 160 && mouseY < 120){
        result[i].zoneImage = random(zoneOne);
      }

      // zoneTwo
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 160 && result[i].boxX + (result[i].boxWidth/2) < 320 && result[i].boxY + (result[i].boxHeight/2) >= 0 && result[i].boxY + (result[i].boxHeight/2) < 120) {
      // console.log('two')
      if (mouseX >= 160 && mouseX < 320 && mouseY < 120){
        result[i].zoneImage = random(zoneTwo);
      }

      // zoneThree
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 320 && result[i].boxX + (result[i].boxWidth/2) < 480 && result[i].boxY + (result[i].boxHeight/2) >= 0 && result[i].boxY + (result[i].boxHeight/2) < 120) {
      // console.log('three')
      if (mouseX >= 320 && mouseX < 480 && mouseY < 120){
        result[i].zoneImage = random(zoneThree);
      }

      // zoneFour
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 480 && result[i].boxX + (result[i].boxWidth/2) < 640 && result[i].boxY + (result[i].boxHeight/2) >= 0 && result[i].boxY + (result[i].boxHeight/2) < 120) {
      // console.log('four');
      if (mouseX >= 480 && mouseX < 640 && mouseY < 120){
        result[i].zoneImage = random(zoneFour);
      }

      // zoneFive
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 0 && result[i].boxX + (result[i].boxWidth/2) < 160 && result[i].boxY + (result[i].boxHeight/2) >= 120 && result[i].boxY + (result[i].boxHeight/2) < 240) {
      // console.log('five');
      if (mouseX < 160 && mouseY >= 120 && mouseY < 240){
        result[i].zoneImage = random(zoneFive);
      }

      // zoneSix
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 160 && result[i].boxX + (result[i].boxWidth/2) < 320 && result[i].boxY + (result[i].boxHeight/2) >= 120 && result[i].boxY + (result[i].boxHeight/2) < 240) {
      if (mouseX >= 160 && mouseX < 320 && mouseY >= 120 && mouseY < 240) {
        result[i].zoneImage = random(zoneSix);
        // console.log('six');
        // If the mouse is within this range, then assign a random image
        // Add to each JavaScript Object within the array with the dot method
      }

      // zoneSeven
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 320 && result[i].boxX + (result[i].boxWidth/2) < 480 && result[i].boxY + (result[i].boxHeight/2) >= 120 && result[i].boxY + (result[i].boxHeight/2) < 240) {
      // console.log('seven');
      if (mouseX >= 320 && mouseX < 480 && mouseY >= 120 && mouseY < 240){
        result[i].zoneImage = random(zoneSeven);
      }

      // zoneEight
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 480 && result[i].boxX + (result[i].boxWidth/2) < 640 && result[i].boxY + (result[i].boxHeight/2) >= 120 && result[i].boxY + (result[i].boxHeight/2) < 240) {
      // console.log('eight');
      if (mouseX >= 480 && mouseX < 640 && mouseY >= 120 && mouseY < 240){
        result[i].zoneImage = random(zoneEight);
      }

      // zoneNine
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 0 && result[i].boxX + (result[i].boxWidth/2) < 160 && result[i].boxY + (result[i].boxHeight/2) >= 240 && result[i].boxY + (result[i].boxHeight/2) < 360) {
      // console.log('nine');
      if (mouseX < 160 && mouseY >= 240 && mouseY < 360){
        result[i].zoneImage = random(zoneNine);
      }

      // zoneTen
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 160 && result[i].boxX + (result[i].boxWidth/2) < 320 && result[i].boxY + (result[i].boxHeight/2) >= 240 && result[i].boxY + (result[i].boxHeight/2) < 360) {
      // console.log('ten');
      if (mouseX >= 160 && mouseX < 320 && mouseY >= 240 && mouseY < 360){
        result[i].zoneImage = random(zoneTen);
      }

      // zoneEleven
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 320 && result[i].boxX + (result[i].boxWidth/2) < 480 && result[i].boxY + (result[i].boxHeight/2) >= 240 && result[i].boxY + (result[i].boxHeight/2) < 360) {
      // console.log('eleven');
      if (mouseX >= 320 && mouseX < 480 && mouseY >= 240 && mouseY < 360) {
        result[i].zoneImage = random(zoneEleven);
      }

      // zoneTwelve
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 480 && result[i].boxX + (result[i].boxWidth/2) < 640 && result[i].boxY + (result[i].boxHeight/2) >= 240 && result[i].boxY + (result[i].boxHeight/2) < 360) {
      // console.log('twelve');
      if (mouseX >= 480 && mouseX < 640 && mouseY >= 240 && mouseY < 360) {
      result[i].zoneImage = random(zoneTwelve);
    }
      // zoneThirteen
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 0 && result[i].boxX + (result[i].boxWidth/2) < 160 && result[i].boxY + (result[i].boxHeight/2) >= 360 && result[i].boxY + (result[i].boxHeight/2) < 480) {
      // console.log('thirteen');
      if (mouseX < 160 && mouseY >= 360 && mouseY < 480){
        result[i].zoneImage = random(zoneThirteen);
      }

      // zoneFourteen
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 160 && result[i].boxX + (result[i].boxWidth/2) < 320 && result[i].boxY + (result[i].boxHeight/2) >= 360 && result[i].boxY + (result[i].boxHeight/2) < 480) {
      // console.log('fourteen');
      if (mouseX >= 160 && mouseX < 320 && mouseY >= 360 && mouseY < 480){
        result[i].zoneImage = random(zoneFourteen);
      }

      // zoneFifteen
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 320 && result[i].boxX + (result[i].boxWidth/2) < 480 && result[i].boxY + (result[i].boxHeight/2) >= 360 && result[i].boxY + (result[i].boxHeight/2) < 480) {
      // console.log('fifteen');
      if (mouseX >= 320 && mouseX < 480 && mouseY >= 360 && mouseY < 480){
        result[i].zoneImage = random(zoneFifteen);
      }

      // zoneSixteen
    } else if (result[i].boxX + (result[i].boxWidth/2) >= 480 && result[i].boxX + (result[i].boxWidth/2) < 640 && result[i].boxY + (result[i].boxHeight/2) >= 360 && result[i].boxY + (result[i].boxHeight/2) < 480) {
      // console.log('sixteen');
      if (mouseX >= 480 && mouseX < 640 && mouseY >= 360 && mouseY < 480){
        result[i].zoneImage = random(zoneSixteen);
      }
    }

    // Draw image
    strokeWeight(2);
    stroke(0);
    rect(result[i].boxX, result[i].boxY, result[i].boxWidth, result[i].boxHeight);
    image(result[i].zoneImage, result[i].boxX, result[i].boxY, result[i].boxWidth, result[i].boxHeight);
  }
}

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')
    ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
    ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

function draw() {
  stroke(173, 173, 173);
  strokeWeight(1);
  //vert
  line(160, 0, 160, 480);
  line(320, 0, 320, 480);
  line(480, 0, 480, 480);
  //hori
  line(0, 120, 640, 120);
  line(0, 240, 640, 240);
  line(0, 360, 640, 360);

}

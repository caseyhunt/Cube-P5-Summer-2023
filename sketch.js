let connectButton, useAnyCubeButton;
let lightColor
let gCubes = [];
let cubeColor = [];
let img
let selectedCube
let num
let sweeping
let i
let start
let arr
let sweepPoints
let j  = 0;
let cubepos = [];
let timeLast = 0;
let ourBool;
let newCube
let magnet1ButtonUp, magnet1ButtonDown, magnet2ButtonUp, magnet2ButtonDown, magnet3ButtonUp, magnet3ButtonDown;

let pieces = {"43 bf ee 60":{"name":"X", "position": [], "rfid":"43 bf ee 60"}, 
"73 8f ee 60":{"name":"O", "position": [], "rfid":"73 8f ee 60"},
"33 9d ed 60":{"name":"X", "position": [], "rfid":"33 9d ed 60"}, 
"23 cf ed 60":{"name":"O", "position": [], "rfid":"23 cf ed 60"},
"93 e3 ec 60":{"name":"X", "position": [], "rfid":"93 e3 ec 60"},
"a3 b4 ec 60":{"name":"O", "position": [], "rfid":"a3 b4 ec 60"},
"e3 06 ec 60":{"name":"X", "position": [], "rfid":"e3 06 ec 60"},
"63 d0 eb 60":{"name":"O", "position": [], "rfid":"63 d0 eb 60"},
"23 d7 ea 60":{"name":"X", "position": [], "rfid":"23 d7 ea 60"},
"13 16 ea 60":{"name":"O", "position": [], "rfid":"13 16 ea 60"},
}

// rfid and positions array stuff
let rfidPos = []



// serial arduino code
let port;
let connectBtn;
let serialConnected = true;

function setup() {
  createCanvas(400, 400);
  img = loadImage("img.png")
//serial code
port = createSerial();

  // in setup, we can open ports we have used previously
  // without user interaction

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 9600);
  }

  // any other ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(80, 200);
  connectBtn.mousePressed(connectBtnClick);

  let sendBtn = createButton('motor up');
  sendBtn.position(220, 200);
  sendBtn.mousePressed(sendBtnClick);
  let sendBtn2 = createButton('motor down');
  sendBtn2.position(220, 225);
  sendBtn2.mousePressed(sendBtnClick2);

  magnet1ButtonUp = createButton('Magnet 1 up')
  magnet1ButtonUp.position(0, 300)
  magnet1ButtonUp.mousePressed(magnet1Up)
  magnet1ButtonDown = createButton('Magnet 1 down')
  magnet1ButtonDown.position(0, 350)
  magnet1ButtonDown.mousePressed(magnet1Down)


  magnet2ButtonUp = createButton('Magnet 2 up')
  magnet2ButtonUp.position(100, 300)
  magnet2ButtonUp.mousePressed(magnet2Up)
  magnet2ButtonDown = createButton('Magnet 2 down')
  magnet2ButtonDown.position(100, 350)
  magnet2ButtonDown.mousePressed(magnet2Down)
  
  magnet3ButtonUp = createButton('Magnet 3 up')
  magnet3ButtonUp.position(200, 300)
  magnet3ButtonUp.mousePressed(magnet3Up)
  magnet3ButtonDown = createButton('Magnet 3 down')
  magnet3ButtonDown.position(200, 350)
  magnet3ButtonDown.mousePressed(magnet3Down)



//end

  connectButton = createButton("connect cube")
  connectButton.mousePressed(ConnectCube)
  lightColor = createButton('light')
  lightColor.mousePressed(cubeLight)
  cube1Button = createButton("cube1")
  cube1Button.style('background-color', 'green')
  cube1Button.mousePressed(cube1)
  cube2Button = createButton("cube2")
  cube2Button.style('background-color', 'blue')
  cube2Button.mousePressed(cube2)
  cube3Button = createButton("cube3")
  cube3Button.style('background-color', 'red')
  cube3Button.mousePressed(cube3)
  cube4Button = createButton("cube4")
  cube4Button.style('background-color', 'yellow')
  cube4Button.mousePressed(cube4)
  sweepButton = createButton("sweep")
  sweepButton.mousePressed(sweep)
  useAnyCubeButton = createButton("anyCube")
  useAnyCubeButton.mousePressed(useAnyCube)
}

// serial functions
function connectBtnClick() {
  if (!port.opened()) {
    // port.open('Arduino', 57600);
    port.open();
  } else {
    port.close();
  }
}

function sendBtnClick() {
  port.write("<0>");
}

function sendBtnClick2() {
  port.write("<1>");
}
//end

function magnet1Up(){
  print("Magnet 1 Up")
    port.write("<0,1>");
  }

  function magnet1Down(){
    print("Magnet 1 down")
    port.write("<0,0>");
  }

  function magnet2Up(){
    print("Magnet 2 Up")
    port.write("<1,1>");
  }

  function magnet2Down(){
    print("Magnet 2 down")
    port.write("<1,0>");
  }

  function magnet3Up(){
    port.write("<2,1>");
  }

  function magnet3Down(){
    port.write("<2,0>");
  }
 





function within (start, end, withinN) {
  if (abs(start-end) <withinN) {
    return true
  }
  else {
    return false
  }
}

function useAnyCube() {
  ourBool = true
}
//general sweep function
function sweep() {
  sweeping = true;
  j=0;
  print("sweeping!");  
  }     
//The intial function to draw and select cubes
function drawCubes(){
  push();
  if (gCubes[0]) {
    stroke(cubeColor[0]);
    fill(cubeColor[0]);
    square((gCubes[0].sensorX/2) -35, gCubes[0].sensorY/2 - 20, 10)
    pop();
    push();
}  
if (gCubes[1]) {
  stroke(cubeColor[1]);
  fill(cubeColor[1]);
  square((gCubes[1].sensorX/2) -35, gCubes[1].sensorY/2 - 20, 10)
}
  pop();
  push();
if (gCubes[2]) {
  stroke(cubeColor[2]);
  fill(cubeColor[2]);
  square((gCubes[2].sensorX/2) -35, gCubes[2].sensorY/2 - 20, 10)
}
  pop();
  push()
if (gCubes[3]) {
  stroke(cubeColor[3]);
  fill(cubeColor[3]);
  square((gCubes[3].sensorX/2) -35, gCubes[3].sensorY/2 - 20, 10)
}
 pop();
}

function ConnectCube(){
  P5tCube.connectNewP5tCube().then( cube =>(gCubes.push(cube)) ).then(cubeColor.push(color(0, 0, 0)));
}

function cube1(){
  ourBool = false
  selectedCube = gCubes[0]
  for(var i=0; i<cubeColor.length; i++){
    cubeColor[i] = 'black';
  }
    cubeColor[0] = 'green';
}

function cube2(){
  ourBool = false
  selectedCube = gCubes[1]
  for(var i=0; i<cubeColor.length; i++){
    cubeColor[i] = 'black';
  }
    cubeColor[1] = 'blue';
}

function cube3(){
  ourBool = false
  selectedCube = gCubes[2]
  for(var i=0; i<cubeColor.length; i++){
    cubeColor[i] = 'black';
  }
    cubeColor[2] = 'red';
}

function cube4(){
  ourBool = false
  selectedCube = gCubes[3]
  for(var i=0; i<cubeColor.length; i++){
    cubeColor[i] = 'black';
  }
    cubeColor[2] = 'yellow';
}

function cubeLight(){
  randomColor()
  if (gCubes[0]) {
    gCubes[0].turnLightOn(color(r, g, b))
  }
}

function randomColor(){
  r = random(255)
  g = random(255)
  b = random(255)
}

//dy = step value (i.e. 10)
//maxArr = [maxX, maxY]
//minArr = [minX, minY]
//lockoutT = how many frames before the next command? (i.e. 30)
//this function always sweeps top to bottom, left to right.
//Moves the robot across and down the entire board to scan rfid tags
function sweepMat(dy, minArr, maxArr, lockoutT, cubeWaitTime, cube){
  let inflectionX = maxArr[0] - 30
  let dx = maxArr[0] - minArr[0]
  if (cube) {
    print(cube.sensorY, j);
  if(cube.sensorY > maxArr[1] && j!=0 && (frameCount - timeLast)>lockoutT ){
    //stops once the cube hits the maximum Y
    sweeping = false;
    cubepos = minArr;
    print("done sweeping!")
  }else{
    if(j == 0 && (frameCount - timeLast) > lockoutT){
      cubepos = minArr;
      print(cubepos)
      cube.moveTo( { x: cubepos[0], y: cubepos[1]}, 50, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel, cubeWaitTime )
      j+=1
      timeLast = frameCount;
    }
    else if(j%2 == 1){
      if(within(cube.sensorX, cubepos[0], 20) && within(cube.sensorY, cubepos[1], 20) && (frameCount - timeLast)>lockoutT && cubepos[0]<inflectionX){
        // print("moving x right")
        cubepos[0]+=dx;
      cube.moveTo({ x: cubepos[0], y: cubepos[1]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
        timeLast = frameCount;
      }
      if((cubepos[0] > inflectionX) && within(cube.sensorX, cubepos[0], 15) && (frameCount - timeLast)>lockoutT){
      // print("moving y right")
      cubepos[1] += dy;
      cube.moveTo( { x: cubepos[0], y: cubepos[1]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
        j+=1
        timeLast = frameCount;
      }
    }
    else if(j%2 == 0){   
      print("second set");
      if(within(cube.sensorY, cubepos[1], 20) && (frameCount - timeLast)>30 && cubepos[0] > inflectionX){
        print("moving back to start")
        cubepos[0]-=dx;
        cube.moveTo({ x: cubepos[0], y: cubepos[1]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
        timeLast = frameCount;
        
      }
      if((cubepos[0] < inflectionX) && within(cube.sensorX, cubepos[0], 25)){
        cubepos[1] += dy;
        print("moving y")
        print(cubepos);
        cube.moveTo( { x: cubepos[0], y: cubepos[1]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
        j+=1
        timeLast = frameCount;
        // sweeping = false;
      }
  }
}
  }
}
//does the sweep with two cubes
function sweepMat2(dy, minArr, maxArr, lockoutT, cubeWaitTime, xSpeed, ySpeed, cube1, cube2) {
  let inflectionX = maxArr[0] - 30
  let dx = maxArr[0] - minArr[0]
  if (cube1 && cube2) {
    if(cube1.sensorY > maxArr[1] && j!=0 && (frameCount - timeLast)>lockoutT && cube2.sensorY > maxArr[3]){
      sweeping = false
      cubepos = minArr
      print("done sweeping")
  }
    else {
      if(j == 0 && (frameCount - timeLast) > lockoutT){
      cubepos = minArr;
      //print(cubepos)
      cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 50, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel, cubeWaitTime )
      cube2.moveTo( { x: cubepos[2], y: cubepos[3]}, 50, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel, cubeWaitTime )
      j+=1
      timeLast = frameCount;
      print("gone to start")
    }
      else if (j%2 ==1) {
        //print(cubepos)
        //print(j)
        if(within(cube1.sensorX, cubepos[0], 20) && within(cube1.sensorY, cubepos[1], 20) && (frameCount - timeLast)>lockoutT && cubepos[0]<inflectionX && within(cube2.sensorX, cubepos[2], 20) && within(cube2.sensorY, cubepos[3], 20) && cubepos[2]<inflectionX){
        // print("moving x right")
        print("gone to step two")
          if(cube1.sensorY < maxArr[1]){
        cubepos[0]+=dx;
        cube1.moveTo({ x: cubepos[0], y: cubepos[1]}, xSpeed, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
         }
          if(cube2.sensorY < maxArr[3]){        
        cubepos[2] += dx;
        cube2.moveTo({ x: cubepos[2], y: cubepos[3]}, xSpeed, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
         }
        timeLast = frameCount;
      }
        if((cubepos[0] > inflectionX) && within(cube1.sensorX, cubepos[0], 15) && (frameCount - timeLast)>lockoutT && (cubepos[2] > inflectionX) && within(cube2.sensorX, cubepos[2], 15)){
      print("moving y right")
      if(cube1.sensorY < maxArr[1]){
      cubepos[1] += dy;
      cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, ySpeed, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
      }
      if(cube2.sensorY < maxArr[3]){
      cubepos[3] += dy;
      cube2.moveTo( {x: cubepos[2], y: cubepos[3]}, ySpeed, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
      }
        j+=1
        timeLast = frameCount;
        }
      }
      else if (j % 2 == 0) {
        if(within(cube1.sensorY, cubepos[1], 25) && (frameCount - timeLast)>30 && cubepos[0] > inflectionX && within(cube2.sensorY, cubepos[3], 25) && cubepos[2] > inflectionX){
        print("moving back to start")
          if(cube1.sensorY < maxArr[1]){
        cubepos[0]-=dx;
        cube1.moveTo({ x: cubepos[0], y: cubepos[1]}, xSpeed, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
         }
          if(cube2.sensorY < maxArr[3]){
        cubepos[2] -= dx;
        cube2.moveTo({ x: cubepos[2], y: cubepos[3]}, xSpeed, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
         }
        timeLast = frameCount; 
      }
        if((cubepos[0] < inflectionX) && within(cube1.sensorX, cubepos[0], 25) && (cubepos[2] < inflectionX) && within(cube2.sensorX, cubepos[2], 25)){
          if(cube1.sensorY < maxArr[1]){
          cubepos[1] += dy;
          cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, ySpeed, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
          }
          if(cube2.sensorY < maxArr[3]){
          cubepos[3] += dy
          cube2.moveTo( { x: cubepos[2], y: cubepos[3]}, ySpeed, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
          }
        print("moving y")
        //print(cubepos);
        j+=1
        timeLast = frameCount;
        // sweeping = false;
      }
      }
    }
  }
}

//does the sweep with 3 cubes
function sweepMat3(dy, minArr, maxArr, lockoutT, cubeWaitTime, cube1, cube2, cube3) {
  let inflectionX = maxArr[0] - 30
  let dx = maxArr[0] - minArr[0]
  if (cube1 && cube2 && cube3) {
    if(cube1.sensorY > maxArr[1] && 
      j!=0 && 
      (frameCount - timeLast)>lockoutT && 
      cube2.sensorY > maxArr[3] && 
      cube3.sensorY > maxArr[5]){
      sweeping = false
      cubepos = minArr
      print("done sweeping")
  }
    else {
      if(j == 0 && (frameCount - timeLast) > lockoutT){
      cubepos = minArr;
      //print(cubepos)
      cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 50, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel, cubeWaitTime )
      cube2.moveTo( { x: cubepos[2], y: cubepos[3]}, 50, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel, cubeWaitTime )
      cube3.moveTo( { x: cubepos[4], y: cubepos[5]}, 50, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel, cubeWaitTime )
      j+=1
      timeLast = frameCount;
    }
      else if (j%2 ==1) {
        if(within(cube1.sensorX, cubepos[0], 20) && 
           within(cube1.sensorY, cubepos[1], 20) && 
           (frameCount - timeLast)>lockoutT && 
           cubepos[0]<inflectionX && 
           within(cube2.sensorX, cubepos[2], 20) && 
           within(cube2.sensorY, cubepos[3], 20) && 
           cubepos[2]<inflectionX && 
           within(cube3.sensorX, cubepos[4], 20) && 
           within(cube3.sensorY, cubepos[5], 20) &&
           cubepos[4]<inflectionX){
        // print("moving x right")
        cubepos[0]+=dx;
        cubepos[2] += dx;
        cubepos[4] += dx;
        cube1.moveTo({ x: cubepos[0], y: cubepos[1]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
        cube2.moveTo({ x: cubepos[2], y: cubepos[3]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
        cube3.moveTo({ x: cubepos[4], y: cubepos[5]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
        timeLast = frameCount;
      }
        if((cubepos[0] > inflectionX) && 
        within(cube1.sensorX, cubepos[0], 15) && 
        (frameCount - timeLast)>lockoutT && 
        (cubepos[2] > inflectionX) && 
        within(cube2.sensorX, cubepos[2], 15) &&
        (cubepos[4] > inflectionX) &&
        within(cube3.sensorX, cubepos[4], 15)){
      // print("moving y right")
      cubepos[1] += dy;
      cubepos[3] += dy;
      cubepos[5] += dy;
      cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 50, undefined, P5tCube.easeTypeId.dece, cubeWaitTime )
      cube2.moveTo( {x: cubepos[2], y: cubepos[3]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
      cube3.moveTo( {x: cubepos[4], y: cubepos[5]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
        j+=1
        timeLast = frameCount;
       } 
      }
      else if (j % 2 == 0) {
        if(within(cube1.sensorY, cubepos[1], 10) && 
        (frameCount - timeLast)>30 && 
        cubepos[0] > inflectionX && 
        within(cube2.sensorY, cubepos[3], 10) && 
        cubepos[2] > inflectionX &&
        within(cube3.sensorY, cubepos[5], 10) &&
        cubepos[4] > inflectionX){
        print("moving back to start")
        cubepos[0]-=dx;
        cubepos[2] -= dx;
        cubepos[4] -= dx;
      cube1.moveTo({ x: cubepos[0], y: cubepos[1]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
      cube2.moveTo({ x: cubepos[2], y: cubepos[3]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
      cube3.moveTo({ x: cubepos[4], y: cubepos[5]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
        timeLast = frameCount; 
      }
        if((cubepos[0] < inflectionX) && 
        within(cube1.sensorX, cubepos[0], 25) && 
        (cubepos[2] < inflectionX) && 
        within(cube2.sensorX, cubepos[2], 25) &&
        (cubepos[4] < inflectionX) &&
        within(cube3.sensorX, cubepos[4], 25)){
          cubepos[1] += dy;
          cubepos[3] += dy
          cubepos[5] += dy
          print("moving y")
          //print(cubepos);
          cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
          cube2.moveTo( { x: cubepos[2], y: cubepos[3]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
          cube3.moveTo( { x: cubepos[4], y: cubepos[5]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
          j+=1
          timeLast = frameCount;
        // sweeping = false;
        }
      }
    }
  }
}

//does the sweep with four cubes
function sweepMat4(dy, minArr, maxArr, lockoutT, cubeWaitTime, cube1, cube2, cube3, cube4) {
  let inflectionX = maxArr[0] - 30
  let inflectionX2 = maxArr[4] - 30
  let dx = maxArr[0] - minArr[0]
  if (cube1 && cube2 && cube3 && cube4) {
    if(cube1.sensorY > maxArr[1] && 
      j!=0 && 
      (frameCount - timeLast)>lockoutT && 
      cube2.sensorY > maxArr[3] && 
      cube3.sensorY > maxArr[5] &&
      cube4.sensorY > maxArr[7]){
      sweeping = false
      cubepos = minArr
      print("done sweeping")
  }
    else {
      if(j == 0 && (frameCount - timeLast) > lockoutT){
      cubepos = minArr;
      print(cubepos)
      cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 50, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel, cubeWaitTime )
      cube2.moveTo( { x: cubepos[2], y: cubepos[3]}, 50, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel, cubeWaitTime )
      cube3.moveTo( { x: cubepos[4], y: cubepos[5]}, 50, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel, cubeWaitTime )
      cube4.moveTo( { x: cubepos[6], y: cubepos[7]}, 50, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel, cubeWaitTime )
      j+=1
      timeLast = frameCount;
    }
      else if (j%2 ==1) {
         print('moving x')
         print(cube4.sensorX)
        if(within(cube1.sensorX, cubepos[0], 20) && 
           within(cube1.sensorY, cubepos[1], 20) && 
           (frameCount - timeLast)>lockoutT && 
           cubepos[0]<inflectionX && 
           within(cube2.sensorX, cubepos[2], 20) && 
           within(cube2.sensorY, cubepos[3], 20) && 
           cubepos[2]<inflectionX && 
           within(cube3.sensorX, cubepos[4], 20) && 
           within(cube3.sensorY, cubepos[5], 20) &&
           cubepos[4]<inflectionX2 && 
           within(cube4.sensorX, cubepos[6], 20) && 
           within(cube4.sensorY, cubepos[7], 20) &&
           cubepos[6]<inflectionX2){
         print("moving x right")
        cubepos[0]+=dx;
        cubepos[2] += dx;
        cubepos[4] += dx;
        cubepos[6] += dx;
        cube1.moveTo({ x: cubepos[0], y: cubepos[1]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
        cube2.moveTo({ x: cubepos[2], y: cubepos[3]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
        cube3.moveTo({ x: cubepos[4], y: cubepos[5]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
        cube4.moveTo({ x: cubepos[6], y: cubepos[7]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
        timeLast = frameCount;
      }
        if((cubepos[0] > inflectionX) && 
        within(cube1.sensorX, cubepos[0], 15) && 
        (frameCount - timeLast)>lockoutT && 
        (cubepos[2] > inflectionX) && 
        within(cube2.sensorX, cubepos[2], 15) &&
        (cubepos[4] > inflectionX2) &&
        within(cube3.sensorX, cubepos[4], 15) &&
        (cubepos[6] > inflectionX2) &&
        within(cube4.sensorX, cubepos[6], 15)){
       print("moving y right")
      cubepos[1] += dy;
      cubepos[3] += dy;
      cubepos[5] += dy;
      cubepos[7] += dy;
      cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
      cube2.moveTo( {x: cubepos[2], y: cubepos[3]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime)
      cube3.moveTo( {x: cubepos[4], y: cubepos[5]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime)
      cube4.moveTo( {x: cubepos[6], y: cubepos[7]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime)
      print(cube4.sensorX)
         j+=1;
        timeLast = frameCount;
        }
      }
      else if (j % 2 == 0) {
        if(within(cube1.sensorY, cubepos[1], 15) && 
        (frameCount - timeLast)>30 && 
        cubepos[0] > inflectionX && 
        within(cube2.sensorY, cubepos[3], 15) && 
        cubepos[2] > inflectionX &&
        within(cube3.sensorY, cubepos[5], 15) &&
        cubepos[4] > inflectionX2 &&
        within(cube4.sensorY, cubepos[7], 15) &&
        cubepos[6] > inflectionX2){
        print("moving back to start")
        cubepos[0] -= dx;
        cubepos[2] -= dx;
        cubepos[4] -= dx;
        cubepos[6] -= dx;
      cube1.moveTo({ x: cubepos[0], y: cubepos[1]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
      cube2.moveTo({ x: cubepos[2], y: cubepos[3]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
      cube3.moveTo({ x: cubepos[4], y: cubepos[5]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
      cube4.moveTo({ x: cubepos[6], y: cubepos[7]}, 50, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel, cubeWaitTime);
        timeLast = frameCount; 
      }
        if((cubepos[0] < inflectionX) && 
        within(cube1.sensorX, cubepos[0], 20) && 
        (cubepos[2] < inflectionX) && 
        within(cube2.sensorX, cubepos[2], 20) &&
        (cubepos[4] < inflectionX2) &&
        within(cube3.sensorX, cubepos[4], 20) &&
        (cubepos[6] < inflectionX2) && 
        within(cube4.sensorX, cubepos[6], 20)){
        cubepos[1] += dy;
        cubepos[3] += dy
        cubepos[5] += dy
        cubepos[7] += dy
        //print("moving y")
        print(cube4.sensorY)
        print(cubepos);
      cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
      cube2.moveTo( { x: cubepos[2], y: cubepos[3]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
      cube3.moveTo( { x: cubepos[4], y: cubepos[5]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
      cube4.moveTo( { x: cubepos[6], y: cubepos[7]}, 50, undefined, P5tCube.easeTypeId.decel, cubeWaitTime )
        j+=1
        timeLast = frameCount;
        // sweeping = false;
      }
      }
    }
  }
}
function ourDist(x1, y1, x2, y2){
    return sqrt(sq(x2-x1) + sq(y2-y1));
}
//finds the closest cube to a given position
function closest_cube(x, y) {
  let minimum
  let offsetX = (x+35)*2, offsetY = (y+20)*2;
  let vArr = [];
  for(var n = 0; n<gCubes.length; n++){
      vArr.push(ourDist(gCubes[n].sensorX,gCubes[n].sensorY, offsetX, offsetY))}
    minimum = min(vArr);
    print(vArr)
    print(minimum)
    for(var i = 0; i<vArr.length; i++){
      print(i)
      if(vArr[i] == minimum){
        if(vArr[i] == vArr[i+1]){
          return gCubes[0];
        }
        return gCubes[i];
      }
    }
    
  }
/* // a slightly different approach to closest cube
  function closest_cube(x, y) {
    let minimum = 10,000;
    let store;
    let i;
    let offsetX = (x+35)*2, offsetY = (y+20)*2; // why are these squared?
    for(var n = 0; n<gCubes.length; n++){
        store = ourDist(gCubes[n].sensorX,gCubes[n].sensorY, offsetX, offsetY);
        if (store < minimum){
          minimum = store;
          i = n;
        }
      }
      print(minimum);
      print(gCubes[i]);
      return gCubes[i];
    }
*/
  
  function serialActivities(){
    copy(0, 0, width, height, 0, -1, width, height);

    // reads in complete lines and prints them at the
    // bottom of the canvas
    let myStr= port.readUntil("\n");
  
    if (myStr.length > 0) {
      text(myStr, 10, height-20);
      console.log(myStr)
    }
    // if (myStr.substring(0) == '{' && myStr.substring(-1) == '}') {
    //   print("yay working")
    //   rfidTest(myStr);
    // }
    if (myStr[0] == "{") {
      print("Yessuh")
      rfidTest(myStr)
      myStr = ""
    }

    // changes button label based on connection status
    if (!port.opened()) {
      connectBtn.html('Connect to Arduino');
      
    } else {
      connectBtn.html('Disconnect');
      serialConnected = true;
    }
  }
//main
function draw() {
noStroke()
background(0)
image(img, 0, 0, 200, 200)
  if(sweeping == true){
    if (gCubes.length ==1) {
  sweepMat(20, [110,90], [400,410], 30, 15, gCubes[0]);
    }
    else if (gCubes.length==2) {
  sweepMat2(20, [110,90, 110, 270], [380, 200 ,380, 400], 30, 25, 80, 25, gCubes[0], gCubes[1]);
    }
    else if (gCubes.length==3) {
    sweepMat3(20, [110,70, 110, 210, 110, 350], [400, 210, 400, 350, 400, 420], 30, 15, gCubes[0], gCubes[1], gCubes[2]);
  }
    else if (gCubes.length==4) {
      sweepMat4(20, [95,75, 95,245, 245,75, 245, 245], [245, 245, 245, 400, 400, 245, 400,400], 30, 15, gCubes[0], gCubes[1], gCubes[2], gCubes[3]);
    }
  }
drawCubes()
removeRfid()
serialActivities()
drawPieces()
}

//moves cube to a position and puts a square at that position
function moveCube(commoncube){
   if (commoncube) {
   if (mouseX < 200 && mouseY < 200) {
      commoncube.moveTo( { x: (mouseX+35) *2, y: (mouseY+20)*2}, 50, undefined, P5tCube.easeTypeId.decel )
     square((commoncube.sensorX/2) -35, commoncube.sensorY/2 - 20, 10)
     text(commoncube, commoncube.sensorX, commoncube.sensorY)
    }
   else {
commoncube.stop()
   }
 }
}

let rfidString;

//sees if there is an rfid at the position the cube is at
function rfidTest(string) {
  let cubeNum;
  let run = 0;
    print("Found rfid")
    print(string)
    //position identification
    cubeNum = string[1];
    //if the cubes is connected, start parsing the string
    if (gCubes[cubeNum]) {
      rfidString = string.substring(3, string.length-2)
      print(rfidString)
      rfidString = rfidString.replace(" ", "")
      print(rfidString)
      
      //if we don't have any rfid tags, then push the one we have; if we do
      //then we need to see if it is equal to a previous one, and update
      //the position
      if (rfidPos.length == 0) {
        rfidPos.push([rfidString, gCubes[cubeNum].sensorX/2 -35, gCubes[cubeNum].sensorY/2 -20, frameCount])
      }
      else {
      let rfid_found = false;
      for (var i = 0; i< rfidPos.length; i++) {
        if  (rfidPos[i][0] == rfidString) {
         cubeNum = string.substring(1,2);
           rfidPos[i][1] = gCubes[cubeNum].sensorX/2 -35;
           rfidPos[i][2] = gCubes[cubeNum].sensorY/2 -20; 
           rfid_found = true;
           
           break 
           
        }
       }
       if(rfid_found == false){
         rfidPos.push([rfidString, gCubes[cubeNum].sensorX/2 -35, gCubes[cubeNum].sensorY/2 -20])
         
       }
      }
      print("rfid array: " + rfidPos)
    }
    else {
      print("cube not connected");
    }
}
//function sees if there is a cube at a position where 
//an rfid was previously found and removes the marker if no rfid is there
function removeRfid(){
  for(var i = 0;i<rfidPos.length;i++) {
    //for (var n = 0; n <gCubes.length; n++){    
    if (within(gCubes[0].sensorX/2 -35, rfidPos[i][1], 5) && within(gCubes[0].sensorY/2 -20, rfidPos[i][2], 5) || within(gCubes[1].sensorX/2 -35, rfidPos[i][1], 5) && within(gCubes[1].sensorY/2 -20, rfidPos[i][2], 5) ){
      
      print(rfidPos[i][3], frameCount)
      if(!within(rfidPos[i][3], frameCount, 50)){
        print("deleting circle"); 
          rfidPos.pop(i); 
      }
                    
     }
    // }
  }
}

//draws the board game pieces
function drawPieces(){
  if (rfidPos.length >=1){
    let space = 0;
    let arrRfid = Object.keys(pieces);
    for(var i = 0; i < rfidPos.length; i++) {
    stroke(255, 255, 255)
    fill(255, 255, 255)
    //raws Xs or Os
    textSize(50)
    if(pieces[rfidPos[i][0]]){
    text(pieces[rfidPos[i][0]]["name"], rfidPos[i][1], rfidPos[i][2]);
    }else{
      print("your tag is not in the pieces object")
    }
    circle(rfidPos[i][1], rfidPos[i][2], 10)
    

// arrRfid.forEach((piece) => {
//   print(pieces[piece].name)
// if (pieces[piece].rfid == rfidString){
//   if (pieces[piece].name == "X"){
//     print("found X piece");
// textSize(50)
// text("X", rfidPos[i][1], rfidPos[i][2]);
//   }
// }
// else {
// textSize(50)
// text("O", rfidPos[i][1], rfidPos[i][2]);
// }
// })
    stroke(255, 0, 0)
    fill(255, 0, 0)
    
    //circle(rfidPos[i][1], rfidPos[i][2], 10)
    space +=20
// pieces
  }
}
}

//moves the closest cube to the positon pressed on the screen
function mouseClicked(){
  testX = mouseX;
  testY = mouseY;
  if (selectedCube == gCubes[0]){
    moveCube(gCubes[0])
  }
  if (selectedCube == gCubes[1]){
    moveCube(gCubes[1])
  }
  if (selectedCube == gCubes[2]){
    moveCube(gCubes[2])
  }
  if (selectedCube == gCubes[3]){
    moveCube(gCubes[3])
  }

  if (ourBool) {
    print("dist to 1", ourDist(gCubes[0].sensorX, gCubes[0].sensorY, (testX+35) *2, (testY+20)*2))
    print("dist to 2", ourDist(gCubes[1].sensorX, gCubes[1].sensorY, (testX+35) *2, (testY+20)*2))
    // print("closest cube:", closest_cube((mouseX+35) *2, (mouseY+20)*2));
    moveCube(closest_cube(mouseX, mouseY))
  }
}
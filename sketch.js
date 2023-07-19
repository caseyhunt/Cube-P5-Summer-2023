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
function setup() {
  createCanvas(400, 400);
  img = loadImage("img.png")
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

function sweep() {
  sweeping = true;
  j=0;
  print("sweeping!");  
  }     

function drawCubes(){
  push();
  if (gCubes[0]) {
    stroke(cubeColor[0]);
    fill(cubeColor[0]);
    square((gCubes[0].sensorX/2) -35, gCubes[0].sensorY/2 - 20, 10, 10)
    pop();
    push();
}  
if (gCubes[1]) {
  stroke(cubeColor[1]);
  fill(cubeColor[1]);
  square((gCubes[1].sensorX/2) -35, gCubes[1].sensorY/2 - 20, 10, 10)
}
  pop();
  push();
if (gCubes[2]) {
  stroke(cubeColor[2]);
  fill(cubeColor[2]);
  square((gCubes[2].sensorX/2) -35, gCubes[2].sensorY/2 - 20, 10, 10)
}
  pop();
  push()
if (gCubes[3]) {
  stroke(cubeColor[3]);
  fill(cubeColor[3]);
  square((gCubes[3].sensorX/2) -35, gCubes[3].sensorY/2 - 20, 10, 10)
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

function sweepMat(dy, minArr, maxArr, lockoutT, cube){
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
      cube.moveTo( { x: cubepos[0], y: cubepos[1]}, 80, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel )
      j+=1
      timeLast = frameCount;
    }
    else if(j%2 == 1){
      if(within(cube.sensorX, cubepos[0], 20) && within(cube.sensorY, cubepos[1], 20) && (frameCount - timeLast)>lockoutT && cubepos[0]<inflectionX){
        // print("moving x right")
        cubepos[0]+=dx;
      cube.moveTo({ x: cubepos[0], y: cubepos[1]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
        timeLast = frameCount;
      }
      if((cubepos[0] > inflectionX) && within(cube.sensorX, cubepos[0], 15) && (frameCount - timeLast)>lockoutT){
      // print("moving y right")
      cubepos[1] += dy;
      cube.moveTo( { x: cubepos[0], y: cubepos[1]}, 80, undefined, P5tCube.easeTypeId.decel )
        j+=1
        timeLast = frameCount;
      }
    }
    else if(j%2 == 0){   
      print("second set");
      if(within(cube.sensorY, cubepos[1], 10) && (frameCount - timeLast)>30 && cubepos[0] > inflectionX){
        print("moving back to start")
        cubepos[0]-=dx;
        cube.moveTo({ x: cubepos[0], y: cubepos[1]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
        timeLast = frameCount;
        
      }
      if((cubepos[0] < inflectionX) && within(cube.sensorX, cubepos[0], 25)){
        cubepos[1] += dy;
        print("moving y")
        print(cubepos);
        cube.moveTo( { x: cubepos[0], y: cubepos[1]}, 80, undefined, P5tCube.easeTypeId.decel )
        j+=1
        timeLast = frameCount;
        // sweeping = false;
      }
  }
}
  }
}

function sweepMat2(dy, minArr, maxArr, lockoutT, cube1, cube2) {
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
      print(cubepos)
      cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 80, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel )
      cube2.moveTo( { x: cubepos[2], y: cubepos[3]}, 80, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel )
      j+=1
      timeLast = frameCount;
      print("gone to start")
    }
      else if (j%2 ==1) {
        print(cubepos)
        print(j)
        if(within(cube1.sensorX, cubepos[0], 20) && within(cube1.sensorY, cubepos[1], 20) && (frameCount - timeLast)>lockoutT && cubepos[0]<inflectionX && within(cube2.sensorX, cubepos[2], 20) && within(cube2.sensorY, cubepos[3], 20) && cubepos[2]<inflectionX){
        // print("moving x right")
        print("gone to step two")
        cubepos[0]+=dx;
        cubepos[2] += dx;
        cube1.moveTo({ x: cubepos[0], y: cubepos[1]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
        cube2.moveTo({ x: cubepos[2], y: cubepos[3]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
        timeLast = frameCount;
      }
        if((cubepos[0] > inflectionX) && within(cube1.sensorX, cubepos[0], 15) && (frameCount - timeLast)>lockoutT && (cubepos[2] > inflectionX) && within(cube2.sensorX, cubepos[2], 15)){
      print("moving y right")
      cubepos[1] += dy;
      cubepos[3] += dy;
      cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 80, undefined, P5tCube.easeTypeId.decel )
      cube2.moveTo( {x: cubepos[2], y: cubepos[3]}, 80, undefined, P5tCube.easeTypeId.decel )
        j+=1
        timeLast = frameCount;
        }
      }
      else if (j % 2 == 0) {
        if(within(cube1.sensorY, cubepos[1], 10) && (frameCount - timeLast)>30 && cubepos[0] > inflectionX && within(cube2.sensorY, cubepos[3], 10) && cubepos[2] > inflectionX){
        print("moving back to start")
        cubepos[0]-=dx;
        cubepos[2] -= dx
      cube1.moveTo({ x: cubepos[0], y: cubepos[1]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
      cube2.moveTo({ x: cubepos[2], y: cubepos[3]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
        timeLast = frameCount; 
      }
        if((cubepos[0] < inflectionX) && within(cube1.sensorX, cubepos[0], 25) && (cubepos[2] < inflectionX) && within(cube2.sensorX, cubepos[2], 25)){
          cubepos[1] += dy;
          cubepos[3] += dy
        print("moving y")
        print(cubepos);
        cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 80, undefined, P5tCube.easeTypeId.decel )
        cube2.moveTo( { x: cubepos[2], y: cubepos[3]}, 80, undefined, P5tCube.easeTypeId.decel )
        j+=1
        timeLast = frameCount;
        // sweeping = false;
      }
      }
    }
  }
}

function sweepMat3(dy, minArr, maxArr, lockoutT, cube1, cube2, cube3) {
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
      print(cubepos)
      cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 80, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel )
      cube2.moveTo( { x: cubepos[2], y: cubepos[3]}, 80, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel )
      cube3.moveTo( { x: cubepos[4], y: cubepos[5]}, 80, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel )
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
        cube1.moveTo({ x: cubepos[0], y: cubepos[1]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
        cube2.moveTo({ x: cubepos[2], y: cubepos[3]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
        cube3.moveTo({ x: cubepos[4], y: cubepos[5]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
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
      cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 80, undefined, P5tCube.easeTypeId.decel )
      cube2.moveTo( {x: cubepos[2], y: cubepos[3]}, 80, undefined, P5tCube.easeTypeId.decel )
      cube3.moveTo( {x: cubepos[4], y: cubepos[5]}, 80, undefined, P5tCube.easeTypeId.decel )
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
      cube1.moveTo({ x: cubepos[0], y: cubepos[1]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
      cube2.moveTo({ x: cubepos[2], y: cubepos[3]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
      cube3.moveTo({ x: cubepos[4], y: cubepos[5]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
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
          print(cubepos);
          cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 80, undefined, P5tCube.easeTypeId.decel )
          cube2.moveTo( { x: cubepos[2], y: cubepos[3]}, 80, undefined, P5tCube.easeTypeId.decel )
          cube3.moveTo( { x: cubepos[4], y: cubepos[5]}, 80, undefined, P5tCube.easeTypeId.decel )
          j+=1
          timeLast = frameCount;
        // sweeping = false;
        }
      }
    }
  }
}

function sweepMat4(dy, minArr, maxArr, lockoutT, cube1, cube2, cube3, cube4) {
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
      cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 80, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel )
      cube2.moveTo( { x: cubepos[2], y: cubepos[3]}, 80, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel )
      cube3.moveTo( { x: cubepos[4], y: cubepos[5]}, 80, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel )
      cube4.moveTo( { x: cubepos[6], y: cubepos[7]}, 80, P5tCube.moveTypeId.rotate1st , P5tCube.easeTypeId.decel )
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
        cube1.moveTo({ x: cubepos[0], y: cubepos[1]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
        cube2.moveTo({ x: cubepos[2], y: cubepos[3]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
        cube3.moveTo({ x: cubepos[4], y: cubepos[5]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
        cube4.moveTo({ x: cubepos[6], y: cubepos[7]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
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
      cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 80, undefined, P5tCube.easeTypeId.decel )
      cube2.moveTo( {x: cubepos[2], y: cubepos[3]}, 80, undefined, P5tCube.easeTypeId.decel )
      cube3.moveTo( {x: cubepos[4], y: cubepos[5]}, 80, undefined, P5tCube.easeTypeId.decel )
      cube4.moveTo( {x: cubepos[6], y: cubepos[7]}, 80, undefined, P5tCube.easeTypeId.decel )
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
      cube1.moveTo({ x: cubepos[0], y: cubepos[1]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
      cube2.moveTo({ x: cubepos[2], y: cubepos[3]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
      cube3.moveTo({ x: cubepos[4], y: cubepos[5]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
      cube4.moveTo({ x: cubepos[6], y: cubepos[7]}, 80, P5tCube.moveTypeId.rotate1st, P5tCube.easeTypeId.decel);
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
      cube1.moveTo( { x: cubepos[0], y: cubepos[1]}, 80, undefined, P5tCube.easeTypeId.decel )
      cube2.moveTo( { x: cubepos[2], y: cubepos[3]}, 80, undefined, P5tCube.easeTypeId.decel )
      cube3.moveTo( { x: cubepos[4], y: cubepos[5]}, 80, undefined, P5tCube.easeTypeId.decel )
      cube4.moveTo( { x: cubepos[6], y: cubepos[7]}, 80, undefined, P5tCube.easeTypeId.decel )
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
        return gCubes[i];
      }
    }
    
  }

function draw() {
background(0)
image(img, 0, 0, 200, 200)
  if(sweeping == true){
    if (gCubes.length ==1) {
  sweepMat(20, [70,70], [420,420.5], 30, gCubes[0]);
    }
    else if (gCubes.length==2) {
  sweepMat2(20, [70,70, 70, 230], [420, 200,420, 420.5], 30, gCubes[0], gCubes[1]);
      
    }
    else if (gCubes.length==3) {
    sweepMat3(20, [70,70, 70, 210, 70, 350], [420, 210, 420, 350, 420, 420], 30, gCubes[0], gCubes[1], gCubes[2]);
  }
    else if (gCubes.length==4) {
      sweepMat4(20, [75,75, 75,245, 245,75, 245, 245], [245, 245, 245, 400, 400, 245, 400,400], 30, gCubes[0], gCubes[1], gCubes[2], gCubes[3]);
    }
  }
drawCubes()
}

function moveCube(commoncube){
   if (commoncube) {
   if (mouseX < 200 && mouseY < 200) {
      commoncube.moveTo( { x: (mouseX+35) *2, y: (mouseY+20)*2}, 80, undefined, P5tCube.easeTypeId.decel )
     square((commoncube.sensorX/2) -35, commoncube.sensorY/2 - 20, 10, 10)
     text(commoncube, commoncube.sensorX, commoncube.sensorY)
    }
   else {
commoncube.stop()
   }
 }
}

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
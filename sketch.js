let capture;
let nose = {x: 0, y: 0};
let leftEar = {x: 0, y: 0};
let rightEar = {x: 0, y: 0};
let leftEye = {x: 0, y: 0};
let rightEye = {x: 0, y: 0};
let windowX = window.innerWidth/2;
let windowY = window.innerHeight/1.5;

const faceMask1 = document.getElementById("faceMask1");
const faceMask2 = document.getElementById("faceMask2");
const faceMask3 = document.getElementById("faceMask3");
const faceMask4 = document.getElementById("faceMask4");
const faceMask5 = document.getElementById("faceMask5");

let myLayer;
let myImage;
let globalDistance;

function preload() {
  // myImage = loadImage("v1.jpg");
}


function setup() {
  createCanvas(windowX, windowY);
  capture = createCapture(VIDEO);
  capture.size(windowX, windowY);
  capture.hide();
  poseNet = ml5.poseNet(capture, modelReady);
  poseNet.on('pose', drawFace);
  myLayer = createGraphics(50, 50);
  myImage = new Image();
  myImage.src = "text1.jpg"
}

function drawFace(poses){
  if(poses.length > 0){
    nose.x = poses[0].pose.keypoints[0].position.x;
    nose.y = poses[0].pose.keypoints[0].position.y;
    leftEar.x = poses[0].pose.keypoints[3].position.x;
    leftEar.y = poses[0].pose.keypoints[3].position.y;
    rightEar.x = poses[0].pose.keypoints[4].position.x;
    rightEar.y = poses[0].pose.keypoints[4].position.y;
    leftEye.x = poses[0].pose.keypoints[1].position.x;
    leftEye.y = poses[0].pose.keypoints[1].position.y;
    rightEye.x = poses[0].pose.keypoints[2].position.x;
    rightEye.y = poses[0].pose.keypoints[2].position.y;
    distance();
  }
}

function modelReady(){
 	 select("#status").html("YO BEAUTIFUL FACE loaded");
}

function distance(){
  let camDistance = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
  let dis = map(camDistance, 0, windowX, 1, 100);
  let globalDistance = dis;
	select("#distance").html(dis);
}

// function toggleImage() {
//    var img1 = "http://placehold.it/350x150";
//    var img2 = "http://placehold.it/200x200";
//
//    var imgElement = document.getElementById('toggleImage');
//
//    imgElement.src = (imgElement.src === img1)? img2 : img1;
// }

function draw() {

  background(0);
  drawingContext.drawImage(myImage, 0, 0, width, height);
  // image(myImage, 0, 0, width, height);
  blendMode(HARD_LIGHT);
  image(capture, 0, 0, windowX, windowY);

  noStroke();
  noFill();
  rect(rightEar.x, rightEar.y - 0.6*(leftEar.x - rightEar.x), leftEar.x - rightEar.x, 1.2*(leftEar.x - rightEar.x));
  myLayer.background(255, 0, 0);


  push();
  scale(globalDistance);
  translate(nose.x, nose.y);
  image(myLayer, -10, -10, 20, 20);
  faceMask1.style.transform = "translate(" + rightEye.x + "px, " + rightEye.y + "px)";
  faceMask1.style.transform = scale("#distance");
  faceMask2.style.transform = "translate(" + leftEye.x + "px, " + leftEye.y + "px)";
  faceMask2.style.transform = scale("#distance");
  faceMask3.style.transform = "translate(" + rightEar.x + "px, " + rightEar.y + "px)";
  faceMask3.style.transform = scale("#distance");
  faceMask4.style.transform = "translate(" + rightEar.x + "px, " + rightEar.y + "px)";
  faceMask4.style.transform = scale("#distance");
  faceMask5.style.transform = "translate(" + leftEar.x + "px, " + leftEar.y + "px)";
  faceMask5.style.transform = scale("#distance");
  pop();
  blendMode(BLEND);
}

// function tiltX(){
//   if (nose.x - rightEye.x > leftEye.x - nose.x){
//     translateX(45)
//   }
//   if (nose.x - rightEye.x < leftEye.x - nose.x){
//     translateX(-45)
//   }
//   else{
//     translateX(0)
//   }
// }
// function tiltY(){
//   if ((nose.y - leftEye.y)*1.2 > 1.2*(leftEar.x - rightEar.x) - nose.x){
//     translateY(45)
//   }
//   if ((nose.y - leftEye.y)*1.2 < 1.2*(leftEar.x - rightEar.x) - nose.x){
//     translateY(-45)
//   }
//   else{
//     translateY(0)
//   }
// }

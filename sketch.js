let video;
let vScale = 8;
let bgColor = (220, 39, 20);
let textColor = 255;
let frumpyTriggered = false;
let beletlfTriggered = false;
let dowdypersonTriggered=false;
let uglyTriggered=false;
let cameraActive = true;
let font;
let fontSize = 18; 
let textStep = 10; 

function preload() {
  font = loadFont('fusion-pixel-10px-monospaced.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  video.hide();
  textFont(font);
  textSize(fontSize);
}

function draw() {
  if (cameraActive) {
    background(220, 39, 20);
    video.loadPixels();
    
    for (let y = 0; y < video.height; y++) {
      for (let x = 0; x < video.width; x++) {
        let index = (video.width - x + 1 + y * video.width) * 4;
        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];
        let bright = (r + g + b) / 3;
        let w = map(bright, 0, 255, 0, vScale);
        
        let randomFactor = random(-5, 5);
        w += randomFactor;

        noStroke();
        fill(255);
        rectMode(CENTER);
        rect(x * vScale, y * vScale, w * 2, w * 2);

        if (random(1) < 0.6) { 
          let character = String.fromCharCode(floor(random(33, 126))); 
          fill(220, 39, 20); 
          text(character, x * vScale, y * vScale);
        }
      }
    }
  } else {
    background(bgColor);
    fill(textColor);
    textAlign(LEFT, TOP);
    
    for (let y = 0; y < height; y += textStep) {
      for (let x = 0; x < width; x += textStep) {
        if (frumpyTriggered) {
          text("FRUMPY", x, y);
        } 
        if (beyourselfTriggered) {
          text("BEYOURSELF", x, y);
        }
        if (dowdypersonTriggered) {
          text("DOWDYPERSON", x, y);
        }
        if (uglyTriggered) {
          text("UGLY", x, y);
        }
      }
    }
  }
}

function keyPressed() {
  if (key == 'f') {
    frumpyTriggered = true;
    beyourselfTriggered = false;
    bgColor = color(220, 39, 20);
    textColor = 255;
    fontSize = 55; 
    textStep = 90; 
    fill(textColor);
    stopCameraFor(1000);
  }
  if (key == 'b') {
    beyourselfTriggered = true;
    frumpyTriggered = false;
    bgColor = color(255);
    textColor = color(220, 39, 20);
    fontSize = 45; 
    textStep = 180; 
    fill(textColor);
    stopCameraFor(1000);
  }
    if (key == 'd') {
    beyourselfTriggered = false;
    frumpyTriggered = false;
    dowdypersonTriggered=true;
    bgColor = color(220, 39, 20);
    textColor = 255;
    fontSize = 40; 
    textStep = 150; 
    fill(textColor);
    stopCameraFor(1000);
  }
    if (key == 'u') {
    beyourselfTriggered = false;
    frumpyTriggered = false;
    dowdypersonTriggered=false;
    uglyTriggered=true;
    bgColor = color(220, 39, 20);
    textColor = 255;
    fontSize = 180; 
    textStep = 80; 
    fill(textColor);
    stopCameraFor(1000);
  }
}

function stopCameraFor(ms) {
  cameraActive = false;
  setTimeout(() => {
    cameraActive = true;
    video.play(); 
    frumpyTriggered = false; 
    beyourselfTriggered = false; 
    dowdypersonTriggered=false;
    uglyTriggered=false;
  }, ms);
}

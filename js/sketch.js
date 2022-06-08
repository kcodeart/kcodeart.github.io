

var cols, rows;
var scl = 20;
var w = 1000;
var h = 1000;

var terrain = [];

let slideSCL;
let slideXINC;
let slideYINC;

function setup() {
  createCanvas(600, 600, WEBGL);
  
  // Add slider for parameters
  createP("scl").style("color", "white");
  slideSCL = createSlider(5, 60, 20, 1);
  createP("xoff increment").style("color", "white");
  slideXINC = createSlider(0, 2, 0.2, 0.1);
  createP("yoff increment").style("color", "white");
  slideYINC = createSlider(0, 2, 0.2, 0.1);
  
  genTerrain();
  
  let easycam = new Dw.EasyCam(this._renderer, {distance:1150, center:[0,0,0], rotation:[0,0,0,0]});
  
}

function draw() {
  scl = slideSCL.value();
  
  genTerrain();

  background(0);
  rotateX(PI / 3);
  translate(-w / 2, -h / 2);
  
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      let hu = map(terrain[x][y], -100, 100, 0, 150);
      noStroke();
      fill(150, hu, 150);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}

function genTerrain(){
  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
  
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -300, 300);
      xoff += slideXINC.value();
    }
    yoff += slideYINC.value();
  }
}

let cenY = 0;
let cenX = 0;
let scale = 1;
var frDiv;

var scaleLerp = 0;

function setup() {
  screenWidth = 980;
  screenHeight = 1910;
  createCanvas(screenWidth, screenHeight);
  noStroke();
  colorMode(HSB);
  frDiv = createDiv("");
  scale = 28370732.03467054;
  cenX = -0.7488110631476483;
  cenY = -0.0896856672613065;
}

function draw() {
  background(0);
  drawMandelbrot();
  // scale = 28370732.03467054;
  // cenX = -0.7488110631476483;
  // cenY = -0.0896856672613065;
  // setInterval(() => {
  //   // if (lerpValue >= 1) {
  //   //   noLoop();
  //   //   lerpValue = 0;
  //   // }
  //   scaleLerp += 0.00001;
  //   // scale = lerp(2000, 28370732.03467054, scaleLerp);
  //   cenX = -0.7488110631476483;
  //   cenY = -0.0896856672613065;
  // }, 1000);

  frDiv.html(`<p>Scale: ${scale}, cenX: ${cenX}, cenY: ${cenY}</p>`);
  noLoop();
}
//Scale: 28370732.03467054, cenX: -0.7488110631476483, cenY: -0.089685667261306
function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      cenX -= (0.1 * 1) / scale;
      redraw = true;
      break;
    case RIGHT_ARROW:
      cenX += (0.1 * 1) / scale;
      redraw = true;
      break;
    case UP_ARROW:
      cenY -= (0.1 * 1) / scale;
      redraw = true;
      break;
    case DOWN_ARROW:
      cenY += (0.1 * 1) / scale;
      redraw = true;
      break;
  }
}
function mouseWheel(event) {
  if (event.delta > 0) {
    scale -= scale * 0.5;
  } else {
    scale += scale * 0.5;
  }

  redraw = true;
}

function drawMandelbrot() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let c = pixelToPoint(x, y);
      let result = calculatePoint(c);

      if (result.isIn) {
        set(x, y, color(0));
      } else if (result.i > 1) {
        set(x, y, color(50 + 200 - ((pow(result.i / 50, 0.5) * 200) % 255), 80, 100));
      } else {
        set(x, y, color(50));
      }
    }
  }
  updatePixels();
}

function pixelToPoint(x, y) {
  let p = createVector((x - width / 2) * (4 / width) * (98 / (191 * scale)) + cenX, (y - height / 2) * (4 / height) * (1 / scale) + cenY);
  return p;
}

function calculatePoint(c) {
  let z0 = createVector(0, 0);
  let i = 0;
  let bounds = 2;
  let isIn = true;

  while (i < 1000 && isIn) {
    z0 = createVector(z0.x * z0.x - z0.y * z0.y + c.x, 2 * z0.x * z0.y + c.y);
    i++;
    if (z0.mag() > bounds) {
      isIn = false;
    }
  }
  return {
    i,
    isIn,
  };
}

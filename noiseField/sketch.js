class Engine {
  constructor() {
    this.pos = 0;
    this.sp = 0;
    this.resistance = 1.0;

    this.posLog = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
  getPos() {
    const lim = 10;
    // this.sp += random(-(lim + this.sp) / lim, (lim - this.sp) / lim);
    this.sp += random(-1, 1);
    this.sp *= this.resistance;
    this.sp = this.sp < -lim ? -lim : this.sp;
    this.sp = lim < this.sp ? lim : this.sp;

    this.pos += this.sp;
    this.posLog.push(this.pos);
    this.posLog.shift();
    return this.pos;
  }
  getRot() {}
}

let engine = {};
let charaImg;
let shipImg;
let treasureImg;
let offx = 0,
  offy = 0;
function preload() {
  charaImg = loadImage('character_yusha_01_red.png');
  shipImg = loadImage('fune_hansen_beige.png');
  treasureImg = loadImage('treasure_red_gold.png');
}

let sum = function (arr) {
  return arr.reduce(function (prev, current, i, arr) {
    return prev + current;
  });
};
let average = function (arr, fn) {
  return sum(arr, fn) / arr.length;
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine.x = new Engine();
  engine.y = new Engine();
  // offx = random(999);
  // offy = random(999);
  colorMode(HSB, 1, 1, 1, 1);
  imageMode(CENTER);
}

function draw() {
  // dev
  if (keyIsDown(LEFT_ARROW)) {
    engine.x.sp = -10;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    engine.x.sp = 10;
  }
  if (keyIsDown(UP_ARROW)) {
    engine.y.sp = -10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    engine.y.sp = 10;
  }

  const wx = -(width / 2 - average(engine.x.posLog));
  const wy = -(height / 2 - average(engine.y.posLog));
  translate(
    width / 2 - average(engine.x.posLog),
    height / 2 - average(engine.y.posLog)
  );
  background(255);

  noStroke();

  const playerX = engine.x.getPos();
  const playerY = engine.y.getPos();
  let isSee = true;

  const wxTen = Math.floor(wx / 10) * 10;
  const wyTen = Math.floor(wy / 10) * 10;

  for (let y = wyTen; y < wy + height; y += 10) {
    for (let x = wxTen; x < wx + width; x += 10) {
      const n = noise(x / 500.0 + offx, y / 500.0 + offy);
      const colN = noise(x / 20000.0 + offx, y / 20000.0 + offy);
      if (n > 0.6) {
        fill((colN * 10) % 1, n, n);
        rect(x, y, 12, 12);
        if (
          x < playerX &&
          playerX < x + 10 &&
          y < playerY &&
          playerY < y + 10
        ) {
          isSee = false;
        }
      }
      if (n > 0.85) {
        image(treasureImg, x, y, 50, 50);
      }
    }
  }

  // fill(0, 1, 1);
  // ellipse(x.getPos(), y.getPos(), 20, 20);
  push();
  translate(playerX, playerY);
  scale(0.1);
  if (isSee) {
    image(shipImg, 0, 0);
    engine.x.resistance = 1.0;
    engine.y.resistance = 1.0;
  } else {
    image(charaImg, 0, 0);
    engine.x.resistance = 0.95;
    engine.y.resistance = 0.95;
  }
  scale(10);
  fill(0);
  text('x:' + playerX + '\ny:' + playerY, -20, 50);
  pop();
}

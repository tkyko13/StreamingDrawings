const LINE_NUM = 20;

let lines = [];
let col;
let colorChangeCount = 0;
let colorChangeLimit;
let noiseOffset;
let screenShotCount = 0;
let screenShotLimit = 8;
let screenShotGraphics = [];
let isStart = false;

function reSettingLines() {
  console.log('resetting lines');
  colorChangeCount = 0;
  colorChangeLimit = random(3000, 4500);
  noiseOffset = random(10000);
  col = color(random(255), random(255), random(255), 100);
  let radOffset = random(PI * 2);
  let nv = random(80, 120);
  for (let i = 0; i < LINE_NUM; i++) {
    lines[i].randomPos();
    lines[i].changeColor(col);
    lines[i].setRadOffset(radOffset);
    lines[i].setNoiseValue(nv);
  }
}

function screenShot() {
  console.log('screenShot');

  let now = new Date();
  saveCanvas(
    now.getFullYear() +
      '-' +
      (now.getMonth() + 1) +
      '-' +
      now.getDate() +
      '-' +
      now.getHours() +
      '-' +
      now.getMinutes() +
      '-' +
      now.getSeconds(),
    'png'
  );
  // screenShotGraphics[0].image(get(), 0, 0, 108, 108);
}

function setup() {
  createCanvas(1920 / 2, 1080 / 2);

  background(255);
  smooth();

  // screenShotGraphics[0] = createGraphics(108, 108);

  for (let i = 0; i < LINE_NUM; i++) {
    lines[i] = new Line(i);
  }
  reSettingLines();
}

function draw() {
  if (!isStart) return;

  colorChangeCount++;
  if (colorChangeCount > colorChangeLimit) {
    screenShotCount++;
    if (screenShotCount > screenShotLimit) {
      screenShot();
      screenShotCount = 0;
      screenShotLimit = random(6, 10);
      background(255);
    }
    reSettingLines();
  }

  lines.forEach((l) => {
    l.draw();
  });
  screenShotGraphics.forEach((g) => {
    image(g, 0, 0);
  });
}

function mouseClicked() {
  // screenShot();
  isStart = true;
  console.log('start');
}

class Line {
  constructor(_index) {
    this.x;
    this.y;
    this.col;
    this.index = _index;
    this.radOffset = 0;
    this.n = 100.0;
  }

  randomPos() {
    this.x = random(width);
    this.y = random(height);
  }

  setRadOffset(radOffset) {
    this.radOffset = radOffset;
  }

  setNoiseValue(n) {
    this.n = n;
  }

  changeColor(_col) {
    this.col = _col;
  }

  draw() {
    let noiseX = this.x / this.n + this.index / 100.0 + noiseOffset;
    let noiseY = this.y / this.n + this.index / 100.0 + noiseOffset;
    let rad = map(noise(noiseX, noiseY), 0, 1, 0, PI * 2) + this.radOffset;
    let nextX = this.x + cos(rad) * 1.0;
    let nextY = this.y + sin(rad) * 1.0;
    stroke(this.col);
    line(this.x, this.y, nextX, nextY);
    this.x = nextX;
    this.y = nextY;
    if (this.x < 0 || width < this.x || this.y < 0 || height < this.y) {
      this.randomPos();
    }
  }
}

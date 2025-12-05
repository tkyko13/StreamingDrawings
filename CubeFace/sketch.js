let rot = 0;
let faceSize = 0;
let faceA,
  faceB,
  faceC,
  faceD = 0;
let cubes = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  faceSize = width / 4;

  for (let i = 0; i < 10; i++) {
    const sz = random(faceSize / 3);
    cubes.push({
      x: random(sz, faceSize - sz),
      y: random(sz, faceSize - sz),
      z: 0,
      size: sz,
      floorNum: random(3, 5),
    });
  }
}

function draw() {
  // rot += 0.5;
  // rot = rot % 360;
  rot = map(mouseX, 0, width, 0, 360);

  faceA = max(0, -cos(rot + 180) - 0.5);
  faceB = max(0, -cos(rot + 90) - 0.5);
  faceC = max(0, -cos(rot) - 0.5);
  faceD = max(0, -cos(rot - 90) - 0.5);

  background(255);

  rotateX(15);
  rotateY(rot);
  // rotateZ(PI / 3);

  fill(200);
  box(faceSize);

  drawA();
  drawB();
  drawC();
  drawD();
}

let isResetA = false;
let drops = [];
function drawA() {
  push();
  rectMode(CENTER);
  translate(-faceSize / 2, -faceSize / 2, faceSize / 2);
  if (random() < 0.1) {
    const sz = random(faceSize / 3);
    drops.push({
      x: random(sz, faceSize - sz),
      y: random(sz, faceSize - sz),
      z: 0,
      size: sz,
    });
  }
  drops.forEach((e) => {
    push();
    // translate(e.x, e.y, e.z);
    // fill(255, 0, 0, 100);
    // rect(0, 0, e.size);
    // stroke();
    strokeWeight(2);
    line(e.x, e.y, 0, e.x, e.y, faceA * 50);
    pop();
    e.z += 1;
    e.size--;
  });
  drops = drops.filter((e) => e.size > 0);

  pop();
}

function drawB() {
  push();
  rectMode(CENTER);
  rotateY(-90);
  translate(-faceSize / 2, -faceSize / 2, faceSize / 2);
  // for (let i = 0; i < 10; i++) {
  //   translate(0, 0, faceB * 50);
  //   rotateZ(faceB * i * 5);
  //   rect(0, 0, faceSize - i * 50);
  // }
  cubes.forEach((e) => {
    push();
    const cSz = faceB * 100;
    translate(e.x, e.y, cSz);
    fill(255, 0, 0, 100);
    for (let i = 0; i < e.floorNum; i++) {
      translate(0, 0, i * 5);
      box(e.size, e.size, cSz - i * 10);
    }

    pop();
    // e.z += 1;
  });
  pop();
}

function drawC() {
  push();
  rectMode(CENTER);
  rotateY(180);
  translate(0, 0, faceSize / 2);
  for (let i = 0; i < 10; i++) {
    translate(0, 0, faceC * 50);
    rotateZ(faceC * i * 5);
    rect(0, 0, faceSize - i * 50);
  }
  pop();
}

function drawD() {
  push();
  rectMode(CENTER);
  rotateY(90);
  translate(0, 0, faceSize / 2);
  for (let i = 0; i < 10; i++) {
    translate(0, 0, faceD * 50);
    rotateZ(faceD * i * 5);
    rect(0, 0, faceSize - i * 50);
  }
  pop();
}

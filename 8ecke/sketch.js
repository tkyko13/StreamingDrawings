class EckeDrawer {
  constructor(x, y, size) {
    this.eckeArr = [];
    this.index = 0.0;
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = random(0.01, 0.03);
    this.num = random(7, 10);
    this.generate();
  }

  generate() {
    this.num = random(6, 10);
    // this.num = int(
    //   noise(this.x * 0.002 + frameCount, this.y * 0.002 + frameCount) * 14 + 1
    // );
    this.index = 0.0;
    this.speed = random(0.01, 0.03);

    this.eckeArr = [{ x: random(), y: random() }];
    for (let i = 0; i < this.num - 1; i++) {
      if (random() < 0.2) {
        this.eckeArr.push({ x: random(), y: random() });
      } else {
        if (i % 2 == 0) {
          this.eckeArr.push({
            x: random(),
            y: this.eckeArr[this.eckeArr.length - 1].y,
          });
        } else {
          this.eckeArr.push({
            x: this.eckeArr[this.eckeArr.length - 1].x,
            y: random(),
          });
        }
      }
    }
  }

  draw() {
    let cIndex =
      this.index < this.eckeArr.length
        ? this.index
        : this.eckeArr.length - 0.01;
    push();
    translate(this.x, this.y);
    // stroke(0);
    // text(int(this.num * 10) / 10, 0, 0);
    beginShape();
    for (let i = 0; i < cIndex; i++) {
      vertex(this.eckeArr[i].x * this.size, this.eckeArr[i].y * this.size);
    }
    const nextIndex =
      this.eckeArr.length - 1 < int(cIndex + 1) ? 0 : int(cIndex + 1);
    const nextPt = this.eckeArr[nextIndex];
    const currPt = this.eckeArr[int(cIndex)];
    vertex(
      lerp(currPt.x, nextPt.x, cIndex - int(cIndex)) * this.size,
      lerp(currPt.y, nextPt.y, cIndex - int(cIndex)) * this.size
    );
    endShape();
    pop();
    this.index += this.speed;
  }

  get isFinish() {
    return this.index - 2.5 > this.eckeArr.length;
  }
}

const eckes = [];
let drawIndex = 0;
let waitCount = 0;
let drawMode = 0; // 0 or 1
function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  // const eckeArr = generateEckeArr(10);
  // drawEckeArr(eckeArr, width / 2, height / 2, 100);

  // eckes[0] = new EckeDrawer(width / 2, height / 2, 100);
  // eckes[0].generate(10);

  const size = height / 6;
  for (let y = size + size / 2; y < height - size; y += size) {
    for (let x = size + size / 2; x < width - size; x += size) {
      const newEcke = new EckeDrawer(
        x + 10 - size / 2,
        y + 10 - size / 2,
        size - 20
      );
      eckes.push(newEcke);
    }
  }
  drawMode = int(random(2));
}

function draw() {
  background(220);

  if (drawMode == 0) {
    eckes.forEach((e) => e.draw());
    const isAllFinish = eckes.every((e) => e.isFinish);
    if (isAllFinish) {
      // const reGeneNum = random(10, 20);
      // for (let i = 0; i < reGeneNum; i++) {
      //   eckes[int(random(eckes.length))].generate();
      // }
      drawMode = 1;
      eckes.forEach((e) => e.generate());
    }
  } else {
    eckes.forEach((e, i) => {
      e.speed = 0.25;
      if (i <= drawIndex) {
        e.draw();
      }
    });
    if (eckes[drawIndex].isFinish) {
      drawIndex++;
    }
    if (eckes.length <= drawIndex) {
      waitCount++;
      drawIndex = eckes.length - 1;
    }
    if (waitCount > 250) {
      drawIndex = 0;
      eckes.forEach((e) => e.generate());
      drawMode = 0;
      waitCount = 0;
    }
  }
}

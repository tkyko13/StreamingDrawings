class Fractal {
  constructor(x, y, len) {
    // this.branch = [[{ x1: 0, y1: 0, x2: 0, y2: -len }]];
    this.x = x;
    this.y = y;
    this.branch = [];
    this.animeStep = 0;
    this.isAnimeFinish = false;
    this.firstLen = len;
    // this.noiseValue = random(999);

    this.pushBranch(x, y, -90, len, 0);
  }

  pushBranch(px2, py2, pRot, len, depth) {
    if (!this.branch[depth]) this.branch[depth] = [];

    const currentLen = len * random(0.6, 0.9);
    const currentRot = random(0, -180); //
    // let currentRot = pRot;
    // currentRot += (noise(depth * 1) - 0.5) * 180;
    const x2 = px2 + cos(radians(currentRot)) * currentLen;
    const y2 = py2 + sin(radians(currentRot)) * currentLen;
    this.branch[depth].push({
      x1: int(px2),
      y1: int(py2),
      x2: int(x2),
      y2: int(y2),
    });

    if (currentLen > this.firstLen * 0.04) {
      const nextDepth = depth + 1;
      const nextNum = int(random(1, 4));
      for (let i = 0; i < nextNum; i++) {
        // const forkLerp = random(0.3, 1);
        // const nextX = lerp(x1, x2, forkLerp);
        // const nextY = lerp(y1, y2, forkLerp);
        // this.pushBranch(nextX, nextY, currentLen, nextDepth);
        this.pushBranch(x2, y2, currentRot, currentLen, nextDepth);
      }
    }
  }

  drawAll() {
    for (let i = 0; i < this.branch.length; i++) {
      for (let j = 0; j < this.branch[i].length; j++) {
        const cBranch = this.branch[i][j];
        line(cBranch.x1, cBranch.y1, cBranch.x2, cBranch.y2);
      }
    }
  }

  drawAnimation(step = 0.001) {
    this.animeStep += step;
    this.drawLerp(this.animeStep);
  }

  drawLerp(amt) {
    const drawIndex = constrain(
      amt * this.branch.length,
      0,
      this.branch.length
    );
    const intIndex = int(drawIndex);

    // 全部描く枝
    beginShape(LINES);
    for (let i = 0; i < intIndex; i++) {
      for (let j = 0; j < this.branch[i].length; j++) {
        const cBranch = this.branch[i][j];
        // line(cBranch.x1, cBranch.y1, cBranch.x2, cBranch.y2);
        vertex(cBranch.x1, cBranch.y1);
        vertex(cBranch.x2, cBranch.y2);
      }
    }
    endShape();

    // 途中の枝
    const lerpIndex = drawIndex - intIndex;
    if (lerpIndex != 0) {
      beginShape(LINES);
      for (let i = 0; i < this.branch[intIndex].length; i++) {
        const cBranch = this.branch[intIndex][i];
        const lerpX = lerp(cBranch.x1, cBranch.x2, lerpIndex);
        const lerpY = lerp(cBranch.y1, cBranch.y2, lerpIndex);
        // line(cBranch.x1, cBranch.y1, lerpX, lerpY);
        vertex(cBranch.x1, cBranch.y1);
        vertex(lerpX, lerpY);
      }
      endShape();
    }
  }
}

let fractals = [];
let x = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // fractals = new Fractal(200);

  // fractal.drawAll();
  // fractal.drawAnimation();
  // print(fractal.branch);
  noFill();
}

function draw() {
  background(200);

  x += 1;
  translate(x, 0);

  if (x % 300 == 0) {
    fractals.push(new Fractal(-x, height, height / 4));
  }

  fractals.forEach((e) => {
    // print(sin((x - -e.x) / (width / 3)));
    e.drawLerp(sin((x - -e.x) / (width / 3)));
  });
  fractals = fractals.filter((e) => {
    return e.x - -x < width + 100;
  });
}

// function mousePressed() {
//   fractals.push(new Fractal(-x, height, height / 6));
// }

class RandomWalker {
  constructor(col, xCode = 'random(-1, 1)', yCode = 'random(-1, 1)') {
    this.x = width / 2;
    this.y = height / 2;
    this.xCode = xCode;
    this.yCode = yCode;
    this.col = col;
    this.sizeCode = '2';
    this.size = 20;
  }
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 20;
  }
  setUpdCodeX(code) {
    const res = this.execCode(code);
    if (res.success) {
      this.xCode = code;
    }
  }
  setUpdCodeY(code) {
    const res = this.execCode(code);
    if (res.success) {
      this.yCode = code;
    }
  }
  setUpdCodeSize(code) {
    const res = this.execCode(code);
    if (res.success) {
      this.sizeCode = code;
    }
  }
  execCode(code, t = 0, n = 0) {
    try {
      const func = new Function('t', 'n', 'return ' + code);
      const res = parseFloat(func(t, n));
      if (res != NaN) {
        return { success: true, value: res };
      } else {
      }
    } catch (err) {
      // console.log(err);
    }
    return { success: false };
  }
  draw(count, noiseValue) {
    let t = frameCount;
    const xExecRes = this.execCode(this.xCode, count, noiseValue);
    if (xExecRes.success) {
      this.x += xExecRes.value;
    } else {
    }
    const yExecRes = this.execCode(this.yCode, count, noiseValue);
    if (yExecRes.success) {
      this.y += yExecRes.value;
    } else {
    }
    const sizeExecRes = this.execCode(this.sizeCode, count, noiseValue);
    if (sizeExecRes.success) {
      this.size = sizeExecRes.value * 10;
    } else {
    }

    if (this.x < 0) this.x = width;
    else if (width < this.x) this.x = 0;
    if (this.y < 0) this.y = height;
    else if (height < this.y) this.y = 0;

    fill(this.col);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}

const rw = [];
const inputs = {};
let count = 0;
let countLimit = 5000;
let isStart = false;
const eleWidth = 220;

function setup() {
  frameRate(30);
  // createCanvas(windowWidth, windowHeight);
  createCanvas(1920 / 2, 1080 / 2);
  background(100);
  // blendMode(ADD);

  const cols = [
    color(200, 0, 0, 80),
    color(0, 200, 0, 80),
    color(0, 0, 200, 80),
  ];
  for (let i = 0; i < 3; i++) {
    rw.push(new RandomWalker(cols[i]));
  }

  createDiv()
    .position(20, 10)
    .size(eleWidth + 8, 6)
    .style('background-color', '#FF9999');
  inputs.rx = createInput('random(-1, 1)')
    .position(20, 20)
    .size(eleWidth, 15)
    .input(function a() {
      rw[0].setUpdCodeX(this.value());
    });
  inputs.ry = createInput('random(-1, 1)')
    .position(20, 45)
    .size(eleWidth, 15)
    .input(function a() {
      rw[0].setUpdCodeY(this.value());
    });
  inputs.rr = createInput('random(10, 30)')
    .position(20, 70)
    .size(eleWidth, 15)
    .input(function a() {
      rw[0].setUpdCodeSize(this.value());
    });

  createDiv()
    .position(270, 10)
    .size(eleWidth + 8, 6)
    .style('background-color', '#99FF99');
  inputs.gx = createInput('random(-1, 1)')
    .position(270, 20)
    .size(eleWidth, 15)
    .input(function a() {
      rw[1].setUpdCodeX(this.value());
    });
  inputs.gy = createInput('random(-1, 1)')
    .position(270, 45)
    .size(eleWidth, 15)
    .input(function a() {
      rw[1].setUpdCodeY(this.value());
    });
  inputs.gr = createInput('random(10, 30)')
    .position(270, 70)
    .size(eleWidth, 15)
    .input(function a() {
      rw[1].setUpdCodeSize(this.value());
    });

  createDiv()
    .position(520, 10)
    .size(eleWidth + 8, 6)
    .style('background-color', '#9999FF');
  inputs.bx = createInput('random(-1, 1)')
    .position(520, 20)
    .size(eleWidth, 15)
    .input(function a() {
      rw[2].setUpdCodeX(this.value());
    });
  inputs.by = createInput('random(-1, 1)')
    .position(520, 45)
    .size(eleWidth, 15)
    .input(function a() {
      rw[2].setUpdCodeY(this.value());
    });
  inputs.br = createInput('random(10, 30)')
    .position(520, 70)
    .size(eleWidth, 15)
    .input(function a() {
      rw[2].setUpdCodeSize(this.value());
    });

  resetDisplay();
}

const maxNum = 3;
function generateCode() {
  function rand() {
    const r = parseFloat(nf(random(-maxNum, maxNum), 0, 1));
    if (r === 0) {
      return rand();
    }
    return r;
  }
  function randOrT() {
    if (random() < 0.2) {
      return 't';
    }
    if (random() < 0.2) {
      return 'n';
    }
    return rand();
  }
  function opeRand() {
    return ['+', '-', '*', '/'][floor(4 * random())];
  }
  function randMath() {
    let res = '';
    if (random() < 0.4) {
      const r = random();
      if (r < 0.25) {
        res = 'random(-' + randMath() + ',' + randMath() + ')';
      } else if (r < 0.5) {
        res = 'sin(' + randMath() + ')';
      } else if (r < 0.75) {
        res = 'cos(' + randMath() + ')';
      } else {
        res = 'tan(' + randMath() + ')';
      }
    } else {
      res = randOrT();
    }
    if (random() < 0.2) {
      res += opeRand() + randMath();
    }
    return res;
  }

  let resCode = randMath();

  return resCode;
}

function draw() {
  if (!isStart) return;

  count++;

  blendMode(ADD);
  const n = (noise(count / 100.0) - 0.5) * 10;
  rw.forEach((e) => e.draw((count / countLimit) * 1, n));

  if (count > countLimit) {
    resetDisplay();
    count = 0;

    // スクショ
  }

  // countゲージ
  // blendMode(BLEND);
  // fill(10);
  // noStroke();
  // rect(0, 0, (count / countLimit) * width, 6);
  // arc(
  //   width - 20,
  //   20,
  //   16,
  //   16,
  //   radians(-90),
  //   radians(-90 + (count / countLimit) * 360),
  //   PIE,
  //   50
  // );
}

function resetDisplay() {
  blendMode(BLEND);
  background(100);
  blendMode(ADD);

  noiseSeed(random(999));

  rw.forEach((e) => e.reset());
  const rxCode = generateCode();
  const ryCode = generateCode();
  const rrCode = generateCode();
  rw[0].setUpdCodeX(rxCode);
  rw[0].setUpdCodeY(ryCode);
  rw[0].setUpdCodeSize(rrCode);
  inputs.rx.value(rxCode);
  inputs.ry.value(ryCode);
  inputs.rr.value(rrCode);

  const gxCode = generateCode();
  const gyCode = generateCode();
  const grCode = generateCode();
  rw[1].setUpdCodeX(gxCode);
  rw[1].setUpdCodeY(gyCode);
  rw[1].setUpdCodeSize(grCode);
  inputs.gx.value(gxCode);
  inputs.gy.value(gyCode);
  inputs.gr.value(grCode);

  const bxCode = generateCode();
  const byCode = generateCode();
  const brCode = generateCode();
  rw[2].setUpdCodeX(bxCode);
  rw[2].setUpdCodeY(byCode);
  rw[2].setUpdCodeSize(brCode);
  inputs.bx.value(bxCode);
  inputs.by.value(byCode);
  inputs.br.value(brCode);
}

function mouseClicked() {
  // screenShot();
  isStart = true;
  console.log('start');
}

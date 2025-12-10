// グローバル変数をクラスインスタンスに置き換えます
let backCol;
let egg; // Eggクラスのインスタンス

// 元の定数はクラス内で管理します
// let eggH = 50, eggW = 60;

class Egg {
  constructor(x, y, w, h) {
    // 卵の位置とサイズ
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // アニメーションの状態と変数
    this.crackPt = [];
    this.isCracking = false;
    this.isOpening = false;
    this.isFalling = false;
    this.crackY = this.h;
    this.eggR = 0;
    this.yolkY = 0;
    this.yolkYsp = 0;
  }

  // 割れるアニメーションを開始/リセットします
  crack() {
    this.crackPt = [];
    this.isOpening = false;
    this.eggR = 0;
    this.isCracking = true;
    this.isFalling = false;
    this.yolkY = 0;
    this.yolkYsp = 0;
    this.crackY = this.h;
  }

  // アニメーションの更新と描画を行います
  updateAndDraw() {
    this.update();
    this.drawEgg();
  }

  // アニメーションの状態を更新します
  update() {
    if (this.isCracking) {
      if (this.crackY == this.h) {
        // 最初のクラックポイント
        this.crackPt.push({ x: 0, y: this.crackY });
        this.crackY -= random(2, 10);
      } else if (this.crackY > 5) {
        // 途中のクラックポイント
        if (frameCount % 2 == 0) {
          const crackX =
            this.crackPt.length % 2 == 0 ? random(-5, 0) : random(0, 5);
          this.crackPt.push({ x: crackX, y: this.crackY });
          this.crackY -= random(2, 10);
        }
      } else {
        // 最後のクラックポイント
        this.crackPt.push({ x: 0, y: 0 });
        this.crackY = this.h; // 次回のためにリセット
        this.isCracking = false;
        this.isOpening = true;
      }
    }

    if (this.isOpening) {
      this.eggR += 5;
      if (this.eggR > 70) {
        this.isOpening = false;
        this.isFalling = true;
      }
    }

    if (this.isFalling) {
      this.yolkYsp += 0.5;
      this.yolkY += this.yolkYsp;
    }
  }

  // 卵を描画します
  drawEgg() {
    push();
    translate(this.x, this.y); // 卵の中心に移動

    // yolk (黄身の影と本体)
    noStroke();
    fill(0, 0, 1, 0.2);
    ellipse(0, this.yolkY, this.h, this.h);
    fill('#FFDF85');
    ellipse(0, 5 + this.yolkY, this.h / 1.6, this.h / 1.6);

    // left shell (左側の殻)
    push();
    fill(255);
    stroke(0);
    translate(0, -this.h / 2);
    rotate(this.eggR);
    // arcの描画位置を調整（translateで移動したため）
    arc(0, this.h / 2, this.w, this.h, 90, 270);
    // クラックラインの描画 (arcの形状に合わせて座標を調整)
    noFill();
    stroke(0);
    beginShape();
    this.crackPt.forEach((e) => {
      // 卵の楕円（arc）の中心は(0, 0)になっているため、それに合わせて調整
      vertex(e.x, e.y);
    });
    endShape();
    pop();

    // right shell (右側の殻)
    push();
    fill(255);
    stroke(0);
    translate(0, -this.h / 2);
    rotate(-this.eggR);
    // arcの描画位置を調整
    arc(0, this.h / 2, this.w, this.h, 270, 90);

    // クラックラインの描画 (左側と同じ)
    noFill();
    stroke(0);
    beginShape();
    this.crackPt.forEach((e) => {
      vertex(e.x, e.y);
    });
    endShape();
    pop();

    pop(); // translate/push/popを終了
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1, 1, 1, 1);
  angleMode(DEGREES);

  // Eggクラスのインスタンスを初期化 (画面中央に、幅60、高さ50の卵)
  egg = new Egg(width / 2, height / 2, 60, 50);

  // 背景色を初期設定
  backCol = color(random(), 0.2, 0.8);
}

function draw() {
  // 常に背景を描画
  background(backCol);

  // Eggインスタンスのアニメーションを更新し、描画
  egg.updateAndDraw();

  if (frameCount % 240 == 0) {
    backCol = color(random(), 0.2, 0.8);
    egg.crack();
  }
}

function mousePressed() {
  // マウスが押されたら、背景色を変更し、卵を割るアニメーションを開始
  backCol = color(random(), 0.2, 0.8);
  egg.crack();
}

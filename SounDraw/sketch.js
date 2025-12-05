// --- 効果音を管理するカスタムクラス ---
class SoundEffect {
  static TYPE = {
    SINE: 'sine',
    TRIANGLE: 'triangle',
    SAWTOOTH: 'sawtooth',
    SQUARE: 'square',
    NOISE_WHITE: 'white',
    NOISE_BROWN: 'brown',
    NOISE_PINK: 'pink',
  };

  /**
   * SoundEffectクラスのコンストラクター
   * @param {string} type - 波形タイプ
   * @param {number} freq - 周波数（Hz）。ノイズの場合は無視される。
   * @param {number} attack - アタックタイム（秒）。
   * @param {number} decay - ディケイタイム（秒）。
   * @param {number} sustainAmt - サステインレベル（0.0から1.0の間）。
   * @param {number} release - リリースタイム（秒）。
   */
  constructor(type, freq, attack, decay, sustainAmt, release) {
    // 1. オシレーターまたはノイズジェネレーターを作成
    if (this.isNoise(type)) {
      this.osc = new p5.Noise(type); // デフォルトでホワイトノイズを使用
    } else {
      this.osc = new p5.Oscillator(type);
    }

    this.env = new p5.Envelope();
    this.env.setADSR(attack, decay, sustainAmt, release);

    this.osc.start();
    // ノイズの場合は周波数設定をスキップ
    if (this.isNoise(type)) {
      this.osc.freq(freq);
    }
    this.osc.amp(0); // initially silent
  }

  isNoise(type) {
    if (
      type === TYPE.NOISE_WHITE ||
      type === TYPE.NOISE_BROWN ||
      type === TYPE.NOISE_PINK
    ) {
      return true;
    } else {
      return false;
    }
  }

  play() {
    // 音量をエンベロープで制御して鳴らす
    // 最大音量0.5で発火
    this.env.play(this.osc, 0, 0.5);
  }
}

// --- p5.jsのスケッチ ---
let swordSound;
let coinSound;

function setup() {
  createCanvas(400, 200);

  // クラスのインスタンスを作成
  // (波形タイプ, 周波数, アタック, ディケイ, サステインレベル, リリース)
  swordSound = new SoundEffect('noise', 0, 0.01, 0.2, 0.1, 0.3);
  // 周波数はコインの音に合わせて調整
  coinSound = new SoundEffect('sine', 1000, 0.001, 0.1, 0.1, 0.1);
}

function draw() {
  background(220);
  text(
    'Press "S" for Sword, "C" for Coin (using a Class)',
    width / 2,
    height / 2
  );
}

function keyPressed() {
  if (key === 'S') {
    swordSound.play();
  } else if (key === 'C') {
    coinSound.play();
  }
}

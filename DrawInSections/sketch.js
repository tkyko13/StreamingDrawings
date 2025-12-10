const MAX_DEPTH = 5;
const MARG = 0;
const USE_OLLAMA = true;

let colorSchemes;
let currentColorScheme;

let count = 0;
let countLimit = 5000;
let isStart = true; //false;
let colors = [];
let resColors = [];

// class SoundEffect {
//   static TYPE = {
//     SINE: 'sine',
//     TRIANGLE: 'triangle',
//     SAWTOOTH: 'sawtooth',
//     SQUARE: 'square',
//     NOISE_WHITE: 'white',
//     NOISE_BROWN: 'brown',
//     NOISE_PINK: 'pink',
//   };

//   static GET_RANDOM_TYPE() {
//     const types = Object.values(SoundEffect.TYPE);
//     return types[floor(random() * types.length)];
//   }

//   /**
//    * SoundEffectクラスのコンストラクター
//    * @param {string} type - 波形タイプ
//    * @param {number} freq - 周波数（Hz）。ノイズの場合は無視される。
//    * @param {number} attack - アタックタイム（秒）。
//    * @param {number} decay - ディケイタイム（秒）。
//    * @param {number} sustainAmt - サステインレベル（0.0から1.0の間）。
//    * @param {number} release - リリースタイム（秒）。
//    */
//   constructor(type, freq, attack, decay, sustainAmt, release) {
//     // 1. オシレーターまたはノイズジェネレーターを作成
//     if (this.isNoise(type)) {
//       this.osc = new p5.Noise(type); // デフォルトでホワイトノイズを使用
//     } else {
//       this.osc = new p5.Oscillator(type);
//     }

//     this.env = new p5.Envelope();
//     this.env.setADSR(attack, decay, sustainAmt, release);

//     this.osc.start();
//     // ノイズの場合は周波数設定をスキップ
//     if (this.isNoise(type)) {
//       this.osc.freq(freq);
//     }
//     this.osc.amp(0); // initially silent
//   }

//   isNoise(type) {
//     if (
//       type == SoundEffect.TYPE.NOISE_WHITE ||
//       type == SoundEffect.TYPE.NOISE_BROWN ||
//       type == SoundEffect.TYPE.NOISE_PINK
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   play() {
//     // 音量をエンベロープで制御して鳴らす
//     // 最大音量0.5で発火
//     this.env.play(this.osc, 0, 0.5);
//   }
// }

class Section {
  constructor(x, y, wh, col) {
    this.x = x;
    this.y = y;
    this.wh = wh;
    this.col = col;
  }
  draw() {
    push();
    translate(this.x, this.y);
    // noFill();
    // rect(0, 0, w, h);

    // グリッド内の背景
    // stroke(this.col);
    noStroke();
    fill(this.col);
    // stroke(30);
    // fill(col);
    this.drawRandShape(this.wh, this.wh);
    this.playSE(this.col, this.wh, this.wh);

    pop();
  }
  drawRandShape(w, h) {
    const dice = int(random(13));
    // print(dice);
    beginClip();
    switch (dice) {
      case 0:
        rect(0, 0, w, h);
        break;
      case 1:
        rect(0, 0, w, h / 2);
        break;
      case 2:
        rect(0, 0, w / 2, h);
        break;
      case 3:
        rect(0, h / 2, w, h / 2);
        break;
      case 4:
        rect(w / 2, 0, w / 2, h);
        break;
      case 5:
        arc(0, 0, w * 2, h * 2, 0, PI / 2);
        break;
      case 6:
        arc(0, h, w * 2, h * 2, PI + PI / 2, 0);
        break;
      case 7:
        arc(w, 0, w * 2, h * 2, PI / 2, PI);
        break;
      case 8:
        arc(w, h, w * 2, h * 2, PI, PI + PI / 2);
        break;
      case 9:
        triangle(0, 0, 0, h, w, 0);
        break;
      case 10:
        triangle(w, h, w, 0, 0, h);
        break;
      case 11:
        triangle(w, 0, 0, 0, w, h);
        break;
      case 12:
        triangle(0, h, 0, 0, w, h);
        break;
      // case 13:
      // ellipse(w / 2, h / 2, w, h);
      // break;
      default:
        // rect(0, 0, w, h);
        break;
    }
    endClip();

    const dice2 = int(random(6));
    const r = int(random(3, 6) * 2);
    const ww = w / r / 2;
    const hh = h / r / 2;
    switch (dice2) {
      case 0:
        for (let i = 0; i < r; i++) {
          rect(i * (w / r), 0, ww, h);
        }
        break;
      case 1:
        for (let i = 0; i < r; i++) {
          rect(0, i * (h / r), h, hh);
        }
        break;
      case 2:
        for (let i = 0; i < r; i++) {
          for (let j = 0; j < r; j++) {
            ellipse(i * (w / r) + ww / 2, j * (h / r) + ww / 2, ww, ww);
          }
        }
        break;
      case 3:
        const s = w / r / 2;
        for (let i = 0; i < r + 1; i++) {
          for (let j = 0; j < r + 1; j++) {
            if (j % 2 == 0)
              ellipse(i * (w / r) + ww, j * (h / r) + ww / 2, ww, ww);
            else ellipse(i * (w / r), j * (h / r) + ww / 2, ww, ww);
          }
        }
        break;
      default:
        rect(0, 0, w, h);
    }
  }

  playSE(col, w, h) {
    // const se = new SoundEffect(
    //   SoundEffect.GET_RANDOM_TYPE(),
    //   0,
    //   0.01,
    //   0.2,
    //   0.1,
    //   0.3
    // );
    // se.play();
  }
}

let depth = MAX_DEPTH,
  sections = [];

function mouseClicked() {
  isStart = true;
}

async function setup() {
  frameRate(10);
  const wh = windowWidth < windowHeight ? windowWidth : windowHeight;
  let cnv = createCanvas(wh, wh);
  cnv.position(windowWidth / 2 - wh / 2, 0);
  // createCanvas(windowWidth, windowHeight);

  background(255);

  // colorMode(HSB);

  colors = ['#1b998b', '#ed217c', '#2d3047', '#fffd82', '#ff9b71'];
  recursiveDraw(MAX_DEPTH, 0, 0, wh);

  const res = await generateColorPallet();
  if (res) {
    if (res.colors && res.colors.length == 5) {
      resColors = res.colors;
    }
  }
  // console.log(res);
}

function draw() {
  if (!isStart) return;

  if (count > sections.length + 60) {
    count = 0;
    background(255);
    sections = [];
    colors = resColors;
    generateColorPallet().then((res) => {
      if (res && res.colors && res.colors.length == 5) {
        resColors = res.colors;
      }
    });
    recursiveDraw(MAX_DEPTH, 0, 0, width);
  }

  if (sections[count]) {
    sections[count].draw();
  }

  count++;
}

function recursiveDraw(depth, x, y, wh) {
  if (random(MAX_DEPTH) < depth && depth > 0) {
    depth--;
    recursiveDraw(depth, x, y, wh / 2);
    recursiveDraw(depth, x + wh / 2, y, wh / 2);
    recursiveDraw(depth, x, y + wh / 2, wh / 2);
    recursiveDraw(depth, x + wh / 2, y + wh / 2, wh / 2);
  } else {
    // print(depth);
    // myDraw(x + MARG, y + MARG, wh - MARG * 2, wh - MARG * 2);
    sections.push(
      new Section(
        x + MARG,
        y + MARG,
        wh - MARG * 2,
        colors[int(random(colors.length))]
      )
    );
  }
}

class ColorSchemes {
  constructor(colorStringArr) {
    this.colorSchemes = [];
    for (let i in colorStringArr) {
      this.colorSchemes.push(new ColorScheme(colorStringArr[i]));
    }
  }
  getLength() {
    return this.colorSchemes.length;
  }
  getRandColorScheme() {
    return this.colorSchemes[int(random(this.colorSchemes.length))];
  }
  getRnadColor(i) {
    return this.colorSchemes[i].getRand();
  }
}
class ColorScheme {
  constructor(colorString) {
    this.colors = [];
    let cc = colorString.split('/');
    let cs = cc[cc.length - 1].split('-');
    for (let i in cs) {
      this.colors.push('#' + cs[i]);
    }
  }
  get(i) {
    return this.colors[i];
  }
  getRand() {
    return this.colors[int(random(this.colors.length))];
  }
}

// async function searchColorPalettes(keyword) {
//   // 検索クエリをURLエンコードしてURLに追加
//   const encodedKeyword = encodeURIComponent(keyword);
//   const url = `https://colormagic.app/api/palette/search?q=${encodedKeyword}`;

//   console.log(`Fetching from: ${url}`);

//   try {
//     // APIへリクエストを送信
//     const response = await fetch(url);

//     console.log(response);

//     // HTTPステータスコードが200番台でなければエラーを投げる
//     if (!response.ok) {
//       throw new Error(
//         `HTTP Error: ${response.status} - ${response.statusText}`
//       );
//     }

//     // 応答ボディをJSONとして解析
//     const data = await response.json();

//     // console.log("取得したカラーパレットデータ:", data);

//     // 取得したデータを処理 (例: 最初に見つかったパレットの色を表示)
//     // if (data && data.length > 0) {
//     //     console.log(`最初のパレット名: ${data[0].name}`);
//     //     console.log(`色の配列: ${data[0].colors.join(', ')}`);
//     // }

//     return data;
//   } catch (error) {
//     console.error('データ取得中にエラーが発生しました:', error);
//   }
// }

async function generateColorPallet() {
  if (USE_OLLAMA) {
    const prompt = `いい感じのカラーパレットをください。`;
    format = {
      type: 'object',
      properties: {
        palette_name: {
          type: 'string',
          description:
            "このカラーパレットのテーマを表す魅力的な名前（例: '早朝の海岸線', 'モダンな暖炉'）",
        },
        colors: {
          type: 'array',
          description: 'パレットを構成する色のHEXコードのリスト',
          minItems: 5,
          maxItems: 5,
          items: {
            type: 'string',
            pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
            description: 'HEXカラーコード（例: #FF5733）',
          },
        },
      },
      required: ['palette_name', 'colors'],
    };
    const resJsonString = await fetchOllama(prompt, format);
    if (resJsonString == null) {
      // return null;
    }
    try {
      return JSON.parse(resJsonString);
    } catch (e) {
      // return null;
    }
  }

  // return [
  //   { colors: ['#1b998b', '#ed217c', '#2d3047', '#fffd82', '#ff9b71'] },
  //   { colors: ['#61a0af', '#96c9dc', '#f06c9b', '#f9b9b7', '#f5d491'] },
  //   { colors: ['#512d38', '#b27092', '#f4bfdb', '#ffe9f3', '#87baab'] },
  //   { colors: ['#ed254e', '#f9dc5c', '#c2eabd', '#011936', '#465362'] },
  // ][int(random(4))];
  const rc = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
  return { colors: [rc(), rc(), rc(), rc(), rc()] };
}

async function fetchOllama(prompt, format = null) {
  const model = 'llama3.1'; // 使用するモデル名
  const body = {
    model: model,
    prompt: prompt,
    stream: false,
  };
  if (format) {
    body.format = format;
  }

  try {
    console.log('fetchOllama');
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (e) {}
  return null;
}

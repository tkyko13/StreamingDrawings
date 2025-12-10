const waveNum = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200);

  const waveHeight = height / waveNum;
  const noiseValue = frameCount / 100;

  // wave1
  fill(0);
  text('wave1', 10, 20);
  noFill();
  beginShape();
  for (let i = 0; i <= width; i++) {
    vertex(i, noise(i / (noise(noiseValue) * 1000), noiseValue) * waveHeight);
  }
  endShape();

  // wave2
  translate(0, waveHeight);
  fill(0);
  text('wave2', 10, 20);
  noFill();
  beginShape(LINES);
  // console.log(frameCount / 10);
  for (let i = 0; i <= width; i++) {
    if ((i / 10 + frameCount * 0) % 2 == 0)
      vertex(i, noise(i / (noise(noiseValue) * 1000), noiseValue) * waveHeight);
  }
  endShape();

  // wave3
  // translate(0, waveHeight);
  // fill(0);
  // text('wave3', 10, 20);
  // noFill();
  // beginShape(TRIANGLES);
  // for (let i = 0; i <= width; i++) {
  //   // if ((i / 10) % 2 == 0)
  //   vertex(
  //     i,
  //     noise(i / (noise(frameCount / 100) * 1000), frameCount / 100) * waveHeight
  //   );
  // }
  // endShape();
}

let p = [],
  r = 0,
  n = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noFill();
  // stroke(0, 100);
  // strokeWeight(5);
}

function draw() {
  let size = (noise(n) * width) / 4;
  p.push({ x: cos(r) * size, y: sin(r) * size });
  background(200);
  beginShape();
  p.forEach((e, i) => {
    vertex(e.x, e.y, p.length - i);
  });
  endShape();
  r += (noise(n + 999) - 0.5) * 0.5;
  n += 0.01;
  if (p.length > 5000) {
    p.shift();
  }
}

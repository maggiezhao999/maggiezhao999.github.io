let t = 0;

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent("bg"); // 关键：挂到 index.html 里的 <div id="bg"></div>
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  t += 0.01;

  const nx = (mouseX - width * 0.5) / (width * 0.5);
  const ny = (mouseY - height * 0.5) / (height * 0.5);
  const d = constrain(Math.sqrt(nx * nx + ny * ny), 0, 1);
  const edge = smoothstep(0.12, 0.95, d);

  const bgCenter = color(10, 55, 215);
  const bgEdge   = color(235, 20, 45);
  const waterCenter = color(255, 25, 55);
  const waterEdge   = color(0, 125, 255);

  const bgCol = lerpColor(bgCenter, bgEdge, edge);
  const waterCol = lerpColor(waterCenter, waterEdge, edge);

  background(bgCol);

  const horizon = height * 0.62;

  const followX = (mouseX - width * 0.5) * 0.14;
  const followY = (mouseY - height * 0.5) * 0.06;

  const layers = 6;
  for (let i = 0; i < layers; i++) {
    const k = i / (layers - 1);
    const yBase = lerp(horizon, height + 40, k);

    const amp = lerp(18, 70, k);
    const freq = lerp(0.010, 0.0042, k);
    const spd = lerp(0.85, 0.26, k); // ✅ speed -> spd

    const fillCol = lerpColor(waterCol, color(0), lerp(0.06, 0.22, k));
    fillCol.setAlpha(lerp(110, 245, k));
    fill(fillCol);

    beginShape();
    vertex(0, height);

    for (let x = 0; x <= width; x += 10) {
      const n =
        Math.sin((x + followX) * freq + t * spd) +
        0.55 * Math.sin((x - followX) * (freq * 1.9) + t * spd * 1.25) +
        0.25 * Math.sin((x + followX) * (freq * 3.1) - t * spd * 1.8);

      const y = yBase + followY + n * amp;
      vertex(x, y);
    }

    vertex(width, height);
    endShape(CLOSE);

    // 轮廓线
    strokeWeight(2);
    const lineCol = lerpColor(color(255), waterCol, 0.20);
    lineCol.setAlpha(160);
    stroke(lineCol);
    noFill();

    beginShape();
    for (let x = 0; x <= width; x += 10) {
      const n =
        Math.sin((x + followX) * freq + t * spd) +
        0.55 * Math.sin((x - followX) * (freq * 1.9) + t * spd * 1.25) +
        0.25 * Math.sin((x + followX) * (freq * 3.1) - t * spd * 1.8);

      const y = yBase + followY + n * amp;
      vertex(x, y);
    }
    endShape();

    noStroke();
  }
}

function smoothstep(a, b, x) {
  const tt = constrain((x - a) / (b - a), 0, 1);
  return tt * tt * (3 - 2 * tt);
}

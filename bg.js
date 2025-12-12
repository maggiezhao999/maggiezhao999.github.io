// Scroll-driven sea + color shift (no purple): blue<->red via WHITE
// progress is based on page scroll so you can still scroll down to projects.

let t = 0;
let progress = 0; // 0..1

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent("bg");
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  t += 0.01;

  // ✅ 用页面滚动控制 progress（0..1）
  const heroH = window.innerHeight; // 首屏高度
  const y = window.scrollY || 0;
  progress = constrain(y / heroH, 0, 1);

  // Sea rises to top as progress goes 0->1
  const startHorizon = height * 0.62;
  const horizon = lerp(startHorizon, 0, progress);

  // Start: water red, bg blue
  // End:   water blue, bg red
  const blueBG = color(10, 55, 215);
  const redBG  = color(235, 20, 45);
  const redWater  = color(255, 25, 55);
  const blueWater = color(0, 125, 255);

  // avoid purple by going through WHITE
  const bgCol = lerpViaWhite(blueBG, redBG, progress);
  const waterCol = lerpViaWhite(redWater, blueWater, progress);

  background(bgCol);

  // small follow to keep waves alive
  const followX = (mouseX - width * 0.5) * 0.12;
  const followY = (mouseY - height * 0.5) * 0.05;

  // layered waves extend to bottom
  const layers = 6;
  for (let i = 0; i < layers; i++) {
    const k = i / (layers - 1);
    const yBase = lerp(horizon, height + 40, k);

    const amp = lerp(18, 70, k);
    const freq = lerp(0.010, 0.0042, k);
    const spd = lerp(0.85, 0.26, k); // ✅ speed -> spd

    // Depth tint (toward darker)
    const c = lerpColor(waterCol, color(0), lerp(0.06, 0.22, k));
    c.setAlpha(lerp(110, 245, k));
    fill(c);

    beginShape();
    vertex(0, height);
    for (let x = 0; x <= width; x += 10) {
      const n =
        Math.sin((x + followX) * freq + t * spd) +
        0.55 * Math.sin((x - followX) * (freq * 1.9) + t * spd * 1.25) +
        0.25 * Math.sin((x + followX) * (freq * 3.1) - t * spd * 1.8);

      vertex(x, yBase + followY + n * amp);
    }
    vertex(width, height);
    endShape(CLOSE);

    // contour line
    strokeWeight(2);
    const lineCol = lerpColor(color(255), waterCol, 0.22);
    lineCol.setAlpha(160);
    stroke(lineCol);
    noFill();
    beginShape();
    for (let x = 0; x <= width; x += 10) {
      const n =
        Math.sin((x + followX) * freq + t * spd) +
        0.55 * Math.sin((x - followX) * (freq * 1.9) + t * spd * 1.25) +
        0.25 * Math.sin((x + followX) * (freq * 3.1) - t * spd * 1.8);

      vertex(x, yBase + followY + n * amp);
    }
    endShape();
    noStroke();
  }
}

function lerpViaWhite(c1, c2, amt) {
  const w = color(255);
  if (amt < 0.5) return lerpColor(c1, w, amt / 0.5);
  return lerpColor(w, c2, (amt - 0.5) / 0.5);
}


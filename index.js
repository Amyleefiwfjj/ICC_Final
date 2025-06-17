const MODEL_URL = '/models'; // 혹은 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights'

async function preloadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  console.log('✅ face-api.js 모델 로드 완료');
}

let video, detections = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO).size(width, height).hide();
  preloadModels().then(() => {
    setInterval(detect, 200);
  });
}

async function detect() {
  const opts = new faceapi.TinyFaceDetectorOptions();
  detections = await faceapi
    .detectAllFaces(video.elt, opts)
    .withFaceExpressions();
}

function draw() {
  image(video, 0, 0);
  if (!detections.length) return;
  let det = detections[0];
  const { x, y, width: w, height: h } = det.detection.box;
  noFill(); stroke(0, 200, 255); strokeWeight(2);
  rect(x, y, w, h);

  // expressions가 반드시 들어있어야 함
  console.log(det.expressions);
  let [emo, p] = Object.entries(det.expressions)
    .sort((a, b) => b[1] - a[1])[0];
  noStroke(); fill(255); textSize(16); textAlign(LEFT, BOTTOM);
  text(`${emo}: ${nf(p * 100, 1, 0)}%`, x, y - 5);
}
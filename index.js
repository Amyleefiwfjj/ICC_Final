
let video, faceapi, detections = [];

const OPTIONS = {
  withLandmarks: true,
  withExpressions: true,
  detectionType: 'tiny_face_detector'
};
const MODEL_URL =
  'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/';

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO).size(width, height).hide();

  // ❶ 네 번째 인자로 MODEL_URL 전달
  faceapi = ml5.faceApi(video, OPTIONS, modelReady, MODEL_URL);
}

function modelReady() {
  console.log('✅ 모델(얼굴+표정) 로드 완료');
  faceapi.detect(gotResults);
}

function gotResults(err, result) {
  if (err) {
    console.error(err);
  } else {
    detections = result;
    console.log('🔍 expressions:', detections[0]?.expressions);
  }
  // 다음 프레임도 계속 감지
  faceapi.detect(gotResults);
}

function draw() {
  image(video, 0, 0);
  if (!detections.length) return;

  const det = detections[0];
  const box = det.alignedRect._box;

  // 파란 박스
  noFill(); stroke(0,200,255); strokeWeight(2);
  rect(box._x, box._y, box._width, box._height);

  // 가장 높은 감정 텍스트
  const expr = det.expressions;
  if (expr) {
    const [emo, p] = Object.entries(expr)
                           .sort((a,b)=>b[1]-a[1])[0];
    noStroke(); fill(255); textSize(16); textAlign(LEFT,BOTTOM);
    text(`${emo}: ${nf(p*100,1,0)}%`,
         box._x, box._y - 5);
  }
}

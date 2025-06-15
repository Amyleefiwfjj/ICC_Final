let video, faceapi, detections = [];
let topEmotion = '', topProb = 0;

const OPTIONS = {
  withExpressions: true,
  detectionType: 'tiny_face_detector'
};

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO).size(width, height).hide();

  faceapi = ml5.faceApi(video, OPTIONS, modelReady);
}

function modelReady() {
  console.log('✅ 모델 로드 완료 - 감정 분석 시작');
  faceapi.detect(gotResults);
}

function gotResults(err, result) {
  if (err) {
    console.error(err);
    return;
  }
  detections = result;
  faceapi.detect(gotResults);
}

function draw() {
  image(video, 0, 0);

  if (!detections.length) return;

  const det = detections[0];
  const box = det.alignedRect._box;
  // 파란 박스
  noFill();
  stroke(0, 200, 255);
  strokeWeight(2);
  rect(box._x, box._y, box._width, box._height);

  const expr = det.expressions;
  if (expr) {
    // [감정,확률] 배열로 만든 뒤 내림차순 정렬
    const [emotion, prob] = Object
      .entries(expr)
      .sort((a, b) => b[1] - a[1])[0];

    noStroke();
    fill(255);
    textSize(16);
    textAlign(LEFT, BOTTOM);
    // 박스 위 5px 지점에 출력
    text(
      `${emotion}: ${nf(prob * 100, 1, 0)}%`,
      box._x,
      box._y - 5
    );
  }
}
const MODEL_URL = './models';   // GitHub Pages 루트 기준

let video;
let detections = [];

async function preload() {
  // 필요한 두 모델만 로드
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
  ]);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, () => {
    // 비디오 스트림이 열리면 감지 루프 시작
    video.size(width, height);
    video.hide();
    detectLoop();
  });
}


// async function detectLoop() {
//   const options = new faceapi.TinyFaceDetectorOptions({
//     inputSize: 224,
//     scoreThreshold: 0.1
//   });
//   detections = await faceapi
//     .detectAllFaces(video.elt, options)
//     .withFaceExpressions();   // 표정까지
//   setTimeout(detectLoop, 150);  // ≈ 6 fps (원하면 조정)
// }

async function detectLoop() {
  const options = new faceapi.TinyFaceDetectorOptions({
    inputSize: 224,        // 기본 512보다 작게 해도 OK
    scoreThreshold: 0.1    // 0.5 → 0.1로 낮춰 보기
  });
  detections = await faceapi
    .detectAllFaces(video.elt, options)
    .withFaceExpressions();
  console.log('detections length:', detections.length, detections);
  setTimeout(detectLoop, 150);
}


function draw() {
  image(video, 0, 0);

  if (detections.length === 0) return;

  // 가장 첫 얼굴만 사용
  const { detection, expressions } = detections[0];
  const box = detection.box;

  // 얼굴 박스
  noFill();
  stroke(0, 255, 0);
  rect(box.x, box.y, box.width, box.height);

  // 최고 확률 감정 구하기
  const best = Object.entries(expressions)
    .reduce((max, cur) => (cur[1] > max[1] ? cur : max));

  // 라벨 표시
  noStroke();
  fill(0, 255, 0);
  textSize(20);
  textAlign(LEFT, TOP);
  text(`${best[0]}  ${nf(best[1] * 100, 2, 0)}%`,
    box.x, box.y - 24);
}

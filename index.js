let video, faceapi, detections = [];

const OPTIONS = {
  withLandmarks: false,
  withExpressions: true,
  withDescriptors: false,
};

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 네 번째 인수: 모델 경로
  faceapi = ml5.faceApi(video, OPTIONS, modelReady, 'models');
}

function modelReady() {
  console.log('✅ 모든 모델 로드 완료');
  faceapi.detect(gotResults);
}

function gotResults(err, result) {
  if (err) { console.error(err); return; }
  detections = result;
  faceapi.detect(gotResults);
}

function draw() {
  image(video, 0, 0);

  if (detections && detections.length > 0) {
    detections.forEach(det => {
      const { expressions, alignedRect: { _box: b } } = det;
      noFill(); stroke(0,200,255); strokeWeight(2);
      rect(b._x, b._y, b._width, b._height);

      const sorted = Object.entries(expressions).sort((a,b)=>b[1]-a[1]);
      fill(50,50,50,180); noStroke();
      rect(b._x, b._y-20, 160, sorted.length*18+10);

      fill(255); textSize(14); textAlign(LEFT);
      sorted.forEach(([emo,p],i)=>{
        text(`${emo}: ${nf(p,1,4)}`, b._x+5, b._y + i*18 - 2);
      });
    });
  }
}
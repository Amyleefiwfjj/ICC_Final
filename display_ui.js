let black, white, gray, dark_gray, px, UIx_off;
let level = 0; lines = 0, score = 0;
let messageQueue = [];
let rawMessages = [               // ② 텍스트만 일단 모아두기
    "You are now playing Emotional Tetris.",  "Just like blocks stack in a game,", "our emotions also pile up over time.", "",
    "But instead of accumulating all of them", "it's important to face them.",  "Like flushing blocks in Tetris",
    "why won't we try facing our emotions "
];
let startTime;
function setColors() {
    UIx_off = 13 * boxSide
    black = color(64, 66, 67);
    white = color(198, 207, 161);
    gray = color(139, 147, 113)
    dark_gray = color(108, 115, 85);
}
function scheduleMessages() {
    let baseX = (x_Off + 1) * boxSide + px * 2 - 10;
    let baseY = height * 0.05 - 20;
    let lineH = px * 6;
    rawMessages.forEach((txt, i) => {
        messageQueue.push({
            text: txt,
            x: baseX,
            y: baseY + i * lineH,
            showAt: startTime + i * 1400 + 5000
        });
    });
}


function displayUI() {

    display_score()
    push();
    textFont(RetroFont);
    textSize(px * 4);
    fill(255);
    textAlign(LEFT, TOP);
    displayMessages();
    pop();
}
function displayMessages() {
    let now = millis();
    messageQueue.forEach(m => {
        if (now >= m.showAt) {
            push();
            textFont(RetroFont);
            textSize(px * 4-8);
            fill(0);
            textAlign(LEFT, TOP);
            let wrapW = width * 0.23;
            text(m.text, m.x, m.y);
            pop();
        }
    });
}

function display_side_wall() {
    push();
    noTint();          // tint 잔존 방지
    blendMode(BLEND);  // 정상 알파 합성

    strokeWeight(px);
    stroke(white);

    line(boxSide - px / 2, 0, boxSide - px / 2, 18 * boxSide);
    line(13 * boxSide + px / 2, 0, 13 * boxSide + px / 2, 18 * boxSide);

    for (let i = 0; i < 24; i++) {
        image(wall_img, 1 * boxSide, i * boxSide * 0.75, boxSide, boxSide * 0.75);
        image(wall_img, 12 * boxSide, i * boxSide * 0.75, boxSide, boxSide * 0.75);
    }
    pop();
}
function load_Font() {
    RetroFont = loadFont('assets/font.ttf')
}
function display_score() {
    push()
    image(score_board, boxSide * 13 + px, 0, px * 55, px * 144)
    fill(black);
    textFont(RetroFont);
    textSize(px * 8);
    textAlign(RIGHT);
    text(score, px * 153, px * 31);
    text(level, px * 145, px * 63);
    text(lines, px * 145, px * 87);
    pop()
}

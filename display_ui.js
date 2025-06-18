let black, white, gray, dark_gray, px, UIx_off;
let level = 0; lines = 0, score = 0;
let messageQueue = ["지금 플레이하시고 계신 게임은 감정 테트리스입니다", "You are now playing Emotional Tetris.",
    "테트리스 게임에서 블록들이 쌓이듯이 ", "Just like blocks stack up in a Tetris game,",
    "우리의 감정도 쌓이곤 합니다", "our emotions also tend to pile up over time.",
    "그럴 때 감정을 단순히 쌓아두지 않고 face하는 것이 중요하다고 생각합니다",
    "But instead of letting them accumulate,it's important to face them.",
    "테트리스의 한 줄이 다 차면 없어지듯, ", "In Tetris, when a full line is completed, it disappears—",
    "우리도 감정을 쌓아두지만 않고 face하는건 어떨까요?", "what if we try facing our emotions?"
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
    // 표시할 메시지 목록(text, x, y, delay(ms))
    const msgs = [
        { text: "Good Luck!", x: UIx_off + px * 2, y: boxSide * 16, delay: 0 },
        { text: "Ready?", x: UIx_off + px * 2, y: boxSide * 18, delay: 1000 },
        { text: "Go!", x: UIx_off + px * 2, y: boxSide * 20, delay: 2000 }
    ];
    msgs.forEach(m => {
        messageQueue.push({
            text: m.text,
            x: m.x,
            y: m.y,
            showAt: startTime + m.delay
        });
    });
}

function displayUI() {

    display_score()
    push();
    textFont(RetroFont);
    textSize(px * 4);
    fill(white);
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
            textSize(px * 4);
            fill(white);
            textAlign(LEFT, TOP);
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

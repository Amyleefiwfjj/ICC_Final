let i_img, j_img, l_img, o_img, s_img, t_img, z_img;
let x_Off = 1, y_off = 2
let gameStart = true;
let themeSongPlay = false;
let gameOver = false
let boxSide = null;
let themeSong;

function preload() {
    themeSong = loadSound('assets/theme.mp3'); // 경로에 맞게 수정
}

function setup() {
    createCanvas(windowHeight * (10 / 9), windowHeight);
    boxSide = floor(windowHeight / 18);
    px = boxSide / 8;
    RandomiserInit();
    import_images();
    load_Font();
    setRandomiser();
    playPauseMusic();
    setBLock();
    clearGrid();
    setStaticBlocks();
    setStaticBlockColors();
    setTempBlock();
    setColors();
    noStroke(40);
    startTime = millis();
    scheduleMessages();
    console.log(messageQueue);

}

function draw() {
    if (gameStart) {
        display_grid();
        displayUI();
        //display_block(currentBlock,(6+leftOff)*boxSide,(tempTopOff-1)*boxSide,"temp",true)
        display_block(currentBlock, (x_Off + leftOff) * boxSide, (topOff - y_off) * boxSide, currentBlockType, true);
        display_next_set_of_block();
        display_side_wall();
        // display_hold_block()
        if (!gameOver && frameCount % ceil(Currentspeed) === 0) {
            updateGrid();
            checkRow();
            Currentspeed = speed;
        }
        if (gameOver) {
            push();
            textFont(RetroFont);
            textSize(px * 10);           // 크기는 px 단위로 조정
            fill(255, 0, 0, 200);        // 반투명 빨강
            textAlign(CENTER, CENTER);
            text("Game Over!", width / 2, height / 2);
            textSize(px * 4);
            fill(255, 255, 200);        // 반투명 빨강
            text("But in real life, you can do it!", width / 2, height / 2 + 50);

            pop();

            noLoop();

        }

    } else {
        titleScreen();
    }

    displayMessages();

}

function titleScreen() {
    push();
    image(title_screen_img, 0, 0, width, height);
    push();

    textFont(RetroFont);
    textSize(px * 8);
    text("Press Enter to Start", px * 8, px * 121);
    pop();
    pop();
}
function import_images() {
    i_img = loadImage('./assets/i.png');
    j_img = loadImage('./assets/j.png');
    l_img = loadImage('./assets/l.png');
    o_img = loadImage('./assets/o.png');
    s_img = loadImage('./assets/s.png');
    t_img = loadImage('./assets/t.png');
    z_img = loadImage('./assets/z.png');
    score_board = loadImage('./assets/score_board.svg');
    wall_img = loadImage('./assets/wall.png');
    title_screen_img = loadImage('./assets/title_screen.jpg');
}


function loadAudio() {
    themeSong = loadSound('./assets/theme.mp3');
}

function playPauseMusic() {
    if (!themeSongPlay) {
        themeSong.loop();
    }
    else {
        themeSong.pause();
    }

    themeSong.setVolume(0.04);
    themeSongPlay = !themeSongPlay;
}

function display_next_set_of_block() {
    display_block(nextBlocks[0][0], 15 * boxSide, 14 * boxSide, nextBlocks[0][1]);
}

function display_hold_block() {
    //rect(boxSide, 2 * boxSide, 5 * boxSide, 4 * boxSide);
    if (holdBlock.length > 0)
        display_block(holdBlock[0], 2 * boxSide, 4 * boxSide, holdBlock[1]);

}

function display_grid() {
    for (let i = 1; i < 20; i++) {
        for (let j = 1; j < 11; j++) {

            if (staticGrid[i][j]) {
                let type = staticGridColors[i][j]
                switch (type) {
                    case "t":
                        image(t_img, (x_Off + j) * boxSide, (i - 1) * boxSide, boxSide, boxSide);
                        break;
                    case "z":
                        image(z_img, (x_Off + j) * boxSide, (i - 1) * boxSide, boxSide, boxSide);
                        break;
                    case "l":
                        image(l_img, (x_Off + j) * boxSide, (i - 1) * boxSide, boxSide, boxSide);
                        break;
                    case "s":
                        image(s_img, (x_Off + j) * boxSide, (i - 1) * boxSide, boxSide, boxSide);
                        break;
                    case "i":
                        image(i_img, (x_Off + j) * boxSide, (i - 1) * boxSide, boxSide, boxSide);
                        break;
                    case "o":
                        image(o_img, (x_Off + j) * boxSide, (i - 1) * boxSide, boxSide, boxSide);
                        break;
                    case "j":
                        image(j_img, (x_Off + j) * boxSide, (i - 1) * boxSide, boxSide, boxSide);
                        break;
                }
            }
            else {
                fill(white);
                rect((x_Off + j) * boxSide, (i - 1) * boxSide, boxSide, boxSide);
            }

        }
    }
}

const display_block = (arr, xOff, yOff, type, cr = false) => {
    if (type === 'i' && !cr) {
        yOff -= boxSide;
    }
    switch (type) {
        case "t":
            temp_img = t_img;
            break;
        case "z":
            temp_img = z_img;
            break;
        case "l":
            temp_img = l_img;
            break;
        case "s":
            temp_img = s_img;
            break;
        case "i":
            temp_img = i_img;
            break;
        case "o":
            temp_img = o_img;
            break;
        case "j":
            temp_img = j_img;
            break;
        case "temp":
            temp_img = t_img;
            break;
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (arr[i][j]) {
                image(temp_img, j * boxSide + xOff, i * boxSide + yOff, boxSide, boxSide);
            }
        }
    }
}
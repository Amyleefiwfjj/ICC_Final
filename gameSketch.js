const gameSketch = p => {
    let i_img, j_img, l_img, o_img, s_img, t_img, z_img;
    let x_Off = 1, y_off = 2
    let gameStart = false;
    let themeSongPlay = false;
    let gameOver = false
    let boxSide = null;
    let themeSong;


    p.preload = () => {
        i_img = p.loadImage('assets/i.png');
        j_img = p.loadImage('./assets/j.png');
        l_img = p.loadImage('./assets/l.png');
        o_img = p.loadImage('./assets/o.png');
        s_img = p.loadImage('./assets/s.png');
        t_img = p.loadImage('./assets/t.png');
        z_img = p.loadImage('./assets/z.png');
        score_board = p.loadImage('./assets/score_board.svg');
        wall_img = p.loadImage('./assets/wall.png');
        title_screen_img = p.loadImage('./assets/title_screen.jpg');
    }

    p.setup = () => {
        p.createCanvas(p.windowHeight * (10 / 9), p.windowHeight);
        boxSide = Math.floor(p.windowHeight / 18);
        px = boxSide / 8; RandomiserInit();
        import_images();
        load_Font();
        setRandomiser();
        playPauseMusic();
        setBLock();
        clearGrid();
        RandomiserInit();
        setStaticBlocks();
        setStaticBlockColors();
        setTempBlock();
        setColors();
        p.noStroke(40);
    };

    p.draw = () => {
        //background(black)
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
        }
        else {
            titleScreen();
        }

    }
    function updateGrid() {
        // 블록이 떨어질 때마다
        setRandomiser();    // 역시 전역 함수 호출
        // …
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
};
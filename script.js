document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(grid.querySelectorAll('div'));
    let startBtn = document.querySelector('.button');
    const hamburgerBtn = document.querySelector('.toggler');
    const menu = document.querySelector('.menu');
    const span = document.getElementsByClassName('close')[0];
    const scoreDisplay = document.querySelector('.score-display');
    const linesDisplay = document.querySelector('.lines-score');

    let currentIndex = 0;
    let currentRotation = 0;
    const width = 10;
    const score = 0;
    const lines = 0;
    let timerId;
    let nextRandom = 0;

    const colors = [
        "url(images/blue_block.png)",
        "url(images/pink_block.png)",
        "url(images/purple_block.png)",
        "url(images/peach_block.png)",
        "url(images/yellow_block.png)"
    ];

    // Assign functions to keycodes
    control = e => {
        if (e.keyCode === 39){
            moveRight();
        } else if (e.keyCode === 38){
            rotate();
        } else if (e.keyCode === 37){
            moveLeft();
        } else if (e.keyCode === 40){
            moveDown();
        }
    }

    document.addEventListener('keyup', control);

    //Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    //Randomly Select Tetromino
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    //Move the Tetromino down
    let currentPosition = 4;

    //Draw the shape
    draw = () => {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('block');
            squares[currentPosition + index].style.backgroundImage = colors[random];
        })
    }

    //Undraw the shape
    undraw = () => {
        squares[currentPosition + index].classList.remove('block');
        squares[currentPosition + index].style.backgroundImage = 'none';
    }

    //Move down on loop
    moveDown = () => {
        undraw();
        currentPosition = currentPosition += width;
        draw();
        freeze();
    }

    startBtn.addEventListener('click', () => {
        if(timerId){
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setinterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            displayShape();
        }
    })

    //Move left and prevent collisions with shapes moving left
    moveRight = () => {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
        if(!isAtRightEdge) currentPosition += 1;
        if(curretn.some(index => squares[currentPosition + index].classList.contains('block2'))){
            currentPosition -= 1;
        }

        draw();
    }

    //Move right and prevent collisions with shapes moving right
    moveLeft = () => {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if(!isAtLeftEdge) currentPosition -= 1;
        if(curretn.some(index => squares[currentPosition + index].classList.contains('block2'))){
            currentPosition += 1;
        }

        draw();
    }

    //Freeze the shape
    freeze = () => {
        //If block has settled
        if(current.some(index => squares[currentPosition + index + width].classList.contains('block3') ||
        squares[currentPosition + index + width].classList.contains('block2'))){
            //make it block2
            current.forEach(index => squares[currentPosition + index].classList.add('block2'))
            //start a new tetromino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
            addScore();
            gameOver();
        }
    }

    freeze();

    //Rotate the Tetromino
    rotate = () => {
        undraw();
        currentRotation++;
        if(currentRotation === current.length){
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];
        draw();
    }

    gameOver = () => {
        if(curretn.some(index => squares[currentPosition + index].classList.contains('block2'))){
            scoreDisplay.innerHTML = 'End';
            clearInterval(timerId);
        }
    }

    //Show previous Tetromino in score display
    const displayWidth = 4;
    const displaySquares = document.querySelectorAll('previous-grid div');
    let displayIndex = 0;

    const smallTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
        [0, 1, displayWidth, displayWidth+1], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
    ]

    displayShape = () => {
        displaySquares.forEach(square => {
            square.classList.remove('block');
            square.style.backgroundImage = 'none';
        })

        smallTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('block');
            displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom];
        })
    }

    //Add score
    addScore = () => {
        for (let currentIndex = 0; currentIndex < 199; currentIndex += width){
            const row = [
                currentIndex,
                currentIndex+1,
                currentIndex+2,
                currentIndex+3,
                currentIndex+4,
                currentIndex+5,
                currentIndex+6,
                currentIndex+7,
                currentIndex+8,
                currentIndex+9
            ];

            if(row.every(index => squares[index].classList.contains('block2'))){
                score += 10;
                lines += 1;
                scoreDisplay.innerHTML = score;
                linesDisplay.innerHTML = lines;
                row.forEach(index => {
                    squares[index].style.backgroundImage = 'none';
                    squares[index].classList.remove('block2') || squares[index].classList.remove('block')
                })

                //Splice array
                const squaresRemoved = squares.splice(currentIndex, width);
                squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    //Styling Event Listeners
    hamburgerBtn.addEventListener('click', () => {
        menu.style.display = 'flex';
    }) 

    span.addEventListener('click', () => {
        menu.style.display = 'none';
    })


})
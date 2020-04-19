document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('div'));
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


})
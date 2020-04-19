document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const width = 10
    const height = 10

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


})
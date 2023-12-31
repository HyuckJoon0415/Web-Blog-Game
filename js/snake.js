var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;
var isGameOver = false;

var snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

var apple = {
    x: 320,
    y: 320
};

var score = 0;
var bestScore = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
    if (isGameOver) {
        return;
    }

    requestAnimationFrame(loop);

    if (++count < 4) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
            // 점수 증가 및 표시
            score++;
            document.getElementById('score').innerHTML = 'Score: ' + score;
        }

        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                // 게임 오버 처리
                gameOver();
            }
        }
    });
}

function gameOver() {
    isGameOver = true;

    // 게임 오버 시 최고 점수 갱신 및 표시
    bestScore = Math.max(bestScore, score);
    document.getElementById('finalScore').innerText = score;
    document.getElementById('bestScore').innerText = bestScore;

    // 게임 오버 화면 표시
    document.getElementById('gameOver').style.display = 'block';

    // 뱀 초기화
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;

    // 사과 초기화
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;

    // 게임 오버 화면에서 다시 시작하기 위한 이벤트 리스너 추가
    document.addEventListener('keydown', restartGame);
}

function restartGame(e) {
    // 스페이스바를 누르면 게임 재시작
    if (isGameOver && e.which === 32) {
        isGameOver = false;

        // 게임 오버 화면 숨기고 이벤트 리스너 제거
        document.getElementById('gameOver').style.display = 'none';
        document.removeEventListener('keydown', restartGame);

        // 초기 속도로 다시 시작
        count = 0;
        score = 0;
        document.getElementById('score').innerHTML = 'Score: 0';
        requestAnimationFrame(loop);
    }
}

document.addEventListener('keydown', function (e) {
    if (isGameOver) {
        return;
    }

    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

requestAnimationFrame(loop);

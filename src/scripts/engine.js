const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score')
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    action: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function playSound(audioName) {
    let audio = new Audio(`../src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.action.countDownTimerId);
        clearInterval(state.action.timerId);
        alert("Gamer Over! O seu resultado foi: " + state.values.result);
    }
}

function randomSquare() {
    state.view.squares.forEach(square => {
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;

}

function addListenerHitBox() {
    state.view.squares.forEach(square => {
        square.addEventListener('click', () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    })
}

function init() {
    addListenerHitBox();
}

init();
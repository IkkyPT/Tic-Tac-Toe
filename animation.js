const pickX = document.getElementById('x-marker');
const pickO = document.getElementById('o-marker');

pickX.addEventListener('click', () => {
    pickX.style.color = '#1A2B33';
    pickX.style.backgroundColor = 'var(--grey)';
    pickO.style.color = 'var(--grey)';
    pickO.style.background = 'none';
})

pickO.addEventListener('click', () => {
    pickO.style.color = '#1A2B33';
    pickO.style.backgroundColor = 'var(--grey)';
    pickX.style.color = 'var(--grey)';
    pickX.style.background = 'none';
});

const startBtn = document.getElementById('start-game');
const gameIntro = document.querySelector('.game-intro');
const gameScreen = document.querySelector('.game-screen');

startBtn.addEventListener('click', () => {
    gameIntro.style.display = 'none';
    gameScreen.style.display = 'grid';
})
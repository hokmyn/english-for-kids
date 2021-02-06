import cards from '../data/cards.js';

export default class Game {
  constructor() {
    this.startGame = this.startGame.bind(this);
  }

  init() {
    this.startButton = document.createElement('button');
    this.startButton.classList.add('start-button', 'invisible');
    this.startButton.innerText = 'Start game';
    document.body.prepend(this.startButton);
  }

  startGame() {
    const startButton = document.querySelector('.start-button');
    startButton.innerText = 'Repeat';
    this.currentSetIndex = document.querySelector('.current-link').dataset.index;
    this.lengthOfSet = cards[this.currentSetIndex].length;
    const randomArr = [...Array(this.lengthOfSet).keys()]
      .sort(() => Math.random() - 0.5);

    const audio = document.createElement('audio');
    audio.src = cards[this.currentSetIndex][randomArr[0]].audioSrc;
    audio.currentTime = 0;
    setTimeout(() => {
      audio.play();
    }, 1000);
  }
}

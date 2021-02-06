import Game from './gameComponent.js';

export default class Switcher {
  constructor() {
    this.modes = ['train', 'play'];
    this.mode = '';
    this.changeState = this.changeState.bind(this);
  }

  create() {
    const headerWrapper = document.querySelector('.header__wrapper');

    headerWrapper.insertAdjacentHTML('beforeend', `
      <div class='header-switcher'>
        <span class='header-switcher__mode train active'>${this.modes[0]}</span>
        <div class='header-button' id='button'>
          <input type='checkbox' class='header-button__checkbox'>
          <div class='header-button__knobs'></div>
          <div class='header-button__layer'></div>
        </div>
        <span class='header-switcher__mode play'>${this.modes[1]}</span>
      </div>
    `);

    const checkbox = document.querySelector('.header-button__checkbox');
    checkbox.addEventListener('click', this.changeState);
  }

  changeState() {
    this.play = document.querySelector('.play');
    this.train = document.querySelector('.train');
    this.mode = this.mode ? '' : 'playing';
    this.cardTitles = document.querySelectorAll('.card__title');
    this.cardTexts = document.querySelectorAll('.card__text');
    this.cardButtons = document.querySelectorAll('.card__button');

    this.train.classList.toggle('active');
    this.play.classList.toggle('active');
    const currentPage = document.querySelector('.current-link');
    let isMain;

    if (currentPage.innerHTML === 'Main page') {
      isMain = true;
    } else {
      isMain = false;
    }

    this.cardTitles.forEach((element) => {
      element.classList.toggle('playing');
      if (isMain) {
        element.classList.toggle('playing-main');
      }
    });

    this.cardTexts.forEach((element) => {
      if (!isMain) {
        element.classList.toggle('invisible');
      }
    });

    this.cardButtons.forEach((element) => {
      if (!isMain) {
        element.classList.toggle('invisible');
      }
    });

    if (!isMain) {
      const game = new Game();
      this.startButton = document.querySelector('.start-button');
      this.startButton.classList.toggle('invisible');
      this.startButton.addEventListener('click', game.startGame);
    }
  }
}

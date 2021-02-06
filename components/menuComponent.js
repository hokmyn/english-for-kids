import cards from '../data/cards';
import Card from './cardComponent';
import Game from './gameComponent';

export default class Menu {
  constructor() {
    this.cards = cards;
    this.menu = document.querySelector('.header-menu');
    this.hamburger = document.querySelector('.hamburger');
    this.overlay = document.querySelector('.overlay');
    this.mainList = document.querySelector('.main__list');
    this.currentPage = document.querySelector('.current-link');
    this.cardButtons = document.querySelectorAll('.card__button');
    this.isReverted = false;
    this.isGame = false;

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.renderSets = this.renderSets.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.playWord = this.playWord.bind(this);
    this.checkMode = this.checkMode.bind(this);
    this.rotateCard = this.rotateCard.bind(this);
  }

  create() {
    this.cards[0].forEach((element, index) => {
      this.menu.insertAdjacentHTML('beforeend', `
        <li class='header-menu__item'>
          <a href='#' class='header-menu__link' data-index=${index}>${element}</a>
        </li>
      `);
    });

    this.links = document.querySelectorAll('.header-menu__link');
    const arrLinks = [...this.links];

    for (let i = 0; i < arrLinks.length; i += 1) {
      arrLinks[i].addEventListener('click', (event) => {
        event.preventDefault();
        this.links.forEach((element) => {
          if (element.className.includes('current-link')) {
            element.classList.remove('current-link');
          }
        });
        event.target.classList.add('current-link');
        this.currentPage = event.target;
      });
      arrLinks[i].addEventListener('click', this.renderSets(i, arrLinks[i].innerText));
      arrLinks[i].addEventListener('click', this.closeMenu);
    }

    this.menu.firstElementChild.firstElementChild.classList.add('current-link');

    this.renderSets(0)();

    this.hamburger.addEventListener('click', this.toggleMenu);
    this.overlay.addEventListener('click', this.closeMenu);
  }

  renderSets(indexOfSet, title) {
    return function () {
      this.mainList.innerHTML = '';

      if (indexOfSet === 0) {
        this.cards[0].forEach((element, index) => {
          if (index !== 0) {
            const cardOfSet = new Card(this.cards[index][0].image, element);
            this.mainList.append(cardOfSet.card);
            cardOfSet.card.addEventListener('click', this.renderCards(index, element));
          }
        });
        this.currentPage = document.querySelector('.current-link');
        if (this.currentPage) {
          this.checkMode();
        }

        this.cardButtons = document.querySelectorAll('.card__button');
        this.cardButtons.forEach((element) => {
          element.classList.add('invisible');
        });
      } else {
        this.renderCards(indexOfSet, title)();
      }
    }.bind(this);
  }

  renderCards(indexOfSet, title = '') {
    return function () {
      this.mainList.innerHTML = '';

      this.cards[indexOfSet].forEach((element) => {
        const cardOfWord = new Card(element.image, element.word);
        this.mainList.append(cardOfWord.card);
        cardOfWord.card.addEventListener('click', this.playWord(element.audioSrc));
      });

      this.cardButtons = document.querySelectorAll('.card__button');

      this.cardButtons.forEach((element, index) => {
        element.addEventListener('click', this.rotateCard(indexOfSet, index));
      });

      this.links.forEach((element) => {
        if (element.className.includes('current-link')) {
          element.classList.remove('current-link');
        }
      });

      this.links.forEach((element) => {
        if (element.innerText === title) {
          element.classList.add('current-link');
          this.currentPage = element;
        }
      });
      this.checkMode();
    }.bind(this);
  }

  checkMode() {
    this.checkbox = document.querySelector('.header-button__checkbox');
    let isMain;

    if (this.currentPage.innerHTML === 'Main page') {
      isMain = true;
    } else {
      isMain = false;
    }

    if (this.checkbox && this.checkbox.checked) {
      const cardTitles = document.querySelectorAll('.card__title');
      const cardTexts = document.querySelectorAll('.card__text');
      const startButton = document.querySelector('.start-button');
      const game = new Game();
      const isStartBtnInvisible = startButton.classList.contains('invisible');

      cardTitles.forEach((element) => {
        element.classList.toggle('playing');
        if (isMain) {
          element.classList.toggle('playing-main');
        }
      });

      cardTexts.forEach((element) => {
        if (!isMain) {
          element.classList.toggle('invisible');
        }
      });

      this.cardButtons.forEach((element) => {
        element.classList.toggle('invisible');
      });

      if (isStartBtnInvisible) {
        startButton.classList.remove('invisible');
        startButton.addEventListener('click', game.startGame);
      } else if (isMain) {
        startButton.classList.add('invisible');
      }

      this.isGame = true;
    } else {
      this.isGame = false;
    }
  }

  playWord(audioSrc) {
    return function () {
      if (!this.isReverted && !this.checkbox.checked) {
        const audio = document.createElement('audio');
        audio.src = audioSrc;
        audio.currentTime = 0;
        audio.play();
      }
    }.bind(this);
  }

  rotateCard(indexOfSet, index) {
    return function (event) {
      event.stopPropagation();
      this.currentCard = event.target.parentNode.parentNode.parentNode;
      this.currentCard.classList.add('rotated');
      this.currentCardText = event.target.parentNode.previousSibling.previousSibling
        .firstElementChild;
      this.isReverted = true;

      this.currentCardText.innerText = this.cards[indexOfSet][index].translation;
      this.currentCard.addEventListener('mouseleave', () => {
        this.currentCard.classList.remove('rotated');
        this.currentCardText.innerText = this.cards[indexOfSet][index].word;
        this.isReverted = false;
      });
    }.bind(this);
  }

  toggleMenu() {
    this.menu.classList.toggle('visible');
    this.overlay.classList.toggle('active');
    this.hamburger.classList.toggle('rotated');
  }

  closeMenu() {
    this.menu.classList.remove('visible');
    this.overlay.classList.remove('active');
    this.hamburger.classList.remove('rotated');
  }
}

export default class Card {
  constructor(src, title) {
    this.src = src;
    this.title = title;
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.insertAdjacentHTML('beforeend', `
      <div class='flipper'>
        <div class='image-wrap'>
          <img src=${src} class='card__img'>
        </div>
        <div class='card__title'>
          <span class='card__text'>${title}</span>
        </div>
        <div class='card__button'>
          <img src='../assets/images/arrow.jpg' class='card-button__image'>
        </div>
      </div>
    `);
  }
}

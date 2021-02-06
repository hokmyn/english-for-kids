/* eslint-disable import/extensions */
import Menu from './components/menuComponent.js';
import Switcher from './components/switcherComponent.js';
import Game from './components/gameComponent.js';

const menu = new Menu();
const switcher = new Switcher();
const game = new Game();

menu.create();
switcher.create();
game.init();

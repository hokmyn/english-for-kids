import Menu from '/components/menuComponent';
import Switcher from '/components/switcherComponent';
import Game from '/components/gameComponent';

const menu = new Menu();
const switcher = new Switcher();
const game = new Game();

menu.create();
switcher.create();
game.init();

import FullPage from './components/full-page/index';

const fullPage = new FullPage('#full-page');
fullPage.init();

const burgerButton = document.querySelector('.burger-button');
const menuNode = document.querySelector('.main-menu');
burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('burger-button_close');
    menuNode.classList.toggle('visually-hidden');
});
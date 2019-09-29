import {ESliderDirection} from './slider-direction';

/** Вертикальное переключение слайдов по скроллу */
class FullPage {
    /**
     * @param {string} selector - селектор компонента
     */
    constructor(selector) {
        this._container = document.querySelector(selector);
        this._slides = this._container.querySelectorAll('.slide');

        document.body.style.overflow = 'hidden';

        this._duration = 1000;
        this._isHold = false;

        this._container.style.transform = 'translateY(0)';
        this._container.style.transition = `${this._duration}ms cubic-bezier(0.5, 0, 0.5, 1)`;


        this._onWindowResize = this._onWindowResize.bind(this);
        this._onContainerScroll = this._onContainerScroll.bind(this);
    }

    init() {
        this._stretchSlides();
        this._container.addEventListener('wheel', this._onContainerScroll);
        window.addEventListener('resize', this._onWindowResize);
    }

    destroy() {
        this._container.removeEventListener('wheel', this._onContainerScroll);
        window.removeEventListener('resize', this._onWindowResize);
    }

    /**
     * Растягивает слайды на весь вьюпорт.
     */
    _stretchSlides() {
        const {
            innerWidth: width,
            innerHeight: height
        } = window;

        [...this._slides].forEach((slide) => {
            slide.style.width = `${width}px`;
            slide.style.height = `${height}px`;
        });
    }

    /**
     * Обработчик ресайза вьюпорта.
     */
    _onWindowResize() {
        this._stretchSlides();
    }

    /**
     * Обработчик скролла по компоненту.
     * @param {Object} e
     */
    _onContainerScroll(e) {
        e.stopPropagation();

        const direction = (e.deltaY < 0) ?
            ESliderDirection.DOWN :
            ESliderDirection.UP;
        const step = 100;
        const {length: slidesLength} = this._slides;
        const oneVhInPixels = window.innerHeight / 100;
        const containerHeightInVh = parseInt(this._container.offsetHeight / oneVhInPixels);
        const slideBeforeLastY = containerHeightInVh - containerHeightInVh / slidesLength;
        let translateY = parseInt(this._container.style.transform.replace('translateY(', ''));

        const isNotOutOfDownBound = Math.abs(translateY) < slideBeforeLastY;
        const isNotOutOfUpBound = translateY < 0;
        if (direction === ESliderDirection.UP && isNotOutOfDownBound) {
            translateY -= step;
        } else if (direction === ESliderDirection.DOWN && isNotOutOfUpBound) {
            translateY += step;
        }
        
        if (!this._isHold) {
            this._isHold = true;
            this._container.style.transform = `translateY(${translateY}vh)`;
            setTimeout(() => {
                this._isHold = false;
            }, this._duration);
        }
    }
}

export default FullPage;
import BUS from '../const/BUS';
import AutoSlide from './slides/AutoSlide';
import SearchSlide from './slides/SearchSlide';

const Slide = {
    init () {
        this.listen();

        const autoSlide = ((autoSlide) => {
            autoSlide.init();
        })(AutoSlide);

        const searchSlide = ((searchSlide) => {
            searchSlide.init();
        })(SearchSlide);
    },

    listen () {
        Array.from(document.querySelectorAll('.move')).map(item => {
            item.addEventListener('click', (e) => this.move(e));
        });

        BUS.addEventListener('SLIDE::move', (e) => this.move(e));
        BUS.addEventListener('SLIDE::prepareSlides', () => this.prepareSliders());
        BUS.addEventListener('SLIDE::replaceActiveElement', (e) => this.replaceActiveElement(e));
    },

    slide (list, direction) {
        let currentItem = list.querySelector('.active');

        if (direction === 'up') {
            if (currentItem.nextElementSibling) {
                currentItem.classList.remove('active');
                currentItem.nextElementSibling.classList.add('active');
            }
        } else {
            if (currentItem.previousElementSibling) {
                currentItem.classList.remove('active');
                currentItem.previousElementSibling.classList.add('active');
            }
        }    
        
        BUS.dispatchEvent(new CustomEvent('LIST::update', {detail: {list: list}}));
    },

    prepareSliders () {
        const itemList = document.querySelectorAll('.item-list');
        const itemsList = document.querySelectorAll('.items-list');
        const slides = Array.from(itemList).concat(Array.from(itemsList));
        for (let slide of slides) {
            slide.children[0] ? slide.children[0].classList.add('active') : null;
            BUS.dispatchEvent(new CustomEvent('LIST::update', {detail: {list: slide}}));
        }
    },

    move (event) {
        let direction;
        let list;

        if (isNaN(event.detail)) {
            direction = event.detail.direction;
            list = event.detail.list;
        } else {
            event.target.classList.contains('up') ? direction = 'up' : direction = 'down';

            let parentNodes = event.target.parentNode;
            let container = parentNodes.querySelector('.container');
            if (!container) {
                if (!parentNodes.parentNode.classList.contains('container')) {
                    container = parentNodes.parentNode.querySelector('.container');
                } else {
                    container = parentNodes.parentNode;
                }
            }
            if (container.querySelector('.items-list')) {
                list = container.querySelector('.items-list');
            } else {
                list = container.querySelector('.item-list');
            }
        }
        this.slide(list, direction);
    },

    replaceActiveElement (event) {
        for (const item of event.detail.list.children) {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            }
        }
        event.detail.el.classList.add('active');
    },
};

export default Slide;
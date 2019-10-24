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

        BUS.addEventListener('SLIDE::prepareSlides', () => this.prepareSliders());
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
        if (event.target.classList.contains('move')) {
            event.target.classList.contains('up') ? direction = 'up' : direction = 'down';
        }

        let parentNodes = event.target.parentNode;
        if (!parentNodes.classList.contains('slide-points')) {
            let container = parentNodes.querySelector('.container');
            if (!container) {
                if (!parentNodes.parentNode.classList.contains('container')) {
                    container = parentNodes.parentNode.querySelector('.container');
                } else {
                    container = parentNodes.parentNode;
                }
            }
            let list;
            container.querySelector('.items-list') ? list = container.querySelector('.items-list') : list = container.querySelector('.item-list');
    
            this.slide(list, direction);
        } else {
            this.slide(parentNodes, direction);
        }
    },
};

export default Slide;
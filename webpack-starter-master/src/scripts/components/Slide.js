import BUS from '../const/BUS';
import { setInterval } from 'timers';

const Slide = {
    init () {
        Array.from(document.querySelectorAll('.move')).map(item => {
            item.addEventListener('click', (e) => this.move(e));
        });

        this.hideUnactiveElements();
        this.launchAutoSlides();        
    },

    slide (list, direction, auto = false) {

        let currentItem = list.querySelector('.active');

        if (!auto) {
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
        } else {
            if (!currentItem.nextElementSibling) {
                currentItem = list.children[0];
                currentItem.classList.add('active');
                currentItem.nextElementSibling.classList.remove('active');
            } else {
                currentItem.classList.remove('active');
                currentItem.nextElementSibling.classList.add('active');
            }
        }
        
        this.updateDOM(list);
    },

    updateDOM (list) {
        for (let child of list.children) {
            if (child.classList.contains('active')) {
                child.style.display = 'flex';
            } else {
                child.style.display = 'none';
            }
        }
    },

    hideUnactiveElements () {
        const itemList = document.querySelectorAll('.item-list');
        const itemsList = document.querySelectorAll('.items-list');
        const slides = Array.from(itemList).concat(Array.from(itemsList));
        for (let slide of slides) {
            console.log(slide);
            console.log(slide.children);
            slide.children[0].classList.add('active');
            for (let child of slide.children) {
                if (!child.classList.contains('active')) {
                    child.style.display = 'none';
                }
            }
        }
    },

    launchAutoSlides () {
        let slideAutos = document.querySelectorAll('.auto');
        for (let slideAuto of slideAutos) {
            setInterval(() => {
                this.slide(slideAuto, null,  true);
            }, 3000);
        }
    },

    move (event) {
        let direction;
        if (event.target.classList.contains('move')) {
            event.target.classList.contains('up') ? direction = 'up' : direction = 'down';
        }

        let parentNodes = event.target.parentNode;
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
    }
};

export default Slide;
import BUS from '../const/BUS';
import { setInterval } from 'timers';

const Slide = {
    init () {
        this.hideUnactiveElements();
        this.launchAutoSlides();        
        BUS.addEventListener('MOVE::LIST', (e) => this.slideList(e));
    },

    slideList (event, auto = false, list = null) {

        let currentList;
        auto ? currentList = list : currentList = event.detail.list;

        let currentItem = currentList.querySelector('.active');

        if (!auto) {
            if (event.detail.direction === 'up') {
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
                currentItem = currentList.children[0];
                currentItem.classList.add('active');
                currentItem.nextElementSibling.classList.remove('active');
            } else {
                currentItem.classList.remove('active');
                currentItem.nextElementSibling.classList.add('active');
            }
        }
        
        this.updateDOM(currentList);
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
                this.slideList(null, true, slideAuto);
            }, 3000);
        }
    },
};

export default Slide;
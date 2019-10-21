import BUS from '../const/BUS';
import { setInterval } from 'timers';

const Slide = {
    init () {
        Array.from(document.querySelectorAll('.move')).map(item => {
            item.addEventListener('click', (e) => this.move(e));
        });

        Array.from(document.querySelectorAll('.point')).map(item => {
            item.addEventListener('click', (e) => this.activate(e));
        });

        BUS.addEventListener('DOM::UPDATE', (e) => this.updateDisplayProperties(e.detail));

        this.prepareSlides();
        this.showCorrespondingItem();
        this.launchAutoSlides();        
    },

    slide (list, direction, auto = false) {

        let currentItem = list.querySelector('.active');
        const heroSection = document.querySelector('.hero-section');

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
                const bgColor = currentItem.querySelector('.product-bg-color');
                bgColor ? heroSection.style.backgroundColor = bgColor.textContent : null;
            } else {
                currentItem.classList.remove('active');
                currentItem.nextElementSibling.classList.add('active');
                const bgColor = currentItem.nextElementSibling.querySelector('.product-bg-color');
                bgColor ? heroSection.style.backgroundColor = bgColor.textContent : null;
            }
        }
        
        this.updateDisplayProperties(list);
    },

    updateDisplayProperties (list) {
        for (let child of list.children) {
            if (child.classList.contains('active')) {
                child.style.display = 'flex';
            } else {
                child.style.display = 'none';
            }
        }
    },

    prepareSlides () {
        const itemList = document.querySelectorAll('.item-list');
        const itemsList = document.querySelectorAll('.items-list');
        const slidesPoints = document.querySelectorAll('.slide-points');
        const slides = Array.from(itemList).concat(Array.from(itemsList)).concat(Array.from(slidesPoints));
        for (let slide of slides) {
            slide.children[0].classList.add('active');
            if (!slide.classList.contains('slide-points')) {
                this.updateDisplayProperties(slide);
            } else {
                for (let point of slide.children) {
                    const id = point.id.match(/\d+$/)[0];
                    const productAssociated = document.querySelector('#product'+id);
                    const productAssociatedImg = productAssociated.querySelector('.product-img');
                    point.style.backgroundImage = "url("+ productAssociatedImg.src +")";
                    if (productAssociatedImg.src.includes('bike2')){
                        point.style.backgroundPosition = "1px 40%";
                    }
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

    replaceActiveElement (el, list) {
        for (const item of list.children) {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            }
        }
        el.classList.add('active');
    },

    activate (event) {
        const list = event.target.parentNode;
        this.replaceActiveElement(event.target, list);
        this.showCorrespondingItem();
    },

    showCorrespondingItem () {
        const slidesPoints = document.querySelectorAll('.slide-points');

        for (let slidePoints of slidesPoints) {
            const currentActiveItem = slidePoints.querySelector('.active');
            const id = currentActiveItem.id.match(/\d+$/)[0];
            const productToDisplay = document.querySelector('#product'+id);
            const list = productToDisplay.parentNode;
            this.replaceActiveElement(productToDisplay, list);
            this.updateDisplayProperties(list);
        }
    }
};

export default Slide;
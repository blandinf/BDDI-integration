import { interval } from '../../tools/interval';
import BUS from '../../const/BUS';


const AutoSlide = {
    init() {
        // this.launchAutoSliders();        
    },

    launchAutoSliders () {
        let sliders = document.querySelectorAll('.auto');
        for (let slider of sliders) {
            interval(() => {
                this.slide(slider);
            }, 3000, 5);
        }
    },

    slide (list) {
        let currentItem = list.querySelector('.active');
        const heroSection = document.querySelector('.hero-section');

        if (!currentItem.nextElementSibling) {
            currentItem.classList.remove('active');
            currentItem = list.children[0];
            currentItem.classList.add('active');
            const bgColor = currentItem.querySelector('.product-bg-color');
            bgColor ? heroSection.style.backgroundColor = bgColor.textContent : null;
        } else {
            currentItem.classList.remove('active');
            currentItem.nextElementSibling.classList.add('active');
            const bgColor = currentItem.nextElementSibling.querySelector('.product-bg-color');
            bgColor ? heroSection.style.backgroundColor = bgColor.textContent : null;
        }
        
        BUS.dispatchEvent(new CustomEvent('LIST::update', {detail: {list: list}}));
    },
};

export default AutoSlide;
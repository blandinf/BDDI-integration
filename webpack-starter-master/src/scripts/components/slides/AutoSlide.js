import { interval } from '../../tools/interval';
import BUS from '../../const/BUS';


const AutoSlide = {
    init() {
        this.launchAutoSliders();
    },

    launchAutoSliders () {
        let sliders = document.querySelectorAll('.auto');
        for (let slider of sliders) {
            interval(() => {
                if (slider.classList.contains('auto')) {
                    this.slide(slider);
                }
            }, 3600, 50);
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

        if(!list.classList.contains('slide-points')) {
            BUS.dispatchEvent(new CustomEvent('LIST::update', {detail: {list: list}}));
        } else {
            BUS.dispatchEvent(new CustomEvent('SEARCH-SLIDE::show'));
        }
    },
};

export default AutoSlide;
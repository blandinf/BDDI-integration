import BUS from "../../const/BUS";
import anime from 'animejs/lib/anime.es.js';

const HeaderList = {
    list: document.querySelector('.nav-links'),

    init () {
        for (let link of this.list.children) {
            link.addEventListener('click', (e) => this.onClick(e));
        }
    },

    onClick (event) {
        BUS.dispatchEvent(new CustomEvent('SLIDE::replaceActiveElement', {detail: {el: event.target, list: this.list}}));
    },
};

export default HeaderList;
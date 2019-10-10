import BUS from '../const/BUS';

const Slide = {
    init () {
        BUS.addEventListener('MOVE::ITEM', (e) => this.slideItem(e));
        BUS.addEventListener('MOVE::LIST', (e) => this.slideList(e));
    },

    slideItem (event) {
        console.log(event.detail);
    },

    slideList (event) {
        console.log(event.detail);
    },
};

export default Slide;
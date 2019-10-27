import BestSellerItem from "../items/BestSellerItem";
import BUS from '../../const/BUS';

const BestSellerList = {
    section: document.querySelector('.best-seller-section'),
    template: document.querySelector('#best-seller-template'),
    xDown: null,
    yDown: null,

    init (models) {
        BUS.addEventListener('BEST::TemplateInnerHTML', (e) => this.fillItemWithInnerHTML(e));
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.preset(models);

        let item;
        for (let model of models) {
            item = new BestSellerItem();
            item.build(model);
            this.appendItemInRightList(item);
        }
    },

    fillItemWithInnerHTML (event) {
        event.detail.el.innerHTML = this.template.innerHTML; 
    },

    preset (models) {
        const divsNumberRequire = Math.ceil(models.length/5);
        let i;
        for (i=0; i < divsNumberRequire; i++) {
            const div = document.createElement('div');
            div.classList.add('products-list');
            div.classList.add('list');
            this.section.querySelector('.items-list').append(div);
        }
    },

    appendItemInRightList (item) {
        const lists = this.section.querySelector('.items-list').querySelectorAll('.list');
        for (const list of Array.from(lists).reverse()) {
            if (list.children.length < 5) {
                list.append(item.el);
            }
        }
    },

    getTouches (event) {
        return event.touches || event.originalEvent.touches;
    },

    handleTouchStart (event) {
        const firstTouch = this.getTouches(event)[0];
        this.xDown = firstTouch.clientX;
        this.yDown = firstTouch.clientY;
    },

    handleTouchMove (event) {
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }

        let xUp = event.touches[0].clientX;
        let yUp = event.touches[0].clientY;

        let xDiff = this.xDown - xUp;
        let yDiff = this.yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            let direction;
            xDiff > 0 ? direction = 'up' : direction = 'down';
            BUS.dispatchEvent(new CustomEvent('SLIDE::move', {detail: {list: this.section.querySelector('.items-list'), direction: direction }}));
        }
        this.xDown = null;
        this.yDown = null;
    }

};

export default BestSellerList;
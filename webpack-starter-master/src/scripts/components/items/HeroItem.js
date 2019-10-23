import BUS from '../../const/BUS';

class HeroItem {
    constructor () {
        this.el = null;
        this.model = {};
    }

    init (el, data) {
        this.el = el;

        this.bgColor = this.el.querySelector('.product-bg-color');
        this.imgPath = this.el.querySelector('.product-img');
        this.title = this.el.querySelector('.product-title');
        this.description = this.el.querySelector('.product-description');
        this.color = this.el.querySelector('.product-color');

        if (data) {
            this.fill(data);
        }
    }

    fill (data) {
        this.model = data;
        this.bgColor ? this.bgColor.textContent = this.model.hero.color : null;
        this.imgPath.src += this.model.images.big;
        this.title.textContent = this.model.title;
        this.description.textContent = 'Taille ' + this.model.specs.size + ' - ' + this.model.specs.engine;
        this.color.textContent = this.model.specs.color;
    }

    build (data) {
        this.el = document.createElement('article');
        this.el.classList.add('product');
        this.el.classList.add('item');
        BUS.dispatchEvent(new CustomEvent('HERO::TemplateInnerHTML', {detail: {el: this.el}}));
        this.init(this.el, data);
    }
}


export default HeroItem;
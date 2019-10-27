import BUS from '../../const/BUS';
import { truncate } from "../../utils/utils";

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
        this.action = this.el.querySelector('.btn-action');

        if (data) {
            this.fill(data);
        }

        this.truncate();
    }

    fill (data) {
        this.model = data;
        this.bgColor ? this.bgColor.textContent = this.model.hero.color : null;
        this.imgPath.src += this.model.images.big;
        this.title.textContent = this.model.title;
        this.description.textContent = 'Taille ' + this.model.specs.size + ' - ' + this.model.specs.engine;
        this.color.textContent = this.model.specs.color;
        this.action.href = this.model.slug;
    }

    build (data) {
        this.el = document.createElement('article');
        this.el.classList.add('product');
        this.el.classList.add('item');
        BUS.dispatchEvent(new CustomEvent('HERO::TemplateInnerHTML', {detail: {el: this.el}}));
        this.init(this.el, data);
    }

    truncate () {
        truncate(this.title, 22);
        truncate(this.description, 35);
        truncate(this.color, 35);
    }
}


export default HeroItem;
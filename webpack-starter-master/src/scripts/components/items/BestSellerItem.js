import BUS from '../../const/BUS';

class BestSellerItem {
    constructor () {
        this.el = null;
        this.model = {};
    }

    init (el, data) {
        this.el = el;

        this.imgPath = this.el.querySelector('.product-img');
        this.title = this.el.querySelector('.product-title');
        this.description = this.el.querySelector('.product-description');
        this.stock = this.el.querySelector('.stock');
        this.stockBar = this.el.querySelector('.stock-bar');

        if (data) {
            this.fill(data);
        }
    }

    fill (data) {
        this.model = data;
        this.imgPath.src += this.model.images.small;
        this.title.textContent = this.model.title;
        this.description.textContent = 'Taille ' + this.model.specs.size + ' - ' + this.model.specs.engine;
        this.stock.textContent = this.model.stock + ' en stock';
        if (this.model.stock > 1) {
            this.stock.classList.add('in-stock');
            this.stockBar.classList.add('in-stock-bar');
        } else {
            this.stock.classList.add('out-stock');
            this.stockBar.classList.add('out-stock-bar');
        }
    }

    build (data) {
        this.el = document.createElement('article');
        this.el.classList.add('product');
        BUS.dispatchEvent(new CustomEvent('BEST::TemplateInnerHTML', {detail: {el: this.el}}));
        this.init(this.el, data);
    }
}


export default BestSellerItem;
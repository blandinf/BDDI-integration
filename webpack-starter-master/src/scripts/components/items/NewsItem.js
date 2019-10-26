import BUS from '../../const/BUS';

class NewsItem {
    constructor () {
        this.el = null;
        this.model = {};
    }

    init (el, data) {
        this.el = el;

        this.imgPath = this.el.querySelector('.product-img');
        this.title = this.el.querySelector('.product-title');
        this.description = this.el.querySelector('.product-description');

        if (data) {
            this.fill(data);
        }
    }

    fill (data) {
        this.model = data;
        this.imgPath.src += this.model.images.big;
        this.title.textContent = this.model.title;
        this.description.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non eleifend velit. Aliquam imperdiet mollis lorem a tempor. Duis condimentum sem eu risus faucibus, nec laoreet leo pellentesque. Etiam lorem ex, hendrerit nec erat at, gravida eleifend orci. ";
    }

    build (data, index) {
        this.el = document.createElement('article');
        this.el.classList.add('product');
        this.el.classList.add('item');
        this.el.setAttribute('id', 'product'+ index);
        BUS.dispatchEvent(new CustomEvent('NEWS::TemplateInnerHTML', {detail: {el: this.el}}));
        this.init(this.el, data);
    }
}


export default NewsItem;

import BUS from '../const/BUS';

class ListItem {
    constructor () {
        this.item = null;
        this.model = {};
    }
    init (item, data) {
        this.item = item;

        this.bgColor = this.item.querySelector('.product-bg-color');
        this.imgPath = this.item.querySelector('.product-img');
        this.title = this.item.querySelector('.product-title');
        this.description = this.item.querySelector('.product-description');
        this.color = this.item.querySelector('.product-color');

        if (data) {
            this.fill(data);
        }

        return this.item;
    }

    fill (data) {
        this.model = data;
        this.bgColor ? this.bgColor.textContent = this.model.hero.color : null;
        this.imgPath.src += this.model.images.big;
        this.title.textContent = this.model.title;
        this.description.textContent = 'Taille ' + this.model.specs.size + ' - ' + this.model.specs.engine;
        // this.color.textContent = this.model.specs.color;
    }
}

export default ListItem;
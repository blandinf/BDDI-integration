import BestSellerItem from "../items/BestSellerItem";
import BUS from '../../const/BUS';

const BestSellerList = {
    section: document.querySelector('.best-seller-section'),
    template: document.querySelector('#best-seller-template'),

    init (models) {
        BUS.addEventListener('BEST::TemplateInnerHTML', (e) => this.fillItemWithInnerHTML(e));
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
            div.classList.add('best-seller-list');
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
    }

};

export default BestSellerList;
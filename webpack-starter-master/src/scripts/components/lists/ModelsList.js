import BestSellerItem from "../items/BestSellerItem";
import BUS from '../../const/BUS';

const BestSellerList = {
    section: document.querySelector('.models-section'),
    template: document.querySelector('#best-seller-template'),

    init (models) {
        this.listen();
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

    listen () {
        BUS.addEventListener('BEST::TemplateInnerHTML', (e) => this.fillItemWithInnerHTML(e));
        document.querySelector('#seeAllModels').addEventListener('click', (e) => this.toggleModels(e));
        document.querySelector('#search-input').addEventListener('keyup', (e) => this.filterModels(e));
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
    },

    toggleModels (event, block = false) {
        const list = this.section.querySelector('.items-list');
        let icon = document.createElement('i');
        
        let target = null;
        event.target.classList.contains('.btn-action') ? target = event.target : target = document.querySelector('#seeAllModels');

        if (!target.classList.contains('active') || block) {
            target.classList.add('active');
            icon.classList.add('arrow');
            icon.classList.add('up');
            target.textContent = 'voir moins de modèles';

            for (let child of list.children) {
                child.classList.add('active');
            }
        } else {
            target.classList.remove('active');
            icon.classList.add('arrow');
            icon.classList.add('bottom');
            target.textContent = 'voir tous les modèles';

            for (let child of list.children) {
                if (child.previousSibling.tagName === 'DIV') {
                    child.classList.remove('active');
                }
            }
        }
        target.prepend(icon);

        BUS.dispatchEvent(new CustomEvent('LIST::update', {detail: {list: list}}));
    },

    
    filterModels (event) {
        const products = this.section.querySelectorAll('.product');
        const lists = this.section.querySelector('.items-list').querySelectorAll('.list');
        this.toggleModels(event, true);
        if (event.target.value) {
            for (let product of products) {
                const title = product.querySelector('.product-title').textContent.toLowerCase();
                if (title.indexOf(event.target.value.toLowerCase()) > -1) {
                    product.style.display = 'flex';
                } else {
                    product.style.display = 'none';
                }
            }
        } else {
            this.toggleModels(event);
            for (const list of Array.from(lists)) {
                for (let child of list.children) {
                    child.style.display = 'flex';
                }
            }
        }
    }

};

export default BestSellerList;

import  BUS from '../const/BUS';

import ListItem from './ListItem';

const List = {
    init () {
        document.querySelector('#seeAllModels').addEventListener('click', (e) => this.toggleModels(e));
        document.querySelector('#search-input').addEventListener('keyup', (e) => this.filterModels(e));
        this.loadDatas();
    },

    loadDatas () {
        const req = new XMLHttpRequest();
        req.open('GET', '/models.json', false); 
        req.send(null);

        if (req.status === 200) {
            const modelsParsed = JSON.parse(req.responseText);
            const modelsOnBestSellerLength = modelsParsed.filter(model => model.best).length;
            const divsNumberRequire = Math.ceil(modelsOnBestSellerLength/5);
            
            const bestSellerSection = document.querySelector('.best-seller-section');
            const modelsSection = document.querySelector('.models-section');
            const modelsList = modelsSection.querySelector('.items-list');
            const bestSellerList = bestSellerSection.querySelector('.items-list'); 
            for (let i=0; i < divsNumberRequire; i++) {
                const div = document.createElement('div');
                div.classList.add('best-seller-list');
                div.classList.add('list');
                bestSellerList.append(div);
                modelsList.append(div.cloneNode(true));
            }
            const newsSection = document.querySelector('.news-section');
            const newsList = newsSection.querySelector('.slide-points');
            const self = this;
            modelsParsed.forEach(function(model, index) {
                if (model.hero.active) {
                    const template = document.querySelector('#hero-template');
                    const section = document.querySelector('.hero-section');
                    const list = section.querySelector('.item-list');
                    self.buildElement(template, list, model);
                } 
                if (model.best) {
                    const template = document.querySelector('#best-seller-template');
                    const bestSellerList = bestSellerSection.querySelector('.items-list'); 
                    const modelsList = modelsSection.querySelector('.items-list'); 
                    self.buildElement(template, bestSellerList, model);
                    self.buildElement(template, modelsList, model);
                }
                if (model.news) {
                    const template = document.querySelector('#news-template');
                    const section = document.querySelector('.news-section');
                    const list = section.querySelector('.item-list');
                    const point = document.createElement('div');
                    point.classList.add('point');
                    point.setAttribute('id', 'point'+index);
                    newsList.append(point);
                    self.buildElement(template, list, model, true, index);
                }
            });
        } else {
            console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
        }
    },

    buildElement (template, list, model, withId = false, index = null) {
        const el = document.createElement('article');
        el.classList.add('product');
        withId ? el.setAttribute('id', 'product'+ index) : null;
        list.classList.contains('item-list') ? el.classList.add('item') : '';

        el.innerHTML = template.innerHTML;
        const item = new ListItem().init(el, model);
        if (list.classList.contains('item-list')) {
            list.append(item);
        } else {
            const lists = list.querySelectorAll('.list');
            for (const list of Array.from(lists).reverse()) {
                if (list.children.length < 5) {
                    list.append(item);
                }
            }
        }
    },

    toggleModels (event, block = false) {
        const section = document.querySelector('.models-section');
        const list = section.querySelector('.items-list');
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

        BUS.dispatchEvent(new CustomEvent('DOM::UPDATE', {detail: list}));
    },

    filterModels (event) {
        const section = document.querySelector('.models-section');
        const products = section.querySelectorAll('.product');
        const itemsList = section.querySelector('.items-list');
        const lists = itemsList.querySelectorAll('.list');
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

export default List;
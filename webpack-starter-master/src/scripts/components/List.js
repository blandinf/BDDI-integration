
import  BUS from '../const/BUS';

import ListItem from './ListItem';

const List = {
    init () {
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
            const bestSellerList = bestSellerSection.querySelector('.items-list'); 
            for (let i=0; i < divsNumberRequire; i++) {
                const div = document.createElement('div');
                div.classList.add('best-seller-list');
                div.classList.add('list');
                bestSellerList.append(div);
            }
            const newsSection = document.querySelector('.news-section');
            const newsList = newsSection.querySelector('.slide-points');
            const self = this;
            modelsParsed.forEach(function(model, index) {
                if (model.hero) {
                    const template = document.querySelector('#hero-template');
                    const section = document.querySelector('.hero-section');
                    const list = section.querySelector('.item-list');
                    self.buildElement(template, list, model);
                } 
                if (model.best) {
                    const template = document.querySelector('#best-seller-template');
                    const section = document.querySelector('.best-seller-section');
                    const list = section.querySelector('.items-list'); 
                    self.buildElement(template, list, model);
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
};

export default List;
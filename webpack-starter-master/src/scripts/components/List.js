
import  BUS from '../const/BUS';

import ListItem from './ListItem';

const List = {
    init () {
        this.test = true;
        this.loadDatas();
    },

    loadDatas () {
        const req = new XMLHttpRequest();
        req.open('GET', '/models.json', false); 
        req.send(null);

        if (req.status === 200) {
            const modelsParsed = JSON.parse(req.responseText);
            console.log(modelsParsed);
            for (const model of modelsParsed) {
                if (model.hero) {
                    let template = document.querySelector('#hero-template');
                    let section = document.querySelector('.hero-content');
                    this.buildElement(template, section, model);
                } 
                if (model.best) {
                    let template = document.querySelector('#best-seller-template');
                }
            }
        } else {
            console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
        }
    },

    buildElement (template, section, model) {
        let el = document.createElement('article');
        el.classList.add('product');
        el.classList.add('item');
        el.innerHTML = template.innerHTML;
        let item;
        item = new ListItem().init(el, model);
        section.append(item);
    }
};

export default List;
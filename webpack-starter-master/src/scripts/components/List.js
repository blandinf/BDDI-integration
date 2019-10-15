
import  BUS from '../const/BUS';

import ListItem from './ListItem';

const List = {
    init () {
        this.loadDatas();
        let newItem;
        Array.from(document.querySelectorAll('.move')).map(item => {
            newItem = new ListItem();
            newItem.init(item);
        });
    },

    loadDatas () {
        const req = new XMLHttpRequest();
        req.open('GET', '/models.json', false); 
        req.send(null);

        if (req.status === 200) {
            const modelsParsed = JSON.parse(req.responseText);
            console.log(modelsParsed);
            for (const modelParsed of modelsParsed) {
                if (modelParsed.hero) {
                    let template = document.querySelector('#hero-template');
                    this.buildElement(template);
                } 
                if (modelParsed.best) {
                    let template = document.querySelector('#best-seller-template');

                }
            }
        } else {
            console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
        }
    },

    buildElement (template) {
        let el = document.createElement('article');
        el.innerHTML = template.innerHTML;
        
    }
};

export default List;
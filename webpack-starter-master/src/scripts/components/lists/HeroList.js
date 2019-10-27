import HeroItem from "../items/HeroItem";
import BUS from '../../const/BUS';

const HeroList = {
    section: document.querySelector('.hero-section'),
    template: document.querySelector('#hero-template'),

    init (models) {
        BUS.addEventListener('HERO::TemplateInnerHTML', (e) => this.fillItemWithInnerHTML(e));

        let item;
        for (let model of models) {
            item = new HeroItem();
            item.build(model);
            this.section.querySelector('.item-list').append(item.el);
        }
    },

    fillItemWithInnerHTML (event) {
        event.detail.el.innerHTML = this.template.innerHTML; 
    },

};

export default HeroList;
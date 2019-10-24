import NewsItem from "../items/NewsItem";
import BUS from '../../const/BUS';

const NewsList = {
    section: document.querySelector('.news-section'),
    template: document.querySelector('#news-template'),

    init (models) {
        BUS.addEventListener('NEWS::TemplateInnerHTML', (e) => this.fillItemWithInnerHTML(e));
        
        let self = this;
        let item;
        models.forEach(function(model, index) {
            const point = document.createElement('div');
            point.classList.add('point');
            point.setAttribute('id', 'point'+index);
            self.section.querySelector('.slide-points').append(point);
            item = new NewsItem();
            item.build(model, index);
            self.section.querySelector('.item-list').append(item.el);
        });

        BUS.dispatchEvent(new CustomEvent('SLIDE::AddPointsEvents'));
    },

    fillItemWithInnerHTML (event) {
        event.detail.el.innerHTML = this.template.innerHTML; 
    },
};

export default NewsList;
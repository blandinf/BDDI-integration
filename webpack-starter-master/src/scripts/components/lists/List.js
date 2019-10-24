
import BUS from '../../const/BUS';
import ListItem from '../items/ListItem';
import HeroList from '../lists/HeroList';
import BestSellerList from '../lists/BestSellerList';
import NewsList from '../lists/NewsList';
import ModelsList from '../lists/ModelsList';

const List = {
    el: null,
    init () {
        BUS.addEventListener('LIST::update', (e) => this.update(e.detail.list));
        this.loadDatas();
    },

    loadDatas () {
        const req = new XMLHttpRequest();
        req.open('GET', '/models.json', false); 
        req.send(null);

        if (req.status === 200) {
            const modelsParsed = JSON.parse(req.responseText);
            const heroModels = modelsParsed.filter(model => model.hero.active);
            const bestModels = modelsParsed.filter(model => model.best);
            const newsModels = modelsParsed.filter(model => model.news);

            const heroList = ((heroList) => {
                heroList.init(heroModels);
            })(HeroList);

            const bestSellerList = ((bestSellerList) => {
                bestSellerList.init(bestModels);
            })(BestSellerList);

            const newsList = ((newsList) => {
                newsList.init(newsModels);
            })(NewsList);

            const modelsList = ((modelsList) => {
                modelsList.init(bestModels);
            })(ModelsList);

            BUS.dispatchEvent(new CustomEvent('SLIDE::prepareSlides'));
        } else {
            console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
        }
    },

    update (list) {
        for (let child of list.children) {
            if (child.classList.contains('active')) {
                child.style.display = 'flex';
            } else {
                child.style.display = 'none';
            }
        }
    },
};

export default List;
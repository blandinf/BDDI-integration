import '../styles/index.scss';
import './utils/behaviors';

import Slide from './components/Slide';
import List from './components/lists/List';

const app = ((slide, list) => {
    slide.init();
    list.init();
})(Slide, List);




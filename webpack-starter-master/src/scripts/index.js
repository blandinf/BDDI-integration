import '../styles/index.scss';

import Slide from './components/Slide';
import List from './components/List';

const app = ((slide, list) => {
    list.init();
    slide.init();
})(Slide, List);
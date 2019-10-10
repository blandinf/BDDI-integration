import '../styles/index.scss';

import Slide from './components/Slide';
import List from './components/List';

const app = ((slide, list) => {
    slide.init();
    list.init();
})(Slide, List);
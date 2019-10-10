
import  BUS from '../const/BUS';

import ListItem from './ListItem';

const List = {
    init () {
        let newItem;
        Array.from(document.querySelectorAll('.move')).map(item => {
            newItem = new ListItem();
            ListItem.init(item);
        });
    }
};

export default List;
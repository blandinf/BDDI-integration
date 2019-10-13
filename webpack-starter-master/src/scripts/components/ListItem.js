
import BUS from '../const/BUS';

class ListItem {
    constructor () {
        this.item = null;
    }
    init (item) {
        this.item = item;

        this.item.addEventListener('click', (e) => this.move(e));
    }

    move (event) {
        let direction;
        if (event.target.classList.contains('move')) {
            event.target.classList.contains('up') ? direction = 'up' : direction = 'down';
        }

        let parentNodes = event.target.parentNode;
        let container = parentNodes.querySelector('.container');
        if (!container) {
            if (!parentNodes.parentNode.classList.contains('container')) {
                container = parentNodes.parentNode.querySelector('.container');
            } else {
                container = parentNodes.parentNode;
            }
        }
        let list;
        if (container.querySelector('.items-list')) {
            list = container.querySelector('.items-list');
        } else {
            list = container.querySelector('.item-list');
        }

        BUS.dispatchEvent(new CustomEvent('MOVE::LIST', {detail: {list, direction}}));
    }
}

export default ListItem;
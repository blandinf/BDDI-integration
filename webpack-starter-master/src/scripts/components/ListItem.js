
import BUS from '../const/BUS';

class ListItem {
    constructor () {
        this.item = null;
    }
    static init (item) {
        this.item = item;

        this.item.addEventListener('click', (e) => this.move(e));
    }

    static move (event) {
        let direction;
        if (event.target.classList.contains('down')) {
            direction = 'down';
        }

        if (event.target.classList.contains('up')) {
            direction = 'up';
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
        if (container.querySelector('.list')) {
            let list = container.querySelector('.list');
            BUS.dispatchEvent(new CustomEvent('MOVE::LIST', {detail: list}));
        } else if (container.querySelector('.item')) {
            let item = container.querySelector('.item');
            BUS.dispatchEvent(new CustomEvent('MOVE::ITEM', {detail: item}));
        }
    }
}

export default ListItem;
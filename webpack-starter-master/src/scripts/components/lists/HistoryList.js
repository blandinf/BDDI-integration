const HistoryList = {
    section: document.querySelector('.history-section'),

    init () {
        const orders = this.section.querySelectorAll('article');
        for (let order of orders) {
            order.addEventListener('mouseenter', (e) => this.show(e));
            order.addEventListener('mouseleave', (e) => this.hide(e));
        }
    },

    show (event) {
        if (event.target.classList.contains('order')) {
            event.target.querySelector('.btn-action').style.display = 'flex';
        }
    },

    hide (event) {
        if (event.target.classList.contains('order')) {
            event.target.querySelector('.btn-action').style.display = 'none';
        }
    }
};

export default HistoryList;
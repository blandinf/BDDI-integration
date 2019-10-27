import BUS from '../../const/BUS';


const AutoSlide = {
    slides: document.querySelectorAll('.slide-points'),

    init() {
        this.listen();
    },

    listen () {
        BUS.addEventListener('SLIDE::AddPointsEvents', () => {
            Array.from(document.querySelectorAll('.point')).map(item => {
                item.addEventListener('click', (e) => this.activate(e));
            });    
        });      
        BUS.addEventListener('SLIDE::prepareSlides', () => this.prepare());
    },

    activate (event) {
        const list = event.target.parentNode;
        this.replaceActiveElement(event.target, list);
        this.showCorrespondingItem();
    },

    showCorrespondingItem () {
        for (let slide of this.slides) {
            const currentActiveItem = slide.querySelector('.active');
            const id = currentActiveItem.id.match(/\d+$/)[0];
            const productToDisplay = document.querySelector('#product'+id);
            const list = productToDisplay.parentNode;
            this.replaceActiveElement(productToDisplay, list);
            BUS.dispatchEvent(new CustomEvent('LIST::update', {detail: {list: list}}));
        }
    },

    replaceActiveElement (el, list) {
        for (const item of list.children) {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            }
        }
        el.classList.add('active');
    },

    prepare () {
        for (let slide of this.slides) {
            slide.children[0] ? slide.children[0].classList.add('active') : null;
            for (let point of slide.children) {
                const id = point.id.match(/\d+$/)[0];
                const productAssociated = document.querySelector('#product'+id);
                const productAssociatedImg = productAssociated.querySelector('.product-img');
                point.style.backgroundImage = "url("+ productAssociatedImg.src +")";
                if (productAssociatedImg.src.includes('bike2')){
                    point.style.backgroundPosition = "1px 40%";
                }
            }
        }
    },
};

export default AutoSlide;
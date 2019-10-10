class EventManager {
    constructor() {
        this.dispatcher = document.createElement('div');
    }
    addEventListener(event, callback) {
        this.dispatcher.addEventListener(event, callback);
    }
    removeEventListener(event, callback)  {
        this.dispatcher.removeEventListener(event, callback);
    }
    dispatchEvent(event, datas) {
        this.dispatcher.dispatchEvent(event, datas);
    }
}

export default EventManager;

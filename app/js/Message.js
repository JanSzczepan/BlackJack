export default class Message {
    constructor(element, elementBig) {
        this.element = element
        this.elementBig = elementBig;
    }

    waitToShow(message, time) {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => this.setText(message).show(), time)
    }

    setText(message) {
        this.element.textContent = message;

        return this;
    }

    show() {
        this.elementBig.style.display = 'flex';
    }

    hide() {
        this.elementBig.style.display = 'none';
    }

}
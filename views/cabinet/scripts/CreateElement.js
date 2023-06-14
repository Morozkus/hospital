export default class CreateElement {
    constructor(params) {
        this.element = null
        this.createElement(params)
    }

    getElement() {
        return this.element;
    }

    createElement(params) {
        this.element = document.createElement(params.tag)
        this.setClasses(params.classNames)
        this.setTextContent(params.textContent || '')
        this.setCallback(params.callback)
        this.setAttribute(params.attribute)
    }

    addInnerElement(element) {
        if (element instanceof CreateElement) {
            this.element.append(element.getElement());
        } else {
            this.element.append(element);
        }
    }
    
    setClasses(classes = []) {
        classes.map((item) => this.element.classList.add(item))
    }
    
    setTextContent(text = '') {
        this.element.textContent = text;
    }
    
    setCallback(callback) {
        if (typeof callback === 'function') {
            this.element.addEventListener('click', (event) => callback(event));
        }
    }

    setAttribute (attribute = []) {
        attribute.map(el => {
            this.element.setAttribute(el[0], el[1])
        })
    }
}
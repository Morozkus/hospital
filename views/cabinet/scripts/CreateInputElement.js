import CreateElement from "./CreateElement.js";

class CreateInputElement extends CreateElement {
    constructor(params) {
        super(params)
        this.element = null
        this.createElement(params)
    }

    getElement() {
        return this.element;
    }

    createElement(params) {
        this.element = document.createElement(params.tag)
        this.setClasses(params.classNames)
        this.setValue(params.value)
        this.setCallback(params.callback)
        this.setAttribute(params.attribute)
        this.setTextContent(params.textContent)
    }

    setValue (value) {
        this.element.value = value
    }

    setTextContent(textContent) {
        this.element.textContent = textContent
    }

    setAttribute (attribute = []) {
        attribute.map(el => {
            this.element.setAttribute(el[0], el[1])
        })
    }
}

export default CreateInputElement
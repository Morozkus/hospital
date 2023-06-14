import CreateElement from "../CreateElement.js";
import CreateInputElement from "../CreateInputElement.js";
import Fetch from "../Fetching/Fetch.js";

export default class DellPriceForm {
    constructor(params) {
        this.viewElementCreator = this.createView(params)
        this.status = false
    }

    getHtmlElement() {
        return this.viewElementCreator.getElement();
    }

    createView(params) {
        const elementParams = {
            tag: params.tag,
            classNames: params.classNames,
            textContent: params.textContent || '',
            callback: params.callback || null,
            attribute: params.attribute
        };
        this.viewElementCreator = new CreateElement(elementParams);

        const inputName = new CreateInputElement({ tag: 'input', value: '', classNames: ['add-price__item'], attribute: [['type', 'text'], ['name', 'name'], ['id', 'NameProduct'], ['placeholder', 'Название услуги']] })

        const button = new CreateInputElement({ tag: 'input', value: 'Удалить', classNames: ['add-price__item', 'popap__button'], attribute: [['type', 'button'], ['id', 'addBTN']], callback: (e) => {
            Fetch.deletePrice(inputName.getElement().value)
        }})

        this.getHtmlElement().append(inputName.getElement(), button.getElement())

        return this.viewElementCreator;
    }
}
import CreateElement from "../CreateElement.js";
import CreateInputElement from "../CreateInputElement.js";

export default class AddPeopleForm {
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

        const inputFIO = new CreateInputElement({ tag: 'input', value: '', classNames: ['add-pacient__item'], attribute: [['type', 'text'], ['name', 'fio'], ['id', 'FIO'], ['placeholder', 'ФИО']] })
        const inputPhone = new CreateInputElement({ tag: 'input', value: '', classNames: ['add-pacient__item'], attribute: [['type', 'text'], ['name', 'phone'], ['id', 'Phone'], ['placeholder', 'Телефон']] })

        const button = new CreateInputElement({ tag: 'input', value: 'Добавить', classNames: ['add-pacient__item', 'popap__button'], attribute: [['type', 'submit'], ['id', 'addBTN']]})

        this.getHtmlElement().append(inputFIO.getElement(), inputPhone.getElement(), button.getElement())

        return this.viewElementCreator;
    }
}
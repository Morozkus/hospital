import CreateElement from "../CreateElement.js";
import CreateInputElement from "../CreateInputElement.js";

export default class AddPriceForm {
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

        const inputFIO = new CreateInputElement({ tag: 'input', value: '', classNames: ['add-price__item'], attribute: [['type', 'text'], ['name', 'nameProduct'], ['id', 'NameProduct'], ['placeholder', 'Название услуги']] })
        const inputPhone = new CreateInputElement({ tag: 'input', value: '', classNames: ['add-price__item'], attribute: [['type', 'text'], ['name', 'cost'], ['id', 'Cost'], ['placeholder', 'Цена услуги']] })

        const select = new CreateInputElement({tag: 'select', classNames: ['add-price__item'], attribute: [['name', 'department'], ['id', 'Select']]})

        const department1 = new CreateInputElement({tag: 'option', value: 'Prevention', textContent: 'Профилактика', classNames: ['option']})
        const department2 = new CreateInputElement({tag: 'option', value: 'Surgery', textContent: 'Хирург', classNames: ['option']})
        const department3 = new CreateInputElement({tag: 'option', value: 'Orthopedics', textContent: 'Ортопед', classNames: ['option']})
        const department4 = new CreateInputElement({tag: 'option', value: 'Therapy', textContent: 'Терапевт', classNames: ['option']})

        select.addInnerElement(department1)
        select.addInnerElement(department2)
        select.addInnerElement(department3)
        select.addInnerElement(department4)

        const button = new CreateInputElement({ tag: 'input', value: 'Добавить', classNames: ['add-price__item', 'popap__button'], attribute: [['type', 'submit'], ['id', 'addBTN']]})

        this.getHtmlElement().append(inputFIO.getElement(), inputPhone.getElement(), select.getElement(), button.getElement())

        return this.viewElementCreator;
    }
}
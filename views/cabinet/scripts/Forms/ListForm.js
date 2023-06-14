import CreateElement from "../CreateElement.js";
import CreateInputElement from "../CreateInputElement.js";

export default class SearchPeopleForm {
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

        const div = new CreateElement({tag: 'div', textContent: '', classNames: ['table', 'search-table']})

        const inputName = new CreateInputElement({
            tag: 'input',
            value: '',
            classNames: ['add-pacient__item'],
            attribute: [['type', 'text'], ['name', 'fio'], ['id', 'FIO'], ['placeholder', 'ФИО']]
        })

        const button = new CreateInputElement({
            tag: 'input',
            value: 'Искать',
            classNames: ['add-pacient__item', 'popap__button'],
            attribute: [['type', 'button'], ['id', 'searchBTN']],
            callback: (e) => {
                while (div.getElement().firstChild) {
                    div.getElement().firstChild.remove()
                }

                search(document.querySelectorAll('.LIST > tr'), inputName.getElement(), div.getElement())
            }
        })

        this.getHtmlElement().append(div.getElement(), inputName.getElement(), button.getElement())

        return this.viewElementCreator;
    }
}

function search(element, inputValue, outputElement) {
    const value = inputValue.value.toLowerCase()
    if (!value) return
    const arr = Array.from(element)

    const filterName = arr.filter(el => {
            const name = el.querySelector('.td-name').textContent.toLowerCase()
            return name.search(value) === -1 ? false : true
        })

    filterName.forEach(el => {
        const clone = el.cloneNode(true)
        outputElement.append(clone)
    })

}
import CreateElement from "./CreateElement.js";
import CreateInputElement from "./CreateInputElement.js";
import Fetch from "./Fetching/Fetch.js";
import RouterController from "./RouterController.js";

class Popap {
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
            attribute: params.attribute || []
        };
        this.viewElementCreator = new CreateElement(elementParams);

        const popapContainer = new CreateElement({ tag: 'form', classNames: ['popap__container'], attribute: [['action', 'http://localhost:5000/list/pacient'], ['method', 'PUT']] })

        const inputID = new CreateInputElement({ tag: 'input', value: '', classNames: ['popap__item'], attribute: [['type', 'number'], ['name', 'ID'], ['id', 'ID'], ['disabled', true]] })
        const inputFIO = new CreateInputElement({ tag: 'input', value: '', classNames: ['popap__item'], attribute: [['type', 'text'], ['name', 'FIO'], ['id', 'FIO']] })
        const inputPhone = new CreateInputElement({ tag: 'input', value: '', classNames: ['popap__item'], attribute: [['type', 'text'], ['name', 'phone'], ['id', 'Phone']] })

        const button = new CreateInputElement({ tag: 'input', value: 'Изменить', classNames: ['popap__item', 'popap__button'], attribute: [['type', 'button'], ['id', 'Change']], callback: update })
        const buttonDel = new CreateInputElement({ tag: 'input', value: 'Удалить', classNames: ['popap__item', 'popap__button'], attribute: [['type', 'button'], ['id', 'Delete']], callback: deletePac })
        popapContainer.getElement().append(inputID.getElement(), inputFIO.getElement(), inputPhone.getElement(), button.getElement(), buttonDel.getElement())

        this.getHtmlElement().append(popapContainer.getElement())

        return this.viewElementCreator;
    }

    addView(id, fio, phone) {
        const inputId = this.getHtmlElement().querySelector('#ID')
        inputId.value = id
        const inputFIO = this.getHtmlElement().querySelector('#FIO')
        inputFIO.value = fio
        const inputPhone = this.getHtmlElement().querySelector('#Phone')
        inputPhone.value = phone
        document.body.append(this.getHtmlElement())
    }

    removeView() {
        this.getHtmlElement().remove()
    }
}

const popap = new Popap({ tag: 'div', classNames: ['popap'], callback: cb })
popap.getHtmlElement().setAttribute('style', '--top-position: 0px')

function cb(e) {
    if (e.target.classList.contains('popap')) {
        popap.removeView()
    }
}

async function update(e) {
    const inputId = popap.getHtmlElement().querySelector('#ID')
    const valueID = inputId.value

    const inputFIO = popap.getHtmlElement().querySelector('#FIO')
    const valueFIO = inputFIO.value

    const inputPhone = popap.getHtmlElement().querySelector('#Phone')
    const valuePhone = inputPhone.value
    await Fetch.updateList(valueID, valueFIO, valuePhone, 'pacient')
    .then(() => {
        RouterController.list() 
        popap.removeView()
    })
}

async function deletePac(e) {
    const inputId = popap.getHtmlElement().querySelector('#ID')
    const valueID = inputId.value

    await Fetch.daleteList(valueID, 'pacient')
    .then(() => {
        RouterController.list() 
        popap.removeView()
    })
}

export default popap
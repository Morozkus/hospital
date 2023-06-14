import listForm from "./Forms/ListForm.js";
import Fetch from "./Fetching/Fetch.js";
import List from "./List.js";
import AddPeopleForm from "./Forms/AddPeopleForm.js";
import AddPriceForm from "./Forms/AddPriceForm.js";
import SearchPeopleForm from "./Forms/ListForm.js";
import DellPriceForm from "./Forms/DellPriceForm.js";

const workSpace = document.querySelector('#work-space')

// Иницилизация листа пациентов и формы для них
const list = new List({ tag: 'table', classNames: ['list', 'LIST'] })
const listElement = list.getHtmlElement()

const searchPeopleForm = new SearchPeopleForm({tag: 'div', classNames: ['search-form', 'add-form', 'form']})

// Инициализация добавления пациентов
const addPeopleForm = new AddPeopleForm({tag: 'form', classNames: ['add-form', 'form'], attribute: [['action', 'http://localhost:5000/list/pacient'], ['method', 'POST']]})
const addFormElement = addPeopleForm.getHtmlElement()

// Инициализация прайс-листа
const price = new AddPriceForm({tag: 'form', classNames: ['add-form', 'form'], attribute: [['action', 'http://localhost:5000/list/price'], ['method', 'POST']]})
const priceFormElement = price.getHtmlElement()

const dellPriceForm = new DellPriceForm({tag: 'div', classNames: ['add-form', 'form', 'delete-price-form']})
const dellPriceFormElement = dellPriceForm.getHtmlElement()

class RouterController {
    constructor() {
        this.list()
    }

    async list(e) {
        // Очищаем рабочую область
        clear()
        // Получаем пациентов
        const pacients = await Fetch.getPacients()

        // Прокидываем пациентов и устанавливаем форму
        listElement.append(list.viewTable(pacients))
        workSpace.append(searchPeopleForm.getHtmlElement(), list.getHtmlElement())
    }

    addPacient(e) {
        // Очищаем рабочую область
        clear()

        workSpace.append(addFormElement)
    }

    addPrice(e) {
        // Очищаем рабочую область
        clear()

        workSpace.append(priceFormElement, dellPriceFormElement)
    }
}

function clear() {
    while (workSpace.firstChild) {
        workSpace.firstChild.remove()
    }
}


export default new RouterController()
import CreateElement from "./Create/CreateElement.js";
import CreateInputElement from "./Create/CreateInputElement.js";
import CalendarDaysComponent from "./CalendarDaysComponent.js";
import Fetch from "./Fetch/Fetch.js";

const arrayDays = await Fetch.week
console.log(arrayDays);

class Calendar {
    constructor(params) {
        this.viewElementCreator = this.createView(params)
        this.viewTable()
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
        };
        this.viewElementCreator = new CreateElement(elementParams);

        return this.viewElementCreator;
    }

    goInside(element) {
        element instanceof CreateElement ? this.getHtmlElement().append(element.getElement()) : this.getHtmlElement().append(element)
    }

    viewTable() {
        this.getHtmlElement().append(this.createTime().getElement())
        const days = [
            new CalendarDaysComponent({tag: 'ul', classNames: ['calendar__days']}, 'ВТ', arrayDays[0]),
            new CalendarDaysComponent({tag: 'ul', classNames: ['calendar__days']}, 'СР', arrayDays[1]),
            new CalendarDaysComponent({tag: 'ul', classNames: ['calendar__days']}, 'ЧТ', arrayDays[2]),
            new CalendarDaysComponent({tag: 'ul', classNames: ['calendar__days']}, 'ПТ', arrayDays[3]),
            new CalendarDaysComponent({tag: 'ul', classNames: ['calendar__days']}, 'СБ', arrayDays[4]),
        ]

        days.forEach(el => this.getHtmlElement().append(el.getElement()))
    }

    createTime() {
        const arr = ['', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
        const ul = new CreateElement({ tag: 'ul', classNames: ['calendar__days'] })

        for (let i = 0; i < arr.length; i++) {
            const li = new CreateElement({tag: 'li', classNames: ['calendar__day'], textContent: arr[i]})
            ul.addInnerElement(li)
        }
        return ul
    }
}

export default new Calendar({ tag: 'ul', classNames: ['calendar__list'] })
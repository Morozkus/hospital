import CreateElement from "./CreateElement.js";

export default class List {

    constructor(params) {
        this.viewElementCreator = this.createView(params)
    }

    getHtmlElement() {
        return this.viewElementCreator.getElement();
    }

    createView(params) {
        const elementParams = {
            tag: params.tag,
            classNames: params.classNames,
            textContent: params.textContent || '',
            callback: null,
        };
        this.viewElementCreator = new CreateElement(elementParams);

        return this.viewElementCreator;
    }

    viewTable (userArr) {
        while (this.getHtmlElement().firstChild) {
            this.getHtmlElement().firstChild.remove()
        }

        let fragment = new DocumentFragment();
        const thId = new CreateElement({tag: 'th', classNames: ['thead'], textContent: 'ID'})
        const thName = new CreateElement({tag: 'th', classNames: ['thead'], textContent: 'ФИО'})
        const thPhone = new CreateElement({tag: 'th', classNames: ['thead'], textContent: 'Телефон'})
        const thDel = new CreateElement({tag: 'th', classNames: ['thead'], textContent: 'Изменение'})

        fragment.append(thId.getElement(), thName.getElement(), thPhone.getElement(), thDel.getElement())

        userArr.map((el) => {
            const tr = new CreateElement({tag: 'tr', classNames: ['trow']})
            const tdId = new CreateElement({tag: 'td', classNames: ['td', 'td-id'], textContent: el.id})
            const tdName = new CreateElement({tag: 'td', classNames: ['td', 'td-name'], textContent: el.fio})
            const tdPhone = new CreateElement({tag: 'td', classNames: ['td', 'td-phone'], textContent: el.phone})
            const tdlink = new CreateElement({tag: 'td', classNames: ['td', 'td-link']})
            const link = new CreateElement({tag: 'a', classNames: ['pacient-link'], textContent: 'Изменить'})

            link.getElement().setAttribute('href', `http://localhost:5000/list/pacient/${el.id}`)
            tdlink.getElement().append(link.getElement())

            const trElement = tr.getElement()
            trElement.append(tdId.getElement(), tdName.getElement(), tdPhone.getElement(), tdlink.getElement())
            fragment.append(trElement)
        })

        return fragment
    }
}
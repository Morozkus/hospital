import CreateElement from "./Create/CreateElement.js";

export default class CalendarDays extends CreateElement {
    

    constructor(params, day, arrayOfDay) {
        super(params)
        this.day = day
        this.arrayOfDay = arrayOfDay
        this.viewCalendarDays()
    }

    viewCalendarDays() {
        const liDay = new CreateElement({tag: 'li', classNames: ['calendar__day'], textContent: this.day})
        this.getElement().append(liDay.getElement())

        const week = []
        for (let i = 0; i < this.arrayOfDay.length; i++) {
            const color = this.arrayOfDay[i].color === true ? 'background-color: green' : 'background-color: red'
            const text = this.arrayOfDay[i].color === true ? 'С' : 'З'
            
            const day = new CreateElement({tag: 'li', classNames: ['calendar__day'], attribute: [['style', color]], textContent: text})

            this.getElement().append(day.getElement())
        }
        
    }


}
import result from "../Service/CalendarService.js"

class CalendarController {
    async getCalendar(req, res) {
        const days = await result
        res.json(days)
    }
}

export default new CalendarController()
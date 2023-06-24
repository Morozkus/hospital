class Fetch {
    constructor () {
        this.week = this.getDays()
    }

    async getDays () {
        const res = await fetch('http://localhost:5000/api/calendar')
        const days = res.json()
        return days
    }
}

export default new Fetch()
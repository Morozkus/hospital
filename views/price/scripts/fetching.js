class Fetch {
    async getPrice(name) {
        let prom = await fetch(`http://localhost:5000/api/database?department=${name}`)

        let result = await prom.json()

        return result
    }
}

export default new Fetch
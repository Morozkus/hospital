class Fetch {
    async getDoctor(name, src) {
        let prom = await fetch(`http://localhost:5000/doctors/api/?name=${name}`)

        let result = await prom.json()

        const arr = await result.map(el => {
            return `${src}/${el}`
        });
        return arr
    }
}

export default new Fetch
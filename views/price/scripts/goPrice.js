import fetching from "./fetching.js";

class FullingTable {
    constructor () {
        this.department = this.fullingDepartment()
    }

    async fullingDepartment(...args) {
        const arr = []
        for(let i = 0; i < args.length; i++) {
            const price = await fetching.getPrice(args[i])
            arr.push(price)
        }
        return arr
    }
}

export default new FullingTable

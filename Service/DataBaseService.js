import db from '../db.js'

class DataBaseService {
    async getAll (department) {
        try {
            const priceList = await db.query("SELECT * FROM price WHERE department=$1 ORDER BY cost;", [department])
            
            return priceList

        } catch (error) {
            console.log(error);
        }
    }
}

export default new DataBaseService()
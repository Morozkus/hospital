import db from '../db.js'

class DataBaseController {
    async getAll (req, res) {
        try {
            const priceList = await db.query("SELECT * FROM price WHERE department=$1 ORDER BY cost;", [req.query.department])
            res.json(priceList.rows)
        } catch (error) {
            console.log(error);
        }
    }
}

export default new DataBaseController()
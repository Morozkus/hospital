import db from '../db.js'
import DataBaseService from '../Service/DataBaseService.js';

class DataBaseController {
    async getAll (req, res) {
        try {
            const department = req.query.department

            const priceList = await DataBaseService.getAll(department)

            res.json(priceList.rows)
        } catch (error) {
            console.log(error);
        }
    }
}

export default new DataBaseController()
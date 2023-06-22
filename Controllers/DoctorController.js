import DoctorService from "../Service/DoctorService.js"

class DoctorController {
    async get (req, res) {
        const name = req.query.name
        const doctors = await DoctorService.get(name)

        res.json(doctors)
    }
}

export default new DoctorController()
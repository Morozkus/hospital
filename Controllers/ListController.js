import db from '../db.js'
import ListService from '../Service/ListService.js';

class ListController {
    async getPacient(req, res) {
        try {
            const pacientList = await ListService.getPacient()
            res.json(pacientList.rows)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error' })
        }
    }

    async getPacientByName(req, res) {
        try {
            const pacient = await ListService.getPacientByName(req.params.id)
            res.json(pacient)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error' })
        }
    }

    async updatePacient(req, res) {
        try {
            const { fio, phone, id } = req.body
            const updatePacient = await ListService.updatePacient(fio, phone, id)

            res.json(updatePacient)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error' })
        }
    }

    async toDeletePacient(req, res) {
        try {
            const id = req.body.id
            const deletePacient = await ListService.toDeletePacient(id)

            res.json({ succes: true })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error' })
        }
    }

    async setPacient(req, res) {
        try {
            const { fio, phone } = req.body
            const pacient = await ListService.setPacient(fio, phone)

            res.redirect('/cabinet')
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error' })
        }
    }

    async setPrice(req, res) {
        try {
            const { nameProduct, cost, department } = req.body
            const setPrice = await db.query("INSERT INTO price (name, cost, department) values ($1, $2, $3);", [nameProduct, cost, department])

            res.redirect('/price')
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error' })
        }
    }

    async delPrice(req, res) {
        try {
            const name = req.body.name
            const deletePacient = await ListService.delPrice(name)

            res.json(deletePacient)

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error' })
        }
    }
}

export default new ListController()
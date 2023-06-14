import db from '../db.js'

class ListController {
    async getPacient(req, res) {
        try {
            const pacientList = await db.query("SELECT * FROM pacient ORDER BY id;")
            res.json(pacientList.rows)
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: 'Error' })
        }
    }

    async getPacientByName(req, res) {
        try {
            const pacient = await db.query("SELECT * FROM pacient WHERE id=$1;", [req.params.id])
            res.json(pacient.rows)
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: 'Error' })
        }
    }

    async updatePacient (req, res) {
        try {
            const updatePacient = await db.query("UPDATE pacient SET fio=$1, phone=$2 WHERE id=$3 RETURNING *;", [req.body.fio, req.body.phone, req.body.id])
            res.json({succes: true, update: updatePacient.rows[0]})
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: 'Error' })
        }
    }

    async toDeletePacient (req, res) {
        try {

            const deletePacient = await db.query("DELETE FROM pacient WHERE id=$1;", [req.body.id])

            res.json({succes: true})
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: 'Error' })
        }
    }

    async setPacient(req, res) {
        try {
            const {fio, phone} = req.body 
            const pacient = await db.query("INSERT INTO pacient (fio, phone) values ($1, $2);", [fio, phone])

            res.redirect('/cabinet')
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: 'Error' })
        }
    }

    async setPrice(req, res) {
        try {
            const {nameProduct, cost, department} = req.body
            const setPrice = await db.query("INSERT INTO price (name, cost, department) values ($1, $2, $3);", [nameProduct, cost, department])

            res.redirect('/price')
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: 'Error' })
        }
    }

    async delPrice(req, res) {
        try {

            const deletePacient = await db.query("DELETE FROM price WHERE name=$1 RETURNING name;", [req.body.name])

            if (!deletePacient.rows[0].name) {
                res.json({succes: false})
            }
            else {
                res.json({succes: true})
            }
            
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: 'Error' })
        }
    }
}

export default new ListController()
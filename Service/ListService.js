import db from '../db.js'

class ListService {
    async getPacient() {

        const pacientList = await db.query("SELECT * FROM pacient ORDER BY id;")
        return pacientList
    }


    async getPacientByName(id) {

        const pacient = await db.query("SELECT * FROM pacient WHERE id=$1;", [id])
        return pacient.rows

    }

    async updatePacient(fio, phone, id) {

        const updatePacient = await db.query("UPDATE pacient SET fio=$1, phone=$2 WHERE id=$3 RETURNING *;", [fio, phone, id])
        return ({ succes: true, update: updatePacient.rows[0] })
    }

    async toDeletePacient(id) {


        const deletePacient = await db.query("DELETE FROM pacient WHERE id=$1;", [id])

        return deletePacient

    }

    async setPacient(fio, phone) {

        const pacient = await db.query("INSERT INTO pacient (fio, phone) values ($1, $2);", [fio, phone])

        return pacient

    }

    async setPrice(nameProduct, cost, department) {
        const setPrice = await db.query("INSERT INTO price (name, cost, department) values ($1, $2, $3);", [nameProduct, cost, department])

        return setPrice

    }

    async delPrice(name) {

        const deletePacient = await db.query("DELETE FROM price WHERE name=$1 RETURNING name;", [name])

        if (!deletePacient.rows[0].name) {
            return { succes: false }
        }
        else {
            return { succes: true }
        }

    }
}

export default new ListService()
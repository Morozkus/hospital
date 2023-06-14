import fs from 'fs'
import path from 'path'

class DoctorController {
    async get (req, res) {
        fs.readdir(path.resolve('views', 'doctors', 'doctors_img', req.query.name), {encoding:'utf-8'}, (err, files) => {
            if (err) res.status(500).end()
            res.json(files)
        })
        
    }
}

export default new DoctorController()
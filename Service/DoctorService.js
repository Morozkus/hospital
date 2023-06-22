import fs from 'fs'
import path from 'path'

class DoctorService {
    async get(name) {

        const doctors = fs.readdirSync(path.resolve('views', 'doctors', 'doctors_img', name), { encoding: 'utf-8' })

        return doctors
    }
}

export default new DoctorService()
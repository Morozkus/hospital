import db from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secret } from '../config.js'
import AuthService from '../Service/AuthService.js'

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class AuthController {
    async registration(req, res) {
        try {
            const { username, password } = req.body
            const candidate = await db.query("SELECT * FROM users WHERE nickname=$1", [username])

            const result = await AuthService.registration({ username, password, candidate })
            return res.json(result)
        } catch (error) {

            console.log(error.message);
            res.status(404).json({ message: 'Error' })

        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await db.query('SELECT * FROM users WHERE nickname=$1', [username])

            if (!user.rows[0]) {
                throw new Error(`Пользователь ${username} не найден`)
            }

            const validPassword = bcrypt.compareSync(password, user.rows[0].password)
            if (!validPassword) {
                throw new Error(`Введен неверный пароль`)
            }

            const token = generateAccessToken(user.rows[0].id, user.rows[0].roles)
            res.cookie('jwt', `Bearer ${token}`, { maxAge: 900000 })
            return res.json({ success: true })
        } catch (error) {
            res.cookie('jwt', ``, { maxAge: 900000 })
        }
    }
}

export default new AuthController()
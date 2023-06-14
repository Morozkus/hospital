import db from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secret } from '../config.js'

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

            if (candidate.rows[0]) {
                return res.status(400).json({ message: 'Пользователь уже существует!' })
            }
            const hashPassword = bcrypt.hashSync(password, 7);

            await db.query("INSERT INTO users (nickname, password, roles) VALUES ($1, $2, $3)", [username, hashPassword, 'USER'])
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: 'Error'})
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await db.query('SELECT * FROM users WHERE nickname=$1', [username])
            if (!user.rows[0]) {
                return res.status(400).json({ message: `Пользователь ${username} не найдет` })
            }

            const validPassword = bcrypt.compareSync(password, user.rows[0].password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
   
            const token = generateAccessToken(user.rows[0].id, user.rows[0].roles)
            res.cookie('jwt', `Bearer ${token}`, {maxAge: 900000})
            return res.json({success: true})
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: 'Error' })
        }
    }

    async getUsers(req, res) {
        try {
            const users = await db.query('SELECT nickname FROM users;')
            return res.status(200).json({user: users.rows})
        } catch (error) {

        }
    }
}

export default new AuthController()
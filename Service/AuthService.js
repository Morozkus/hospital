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

class AuthService {

    async registration(userData) {

        if (userData.candidate.rows[0]) {
            throw new Error('Пользователь уже существует')
        }
        const hashPassword = bcrypt.hashSync(password, 7);

        const newUser = await db.query("INSERT INTO users (nickname, password, roles) VALUES ($1, $2, $3)", [userData.username, hashPassword, 'USER'])
        return newUser
    }
}

export default new AuthService()
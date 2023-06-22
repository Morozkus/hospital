import jwt from 'jsonwebtoken'
import { secret } from '../config.js'

export default function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        
        try {
            if (!req.cookies.jwt) {
                return res.redirect('/login')
            }
            const token = req.cookies.jwt.split(' ')[1]

            if (!token) {
                return res.json({message: 'Error not the token'})
            }
            const decoded = jwt.verify(token, secret)

            if (roles !== decoded.role) {
                return res.status(403).json({message: "У вас нет доступа"})
            }
            next();
        } catch (e) {
            console.log(e)
            return res.redirect('/login')
        }
    }
};
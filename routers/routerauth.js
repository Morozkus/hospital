import Router from 'express'
import AuthController from '../Controllers/AuthController.js'
import roleMmiddleware from '../middlewaree/rolesMiddleware.js'
const router = Router.Router()

router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)

export default router
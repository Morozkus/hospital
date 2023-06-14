import Router from "express";
import roleMiddleware from '../middlewaree/rolesMiddleware.js'

const router = Router.Router()

router.get('/', function (req, res) {
    const name = 'start'
    res.render(name, { title: 'Home page', href: name })
});
router.get('/database', (req, res) => {
    const name = 'database'
    res.render(name, { title: 'Database', href: name })
})
router.get('/doctors', (req, res) => {
    const name = 'doctors'
    res.render(name, { title: 'Doctors', href: name })
})
router.get('/schedule', (req, res) => {
    const name = 'todo'
    res.render(name, { title: 'Schedule', href: name })
})
router.get('/price', (req, res) => {
    const name = 'price'
    res.render(name, { title: 'Price', href: name })
})
router.get('/cabinet', roleMiddleware('Admin'), (req, res) => {
    const name = 'cabinet'
    res.render(name, { title: 'Личный кабинет', href: name })
})
router.get('/login', (req, res) => {
    const name = 'login'
    res.render(name, { title: 'Login', href: name })
})
export default router
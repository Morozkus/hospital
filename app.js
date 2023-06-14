import expressHandlebars from 'express-handlebars';
import routerDB from './routers/routerDB.js';
import express from 'express';
import routerDoctor from './routers/routerDoctor.js';
import router from './routers/router.js'
import routerauth from './routers/routerauth.js'
import cookieParser from 'cookie-parser'
import routerList from './routers/routerList.js';
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
const app = express();
const PORT = process.env.PORT || 5000

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('views'))

app.use('/api', routerDB)
app.use('/doctors/api', routerDoctor)
app.use('/', router)
app.use('/auth', routerauth)
app.use('/list', routerList)

app.use(function (req, res) {
    res.status(404).render("error", { title: 'Page not found', href: 'error'})
})

app.listen(PORT, () => {
    console.log('server started');
})
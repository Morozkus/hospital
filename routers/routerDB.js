import Router from "express";
import DataBaseController from "../Controllers/DataBaseController.js"

const routerDB = Router.Router()


// routerDB.post('/database', DataBaseController.Create)
routerDB.get('/database', DataBaseController.getAll)
// routerDB.get('/database/:id', DataBaseController.getOne)
// routerDB.put('/database', DataBaseController.update)
// routerDB.delete('/database/:id', DataBaseController.delete)

export default routerDB
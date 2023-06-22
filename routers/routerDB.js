import Router from "express";
import DataBaseController from "../Controllers/DataBaseController.js"

const routerDB = Router.Router()

routerDB.get('/database', DataBaseController.getAll)

export default routerDB
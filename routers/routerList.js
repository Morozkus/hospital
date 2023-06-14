import express from "express";
import rolesMiddleware from "../middlewaree/rolesMiddleware.js";
import ListController from "../Controllers/ListController.js";

const routerList = express.Router()

routerList.get('/pacient', rolesMiddleware('Admin'), ListController.getPacient)
routerList.get('/pacient/:id', rolesMiddleware('Admin'), ListController.getPacientByName)
routerList.put('/pacient', rolesMiddleware('Admin'), ListController.updatePacient)
routerList.delete('/pacient', rolesMiddleware('Admin'), ListController.toDeletePacient)
routerList.post('/pacient', rolesMiddleware('Admin'), ListController.setPacient)

routerList.post('/price', rolesMiddleware('Admin'), ListController.setPrice)
routerList.delete('/price', rolesMiddleware('Admin'), ListController.delPrice)

export default routerList
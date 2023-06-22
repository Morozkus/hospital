import express from "express";
import ListController from "../Controllers/ListController.js";

const routerList = express.Router()

routerList.get('/pacient', ListController.getPacient)
routerList.get('/pacient/:id', ListController.getPacientByName)
routerList.put('/pacient', ListController.updatePacient)
routerList.delete('/pacient', ListController.toDeletePacient)
routerList.post('/pacient', ListController.setPacient)

routerList.post('/price', ListController.setPrice)
routerList.delete('/price', ListController.delPrice)

export default routerList
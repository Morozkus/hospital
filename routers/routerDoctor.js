import Router from "express";
import DoctorController from "../Controllers/DoctorController.js"

const routerDoctor = Router()

routerDoctor.get('/', DoctorController.get)

export default routerDoctor
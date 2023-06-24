import express from "express";
import CalendarController from "../Controllers/CalendarController.js";

const routerCalendar = express.Router()

routerCalendar.get('/calendar', CalendarController.getCalendar)

export default routerCalendar
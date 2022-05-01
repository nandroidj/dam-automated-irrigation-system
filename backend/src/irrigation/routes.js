const express = require ("express");
const router = express.Router();

const IrrigationController = require("./controller");


// Ruta correspondiente a los log de riego a partir de una valvulaID
router.get("/:id", [
    IrrigationController.getIrrigationLogByElectrovalve
]);


// Rutra correspondiente para obtener el lultimo log de riego de una valvulaID
router.get("/last/:id", [
  IrrigationController.getLastIrrigationLogByElectrovalve
]);


// Ruta para la insercion de un nuevo log de riego 
router.post("/", [
  IrrigationController.newIrrigationLog
]);


module.exports = router;

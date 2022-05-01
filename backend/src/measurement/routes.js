const express = require ("express");
const router = express.Router();

const MeasurementController = require("./controller");

// Ruta para obtener la medicion a partir del Id de un dispositivo
router.get("/:id", [
  MeasurementController.getMeasurementByDeviceId
]);


// Ruta para obtener la ultima medición a partir del Id de un dispositivo
router.get("/last/:id", [
  MeasurementController.getLastMeasurementByDeviceId
]);


// Ruta para la insercion de una nueva medicion de un dispositivo
router.post("/", [
  MeasurementController.newMeasurement
]);


module.exports = router;

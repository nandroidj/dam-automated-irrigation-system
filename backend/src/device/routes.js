const express = require ("express");
const router = express.Router();

const DeviceController = require("./controller");


// Ruta por default de la plataform que permite visualizar todos los dispositivos del sistema
router.get("/", [
  DeviceController.getAllDevices
]);


// Path que permite obtenr informacion del dispositivo segun su identificador
 router.get("/:id", [
    DeviceController.getDeviceById
]);


module.exports = router;

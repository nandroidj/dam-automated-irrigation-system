const express = require ("express");
const router = express.Router();

const MedicionMiddleware = require("./middleware")
const MedicionController = require("./controller");


// Getter la lista de mediciones segun dispositivo

router.get("/:id", [MedicionController.getMedicionesDispositivoId]);


// Getter ultima medicion segun dispositivo

router.get("/last/:id", [MedicionController.getUltimaMedicionDispositivoId]);



// Setter nueva medicion segun dispositivo

router.post("/", [
  MedicionMiddleware.hasNewMedicionValidFields,
  MedicionController.newMedicion
]);


module.exports = router;

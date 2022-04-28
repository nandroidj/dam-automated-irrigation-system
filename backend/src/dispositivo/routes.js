const express = require ("express");
const router = express.Router();

const DispositivoController = require("./controller");

// Getter la lista de dispositivos
router.get("/", [DispositivoController.getAll]);


// Getter del dispositivo con identificador
 router.get("/:id", [DispositivoController.getById]);


module.exports = router;

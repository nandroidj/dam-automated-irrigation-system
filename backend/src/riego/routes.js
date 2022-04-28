const express = require ("express");
const router = express.Router();

const RiegoController = require("./controller");
const RiegoMiddleware = require("./middleware");


// Getter Lista Log_Riego

router.get("/:id", [RiegoController.getLogRiegoElectrovalvula]);


// Getter latest Log_Riego

router.get("/last/:id", [RiegoController.getUltimoLogRiegoElectrovalvula]);

// Setter new Log_Riego
router.post("/", [
  RiegoMiddleware.hasNewRiegoValidFields,
  RiegoController.newRiego
]);


module.exports = router;

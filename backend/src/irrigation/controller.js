const IrrigationModel = require("./model");

// Getter lista log de riego de una electrovalvula: (valvulaId) => Promise<List<Log_Riego>>
exports.getIrrigationLogByElectrovalve = async (req, res) => {
  try {

      let logs = await IrrigationModel.getIrrigationLogByElectrovalve(req.params.id);
      res
        .status(200)
        .send(logs);
  
  } catch (error) {
      res
        .status(400)
        .send({errores: ["Id incorrecto"]});
  }
}


// Getter del ultimo logueo de riego a partir del Id de una electrovávula
exports.getLastIrrigationLogByElectrovalve = async (req, res) => {
  
  try {
      let logs = await IrrigationModel.getLastIrrigationLogByElectrovalve(req.params.id);
      res
        .status(200)
        .send(logs);
  
  } catch (error) {
      
      res
        .status(400)
        .send({errores: ["Id incorrecto"]});
  }
}


// Setter de un nuevo Log_Riego
exports.newIrrigationLog = async (req, res) => {

  try {
      await IrrigationModel.newIrrigationLog(req.body);
      res
        .status(200)
        .send();
  
  } catch (error) {
      res
        .status(400)
        .send({errores: ["Id incorrecto"]});
  }
}



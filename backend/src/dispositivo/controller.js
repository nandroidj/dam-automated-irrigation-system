const DispositivoModel = require("./model");

/**
* Lista de dispositivos
*
* @param {*} req objeto del request realizado
* @param {*} res objeto del response al request
*/

exports.getAll = async (req, res) => {
 
  try {
      let devices = await DispositivoModel.getAllDevices();
      res.status(200).send(devices);
  }
  catch (error) {
      res.status(500).send();
  }
}


/**
* Dispositivo segun Id
*
* 
* @param {*} req objeto del request realizado
* @param {*} res objeto del response al request
*/

exports.getById = async (req, res) => {
  
  try {
      let devices = await DispositivoModel.getDispositivo(req.params.id);
      res.status(200).send(devices);
  }
  catch (error) {
      res.status(400).send({errores: ["No se encuentra el id"]});
  }
}

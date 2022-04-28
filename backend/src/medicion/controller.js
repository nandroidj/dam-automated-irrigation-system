const MedicionModel = require("./model");

/**
* List de mediciones del dispositivo segun el Id
*
* @param {*} req objeto del request realizado
* @param {*} res objeto del response al request
*/

exports.getMedicionesDispositivoId = async (req, res) => {

  try {
      let devices = await MedicionModel.getMedicionesDispositivoId(req.params.id);
      res.status(200).send(devices);
  }
  catch (error) {
      res.status(400).send({errores: ["No se encuentra el id"]});
  }
}


/**
* Ultima medición del dispositivo segun el Id 
*
* @param {*} req objeto del request realizado
* @param {*} res objeto del response al request
*/

exports.getUltimaMedicionDispositivoId = async (req, res) => {
 
  try {
      let devices = await MedicionModel.getUltimaMedicionDispositivoId(req.params.id);
      res.status(200).send(devices);
  }
  catch (error) {
      res.status(400).send({errores: ["No se encuentra el id"]});
  }
}


/**
* Agrega nueva medición segun el Id del dispositivo
*
* @param {*} req objeto del request realizado
* @param {*} res objeto del response al request
*/

exports.newMedicion = async (req, res) => {
  
  try {
      await MedicionModel.newMedicion(req.body);
      res.status(200).send();
  }
  catch (error) {
      res.status(400).send({errores: ["No se encuentra el id"]});
  }
}








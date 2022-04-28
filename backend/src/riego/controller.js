const RiegoModel = require("./model");


/**
 * Lista de logs de riego segun el Id de la electrovávula
 *
 * @param {*} req objeto del request realizado
 * @param {*} res objeto del response al request
 */

exports.getLogRiegoElectrovalvula = async (req, res) => {
  
  try {
      let logs = await RiegoModel.getLogRiego(req.params.id);
      res.status(200).send(logs);
  }
  catch (error) {
      res.status(400).send({errores: ["No se encuentra el id"]});
  }
}


/**
* Ultimo log de riego de la electrovávula segun el Id
*
* @param {*} req objeto del request realizado
* @param {*} res objeto del response al request
*/

exports.getUltimoLogRiegoElectrovalvula = async (req, res) => {
  try {
      let logs = await RiegoModel.getUltimoLogRiego(req.params.id);
      res.status(200).send(logs);
  }
  catch (error) {
      res.status(400).send({errores: ["No se encuentra el id"]});
  }
}


/**
* Agrega nueva entrada en log de riego segun Id de la electrovávula
*
* @param {*} req objeto del request realizado
* @param {*} res objeto del response al request
*/

exports.newRiego = async (req, res) => {
  try {
      await RiegoModel.newRiego(req.body);
      res.status(200).send();
  }
  catch (error) {
      res.status(400).send({errores: ["No se encuentra el id"]});
  }
}















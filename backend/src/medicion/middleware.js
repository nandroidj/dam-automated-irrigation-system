
/**
 * Chequea que la nueva meidicion de un dispositivo sea correcta
 * 
 *      {
 *          "id": 1
 *          "valor": "50"
 *      }
 * 
 * @param {*} req objeto del request realizado
 * @param {*} res objeto del response al request
 * @param {*} next llama a la siguiente función en el array de callbacks asociado al endpoint
 * @returns 
 */

exports.hasNewMedicionValidFields = (req, res, next) => {
  
  let errors = [];

  return !req.body.id ? errors.push("Falta el campo id") :
    !req.body.valor ? errors.push("Falta el campo valor") :
      errors.length > 0 ? res.status(400).send({errores: errors}) :
        next();
}







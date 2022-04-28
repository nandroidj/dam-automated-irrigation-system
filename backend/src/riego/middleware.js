
/**
 * Chequea que la nueva insercion en la tabla Log_Riego sea de la forma:
 * 
 *      {
 *          "id": 1
 *          "apertura": 1
 *      }
 * 
 * 
 * @param {*} req objeto del request realizado
 * @param {*} res objeto del response al request
 * @param {*} next llama a la siguiente función en el array de callbacks asociado al endpoint
 * @returns 
 */

exports.hasNewRiegoValidFields = (req, res, next) => {
  
  let errors = [];

  return !req.body.id ? errors.push("Falta el campo id") :
    req.body.apertura == undefined ? errors.push("Falta el campo apertura") :
      errors.length > 0 ? res.status(400).send({errores: errors}) :
        next();
}

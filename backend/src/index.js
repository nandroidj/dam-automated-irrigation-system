
const PORT    = 3000;

const cors    = require("cors");
const express = require('express');
const app     = express();
const utils   = require('./mysql-connector');

let corsOptions = {
	origin: "*",
	optionsSucessStatus: 200
};
app.use(cors(corsOptions));


app.use(express.json()); 

// Rutas Dispositivo
const dispositivoRoutes = require("./device/routes");
app.use("/dispositivo", dispositivoRoutes);


// Rutas Medicion
const medicionRoutes = require("./measurement/routes");
app.use("/medicion", medicionRoutes);


// Rutas Riego
const irrigationRoutes = require("./irrigation/routes");
app.use("/riego", irrigationRoutes);


app.listen(
  PORT, 
  function(req, res) {
    console.log("API funcionando");
  }
);

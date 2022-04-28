
const PORT    = 3000;
const cors  = require("cors");
const express = require('express');
const app     = express();


let corsOptions = {
	origin: "*",
	optionsSucessStatus: 200
};
app.use(cors(corsOptions));


app.use(express.json()); 

const dispositivoRoutes = require("./dispositivo/routes");
app.use("/dispositivo", dispositivoRoutes);

const medicionRoutes = require("./medicion/routes");
app.use("/medicion", medicionRoutes);

const riegoRoutes = require("./riego/routes");
app.use("/riego", riegoRoutes);


app.listen(function(req, res) {
    console.log("API funcionando correctamente !");
});

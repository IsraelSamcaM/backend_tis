import app from "./app.js";
import { sequelize } from "./database/database.js";

// import './models/Ambiente.js'
// import './models/Apertura.js'
// import './models/Auxiliar_dia.js'
// import './models/Auxiliar_reserva.js'
// import './models/Dia_habil.js'
// import './models/Disponible.js'
// import './models/Gestion.js'
//import './models/Grupo.js'
// import './models/Materia.js'
// import './models/Periodo.js'
// import './models/Reserva.js'
// import './models/Usuario.js'
  
async function main() {
  await sequelize.sync({force: false});
  app.listen(4000);
  console.log("Server on port 4000");
}

main();
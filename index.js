import app from "./src/app.js";
import { sequelize } from "./src/database/database.js";

// import './models/Ambiente.js'
// import './models/Apertura.js'
// import './models/Aux_grupos.js'
// import './models/Auxiliar_reserva.js'
// import './models/Disponible.js'
// import './models/Gestion.js'
// import './models/Grupo.js'
// import './models/Materia.js'
// import './models/Periodo.js'
// import './models/Reserva.js'
// import './models/Tipo_usuario.js'
// import './models/Usuario.js'


  
async function main() {
  //await sequelize.sync({alter: true});
  app.listen(4000);
  console.log("Server running on port localhost:4000");
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to JOS83 application." });
  });
  
}

main();
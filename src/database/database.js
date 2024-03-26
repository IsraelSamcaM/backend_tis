import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "railway", // Nombre de la base de datos
  "postgres", // Nombre de usuario
  "JJevCSnprEMPMrWdNhlUEXuOtCofnhYx", // Contraseña
  {
    host: "roundhouse.proxy.rlwy.net", // Host de la base de datos en Railway
    dialect: "postgres", // Dialecto PostgreSQL
    port: 38165, // Puerto personalizado
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

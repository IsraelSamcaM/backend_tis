import express from "express";
//import morgan from "morgan";

const app = express();

//Import routes
import ambientesRoutes from "./routes/ambientes.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import gestionesRoutes from "./routes/gestiones.routes.js";
import materiasRoutes from "./routes/materias.routes.js";
import periodosRoutes from "./routes/periodos.routes.js";
import gruposRoutes from "./routes/grupos.routes.js";

// Middlewares
// app.use(morgan("dev"));
app.use(express.json());

// Routes
//app.use(ambientesRoutes);
app.use("/api/ambientes", ambientesRoutes );
app.use("/api/usuarios", usuariosRoutes );
app.use("/api/gestiones", gestionesRoutes );
app.use("/api/materias", materiasRoutes );
app.use("/api/periodos", periodosRoutes );
app.use("/api/grupos", gruposRoutes );

export default app;
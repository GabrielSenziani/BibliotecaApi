import express from "express";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.js";

import livroRouter from "./routes/livros.js";
import usuarioRouter from "./routes/usuario.js"
import { middlewareAuth } from "./middlewares/auth.js";


const app = express();

app.get("/", (req, res) => {
  res.json({ mensagem: "API da Biblioteca rodando com sucesso!" });
});

app.use(express.json());

app.use("/livros", middlewareAuth, livroRouter);

app.use("/usuarios", usuarioRouter)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default app
import express from "express";
import { connectionDB } from "./database/connection.js";
import router from "./routes/livros.js";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use("/livros", router);


connectionDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor funcionando na porta ${PORT}`);
    });
});

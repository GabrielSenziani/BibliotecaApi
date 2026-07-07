import app from "./app.js"
import { connectionDB } from "./database/connection.js";

const PORT = process.env.PORT || 3000;

connectionDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor funcionando na porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Erro ao conectar ao banco:", err);
    });
import app from "./app.js"
import { connectionDB } from "./database/connection.js";

const PORT = 3000

connectionDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor funcionando na porta ${PORT}`);
    });
});

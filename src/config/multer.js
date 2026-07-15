import multer from "multer";
import path from 'node:path';

const fileFilter = (req, file, cb) => {
    const arquivosPermitidos = /jpg|jpeg|png|webp/ //regex pra limitar quais tipos de arquivos podem entrar
    const extName = arquivosPermitidos.test(path.extname(file.originalname).toLowerCase()) //verifica a extensão do nome do arquivo, por exemplo o png em livro.png (permitido) 
    const tipoMime = arquivosPermitidos.test(file.mimetype) //validação se os arquivos são to tipo MIME

    if (extName && tipoMime) {
        return cb(null, true) //aceita o arquivo
    } else {
        cb(new Error("Apenas arquivos (.jpg, .jpeg, .png, .webp) são permitidos"), false)
    }
}

const upload = multer({
    storage: multer.memoryStorage(), // essa função faz com que o multer armazene arquivos temporarios na Memoria RAM inves de ser no disco local
    limits: {
        fileSize: 5 * 1024 * 1024 // Limita o arquivo a no máximo 5MB
    },
    fileFilter
})

export default upload


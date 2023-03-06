const multerConfig = require('./config/multer');
const Upload = require('./models/Upload.js');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = require('express').Router();

router
// Lista os uploads
    .get('/upload', async (req, res) => { 
        const uploads = await Upload.find();
        return res.json(uploads);
    })

// Salva um novo upload com 1 arquivo por vez
//    .post('/upload/single', multer(multerConfig).single('file'), async (req, res) => {
//        const upload = await Upload.create({
//            titulo: req.body.titulo,
//            urlInicial: `${process.env.APP_URL}/files/${req.file.filename}`,
//            url1: `${process.env.APP_URL}/files/${req.file.filename}`,
//            url2: `${process.env.APP_URL}/files/${req.file.filename}`,
//            url3: `${process.env.APP_URL}/files/${req.file.filename}`,
//            url4: `${process.env.APP_URL}/files/${req.file.filename}`,
//            url5: `${process.env.APP_URL}/files/${req.file.filename}`,
//            url6: `${process.env.APP_URL}/files/${req.file.filename}`,
//            url7: `${process.env.APP_URL}/files/${req.file.filename}`,
//            url8: `${process.env.APP_URL}/files/${req.file.filename}`,
//            url9: `${process.env.APP_URL}/files/${req.file.filename}`,
//            url10: `${process.env.APP_URL}/files/${req.file.filename}`,
//        })
//        return res.json(upload);
//    })

// Em busca de salvar 2 ou mais uploads por vez 
    .post('/upload/array', multer(multerConfig).array('file'), async (req, res) => {
        //const { originalname: name, size, filename: key } = req.file;
        const upload = await Upload.create({
            titulo: req.body.titulo,
            keyInicial: req.files[0].filename,
            key1: req.files[1].filename,
            key2: req.files[2].filename,
            key3: req.files[3].filename,
            key4: req.files[4].filename,
            key5: req.files[5].filename,
            key6: req.files[6].filename,
            key7: req.files[7].filename,
            key8: req.files[8].filename,
            key9: req.files[9].filename,
            key10: req.files[10].filename,
        })
        return res.json(upload);
    })

// Deleta um upload junto com a imagem no disco local
    .delete('/upload/:id', async (req, res) => {
        const upload = await Upload.findById(req.params.id);

        fs.unlinkSync(path.resolve(__dirname, "..", 'temp', 'uploads', upload.keyInicial));
        fs.unlinkSync(path.resolve(__dirname, "..", 'temp', 'uploads', upload.key1));
        fs.unlinkSync(path.resolve(__dirname, "..", 'temp', 'uploads', upload.key2));
        fs.unlinkSync(path.resolve(__dirname, "..", 'temp', 'uploads', upload.key3));
        fs.unlinkSync(path.resolve(__dirname, "..", 'temp', 'uploads', upload.key4));
        fs.unlinkSync(path.resolve(__dirname, "..", 'temp', 'uploads', upload.key5));
        fs.unlinkSync(path.resolve(__dirname, "..", 'temp', 'uploads', upload.key6));
        fs.unlinkSync(path.resolve(__dirname, "..", 'temp', 'uploads', upload.key7));
        fs.unlinkSync(path.resolve(__dirname, "..", 'temp', 'uploads', upload.key8));
        fs.unlinkSync(path.resolve(__dirname, "..", 'temp', 'uploads', upload.key9));
        fs.unlinkSync(path.resolve(__dirname, "..", 'temp', 'uploads', upload.key10));

        await upload.remove();
        return res.send({message: "Dados e imagem deletados com sucesso!"});
    })

module.exports = router;
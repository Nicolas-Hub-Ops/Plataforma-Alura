//const fs = require('fs')
//
function converter(dir) {
    fs.readdir(`./${dir}/`, (err, res) => {
        if(err) {
            console.log(err.message)
        } else {
            for(var i = 0; i < res.length; i++) {
                var num = i;
                console.log(`A imagem ${num + 1} foi transformada em Base64`)
                fs.readFile(`./${dir}/${res[i]}`, (err, buffer) => {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log('')
                        console.log(buffer)
                        console.log('')
                    
                    }
                })
                fs.unlink(`./${dir}/${res[i]}`, (err) => {
                    if(err) {
                        console.log(err)
                    } else {
                            console.log('Arquivo deletado')
                        }
                    })
            }
        }
    })
}
////converter('./uploads')
//
//function leitura() {
//    fs.readFile('./uploads/690da1aa9d950940a041d20edf86736a', (err, buffer) => {
//        if(err) {
//            console.log(err);
//        }
//
//        if(buffer) {
//            console.log(buffer);
//            fs.writeFile('./imagens', buffer, (err, success) => {
//                if(err) {
//                    console.log(err)
//                }
//                if(success) {
//                    console.log("Escrita com sucesso!!!")
//                }
//            })
//        }
//    })
//}
//
//leitura();


// server.js

// não esqueça de importar o módulo path!
const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`);
    }
});

// utiliza a storage para configurar a instância do multer
const upload = multer({ storage });

app.use(express.static('public'));

// continua do mesma forma 
app.post('/file/upload', upload.single('file'), 
    (req, res) => res.send('<h2>Upload realizado com sucesso</h2>'));  

app.listen(3000, () => console.log('App na porta 3000'));







/*
let express = require('express');
let cors = require('cors');
let multer = require('multer');

let app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`);
  }
});

// utiliza a storage para configurar a instância do multer
const upload = multer({ storage });


app.use(cors());

app.post('/upload', upload.single('file'), async (req, res) => {
  res.send({ upload: true, files: req.files });
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
*/
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '../uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

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
                      return buffer;
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

const router = express.Router();

router
    .post('/upload', upload.single('file'))


export default router;
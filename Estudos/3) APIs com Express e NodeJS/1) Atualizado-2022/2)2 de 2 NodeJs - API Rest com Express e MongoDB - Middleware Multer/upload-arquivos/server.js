let express = require('express');
let cors = require('cors');
let multer = require('multer');
let path = require('path');

let app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
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

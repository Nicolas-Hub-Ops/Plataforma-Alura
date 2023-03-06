const multer = require('multer');
const path = require('path');

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "photos"),
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            const local = path.resolve(__dirname, "..", "..", "tmp", "photos");
            callback(null, local)
        },
        filename: (req, file, callback) => {
            const time = new Date().getTime();
            const filename = `${time}-${file.originalname}`;
            callback(null, filename);
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, callback) => {
        const mimes = [
            'image/jpeg',
            'image/jpg',
            'image/png'
        ];

        if(mimes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Invalid Format File'));
        }
    }
}
const fs = require('fs');

class file {
    static codifica(file) {
        fs.readFile(file, (buffer) => {
            console.log(buffer)
        })
    }
}

export default file;
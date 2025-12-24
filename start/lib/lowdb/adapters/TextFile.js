/*const fs = require('fs');
const { Writer } = require('steno');
class TextFile {
    constructor(filename) {
        this.filename = filename;
        this.writer = new Writer(filename);
    }
    async read() {
        let data;
        try {
            data = await fs.promises.readFile(this.filename, 'utf-8');
        }
        catch (e) {
            if (e.code === 'ENOENT') {
                return null;
            }
            throw e;
        }
        return data;
    }
    write(str) {
        return this.writer.write(str);
    }
}
module.exports = { TextFile };*/
const fs = require('fs');

class TextFile {
    constructor(filename) {
        this.filename = filename;
        this._writeQueue = Promise.resolve(); // Ensures writes happen sequentially
    }

    async read() {
        try {
            const data = await fs.promises.readFile(this.filename, 'utf-8');
            return data;
        } catch (e) {
            if (e.code === 'ENOENT') {
                return null;
            }
            throw e;
        }
    }

    write(str) {
        // Queue the write operation
        this._writeQueue = this._writeQueue.then(() =>
            fs.promises.writeFile(this.filename, str)
        );
        return this._writeQueue;
    }
}

module.exports = { TextFile };
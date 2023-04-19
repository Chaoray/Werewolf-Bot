import fs from 'fs';

class JsonFile {
    static load(filePath) {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data.toString());
    }
}

export {
    JsonFile
};

import fs from 'fs';
import path from 'path';
import url from 'url';

async function loadCharacterClasses() {
    const classes = {};

    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const folderPath = path.join(__dirname, './CharacterClasses');
    const classesFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith('.js'));

    for (const file of classesFiles) {
        const filePath = path.join(folderPath, file);
        const characterModule = await import(`file://${filePath}`);
        const CharacterClass = Object.values(characterModule)[0];
        let instance = new CharacterClass();
        classes[instance.type] = CharacterClass;
        instance = undefined;
    }

    // 這裡真的有夠邪教
    // 基本上就是把./CharacterClasses裡面所有的Class
    // import後創建一個實例
    // 然後創造一個對應的Symbol-Class表
    // 檔案名稱就不要計較太多了= =

    return classes;
}

const CharacterClasses = Object.freeze(await loadCharacterClasses());

export {
    CharacterClasses
};

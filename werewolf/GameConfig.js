
class GameConfig {
    static Default = new GameConfig();

    characterTypes = []; // TODO: 計畫改掉types?
    numberOfCharacters = {}; // 每個角色的數量
    waitSeconds = 15;
    skipSeconds = 2.5;
    totalCharacterCount = 0;

    /**
     * constructor
     * @param {Array} types 任何角色定義的組合陣列
     */
    constructor(types) {
        this.characterTypes = types ? types : this.characterTypes;

        for (const type of this.characterTypes) {
            this.numberOfCharacters[type] = 0;
        }
    }

    set(type, count) {
        if (count > 0) {
            if (this.characterTypes.includes(type)) {
                this.numberOfCharacters[type] = count;
            } else {
                this.characterTypes.push(type);
                this.numberOfCharacters[type] = count;
            }
        } else {
            if (this.characterTypes.includes(type)) {
                delete this.numberOfCharacters[type];
                this.characterTypes = this.characterTypes.filter((t) => t !== type);
            }
        }

        this.count();
    }

    /**
     * 計算角色總數
     * @return {number} the number of characters
     */
    count() {
        this.total = 0;
        for (const type of this.characterTypes) {
            this.totalCharacterCount += this.numberOfCharacters[type];
        }

        return this.totalCharacterCount;
    }

    clear() {
        this.characterTypes = [];
        this.counts = {};
        this.total = 0;
    }

    /**
     * 將設定的角色數量轉成陣列
     * @return {Symbol[]} n * 角色符號
     */
    toList() {
        const list = [];
        for (const type of this.characterTypes) {
            for (let i = 0; i < this.numberOfCharacters[type]; i++) {
                list.push(type);
            }
        }
        return list;
    }
}

export { GameConfig };

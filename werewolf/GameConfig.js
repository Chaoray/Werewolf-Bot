
class GameConfig {
    static Default = new GameConfig();

    types = [];
    counts = {};
    waitSeconds = 15;
    total = 0;

    /**
     * constructor
     * @param {string} types any combination of types of CharacterDefines and so on
     */
    constructor(types) {
        this.types = types ? types : this.types;

        for (const type of this.types) {
            this.counts[type] = 0;
        }
    }

    set(type, count) {
        if (count > 0) {
            if (this.types.includes(type)) {
                this.counts[type] = count;
            } else {
                this.types.push(type);
                this.counts[type] = count;
            }
        } else {
            if (this.types.includes(type)) {
                delete this.counts[type];
                this.types = this.types.filter((t) => t !== type);
            }
        }

        this.count();
    }

    /**
     * count the number of characters
     * @return {number} the number of characters
     */
    count() {
        this.total = 0;
        for (const type of this.types) {
            this.total += this.counts[type];
        }

        return this.total;
    }

    clear() {
        this.types = [];
        this.counts = {};
        this.total = 0;
    }

    /**
     * 將設定的角色數量轉成陣列
     * @return {Symbol[]} n * 角色符號
     */
    toList() {
        const list = [];
        for (const type of this.types) {
            for (let i = 0; i < this.counts[type]; i++) {
                list.push(type);
            }
        }
        return list;
    }
}

export { GameConfig };

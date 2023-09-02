import { Manager } from '../Base.js';

class ReadyManager extends Manager {
    get count() {
        return Object.keys(this.filter((r) => r)).length;
    }

    /**
     * 讓玩家準備
     * @param {string} id player id
     * @param {boolean} state 準備狀態
     */
    setState(id, state) {
        this.set(id, state);
    }
}

export {
    ReadyManager
};

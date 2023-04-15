import { Manager } from './Base.js';
import { Character } from './Character.js';

class Player {
    id = '';
    character = new Character();

    constructor(id) {
        this.id = id;
    }
}

class PlayerManager extends Manager {
    /**
     * @param {string} id player id
     * @return {Player} if success return player, otherwise return null
     */
    add(id) {
        if (!this.items[id]) {
            this.items[id] = new Player(id);
            return this.items[id];
        } else {
            return null;
        }
    }
}

export {
    Player,
    PlayerManager
};

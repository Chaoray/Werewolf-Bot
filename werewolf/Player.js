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
     */
    add(id) {
        if (!this.has(id)) {
            this.items.set(id, new Player(id));
        }
    }
}

export {
    Player,
    PlayerManager
};

import { Manager } from './Base.js';
import { Character } from './Characters/Character.js';

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
        this.items.add(id, new Player(id));
    }
}

export {
    Player,
    PlayerManager
};

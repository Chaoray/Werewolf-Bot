import { Manager } from '../Base.js';

class DeathLog {
    death = new Manager();

    get log() {
        let result = '';
        this.death.forEach((player) => {
            result += `<@${player.id}> 死了\n`;
        });

        /*
        例：
        @PlayerA 死了
        @PlayerB 死了
        @PlayerC 死了
        */

        if (this.death.length === 0) result = '昨晚是平安夜';

        return result;
    }

    reset() {
        this.death.clear();
    }

    /**
     * @param {Player} player player instance
     */
    add(player) {
        this.death.add(player.id, player);
    }

    /**
     * @param {Player} player player instance
     */
    remove(player) {
        this.death.remove(player.id);
    }
}

export {
    DeathLog
};

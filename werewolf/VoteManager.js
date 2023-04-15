import { Manager } from './Base.js';

class VoteManager extends Manager {
    /**
     * 設定投票狀態
     * @param {Player} player 投票player instance
     * @param {Player} target 目標玩家
     */
    setState(player, target) {
        this.u_set(player.id, target);
    }

    get count() {
        return Object.keys(this.filter((target) => target)).length;
    }

    get result() {
        const targets = this.values;

        let res = targets[0];
        let count = 1;

        for (const i in targets) {
            if (i == 0) continue;

            if (res === targets[i]) {
                count++;
            } else if (count > 0) {
                count--;
            } else {
                res = targets[i];
                count++;
            }
        }

        return res;

        // TODO: 計算被投票最多的人
    }
}

export {
    VoteManager
};

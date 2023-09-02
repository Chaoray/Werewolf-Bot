import { Manager } from './Base.js';

class VoteManager extends Manager {
    /**
     * 設定投票狀態
     * @param {Player} player 投票player instance
     * @param {Player} target 目標玩家
     * @return {Number} count of total votes
     */
    setState(player, target) {
        this.add(player.id, target);
        return this.length; // ????????????
    }

    get result() {
        const eachCount = {};

        let maxCount = 0;
        let res;
        for (const target of this.values) { // 找到最多票的玩家
            const id = target.id;

            if (eachCount[id]) {
                eachCount[id]++;
            } else {
                eachCount[id] = 1;
            }

            if (eachCount[id] > maxCount) {
                maxCount = eachCount[id];
                res = target;
            }
        }

        // 如果有相同票數，目前是隨機選擇

        return res;
    }
}

// TODO: await式投票
// 投票結束後返回結果(resolve)

export {
    VoteManager
};

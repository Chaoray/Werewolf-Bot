/* eslint-disable no-unused-vars */
class Skill {
    count = 0;

    /**
     * @param {Object} obj obj
     * @param {Game} obj.game game instance
     * * @param {Player} obj.target game instance
     */
    use({ game, target, }) { }

    /**
     * 回傳是否死亡
     * @param {Object} obj obj
     * @param {Game} obj.game game instance
     * * @param {Player} obj.target game instance
     * @return {Boolean} is dead
     */
    die({ game, target, }) {
        return true;
    }
}

class SkillError extends Error {
    constructor(message) {
        super(message, options);
    }
}


export {
    Skill, SkillError
};

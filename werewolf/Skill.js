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

export {
    Skill
};

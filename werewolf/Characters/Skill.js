/* eslint-disable no-unused-vars */
class Skill {
    count = 0;

    use({ game, target, }) { }

    die({ game, target, }) { }
}

class SkillError extends Error {
    constructor(message) {
        super(message, options);
    }
}


export {
    Skill, SkillError
};

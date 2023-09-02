import { Character } from '../Character.js';
import { CharacterDefinitions, TeamDefinitions } from '../CharacterDefinitions.js';
import { Skill, SkillError } from '../Skill.js';

class Hunter extends Character {
    type = CharacterDefinitions.Hunter;
    team = TeamDefinitions.Good;

    static HunterSkill = class extends Skill {
        /**
         * @param {Object} obj
         * @param {Game} obj.game game instance
         * @param {Player} obj.target player instance
         * @throws {SkillError} 執行錯誤
         */
        die({ game, }) {
            // TODO: 帶人
        }
    };

    skill = new Hunter.HunterSkill();
}

export {
    Hunter
};

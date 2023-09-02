import { Character } from '../Character.js';
import { CharacterDefinitions, TeamDefinitions } from '../CharacterDefinitions.js';
import { Skill, SkillError } from '../Skill.js';
import { Werewolf } from './Werewolf.js';

class WhiteWolf extends Character {
    type = CharacterDefinitions.WhiteWolf;
    team = TeamDefinitions.Bad;

    static WhiteWolfSkill = class extends Werewolf.WerewolfSkill {
        /**
         * @param {Object} obj
         * @param {Game} obj.game game instance
         * @param {Player} obj.target player instance
         * @throws {Error} 執行錯誤
         */
        die({ game, }) {
            // 帶人
        }
    };

    skill = new WhiteWolf.WhiteWolfSkill();
}

export {
    WhiteWolf
};

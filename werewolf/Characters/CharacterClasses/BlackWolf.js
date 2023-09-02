import { Character } from '../Character.js';
import { CharacterDefinitions, TeamDefinitions } from '../CharacterDefinitions.js';
import { Skill, SkillError } from '../Skill.js';
import { Werewolf } from './Werewolf.js';

class BlackWolf extends Character {
    type = CharacterDefinitions.BlackWolf;
    team = TeamDefinitions.Bad;

    static BlackWolfSkill = class extends Werewolf.WerewolfSkill {
        /**
         * @param {Object} obj
         * @param {Game} obj.game game instance
         * @param {Player} obj.target player instance
         * @throws {SkillError} 執行錯誤
         */
        die({ game, }) {
            // 帶人
        }
    };

    skill = new BlackWolf.BlackWolfSkill();
}

export {
    BlackWolf
};

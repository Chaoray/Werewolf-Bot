import { Character } from '../Character.js';
import { CharacterDefinitions, TeamDefinitions } from '../CharacterDefinitions.js';
import { Skill, SkillError } from '../Skill.js';

class Seer extends Character {
    type = CharacterDefinitions.Seer;
    team = TeamDefinitions.Good;

    static SeerSkill = class extends Skill {
        /**
         * @param {Object} obj
         * @param {Game} obj.game game instance
         * @param {Player} obj.target player instance
         * @return {string} 使用結果
         * @throws {SkillError} 執行錯誤
         */
        use({ game, target, }) {
            if (game.phase.properties.character !== this.type) {
                throw new SkillError('非技能使用時間');
            }

            if (this.count > 0) {
                throw new SkillError('已經用過技能了');
            }

            if (!target) {
                throw new SkillError('所指定的玩家不存在');
            }

            this.count++;
            return target.character.team.description;
        }
    };

    skill = new Seer.SeerSkill();
}

export {
    Seer
};

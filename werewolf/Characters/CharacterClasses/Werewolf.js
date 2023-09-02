import { Character } from '../Character.js';
import { CharacterDefinitions, TeamDefinitions } from '../CharacterDefinitions.js';
import { Skill, SkillError } from '../Skill.js';

class Werewolf extends Character {
    type = CharacterDefinitions.Werewolf;
    team = TeamDefinitions.Bad;

    static WerewolfSkill = class extends Skill {
        /**
         * @param {Object} obj
         * @param {Game} obj.game game instance
         * @param {Player} obj.target player instance
         * @return {string} 使用結果
         * @throws {SkillError} 執行錯誤
         */
        use({ game, target, }) {
            if (game.phase.properties.character != this.type) {
                throw new SkillError('非技能使用時間');
            }

            if (this.count > 0) {
                throw new SkillError('已經用過技能了');
            }

            if (!target) {
                // TODO: 使用技能沒目標可以查看狼隊友
                throw new SkillError('所指定的玩家不存在');
            }

            target.character.kill({ game: game, });
            this.count++;
            return `<@${target.id}> 被殺了`;

            // TODO: 狼人陣營只能殺一人
        }
    };

    skill = new Werewolf.WerewolfSkill();
}

export {
    Werewolf
};

import { Character } from '../Character.js';
import { CharacterDefinitions, TeamDefinitions } from '../CharacterDefinitions.js';
import { Skill, SkillError } from '../Skill.js';


class Witch extends Character {
    type = CharacterDefinitions.Witch;
    team = TeamDefinitions.Good;

    static WitchSkill = class extends Skill {
        potions = {
            heal: 1,
            poison: 1,
        };

        /**
         * @param {Object} obj
         * @param {Game} obj.game game instance
         * @param {Player} obj.target player instance
         * @param {Number} obj.choice 1:查看死亡 2:解藥 3:毒藥
         * @return {string} 使用結果
         * @throws {SkillError} 執行錯誤
         */
        use({ game, target, choice, }) {
            if (game.phase.properties.character !== this.type) {
                throw new SkillError('非技能使用時間');
            }

            if (this.count > 0) {
                throw new SkillError('已經用過技能了');
            }

            switch (choice) {
                case 1: { // 查看死亡
                    if (this.potions.heal <= 0) {
                        throw new Error('本局遊戲已經使用過解藥，故無法查看刀口');
                    }
                    return game.deathLog.outputLog();
                }

                case 2: { // 使用解藥
                    if (this.potions.heal <= 0) {
                        throw new SkillError('本局遊戲已經使用過解藥');
                    }

                    if (!target) {
                        throw new SkillError('所指定的玩家不存在');
                    }

                    game.deathLog.remove(target);
                    target.isDead = false;
                    this.count++;
                    this.potions.heal = 0;

                    return `你對<@${target.id}>使用了解藥`;
                }

                case 3: { // 使用毒藥
                    if (this.potions.poison <= 0) {
                        throw new SkillError('本局遊戲已經使用過毒藥');
                    }

                    game.deathLog.add(target);
                    target.kill({ game: game, });
                    this.count++;
                    this.potions.poison = 0;

                    return `你對<@${target.id}>使用了毒藥`;
                }

                default: {
                    throw new SkillError('不要輸入不存在的選項');
                }
            }
        }
    };

    skill = new Witch.WitchSkill();
}

export {
    Witch
};

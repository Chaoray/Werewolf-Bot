/* eslint-disable no-unused-vars */
import { Skill, SkillError } from './Skill.js';
import { CharacterDefinitions, TeamDefinitions } from './CharacterDefinitions.js';

class Character {
    type;
    team;
    isDead = false;
    skill = new Skill();

    kill(...args) {
        this.isDead = this.skill.die(...args);
    }
}

class Villager extends Character {
    type = CharacterDefinitions.Villager;
    team = TeamDefinitions.Good;

    static VillagerSkill = class extends Skill {
        /**
         * @return {string} 使用結果
         */
        use() {
            return '夢中什麼都有呢';
        }
    };

    skill = new Villager.VillagerSkill;
}

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

const CharacterClasses = {
    [CharacterDefinitions.BlackWolf]: BlackWolf,
    [CharacterDefinitions.WhiteWolf]: WhiteWolf,
    [CharacterDefinitions.Werewolf]: Werewolf,
    [CharacterDefinitions.Seer]: Seer,
    [CharacterDefinitions.Witch]: Witch,
    [CharacterDefinitions.Hunter]: Hunter,
    [CharacterDefinitions.Villager]: Villager,
};

export {
    Character,
    CharacterClasses
};

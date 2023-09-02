import { Character } from '../Character.js';
import { CharacterDefinitions, TeamDefinitions } from '../CharacterDefinitions.js';
import { Skill } from '../Skill.js';

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

export {
    Villager
};

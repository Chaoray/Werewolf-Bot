import { nanoid } from 'nanoid';
import { Manager } from './Base.js';
import { CharacterClasses } from './Character.js';
import { GameConfig } from './GameConfig.js';
import { PlayerManager } from './Player.js';
import { GamePhaseManager } from './GamePhase.js';
import { GamePhaseDefinitions } from './GamePhaseDefinitions.js';
import { VoteManager } from './VoteManager.js';

class ReadyManager extends Manager {
    get count() {
        return Object.keys(this.filter((r) => r)).length;
    }

    /**
     * 讓玩家準備
     * @param {string} id player id
     * @param {boolean} state whether the player is ready or not
     */
    setState(id, state) {
        this.set(id, state);
    }
}

class DeathLog {
    death = new Manager();

    get log() {
        let result = '';
        this.death.forEach((player) => {
            result += `<@${player.id}> 死了\n`;
        });

        if (result === '') result = '昨晚是平安夜';

        return result;
    }

    reset() {
        this.death.clear();
    }

    /**
     * @param {Player} player player instance
     */
    add(player) {
        this.death.add(player.id, player);
    }

    /**
     * @param {Player} player player instance
     */
    remove(player) {
        this.death.remove(player.id);
    }
}

class Game {
    id;
    channelId;
    channel; // 非常之Illegal

    phase = new GamePhaseManager();
    config = new GameConfig();
    players = new PlayerManager();
    ready = new ReadyManager();
    deathLog = new DeathLog();
    votes = new VoteManager();

    /**
     * @param {TextChannel} channel discord channel instance
     */
    constructor(channel) {
        this.id = nanoid();
        this.channel = channel;
        this.channelId = channel.id;

        for (const type of this.config.types) {
            this.characters[type] = {};
        }
    }

    /**
     * 檢查遊戲是否在遊玩狀態
     * @return {boolean} true if the game has started, false otherwise
     */
    isGamePlaying() {
        return this.phase.isPlaying();
    }

    /**
     * distribute characters to all players randomly
     */
    distributeCharacters() {
        if (this.players.length !== this.config.total) {
            throw new Error('角色數量需等於玩家數量');
        }

        // eslint-disable-next-line no-unused-vars, comma-dangle
        const shuffledPlayers = this.players.shuffle();
        const characterSymbols = this.config.toList();

        for (let i = 0; i < shuffledPlayers.length; i++) {
            shuffledPlayers[i].character = new CharacterClasses[characterSymbols[i]]();
        }
    }

    start() {
        if (this.players.length !== this.ready.count) {
            throw new Error('準備玩家數量需等於總玩家數');
        }

        this.phase.start();
        this.continue();
    }

    onDay() {
        this.channel.send(this.deathLog.log);
        this.deathLog.reset();
        this.votes.clear();
        this.ready.clear();
    }

    continue() {
        if (!this.isGamePlaying()) throw new Error('遊戲尚未開始或已經結束');

        if (this.phase.properties.character && // 遊戲階段有角色屬性
            !this.config.types.includes(this.phase.properties.character)) { // 設定中有指定角色
            this.phase.next();
            return this.continue();
        }

        const message = this.phase.message;
        const ms = this.phase.properties.skip ? 2.5 * 1000 : this.config.waitSeconds * 1000;

        if (message.start !== '') {
            const prompt = this.phase.properties.character ? `, 有${this.config.waitSeconds}秒可以使用技能` : '';
            this.channel.send(`${message.start}` + prompt);
        }

        if (this.phase.state === GamePhaseDefinitions.Day) {
            this.onDay();
        }

        const timerId = setTimeout(() => {
            if (message.end !== '') {
                this.channel.send(message.end);
            }

            this.phase.next();
            this.continue();
        }, ms);

        if (this.phase.properties.wait) {
            clearTimeout(timerId);
        }

        // TODO: 等待白天討論 -> 進投票
    }
}

export { Game };

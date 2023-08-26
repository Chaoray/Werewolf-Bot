import { nanoid } from 'nanoid';
import { Manager } from './Base.js';
import { CharacterClasses } from './Character.js';
import { GameConfig } from './GameConfig.js';
import { PlayerManager } from './Player.js';
import { GamePhaseManager } from './GamePhase.js';
import { VoteManager } from './VoteManager.js';

class ReadyManager extends Manager {
    get count() {
        return Object.keys(this.filter((r) => r)).length;
    }

    /**
     * 讓玩家準備
     * @param {string} id player id
     * @param {boolean} state 準備狀態
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

        /*
        例：
        @PlayerA 死了
        @PlayerB 死了
        @PlayerC 死了
        */

        if (this.death.length === 0) result = '昨晚是平安夜';

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
    channel;

    phase = new GamePhaseManager();
    config = new GameConfig();
    players = new PlayerManager();
    ready = new ReadyManager();
    deathLog = new DeathLog();
    votes = new VoteManager();

    /**
     * @param {TextChannel} channel
     */
    constructor(channel) {
        this.id = nanoid();
        this.channel = channel;
        this.channelId = channel.id;
    }

    isGamePlaying() {
        return this.phase.isPlaying();
    }

    /**
     * 隨機分配玩家角色
     */
    distributeCharacters() {
        if (this.players.length !== this.config.total) {
            throw new RangeError('角色數量需等於玩家數量');
        }

        const shuffledPlayers = this.players.shuffle();
        const characterSymbols = this.config.toList();

        for (let i = 0; i < shuffledPlayers.length; i++) {
            shuffledPlayers[i].character = new CharacterClasses[characterSymbols[i]]();
        }
    }

    start() {
        if (this.players.length !== this.ready.count) {
            throw new RangeError('準備玩家數量需等於總玩家數');
        }

        this.phase.start();
        this.continue();
    }

    continue() {
        if (!this.isGamePlaying()) throw new Error('遊戲尚未開始或已經結束');

        if (this.phase.properties.character && // 遊戲階段有角色屬性
            !this.config.types.includes(this.phase.properties.character)) { // 設定中有指定角色
            this.phase.next();
            return this.continue();
        }

        const message = this.phase.message;
        const waitMS = this.phase.properties.skip ? this.config.skipSeconds * 1000 : this.config.waitSeconds * 1000;

        if (message.start !== '') {
            const prompt = this.phase.properties.character ? `, 有${this.config.waitSeconds}秒可以使用/skill` : ''; // 是某角色睜眼時外加使用技能提示
            this.channel.send(`${message.start}` + prompt);
        }

        if (this.phase.properties.manual) {
            this.phase.properties.on.bind(this)(); // TODO: 到底要不要傳game過去
        }

        const timerId = setTimeout(() => { // 自動往下個階段移動
            if (message.end !== '') {
                this.channel.send(message.end);
            }

            this.phase.next();
            this.continue();
        }, waitMS);

        if (this.phase.properties.manual) {
            clearTimeout(timerId);
        }
    }
}

export { Game };

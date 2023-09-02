import { Game } from './Game/Game.js';
import { Manager } from './Base.js';

class GameManager extends Manager {
    /**
     * create a new game
     * @param {TextBasedChannels} channel
     * @param {String[]} playerIds
     * @return {Game} game instance created
     */
    create(channel, playerIds) {
        const game = new Game(channel);

        for (const id of playerIds) {
            game.players.add(id); // 填充玩家
        }

        this.add(game.id, game);

        return game;
    }

    /**
     * get player instance
     * @param {string} playerId game id
     * @return {Game} Game instance if succeeded, null otherwise
     */
    getGameFromPlayerId(playerId) {
        for (const game of this.values) {
            if (game.players.has(playerId)) {
                return game;
            }
        }
        return null;
    }
};

export { GameManager };

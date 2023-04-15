import { Game } from './Game.js';
import { Manager } from './Base.js';

/**
 * GameManager for Werewolf Games.
 */
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
            game.players.add(id);
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
        for (const id of this.keys) {
            if (!this.has(id)) continue;

            const game = this.get(id);
            if (game.players.has(playerId)) {
                return game;
            }
        }
        return null;
    }
};

export { GameManager };

import { GameManager } from '../GameManager';

const gameManager = new GameManager();
const game = gameManager.create('123345', ['1', '2', '3', '4', '5', '6',]);

describe('投票系統', () => {
    test('無投票', () => {
        expect(game.votes.count).toStrictEqual(0);
    });

    test('有投票', () => {
        const a = game.players.get('1');
        const b = game.players.get('2');

        game.votes.setState(a, b);
        expect(game.votes.count).toStrictEqual(1);
    });

    test('投票結果', () => {
        const a = game.players.get('1');
        const b = game.players.get('2');
        const c = game.players.get('3');

        game.votes.setState(a, b);
        game.votes.setState(c, a);
        game.votes.setState(b, a);
        expect(game.votes.result).toStrictEqual(a);
    });
});

import { CharacterDefinitions } from './CharacterDefinitions.js';

// TODO: 讓這裡變得好看億點

const GamePhaseDefinitions = Object.freeze({
    'Idle': Symbol('Idle'),
    'End': Symbol('End'),

    'Night': Symbol('Night'),

    'Werewolf': Symbol('Werewolf'),
    'Witch': Symbol('Witch'),
    'Seer': Symbol('Seer'),
    'Hunter': Symbol('Hunter'),

    'Day': Symbol('Day'),
    'Voting': Symbol('Voting'),
});

const GamePhaseProperties = Object.freeze({ // on function 這裡會綁定this成game，可以到Game.js的continue()看
    [GamePhaseDefinitions.Night]: {
        skip: true,
    },
    [GamePhaseDefinitions.Werewolf]: {
        character: CharacterDefinitions.Werewolf,
        manual: true,
        on: function() {
        },
    },
    [GamePhaseDefinitions.Witch]: {
        character: CharacterDefinitions.Witch,
    },
    [GamePhaseDefinitions.Seer]: {
        character: CharacterDefinitions.Seer,
    },
    [GamePhaseDefinitions.Hunter]: {
        character: CharacterDefinitions.Hunter,
    },
    [GamePhaseDefinitions.Day]: {
        manual: true,
        on: function() {
            this.channel.send(this.deathLog.outputLog());
            this.deathLog.reset();
            this.votes.clear();
            this.ready.clear();

            this.channel.send('依照順序發言，發言完後打/ready');
            let speakOrder = '';
            this.players.forEach((player) => {
                if (!player.character.isDead) {
                    speakOrder += `<@${player.id}>`;
                }
            });
            this.channel.send(speakOrder);
        },
    },
    [GamePhaseDefinitions.Voting]: {
        manual: true,
    },
});

const GamePhaseMessage = Object.freeze({
    [GamePhaseDefinitions.Idle]: {
        start: '',
        end: '',
    },
    [GamePhaseDefinitions.Night]: {
        start: '天黑請閉眼',
        end: '',
    },
    [GamePhaseDefinitions.Werewolf]: {
        start: '狼人請睜眼，用/skill選出一位要殺死的對象',
        end: '狼人請閉眼',
    },
    [GamePhaseDefinitions.Witch]: {
        start: '女巫請睜眼',
        end: '女巫請閉眼',
    },
    [GamePhaseDefinitions.Seer]: {
        start: '預言家請睜眼',
        end: '預言家請閉眼',
    },
    [GamePhaseDefinitions.Hunter]: {
        start: '獵人請睜眼',
        end: '獵人請閉眼',
    },
    [GamePhaseDefinitions.Day]: {
        start: '天亮請睜眼',
        end: '',
    },
    [GamePhaseDefinitions.Voting]: {
        start: '用/vote選出一位要驅逐的對象',
        end: '',
    },
    [GamePhaseDefinitions.End]: {
        start: '遊戲結束',
        end: '',
    },
});

const GamePhaseCycle = Object.freeze([
    GamePhaseDefinitions.Night,
    GamePhaseDefinitions.Werewolf,
    GamePhaseDefinitions.Witch,
    GamePhaseDefinitions.Seer,
    GamePhaseDefinitions.Hunter,
    GamePhaseDefinitions.Day,
    GamePhaseDefinitions.Voting,
]);

export {
    GamePhaseCycle,
    GamePhaseDefinitions,
    GamePhaseProperties,
    GamePhaseMessage
};

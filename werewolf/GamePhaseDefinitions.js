import { CharacterDefinitions } from './CharacterDefinitions.js';

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

const GamePhaseProperties = Object.freeze({
    [GamePhaseDefinitions.Night]: {
        skip: true,
    },
    [GamePhaseDefinitions.Werewolf]: {
        character: CharacterDefinitions.Werewolf,
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
        skip: true,
    },
    [GamePhaseDefinitions.Voting]: {
        wait: true,
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
        start: '狼人請睜眼',
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
        start: '請選出一位要驅逐的對象',
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

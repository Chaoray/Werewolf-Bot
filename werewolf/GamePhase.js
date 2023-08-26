import { GamePhaseDefinitions, GamePhaseCycle, GamePhaseProperties, GamePhaseMessage } from './GamePhaseDefinitions.js';

class GamePhaseManager {
    state = GamePhaseDefinitions.Idle;

    start() {
        this.state = GamePhaseDefinitions.Night;
    }

    next() {
        this.state = GamePhaseCycle[
            (GamePhaseCycle.indexOf(this.state) + 1) % GamePhaseCycle.length // to next phase and cycling
        ];

        // TODO: 判斷輸贏
    }

    isPlaying() {
        return this.state != GamePhaseDefinitions.Idle && this.state != GamePhaseDefinitions.End;
    }

    get message() {
        return GamePhaseMessage[this.state];
    }

    get properties() {
        return GamePhaseProperties[this.state];
    }
}

export {
    GamePhaseManager
};

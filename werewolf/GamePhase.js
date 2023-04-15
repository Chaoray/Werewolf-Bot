import { GamePhaseDefinitions, GamePhaseCycle, GamePhaseProperties, GamePhaseMessage } from './GamePhaseDefinitions.js';

class GamePhaseManager {
    state = GamePhaseDefinitions.Idle;

    start() {
        this.state = GamePhaseDefinitions.Night;
    }

    next() {
        this.state = GamePhaseCycle[
            (GamePhaseCycle.indexOf(this.state) + 1) % GamePhaseCycle.length
        ];

        // TODO: 判斷輸贏
    }

    isPlaying() {
        if (this.state != GamePhaseDefinitions.Idle && this.state != GamePhaseDefinitions.End) {
            return true;
        }
        return false;
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

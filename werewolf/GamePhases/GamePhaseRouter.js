async function loadGamePhases() {
    // TODO: 採用自動讀取模組寫法
    // 可參考./CharacterRouter.js
}

const gamePhases = await loadGamePhases();

const GamePhaseProperties = Object.freeze(gamePhases.properties);
const GamePhaseMessages = Object.freeze(gamePhases.messages);

export {
    GamePhaseProperties,
    GamePhaseMessages
};

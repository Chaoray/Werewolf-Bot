const CharacterDefinitions = Object.freeze({
    Villager: Symbol('Villager'),
    Witch: Symbol('Witch'),
    Seer: Symbol('Seer'),
    Hunter: Symbol('Hunter'),
    Werewolf: Symbol('Werewolf'),
    BlackWolf: Symbol('BlackWolf'),
    WhiteWolf: Symbol('WhiteWolf'),
});

const TeamDefinitions = Object.freeze({
    Good: Symbol('Good'),
    Bad: Symbol('Bad'),
    Third: Symbol('Third'),
});

export {
    CharacterDefinitions,
    TeamDefinitions
};

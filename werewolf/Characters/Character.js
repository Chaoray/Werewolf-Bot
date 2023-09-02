class Character {
    type;
    team;
    isDead = false;
    skill;

    kill(...args) {
        this.isDead = this.skill.die(...args);
    }
}

export {
    Character
};

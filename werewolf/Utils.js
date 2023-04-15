class Enum {
    /**
     * @param  {...String[]} args items
     * @return {Object}
     */
    static create(...args) {
        return Object.freeze(
            // eslint-disable-next-line comma-dangle
            Object.fromEntries(args.map((value) => [value, Symbol(value)]))
        );
    }
}

export {
    Enum
};

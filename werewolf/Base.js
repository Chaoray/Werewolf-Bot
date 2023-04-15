
class Manager {
    items = {};

    constructor(items) {
        this.items = items || {};
    }

    /**
     * add the value of the given key, if NOT exists
     * @param {*} key key
     * @param {*} value value
     * @return {*}
     */
    add(key, value) {
        if (!this.has(key)) {
            this.items[key] = value;
            return this.items[key];
        }
    }

    remove(key) {
        if (this.has(key)) {
            delete this.items[key];
            return true;
        }
        return false;
    }

    has(key) {
        return this.items.hasOwnProperty(key);
    }

    get(key) {
        return this.items[key];
    }

    /**
     * set the value of the given key, if exists
     * @param {*} key key
     * @param {*} value value
     * @return {*}
     */
    set(key, value) {
        if (this.has(key)) {
            this.items[key] = value;
        }

        return this.items[key];
    }

    /**
     * set the value of the given key whether it exists or not
     * @param {*} key key
     * @param {*} value value
     * @return {*} value that was set
     */
    u_set(key, value) {
        this.items[key] = value;
        return this.items[key];
    }

    get length() {
        const symbols = Object.getOwnPropertySymbols(this.items).length;
        const keys = Object.getOwnPropertyNames(this.items).length;

        return symbols + keys;
    }


    /**
     * This getter should be overridden by subclasses
     * Instead of using it directly
     * @return {number}
     */
    get count() {
        return this.length;
    }

    get keys() {
        return Object.keys(this.items);
    }

    get values() {
        return Object.values(this.items);
    }

    /**
     * Shuffle the items
     * @return {Object[]} entries shuffled
     */
    shuffle() {
        const entries = Object.entries(this.items);

        for (let i = entries.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // eslint-disable-next-line comma-dangle, no-unused-vars
            [entries[i], entries[j]] = [entries[j], entries[i]];
        }

        return entries;
    }


    /**
     * @param {function} fn filter function
     * @return {Object} object filtered
     */
    filter(fn) {
        const res = {};

        for (const key in this.items) {
            if (!this.items.hasOwnProperty(key)) continue;

            if (fn(this.items[key])) {
                res[key] = this.items[key];
            }
        }
        return res;
    }

    /**
     * @param {function} fn map function
     * @return {Object} items
     */
    map(fn) {
        const res = {};
        for (const key in this.items) {
            if (!this.items.hasOwnProperty(key)) continue;

            res[key] = fn(this.items[key]);
        }

        return res;
    }

    /**
     * @param {function} cb callback function
     */
    forEach(cb) {
        for (const key in this.items) {
            if (!this.items.hasOwnProperty(key)) continue;

            cb(this.items[key]);
        }
    }

    /**
     * Deep Copy the items
     * @return {Object}
     */
    copy() {
        return JSON.parse(JSON.stringify(this.items));
    }

    entires() {
        return Object.entries(this.items);
    }
    clear() {
        this.items = {};
    }
}

export {
    Manager
};

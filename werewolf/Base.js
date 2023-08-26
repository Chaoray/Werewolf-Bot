
class Manager {
    items = new Map();

    constructor(items) {
        this.items = new Map(items) || this.items;
    }

    /**
     * add the value of the given key, if NOT exists
     * @param {*} key key
     * @param {*} value value
     * @return {*}
     */
    add(key, value) {
        if (!this.has(key)) {
            this.items.set(key, value);
            return this.items.get(key);
        }
    }

    remove(key) {
        return this.items.delete(key);
    }

    has(key) {
        return this.items.has(key);
    }

    get(key) {
        return this.items.get(key);
    }

    /**
     * set the value of the given key
     * @param {*} key key
     * @param {*} value value
     */
    set(key, value) {
        this.items.set(key, value);
    }

    get length() {
        return this.items.size;
    }


    /**
     * 應該被子類複寫，未複寫不要直接用
     * @return {number}
     */
    get count() {
        return this.length;
    }

    get keys() {
        return Array.from(this.items.keys());
    }

    get values() {
        return Array.from(this.items.values());
    }

    /**
     * 打亂items
     * @return {Object[]} entries shuffled
     */
    shuffle() {
        const values = this.values;

        // Fisher–Yates shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
        for (let i = values.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [values[i], values[j],] = [values[j], values[i],]; // swap
        }

        return values;
    }


    /**
     * @param {function} fn filter function
     * @return {Object} object filtered
     */
    filter(fn) {
        const res = {};

        this.items.forEach((value, key) => {
            if (fn(value)) {
                res[key] = value;
            }
        });
        return res;
    }

    /**
     * @param {function} fn map function
     * @return {Object} items
     */
    map(fn) {
        const res = {};
        this.items.forEach((value, key) => {
            res[key] = fn(value);
        });

        return res;
    }

    /**
     * @param {function} fn callback function
     */
    forEach(fn) {
        this.items.forEach((value) => {
            fn(value);
        });
    }

    /**
     * Deep Copy the items
     * @return {Object}
     */
    copy() {
        return new Manager(this.items);
    }

    entires() {
        return this.items.entries();
    }

    clear() {
        this.items.clear();
    }
}

export {
    Manager
};

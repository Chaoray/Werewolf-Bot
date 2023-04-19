class EventManager {
    events = new Map();

    add(fn, once = false) {
        const id = fn.name || `anonymous_${Date.now() * Math.random()}`;
        this.events.set(id, { fn: fn, once: once, });
        return id;
    }

    remove(id) {
        return this.events.delete(id);
    }

    emit(...args) {
        this.events.forEach((event, id) => {
            event.fn(...args);
            if (event.once) this.remove(id);
        });
    }
}

export {
    EventManager
};

import { EventManager } from '../Event.js';

xdescribe('EventManager', () => {
    test('should call every event in the event manager', () => {
        const myEvent = new EventManager();
        myEvent.add(() => {
            console.log('once');
        }, true);

        myEvent.add(() => {
            console.log('event called');
        });

        myEvent.emit();
    });
});

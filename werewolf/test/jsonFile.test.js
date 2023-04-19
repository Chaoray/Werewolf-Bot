import { JsonFile } from '../Utils';

xdescribe('Json讀檔', () => {
    test('Read File', () => {
        const test = new JsonFile('./werewolf/test/test.json');
        console.log(test.data);
    });
});

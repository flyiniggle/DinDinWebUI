import getElementFullHeight from './getElementFullHeight';

describe('#UI #Utils #getElementFullHeight', function() {
    it('should return the height, margins, borders, and padding of an element.', function() {
        const testElement = document.createElement('div');
        const style = testElement.style;

        style.height = '10em';
        style.borderWidth = '5px';

        document.body.append(testElement);

        expect(getElementFullHeight(testElement)).toEqual(20);
    });
});
import Messages from './Messages';

describe('#Business #Auth #Validation #Messages', function() {
    it('should be frozen', function() {
        const thrower = () => {
            Messages.invalidEmail = 'blah';
        };

        expect(thrower).toThrow(TypeError);
    });
});
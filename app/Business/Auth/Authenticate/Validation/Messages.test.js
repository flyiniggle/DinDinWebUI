import Messages from './Messages';

describe('#Business #Auth #Authenticate #Validation #Messages', function() {
    it('should be frozen', function() {
        const thrower = () => {
            Messages.missingUserName = 'blah';
        };

        expect(thrower).toThrow(TypeError);
    });
});
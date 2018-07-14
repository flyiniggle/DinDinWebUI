import ErrorLevel from './ErrorLevel';

describe('#Business #Validation #Types #ErrorLevel', function() {
    it('should be frozen', function() {
        const thrower = () => { ErrorLevel.warning = 'blah'; };

        expect(thrower).toThrow(TypeError);
    });
});
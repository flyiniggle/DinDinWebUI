import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import InputMessage from 'DinDin/UI/Forms/Validation/InputMessage';


describe('#UI #Forms #Validation #InputMessage', function() {
    it('should return an object with an error type and message.', function() {
        const result = new InputMessage(ErrorLevel.error, 'You messed up!');
        const expected = {
            message: 'You messed up!',
            errorLevel: ErrorLevel.error
        };

        expect(result).toEqual(expected);
    });

    it('should throw a type error if a valid error level is not provided', function() {
        const thrower = () => new InputMessage('something', 'You messed up!');

        expect(thrower).toThrow('Type must be a valid error type.');
    });
});
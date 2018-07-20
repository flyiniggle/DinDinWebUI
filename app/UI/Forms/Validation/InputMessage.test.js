import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message from 'Business/Validation/Types/Message';
import InputMessage from 'DinDin/UI/Forms/Validation/InputMessage';


describe('#UI #Forms #Validation #InputMessage', function() {
    it('should return an object with an error type and message.', function() {
        const result = new InputMessage({type: ErrorLevel.error, message: 'You messed up!'});
        const expected = {
            message: 'You messed up!',
            errorLevel: ErrorLevel.error
        };

        expect(result).toEqual(expected);
    });

    it('should accept a Business.Validation.Types.Message.', function() {
        const messsage = new Message(ErrorLevel.error, 'some field', 5, 'You messed up!');
        const expected = {
            message: 'You messed up!',
            errorLevel: ErrorLevel.error
        };

        expect(new InputMessage(messsage)).toEqual(expected);
    });

    it('should throw a type error if no argument is provided.', function() {
        expect(() => new InputMessage()).toThrow('Provide a message.');
    });

    it('should throw a type error if a valid error level is not provided', function() {
        const thrower = () => new InputMessage('something', 'You messed up!');

        expect(thrower).toThrow('Type must be a valid error type.');
    });
});
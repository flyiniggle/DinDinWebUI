import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import InputMessage from 'UI/Forms/Validation/InputMessage';

import getFormMessageClass from './getFormMessageClass';

describe('#UI #Forms #Validation #Bootstrap #getFormMessageClass', function() {
    it('should return the error class.', function() {
        const message = new InputMessage({message: 'Error!', type: ErrorLevel.error});

        expect(getFormMessageClass(message)).toEqual('has-danger');
    });

    it('should return the warning class.', function() {
        const message = new InputMessage({message: 'uh oh...', type: ErrorLevel.warning});

        expect(getFormMessageClass(message)).toEqual('has-warning');
    });

    it('should return the info class.', function() {
        const message = new InputMessage({message: 'fyi', type: ErrorLevel.info});

        expect(getFormMessageClass(message)).toEqual('has-info');
    });

    it('should return an empty string.', function() {
        const message = new InputMessage({message: '', type: ErrorLevel.ok});

        expect(getFormMessageClass(message)).toEqual('');
    });
});
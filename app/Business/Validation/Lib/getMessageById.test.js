import ErrorMessage from '../ErrorMessage';
import WarningMessage from '../WarningMessage';
import OkMessage from '../OkMessage';

import getMessageById from './getMessageById';

describe('#Business #Validation #Lib #getMessageById', function() {
    it('should return a maybe with the message that has a matching Id.', function() {
        const messages = [
            new ErrorMessage({}),
            new WarningMessage({}),
            new WarningMessage({}),
            new OkMessage({})
        ];
        const expected = messages[3];

        expect(getMessageById(messages[3].id, messages).unwrapOr('meh')).toEqual(expected);
    });

    it('should return a maybe of nothing if no matching id exists.', function() {
        const messages = [
            new ErrorMessage({}),
            new WarningMessage({}),
            new WarningMessage({}),
            new OkMessage({})
        ];

        expect(getMessageById('heyo!', messages).unwrapOr('meh')).toEqual('meh');
    });
});
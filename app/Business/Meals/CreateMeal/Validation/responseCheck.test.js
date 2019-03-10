import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

import responseCheck from './responseCheck';

describe('#Business #Meals #CreateMeal #Validation #responseCheck', function() {
    it('should return an empty array if there are no errors.', function() {
        const result = responseCheck({});

        expect(result).toEqual([]);
    });

    it('should return an error message for the name field.', function() {
        const result = responseCheck({
            name: ['this field cannot be blank']
        });

        expect(result.length).toEqual(1);
        expect(result[0].type).toEqual(ErrorLevel.error);
    });
});
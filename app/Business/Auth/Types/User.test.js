import { createUser} from './User';

describe('#Business #Auth #Types #User #createUser', function() {
    it('should return a user.', function() {
        const result = createUser('Jamal', 'me@home.com');

        expect(result).toHaveProperty('username', 'Jamal');
        expect(result).toHaveProperty('email', 'me@home.com');
    });
});
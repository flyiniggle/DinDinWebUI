
import { fake, replace, restore } from 'sinon';
import { Result } from 'true-myth';
import signup from 'Business/Signup/signup';
import SignupService from 'Business/Signup/Service';
import ErrorMessage from 'Business/Validation/ErrorMessage';
import * as preflightCheck from 'Business/Signup/Validation/preflightCheck';

describe('#Business #Signup #signup', function() {
    const userData = {
        username: 'TestMan',
        email: 'testman@testing.com',
        password: 'OHSOSTRONG',
        passwordRepeat: 'OHSOSTRONG'
    };

    afterEach(restore);
    it('should resolve to an OK result with user details if successful.', async function() {
        const { username, email } = userData;
        const serviceFake = fake.resolves(new Result.Ok({ username, email }));

        replace(SignupService, 'post', serviceFake);

        const result = await signup(userData);
        const { username: resultUser, email: resultEmail } = result.unsafelyUnwrap();

        expect(result.isOk()).toBe(true);
        expect(resultUser).toEqual(username);
        expect(resultEmail).toEqual(email);
    });

    it('should return a failure result if the service returns errors.', async function() {
        const serviceFake = fake.resolves(new Result.Err({ password: ['you screwed up'] }));

        replace(SignupService, 'post', serviceFake);

        const result = await signup(userData);

        expect(result.isErr()).toBe(true);
    });

    it('should return a failure result if the service returns errors.', async function() {
        const serviceFake = fake.resolves(new Result.Err({ password: ['you screwed up'] }));

        replace(SignupService, 'post', serviceFake);

        const result = await signup(userData);

        expect(result.isErr()).toBe(true);
    });

    it('should return a failure result if the preflight check fails.', async function() {
        const badData = {
            username: 'meh'
        };
        const result = await signup(badData);

        expect(result.isErr()).toBe(true);

    });
});
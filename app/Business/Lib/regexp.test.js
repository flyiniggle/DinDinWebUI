import regexp from 'Business/Lib/regexp';


describe('#Business #Lib #regexp', function() {
    describe('#email', function() {
        it('should match email addresses.', function() {
            expect(regexp.email.test('me@home.com')).toBe(true);
            expect(regexp.email.test('me@home.edu')).toBe(true);
            expect(regexp.email.test('me@home.it')).toBe(true);
            expect(regexp.email.test('me@home.biz')).toBe(true);
            expect(regexp.email.test('me@home.gov')).toBe(true);
            expect(regexp.email.test('me-and-you@home.com')).toBe(true);
            expect(regexp.email.test('me+and+you@home.com')).toBe(true);
        });

        it('should fail if not given an email.', function() {
            expect(regexp.email.test('')).toBe(false);
            expect(regexp.email.test('@.com')).toBe(false);
            expect(regexp.email.test('me@.com')).toBe(false);
            expect(regexp.email.test('@home.com')).toBe(false);
        });
    });
});
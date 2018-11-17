import dateString from './dateString';

describe('#UI #Formatting #dateString', function() {
    describe('#display', function() {
        it('should return a display-formatted date string when given a datestring.', function() {
            expect(dateString.display('2018-05-11')).toEqual('May 11, 2018');
            expect(dateString.display('August 19, 1975')).toEqual('Aug 19, 1975');
        });

        it('should return a display-formatted date string when given a Date.', function() {
            expect(dateString.display(new Date(1993, 6, 28, 14, 39, 7))).toEqual('Jul 28, 1993');
            expect(dateString.display(new Date('August 19, 1975'))).toEqual('Aug 19, 1975');
            expect(dateString.display(new Date('December 21, 1955'))).toEqual('Dec 21, 1955');
        });

        it('should thrown an error if not given a valid date string', function() {
            const thrower = () => { dateString.display('asdfasdfasdf'); };

            expect(thrower).toThrow('Parameter \'date\' must be a valid Date or datestring.');
        });
    });

    describe('#store', function() {
        it('should format a string for saving to the web server.', function() {
            expect(dateString.store('August 19, 1975')).toEqual('1975-08-19');
            expect(dateString.store('December 1, 2015')).toEqual('2015-12-01');
        });

        it('should thrown an error if not given a valid date string', function() {
            const thrower = () => { dateString.store('asdfasdfasdf'); };

            expect(thrower).toThrow('Parameter \'date\' must be a valid Date or datestring.');
        });
    });
});
import maybe from './maybe';

describe('#Lib #maybe', function() {
    it('should return maybe of nothing for null values.', function() {
        const result = maybe(null);

        expect(result.isNothing()).toEqual(true);
    });

    it('should return maybe of nothing for undefined values.', function() {
        const result = maybe();

        expect(result.isNothing()).toEqual(true);
    });

    it('should return maybe of something for 0.', function() {
        const result = maybe(0);

        expect(result.unwrapOr('heyo')).toEqual(0);
    });

    it('should return maybe of something for empty string.', function() {
        const result = maybe('');

        expect(result.isJust()).toBe(true);
        expect(result.unwrapOr('heyo')).toEqual('');
    });

    it('should return maybe of something for NaN.', function() {
        const result = maybe(NaN);

        expect(result.isJust()).toBe(true);
        expect(result.unwrapOr('heyo')).toEqual(NaN);
    });

    it('should return maybe of something for empty array.', function() {
        const result = maybe([]);

        expect(result.isJust()).toBe(true);
        expect(result.unwrapOr('heyo')).toEqual([]);
    });

    it('should return maybe of something for full array.', function() {
        const result = maybe([1, 2, 3]);

        expect(result.isJust()).toBe(true);
        expect(result.unwrapOr('heyo')).toEqual([1, 2, 3]);
    });

    it('should return maybe of something for empty object.', function() {
        const result = maybe({});

        expect(result.isJust()).toBe(true);
        expect(result.unwrapOr('heyo')).toEqual({});
    });

    it('should return maybe of something for populated object.', function() {
        const result = maybe({foo: 1});

        expect(result.isJust()).toBe(true);
        expect(result.unwrapOr('heyo')).toEqual({foo: 1});
    });

    it('should return maybe of something for true.', function() {
        const result = maybe(true);

        expect(result.isJust()).toBe(true);
        expect(result.unwrapOr('heyo')).toEqual(true);
    });

    it('should return maybe of something for false.', function() {
        const result = maybe(false);

        expect(result.isJust()).toBe(true);
        expect(result.unwrapOr('heyo')).toEqual(false);
    });
});
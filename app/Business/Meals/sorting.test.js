import * as Sorting from './sorting';

describe('#business/sorting', function() {
    describe('#returnMoreUsed', function() {
        it('should return less than 0', function() {
            const a = { usedCount: 1 };
            const b = { usedCount: 0 };
            const result = Sorting.returnMoreUsed(a, b);

            expect(result).toBeLessThan(0);
        });

        it('should return greater than 0', function() {
            const a = { usedCount: 0 };
            const b = { usedCount: 1 };
            const result = Sorting.returnMoreUsed(a, b);

            expect(result).toBeGreaterThan(0);
        });

        it('should return 0', function() {
            const a = { usedCount: 0 };
            const b = { usedCount: 0 };
            const result = Sorting.returnMoreUsed(a, b);

            expect(result).toEqual(0);
        });

        it('should return 0', function() {
            const a = {};
            const b = {};
            const result = Sorting.returnMoreUsed(a, b);

            expect(result).toEqual(0);
        });
    });

    describe('#sortMostUsed', function() {
        it('should sort by usedCount', function() {
            const start = [
                { usedCount: 12 },
                { usedCount: 3 },
                { usedCount: 100 },
                { usedCount: 45 }
            ];
            const expected = [
                { usedCount: 100 },
                { usedCount: 45 },
                { usedCount: 12 },
                { usedCount: 3 }
            ];
            const results = Sorting.sortMostUsed(start);

            expect(results).toEqual(expected);
        });
    });

    describe('#compareLastUsed', function() {
        it('should return less than 0', function() {
            const a = { lastUsed: 100 };
            const b = { lastUsed: 50 };
            const result = Sorting.compareLastUsed(a, b);

            expect(result).toBeLessThan(0);
        });

        it('should return greater than 0', function() {
            const a = { lastUsed: 50 };
            const b = { lastUsed: 100 };
            const result = Sorting.compareLastUsed(a, b);

            expect(result).toBeGreaterThan(0);
        });

        it('should return 0', function() {
            const a = { lastUsed: 0 };
            const b = { lastUsed: 0 };
            const result = Sorting.compareLastUsed(a, b);

            expect(result).toEqual(0);
        });

        it('should return 0', function() {
            const a = {};
            const b = {};
            const result = Sorting.compareLastUsed(a, b);

            expect(result).toEqual(0);
        });
    });

    describe('#sortRecentlyPrepared', function() {
        it('should sort by most recently prepared', function() {
            const start = [
                { lastUsed: 12 },
                { lastUsed: 3 },
                { lastUsed: 100 },
                { lastUsed: 45 }
            ];
            const expected = [
                { lastUsed: 100 },
                { lastUsed: 45 },
                { lastUsed: 12 },
                { lastUsed: 3 }
            ];
            const results = Sorting.sortRecentlyPrepared(start);

            expect(results).toEqual(expected);
        });
    });

    describe('#sortLeastRecentlyPrepared', function() {
        it('should sort by most recently prepared', function() {
            const start = [
                {lastUsed: 12},
                {lastUsed: 3},
                {lastUsed: 100},
                {lastUsed: 45}
            ];
            const expected = [
                {lastUsed: 3},
                {lastUsed: 12},
                {lastUsed: 45},
                {lastUsed: 100}
            ];
            const results = Sorting.sortLeastRecentlyPrepared(start);

            expect(results).toEqual(expected);
        });
    });

    describe('#compareId', function() {
        it('should return less than 0', function() {
            const a = { id: 1 };
            const b = { id: 2 };
            const result = Sorting.compareId(a, b);

            expect(result).toBeLessThan(0);
        });

        it('should return greater than 0', function() {
            const a = { id: 2 };
            const b = { id: 1 };
            const result = Sorting.compareId(a, b);

            expect(result).toBeGreaterThan(0);
        });

        it('should return 0', function() {
            const a = { id: 0 };
            const b = { id: 0 };
            const result = Sorting.compareId(a, b);

            expect(result).toEqual(0);
        });

        it('should return 0', function() {
            const a = {};
            const b = {};
            const result = Sorting.compareId(a, b);

            expect(result).toEqual(0);
        });
    });

    describe('#sortById', function() {
        it('should sort by lowest ID first', function() {
            const start = [
                { id: 2 },
                { id: 0 },
                { id: 3 },
                { id: 1 }
            ];
            const expected = [
                { id: 0 },
                { id: 1 },
                { id: 2 },
                { id: 3 }
            ];
            const results = Sorting.sortById(start);

            expect(results).toEqual(expected);
        });
    });
});

import safeGetProp from './safeGetProp';

describe('safeGetProp', function() {
    it('should return a Maybe of the property value if the property is present.', function() {
        const result1 = safeGetProp('prop1', {prop1: 1}).unwrapOr('aww cwap');
        const result2 = safeGetProp('prop1', {prop1: 'lalala'}).unwrapOr('aww cwap');
        const result3 = safeGetProp('prop1', {prop1: 0}).unwrapOr('aww cwap');
        const result4 = safeGetProp('prop1', { prop1: {}}).unwrapOr('aww cwap');
        const result5 = safeGetProp('prop1', {prop1: []}).unwrapOr('aww cwap');
        const result6 = safeGetProp('prop1', {prop1: true}).unwrapOr('aww cwap');
        const result7 = safeGetProp('prop1', { prop1: false }).unwrapOr('aww cwap');
        const result8 = safeGetProp('prop1', { prop1: '' }).unwrapOr('aww cwap');

        expect(result1).toEqual(1);
        expect(result2).toEqual('lalala');
        expect(result3).toEqual(0);
        expect(result4).toEqual({});
        expect(result5).toEqual([]);
        expect(result6).toEqual(true);
        expect(result7).toEqual(false);
        expect(result8).toEqual('');
    });

    it('should return a Maybe of nothing if the property is not present.', function() {
        const result = safeGetProp('prop1', {}).unwrapOr('aww cwap');

        expect(result).toEqual('aww cwap');
    });

    it('should return a Maybe of nothing if the property is null.', function() {
        const result = safeGetProp('prop1', {prop1: null}).unwrapOr('aww cwap');

        expect(result).toEqual('aww cwap');
    });

    it('should return a Maybe of nothing if the property is undefined.', function() {
        const result = safeGetProp('prop1', {prop1: undefined}).unwrapOr('aww cwap');

        expect(result).toEqual('aww cwap');
    });
});
import { curry } from 'ramda';
import maybe from './maybe';
import { Maybe } from 'true-myth';


const safeGetProp = curry(function(propName: string, obj: object): Maybe<any> {
  return maybe(obj[propName]);
});


export default safeGetProp;
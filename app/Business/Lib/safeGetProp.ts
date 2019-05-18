import { curry } from 'ramda';
import maybe from './maybe';
import { Maybe } from 'true-myth';


const safeGetProp = curry(function<K extends keyof T, T>(propName: K, obj: T): Maybe<T[K]> {
  return maybe(obj[propName]);
});


export default safeGetProp;
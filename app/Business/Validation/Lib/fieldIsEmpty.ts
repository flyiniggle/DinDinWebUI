import { isNil } from 'ramda';

function fieldIsEmpty(value: any): boolean {
    return (isNil(value) || value === '');
}

export default fieldIsEmpty;
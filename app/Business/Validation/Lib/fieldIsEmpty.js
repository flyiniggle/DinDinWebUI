import { isNil } from 'ramda';

function fieldIsEmpty(value) {
    return (isNil(value) || value === '');
}

export default fieldIsEmpty;
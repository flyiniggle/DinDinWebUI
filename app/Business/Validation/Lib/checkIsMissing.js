import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import { isNil } from 'ramda';

function checkIsMissing(value, level = ErrorLevel.error) {
    return (isNil(value) || value === '') ? level : ErrorLevel.ok;
}

export default checkIsMissing;
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

function Result(type, field, value, message = '') {
    const errorLevels = Object.values(ErrorLevel);

    if (!errorLevels.includes(type)) {
        throw new TypeError('"type" parameter must be an ErrorLevel value.');
    }
    if (!field) {
        throw new TypeError('"field" parameter is required.');
    }

    this.type = type;
    this.field = field;
    this.value = value;
    this.message = message;
}

export default Result;
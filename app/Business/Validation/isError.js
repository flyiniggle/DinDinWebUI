import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

// String => Boolean
function isError(value) {
    const errorVariants = Object.values(ErrorLevel);

    return errorVariants.includes(value);
}

export default isError;
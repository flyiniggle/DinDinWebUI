import { curry, defaultTo, pipe } from 'ramda';

const getValue = curry(function(style, key) {
    return pipe(
        style.getPropertyValue.bind(style),
        parseInt,
        defaultTo(0)
    )(key);
});

function getElementFullHeight(el) {
    const style = window.getComputedStyle(el);
    const parse = getValue(style);

    return ['height', 'padding-top', 'padding-bottom', 'border-top-width', 'border-bottom-width', 'margin-top', 'margin-bottom']
        .map(parse)
        .reduce((prev, cur) => prev + cur);
}

export default getElementFullHeight;
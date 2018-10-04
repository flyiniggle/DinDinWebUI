import * as React from 'react';
import { addIndex, map, pipe, prop } from 'ramda';
import { Maybe } from 'true-myth';
import maybe from 'Business/Lib/maybe';


interface IIngredientsDisplayProp {
    ingredients?: Array<string>
}

const mapWithIndex = addIndex(map);
const renderIngredientsDisplay = mapWithIndex((ingredient, i) => <span key={i} className="d-block">{ingredient}</span>);
const IngredientsDisplay: (IIngredientsDisplayProp) => JSX.Element = pipe(
    prop('ingredients'),
    maybe,
    Maybe.map(renderIngredientsDisplay),
    Maybe.map(list => <React.Fragment>{list}</React.Fragment>),
    Maybe.unwrapOrElse(() => <span>add ingredients</span>)
)

export {
    IIngredientsDisplayProp,
    renderIngredientsDisplay,
}
export default IngredientsDisplay;
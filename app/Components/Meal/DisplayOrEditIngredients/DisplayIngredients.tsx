import * as React from 'react';
import { pipe } from 'ramda';
import { Maybe } from 'true-myth';
import safeGetProp from 'Business/Lib/safeGetProp';


interface IDisplayIngredientsProps {
    value?: Array<string>
}

const renderIngredientsDisplay = function (ingredients: string[]) {
    return ingredients.map((ingredient, i) => <span key={i} className="d-block">{ingredient}</span>);
}
const DisplayIngredients = function (props: IDisplayIngredientsProps) {
    return pipe(
        safeGetProp('value'),
        Maybe.map(renderIngredientsDisplay),
        Maybe.map(list => <React.Fragment>{list}</React.Fragment>),
        Maybe.unwrapOrElse(() => <span>add ingredients</span>)
    )(props)
};


export {
    IDisplayIngredientsProps,
    renderIngredientsDisplay,
}
export default DisplayIngredients;
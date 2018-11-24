import * as React from 'react';
import { addIndex, map, pipe , prop} from 'ramda';
import { Maybe } from 'true-myth';
import maybe from 'Business/Lib/maybe';


interface IDisplayIngredientsProps {
    value?: Array<string>
}

const mapWithIndex = addIndex(map);
const renderIngredientsDisplay = mapWithIndex((ingredient, i) => <span key={i} className="d-block">{ingredient}</span>);
const DisplayIngredients = function (props: IDisplayIngredientsProps) {
    return pipe(
        prop('value'),
        maybe,
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
import * as React from 'react';
import { faTired as solidTired } from '@fortawesome/free-solid-svg-icons';
import { faTired as emptyTired } from '@fortawesome/free-regular-svg-icons';
import RatingDisplay, { IRatingDisplayProps } from 'UI/Forms/Rating/RatingDisplay';
import './DisplayDifficulty.sass';


interface IDisplayDifficulty {
    value: number,
    range: number,
}

function DisplayDifficulty(props: IDisplayDifficulty) {
    const ratingDisplayProps: IRatingDisplayProps = {
        selectedIcon: solidTired,
        unselectedIcon: emptyTired,
        className: 'display-difficulty',
        ...props
    }

    return <RatingDisplay {...ratingDisplayProps}/>
}

export default DisplayDifficulty;
export { IDisplayDifficulty };
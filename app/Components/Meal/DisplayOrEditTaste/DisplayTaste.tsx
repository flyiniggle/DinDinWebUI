import * as React from 'react';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import RatingDisplay, { IRatingDisplayProps } from 'UI/Forms/Rating/RatingDisplay';
import './DisplayTaste.sass'


interface IDisplayTaste {
    value: number,
    range: number,
}

function DisplayTaste(props: IDisplayTaste) {
    const ratingDisplayProps: IRatingDisplayProps = {
        selectedIcon: solidStar,
        unselectedIcon: emptyStar,
        className: 'display-taste',
        ...props
    }

    return <RatingDisplay {...ratingDisplayProps}/>
}

export default DisplayTaste;
export { IDisplayTaste };
import * as React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IRatingDisplayProps {
    rating: number,
    range: number,
    selectedIcon: IconDefinition,
    unselectedIcon: IconDefinition,
}


function RatingDisplay(props: IRatingDisplayProps) {
    const { range, rating, selectedIcon, unselectedIcon } = props;

    return (
        <React.Fragment>
            {
                Array.from(Array(range).keys())
                    .map(function (value) {
                        const icon = (value < rating) ? selectedIcon : unselectedIcon;

                        return (
                            <span key={value} >
                                <FontAwesomeIcon icon={icon} />
                            </span>
                        );
                    })
            }
        </React.Fragment>
    )
}

export default RatingDisplay;
export { IRatingDisplayProps };
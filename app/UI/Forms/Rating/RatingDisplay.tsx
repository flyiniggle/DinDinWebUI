import * as React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition} from '@fortawesome/fontawesome-common-types';


interface IRatingDisplayProps {
    value: number
    range: number
    selectedIcon: IconDefinition
    unselectedIcon: IconDefinition
    className?: string
}

function RatingDisplay(props: IRatingDisplayProps) {
    const { selectedIcon, unselectedIcon, range, value, className } = props;

    return (
        <div className={`rating-display ${className}`}>
            {
                Array.from(Array(range).keys())
                    .map(function (i) {
                        const icon = (i < value) ? selectedIcon : unselectedIcon;

                        return (
                            <span key={i} >
                                <FontAwesomeIcon className="font" icon={icon} size="lg"/>
                            </span>
                        );
                    })
            }
        </div>
    )
}


export { IRatingDisplayProps };
export default RatingDisplay;
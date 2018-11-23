import * as React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar} from '@fortawesome/free-regular-svg-icons';


interface IDisplayTaste {
    value: number,
    range: number,
}

function DisplayTaste(props: IDisplayTaste) {
    const { range, value } = props;

    return (
        <React.Fragment>
            {
                Array.from(Array(range).keys())
                    .map(function (i) {
                        const icon = (i < value) ? solidStar : emptyStar;

                        return (
                            <span key={i} >
                                <FontAwesomeIcon icon={icon} />
                            </span>
                        );
                    })
            }
        </React.Fragment>
    )
}

export default DisplayTaste;
export { IDisplayTaste };
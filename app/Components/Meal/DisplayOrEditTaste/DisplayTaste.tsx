import * as React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import './DisplayTaste.sass'


interface IDisplayTaste {
    value: number,
    range: number,
}

function DisplayTaste(props: IDisplayTaste) {
    const { range, value } = props;

    return (
        <div className={"display-taste"}>
            {
                Array.from(Array(range).keys())
                    .map(function (i) {
                        const icon = (i < value) ? solidStar : emptyStar;

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

export default DisplayTaste;
export { IDisplayTaste };
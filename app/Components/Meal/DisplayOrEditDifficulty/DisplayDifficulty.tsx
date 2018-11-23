import * as React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTired as solidTired } from '@fortawesome/free-solid-svg-icons';
import { faTired as emptyTired } from '@fortawesome/free-regular-svg-icons';


interface IDisplayDifficulty {
    value: number,
    range: number,
}

function DisplayDifficulty(props: IDisplayDifficulty) {
    const { range, value } = props;

    return (
        <React.Fragment>
            {
                Array.from(Array(range).keys())
                    .map(function (i) {
                        const icon = (i < value) ? solidTired : emptyTired;

                        return (
                            <span key={i} >
                                <FontAwesomeIcon icon={icon}  size="lg" />
                            </span>
                        );
                    })
            }
        </React.Fragment>
    )
}

export default DisplayDifficulty;
export { IDisplayDifficulty };
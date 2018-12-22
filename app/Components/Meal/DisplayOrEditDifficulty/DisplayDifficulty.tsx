import * as React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTired as solidTired } from '@fortawesome/free-solid-svg-icons';
import { faTired as emptyTired } from '@fortawesome/free-regular-svg-icons';
import './DisplayDifficulty.sass'


interface IDisplayDifficulty {
    value: number,
    range: number,
}

function DisplayDifficulty(props: IDisplayDifficulty) {
    const { range, value } = props;

    return (
        <div className="display-difficulty">
            {
                Array.from(Array(range).keys())
                    .map(function (i) {
                        const icon = (i < value) ? solidTired : emptyTired;

                        return (
                            <span key={i} >
                                <FontAwesomeIcon className="font" icon={icon}  size="lg" />
                            </span>
                        );
                    })
            }
        </div>
    )
}

export default DisplayDifficulty;
export { IDisplayDifficulty };
import * as React from 'react';
import { IDisplayDifficulty } from 'Components/Meal/DisplayOrEditDifficulty/DisplayDifficulty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTired as solidTired } from '@fortawesome/free-solid-svg-icons';
import { faTired as emptyTired } from '@fortawesome/free-regular-svg-icons';


interface IEditDifficultyState {
    submitting: boolean
}

interface IEditDifficultyProps extends IDisplayDifficulty {
    onChange: (rating: number) => void
}

class EditDifficulty extends React.Component<IEditDifficultyProps, IEditDifficultyState> {
    readonly state: IEditDifficultyState = {
        submitting: false
    }

    render() {
        const { range, value, onChange } = this.props
        return (
            <div className="rating-editor">
                {
                    Array.from(Array(range).keys())
                        .map(function (i) {
                            const icon = (i < value) ? solidTired : emptyTired;

                            return (
                                <span key={i} onClick={() => { onChange(value + 1) }}>
                                    <FontAwesomeIcon icon={icon} />
                                </span>
                            )
                        })
                }
            </div>
        )
    }

}

export default EditDifficulty
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar} from '@fortawesome/free-regular-svg-icons';
import { IDisplayTaste } from 'Components/Meal/DisplayOrEditTaste/DisplayTaste';
import './EditTaste.sass';

interface IEditRatingState {
    submitting: boolean
}

interface IEditRatingProps extends IDisplayTaste {
    onChange: (rating: number) => void,
}

class EditRating extends React.Component<IEditRatingProps, IEditRatingState> {
    readonly state: IEditRatingState = {
        submitting: false
    }

    render() {
        const { range, value, onChange } = this.props
        return (
            <div className="rating-editor edit-taste">
                {
                    Array.from(Array(range).keys())
                        .map(function (i) {
                            const icon = (i < value) ? solidStar : emptyStar;

                            return (
                                <span key={i} onClick={() => { onChange(i + 1) }}>
                                    <FontAwesomeIcon className="font" icon={icon} size="lg" />
                                </span>
                            )
                        })
                }
            </div>
        )
    }

}

export default EditRating
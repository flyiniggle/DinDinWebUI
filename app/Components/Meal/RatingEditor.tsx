import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRatingDisplayProps } from 'Components/Meal/RatingDisplay';
import FieldControlButtons from 'UI/Forms/FieldControlButtons/FieldControlButtons';

interface RatingEditorState {
    submitting: boolean
}

interface IRatingEditorProps extends IRatingDisplayProps {
    onChange: (rating: number) => void,
    onSave: () => void,
    onCancel: (e: Event) => void
}

class RatingEditor extends React.Component<IRatingEditorProps, RatingEditorState> {
    readonly state: RatingEditorState = {
        submitting: false
    }

    doSave = async (): Promise<void> => {
        this.setState({ submitting: true });
        await this.props.onSave();
        this.setState({ submitting: false });
    }

    render() {
        const { range, rating, selectedIcon, unselectedIcon, onChange } = this.props
        return (
            <div className="rating-editor">
                {
                    Array.from(Array(range).keys())
                        .map(function (value) {
                            const icon = (value < rating) ? selectedIcon : unselectedIcon;

                            return (
                                <span key={value} onClick={() => { onChange(value + 1) }}>
                                    <FontAwesomeIcon icon={icon} />
                                </span>
                            )
                        })
                }
                <FieldControlButtons
                    doSave={this.doSave}
                    doCancel={this.props.onCancel}
                    submitting={this.state.submitting} />
            </div>
        )
    }

}

export default RatingEditor
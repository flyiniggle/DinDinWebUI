import * as React from 'react';
import EditableList, { IEditableListProps } from 'UI/Forms/EditableList/EditableList';
import { IDisplayIngredientsProps } from 'Components/Meal/DisplayOrEditIngredients/DisplayIngredients'


interface IEditIngredientsProps extends IDisplayIngredientsProps {
    onChange: (a: string[]) => void,
}

interface State {
    submitting: boolean
}

class EditIngredients extends React.Component<IEditIngredientsProps, State> {
    readonly state: State = {
        submitting: false
    }

    render() {
        const props: IEditableListProps = {
            list: this.props.value,
            onChange: this.props.onChange
        };

        return <EditableList {...props} className="mb-3" />;
    }
}

export default EditIngredients
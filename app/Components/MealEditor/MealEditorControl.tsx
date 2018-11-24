import * as React from 'react';
import editableFields from "Components/Meal/Types/editableFields";
import IMealEditorControlProps from 'Components/MealEditor/Types/IMealEditorControlProps';
import IMealProps from 'Components/Meal/Types/IMealProps';
import updateMeal from 'Business/Meals/updateMeal';
import IMeal from 'Business/Meals/Types/Meal';


interface IState {
    activeField?: editableFields
    activeFieldValue?: any
}

function MealEditorControl(MealComponent: new() => React.Component<IMealProps, any>): React.ComponentClass<IMealEditorControlProps, IState>
function MealEditorControl(MealComponent: (props: IMealProps) => JSX.Element): React.ComponentClass<IMealEditorControlProps, IState>
function MealEditorControl(MealComponent): React.ComponentClass {
    return class MealEditorControlWrapper extends React.Component<IMealEditorControlProps, IState> {
        readonly state: IState = {
            activeField: null,
            activeFieldValue: null
        }

        componentWillMount = function () {
            document.addEventListener('keydown', this.props.handleKeydown, false);
        }

        componentWillUnmount = function () {
            document.removeEventListener('keydown', this.props.handleKeydown, false);
        }

        cancelEditing = (e: Event): void => {
            e.preventDefault();
            e.stopPropagation();
            this.setState({ activeField: null, activeFieldValue: null });
        }

        updateCurrentValue = (e: MouseEvent | KeyboardEvent | number | string) => {
            let val;

            if (typeof e === 'string' || typeof e === 'number') {
                val = e;
            } else {
                val = (e.target as HTMLInputElement).value;
            }

            this.setState({ activeFieldValue: val });
        }

        updateCurrentListValue = (a: Array<any>): void => {
            this.setState({ activeFieldValue: a });
        }
    
        doSave = async () => {
            const result = await updateMeal(
                this.props.meal,
                { [this.state.activeField]: this.state.activeFieldValue }
            );

            result.match({
                Ok: this.handleOkSave,
                Err: console.log //use a generic error messager, just as soon as I build it
            });
        }

        handleOkSave = (meal: IMeal) => {
            this.setState({
                activeField: null,
                activeFieldValue: null
            });

            return this.props.updateMeal(meal);
        }

        activateEditor = (field: editableFields, value: any) => {
            this.setState({ activeField: field, activeFieldValue: value });
        }

        render() {
            const childProps: IMealProps = {
                saveFieldHandler: this.doSave,
                updateFieldHandler: this.updateCurrentValue,
                updateListFieldHandler: this.updateCurrentListValue,
                cancelEditingHandler: this.cancelEditing,
                activeField: this.state.activeField,
                activeFieldValue: this.state.activeFieldValue,
                activateEditor: this.activateEditor,
                meal: this.props.meal,
                message: this.props.message,
                useMeal: this.props.useMeal
            }

            return <MealComponent {...childProps}/>;
        }
    }
}


export default MealEditorControl;
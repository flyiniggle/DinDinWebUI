import * as React from 'react';
import editableFields from "Components/Meal/Types/editableFields";
import IMealEditorControlProps from 'Components/MealEditor/Types/IMealEditorControlProps';
import IMealProps from 'Components/Meal/Types/IMealProps';
import Meal from 'Business/Meals/Types/Meal';
import { events } from 'Data/Middleware/events';
import { MEAL_EDITOR_ACKNOWLEDGE_UPDATE_MEAL } from 'Data/ActionTypes/mealEditorActionTypes';


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
            const handler = this.cancelEditing

            events.registerListener({
                type: MEAL_EDITOR_ACKNOWLEDGE_UPDATE_MEAL,
                handler: () => handler()
            })
            document.addEventListener('keydown', this.props.handleKeydown, false);
        }

        componentWillUnmount = function () {
            document.removeEventListener('keydown', this.props.handleKeydown, false);
        }

        cancelEditing = (e?: Event): void => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }

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

        activateEditor = (field: editableFields, value: any) => {
            this.setState({ activeField: field, activeFieldValue: value });
        }

        save = () => {
            const updates: Partial<Meal> = { [this.state.activeField]: this.state.activeFieldValue }
            const { updateMeal, meal } = this.props;

            meal.match({
                Just: function (meal: Meal): void {
                    updateMeal(meal, updates);
                },
                Nothing: () => undefined
            });
        }

        render() {
            const childProps: Partial<IMealProps> = {
                saveField: this.save,
                isWorking: this.props.isWorking,
                useMeal: this.props.useMeal,
                updateFieldHandler: this.updateCurrentValue,
                updateListFieldHandler: this.updateCurrentListValue,
                cancelEditingHandler: this.cancelEditing,
                activeField: this.state.activeField,
                activeFieldValue: this.state.activeFieldValue,
                activateEditor: this.activateEditor,
                meal: this.props.meal,
                messages: this.props.messages,
                acknowledgeMessage: this.props.acknowledgeMessage
            }

            return <MealComponent {...childProps}/>;
        }
    }
}


export default MealEditorControl;
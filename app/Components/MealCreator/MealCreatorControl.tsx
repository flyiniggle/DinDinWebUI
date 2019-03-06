import * as React from 'react';
import { Redirect } from 'react-router';
import editableFields from "Components/Meal/Types/editableFields";
import IMealProps from 'Components/Meal/Types/IMealProps';
import IMealCreatorControlProps from 'Components/MealCreator/Types/IMealCreaterControlProps';
import INewMeal from 'Business/Meals/Types/NewMeal';
import maybe from 'Business/Lib/maybe';


interface IState {
    activeField?: editableFields
    activeFieldValue?: any,
    newMeal: INewMeal,
    mealId: number | null
}

function MealCreatorControl(MealComponent: new() => React.Component<IMealProps, any>): React.ComponentClass<IMealCreatorControlProps, IState>
function MealCreatorControl(MealComponent: (props: IMealProps) => JSX.Element): React.ComponentClass<IMealCreatorControlProps, IState>
function MealCreatorControl(MealComponent): React.ComponentClass {
    return class MealEditorControlWrapper extends React.Component<IMealCreatorControlProps, IState> {
        readonly state: IState = {
            activeField: null,
            activeFieldValue: null,
            newMeal: {
                name: '',
                ingredients: [],
                taste: 0,
                difficulty: 0,
                notes: ''
            },
            mealId: null
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
    
        doSaveField = async () => {
            if (this.state.activeField) {
                const updatedNewMeal = {
                    ...this.state.newMeal,
                    [this.state.activeField]: this.state.activeFieldValue
                }
                
                this.setState({
                    newMeal: updatedNewMeal,
                    activeField: null,
                    activeFieldValue: null
                });
            }
        }

        saveNewMeal = (): void => {
            this.props.createMeal(this.state.newMeal);
        }

        activateEditor = (field: editableFields, value: any) => {
            this.setState({ activeField: field, activeFieldValue: value });
        }

        render() {
            if (this.state.mealId) {
                return <Redirect to={`/meals/${this.state.mealId}`} />
            }

            const childProps = {
                saveNewMeal: this.saveNewMeal,
                isWorking: this.props.isWorking,
                meal: maybe(this.state.newMeal),
                saveField: this.doSaveField,
                updateFieldHandler: this.updateCurrentValue,
                updateListFieldHandler: this.updateCurrentListValue,
                cancelEditingHandler: this.cancelEditing,
                activeField: this.state.activeField,
                activeFieldValue: this.state.activeFieldValue,
                activateEditor: this.activateEditor,
                ...this.props
            }

            return <MealComponent {...childProps}/>;
        }
    }
}


export default MealCreatorControl;
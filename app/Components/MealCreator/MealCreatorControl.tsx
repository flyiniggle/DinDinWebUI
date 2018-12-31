import * as React from 'react';
import { Redirect } from 'react-router';
import { Result, Maybe } from 'true-myth';
import editableFields from "Components/Meal/Types/editableFields";
import IMealProps from 'Components/Meal/Types/IMealProps';
import IMealCreatorControlProps from 'Components/MealCreator/Types/IMealCreaterControlProps';
import IMeal from 'Business/Meals/Types/Meal';
import INewMeal from 'Business/Meals/Types/NewMeal';
import createMeal from 'Business/Meals/createMeal';
import Message from 'Business/Validation/Types/Message';
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

        doSaveMeal = async (): Promise<Result<IMeal, Message[]>> => {
            const result = await createMeal(this.state.newMeal);
    
            result.map((meal) => {
                this.setState({
                    mealId: meal.id
                });
            })
    
            result.match({
                Ok: () => null,
                Err: console.log //use a generic error messager, just as soon as I build it
            });
    
            return result;
        }

        activateEditor = (field: editableFields, value: any) => {
            this.setState({ activeField: field, activeFieldValue: value });
        }

        render() {
            if (this.state.mealId) {
                return <Redirect to={`/meals/${this.state.mealId}`} />
            }

            const childProps = {
                save: this.doSaveMeal,
                meal: maybe(this.state.newMeal),
                saveFieldHandler: this.doSaveField,
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
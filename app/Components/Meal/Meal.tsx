import * as React from 'react';
import { Link } from 'react-router-dom';
import Message from 'Business/Validation/Types/Message';
import updateMeal from 'Business/Meals/updateMeal';
import dateString from 'UI/Formatting/dateString';
import IMeal from 'Business/Meals/Types/Meal';

import './Meal.sass';
import NameEditor from 'Components/Meal/NameEditor';
import NotesEditor from 'Components/Meal/NotesEditor';

enum editableFields {
    name = 'name',
    notes = 'notes',
    taste = 'taste',
    difficulty = 'difficulty'
}

interface State {
    activeField?: editableFields
    message?: Message
    submitting: boolean
    activeFieldValue?: any
}

interface MealProps {
    meal?: IMeal,
    useMeal: (IMeal) => Promise<void>,
    updateMeal: (IMeal) => void
}


class Meal extends React.Component<MealProps, State> {
    readonly state: State = {
        activeField: null,
        message: null,
        submitting: false,
        activeFieldValue: null
    }

    save = async (): Promise<void> => {
        this.setState({ submitting: true });

        const result = await updateMeal(this.props.meal, { [this.state.activeField]: this.state.activeFieldValue });

        this.setState({ submitting: false });

        result.match({
            Ok: this.props.updateMeal,
            Err: console.log //use a generic error messager, just as soon as I build it
        });

        this.setState({
            activeFieldValue: null
        });

        if (result.isOk()) {
            this.setState({ activeField: null });
        }
    }

    cancelEditing = (e: Event): void => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ activeField: null, activeFieldValue: null });
    }

    updateCurrentValue = (e) => { this.setState({ activeFieldValue: e.target.value }); }

    render() {
        const meal: IMeal = this.props.meal;

        if (!meal) {
            return <p>Loading...</p>
        }

        return (
            <div className="meal">
                <div className="row m-2" onClick={() => {
                    this.setState({ activeField: editableFields.name, activeFieldValue: meal.name })
                }}>
                    <div className="editable">
                        {this.state.activeField === editableFields.name
                            ? <NameEditor
                                name={meal.name}
                                onChange={this.updateCurrentValue}
                                onSave={this.save}
                                onCancel={this.cancelEditing}
                            />
                            : <h1>{meal.name}</h1>}
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-12 col-lg-2">
                        <h4>Ingredients</h4>
                        {meal.ingredients.map(ingredient => <span>{ingredient}</span>)}
                    </div>
                    <div className="col-12 col-lg-5">
                        <div><h4 className="d-inline">Taste: </h4><span className="taste">{meal.taste}</span></div>
                        <div><h4 className="d-inline">Difficulty: </h4><span className="difficulty">{meal.difficulty}</span></div>
                    </div>
                    <div className="col-12 col-lg-5">
                        <div>
                            <h4 className="d-inline">Last Used: </h4>
                            <span className='lastUsed'>{dateString.display(meal.lastUsed)}</span>
                        </div>

                        <h4 className="usedCount">Used {meal.usedCount} {(meal.usedCount === 1) ? 'time' : 'times'}</h4>
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-12">
                        <h4>Notes:</h4>
                        {
                            this.state.activeField === editableFields.notes
                                ? <NotesEditor
                                    notes={meal.notes}
                                    onSave={this.save}
                                    onChange={this.updateCurrentValue}
                                    onCancel={this.cancelEditing}
                                />
                                : <span className={`editable ${meal.notes ? '' : 'placeholder'}`}
                                    onClick={() => {
                                        this.setState({ activeField: editableFields.notes, activeFieldValue: meal.notes })
                                    }}
                                >{meal.notes || "add a note"}</span>
                        }
                    </div>
                </div>
                <div className="row m2 d-flex justify-content-end">
                    <div className="col-2 d-flex justify-content-between">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={function (event): void {
                                event.stopPropagation();
                                event.preventDefault();
                                return this.props.useMeal(meal);
                            }}>Use it!</button>

                        <Link to="/meals" className="btn btn-outline-primary">close</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Meal;
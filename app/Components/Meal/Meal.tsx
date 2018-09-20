import * as React from 'react';
import { map, pipe } from 'ramda';
import { Link } from 'react-router-dom';
import Message from 'Business/Validation/Types/Message';
import updateMeal from 'Business/Meals/updateMeal';
import dateString from 'UI/Formatting/dateString';
import IMeal from 'Business/Meals/Types/Meal';
import NameEditor from 'Components/Meal/NameEditor';
import NotesEditor from 'Components/Meal/NotesEditor';
import RatingEditor from 'Components/Meal/RatingEditor';
import { faStar as solidStar, faTired as solidTired } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar, faTired as emptyTired } from '@fortawesome/free-regular-svg-icons';
import RatingDisplay from 'Components/Meal/RatingDisplay';
import { Maybe } from 'true-myth';
import IngredientsEditor from 'Components/Meal/IngredientsEditor';

import './Meal.sass';

enum editableFields {
    name = 'name',
    notes = 'notes',
    taste = 'taste',
    difficulty = 'difficulty',
    ingredients = 'ingredients'
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

    componentWillMount = function () {
        document.addEventListener('keydown', this.handleKeydown, false);
    }


    componentWillUnmount = function () {
        document.removeEventListener('keydown', this.handleKeydown, false);
    }

    save = async (): Promise<void> => {
        this.setState({ submitting: true });

        const result = await updateMeal(this.props.meal, { [this.state.activeField]: this.state.activeFieldValue });

        this.setState({ submitting: false });

        result.match({
            Ok: this.props.updateMeal,
            Err: console.log //use a generic error messager, just as soon as I build it
        });

        if (result.isOk()) {
            this.setState({
                activeField: null,
                activeFieldValue: null
            });
        }
    }

    handleKeydown = (e: KeyboardEvent): Promise<void> => {
        switch (e.key) {
            case 'Enter':
                return this.save();
            case 'Escape':
                return Promise.resolve(this.cancelEditing(e));
        }
    }

    cancelEditing = (e: Event): void => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ activeField: null, activeFieldValue: null });
    }

    updateCurrentValue = (e) => { this.setState({ activeFieldValue: e.target.value }); }

    updateCurrentListValue = (a: Array<any>) => {
        this.setState({ activeFieldValue: a })
    }

    render() {
        const meal: IMeal = this.props.meal;

        if (!meal) {
            return <p>Loading...</p>
        }

        const ingredients = meal.ingredients.length !== 0 ? Maybe.of(meal.ingredients) : Maybe.nothing();
        const renderIngredientsDisplay = map(i => <span className="d-block">{i}</span>);
        const ingredientsDisplay = pipe(
            map(renderIngredientsDisplay),
            Maybe.getOr('add ingredients')
        )(ingredients);

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
                        <div className="editable" onClick={() => {
                            this.setState({ activeField: editableFields.ingredients, activeFieldValue: meal.ingredients })
                        }}>
                            {this.state.activeField === editableFields.ingredients
                                ? <IngredientsEditor
                                    list={this.state.activeFieldValue}
                                    onChange={this.updateCurrentListValue}
                                    onSave={this.save}
                                    onCancel={this.cancelEditing}
                                />
                                : ingredientsDisplay
                            }
                        </div>
                    </div>
                    <div className="col-12 col-lg-5">
                        <div>
                            <h4 className="d-inline">Taste: </h4>
                            {this.state.activeField === editableFields.taste
                                ? <h2>
                                    <RatingEditor
                                        rating={this.state.activeFieldValue}
                                        range={5}
                                        selectedIcon={solidStar}
                                        unselectedIcon={emptyStar}
                                        onChange={val => { this.setState({ activeFieldValue: val }) }}
                                        onCancel={this.cancelEditing}
                                        onSave={this.save}
                                    />
                                </h2>
                                : <h2 className="editable" onClick={() => {
                                    this.setState({ activeField: editableFields.taste, activeFieldValue: meal.taste })
                                }}>
                                    <RatingDisplay
                                        rating={meal.taste}
                                        range={5}
                                        selectedIcon={solidStar}
                                        unselectedIcon={emptyStar}
                                    />
                                </h2>
                            }
                        </div>
                        <div>
                            <h4 className="d-inline">Difficulty: </h4>

                            {this.state.activeField === editableFields.difficulty
                                ? <h2>
                                    <RatingEditor
                                        rating={this.state.activeFieldValue}
                                        range={5}
                                        selectedIcon={solidTired}
                                        unselectedIcon={emptyTired}
                                        onChange={val => { this.setState({ activeFieldValue: val }) }}
                                        onCancel={this.cancelEditing}
                                        onSave={this.save}
                                    />
                                </h2>
                                : <h2 className="editable" onClick={() => {
                                    this.setState({ activeField: editableFields.difficulty, activeFieldValue: meal.difficulty })
                                }}>
                                    <RatingDisplay
                                        rating={meal.difficulty}
                                        range={5}
                                        selectedIcon={solidTired}
                                        unselectedIcon={emptyTired}
                                    />
                                </h2>
                            }
                        </div>
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
                                    notes={this.state.activeFieldValue}
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
                            onClick={(event) => {
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
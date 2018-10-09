import * as React from 'react';
import { Link } from 'react-router-dom';
import Message from 'Business/Validation/Types/Message';
import IMeal from 'Business/Meals/Types/Meal';
import INewMeal from 'Business/Meals/Types/NewMeal';
import LastUsedDisplay from 'Components/Meal/LastUsedDisplay';
import NameEditor from 'Components/Meal/NameEditor';
import NotesEditor from 'Components/Meal/NotesEditor';
import RatingEditor from 'Components/Meal/RatingEditor';
import editableFields from 'Components/Meal/editableFields';
import IngredientsDisplay from 'Components/Meal/IngredientsDisplay';
import IngredientsEditor from 'Components/Meal/IngredientsEditor';
import RatingDisplay from 'Components/Meal/RatingDisplay';
import UsedCountDisplay from 'Components/Meal/UsedCountDisplay';
import { faStar as solidStar, faTired as solidTired } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar, faTired as emptyTired } from '@fortawesome/free-regular-svg-icons';
import { Result } from 'true-myth';

import './Meal.sass';


interface IMealProps {
    meal: IMeal | INewMeal
    message?: Message
    useMeal: (IMeal) => Promise<void>
    save: (string: editableFields, val: any) => Promise<Result<IMeal, Message[]>>
}

interface IState {
    activeField?: editableFields
    activeFieldValue?: any
}

class Meal extends React.Component<IMealProps, IState> {
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

    updateCurrentValue = (e) => { this.setState({ activeFieldValue: e.target.value }); }

    updateCurrentListValue = (a: Array<any>): void => {
        this.setState({ activeFieldValue: a });
    }

    doSave = async () => {
        const result = await this.props.save(this.state.activeField, this.state.activeFieldValue);

        if (result.isOk()) {
            this.setState({
                activeField: null,
                activeFieldValue: null
            });
        }
    }

    render() {
        const {
            meal,
            message,
            useMeal
        } = this.props

        if (!meal) {
            return <p>Loading...</p>
        }
        
        const { activeField, activeFieldValue } = this.state;
        const ingredients = meal.ingredients.length !== 0 ? meal.ingredients : null;
        const usedCount = 'usedCount' in meal ? meal.usedCount : null;
        const lastUsed = 'lastUsed' in meal ? meal.lastUsed : null;


        return (
            <div className="meal">
                <div className="row m-2" onClick={() => {
                    this.setState({ activeField: editableFields.name, activeFieldValue: meal.name })
                }}>
                    <div className="editable">
                        {activeField === editableFields.name
                            ? <NameEditor
                                name={activeFieldValue}
                                onChange={this.updateCurrentValue}
                                onSave={this.doSave}
                                onCancel={this.cancelEditing}
                            />
                            : <h1>{meal.name}</h1>}
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-12 col-lg-2">
                        <h4>Ingredients</h4>
                        <div onClick={() => {
                            this.setState({ activeField: editableFields.ingredients, activeFieldValue: meal.ingredients })
                        }}>
                            {activeField === editableFields.ingredients
                                ? <IngredientsEditor
                                    list={activeFieldValue}
                                    onChange={this.updateCurrentListValue}
                                    onSave={this.doSave}
                                    onCancel={this.cancelEditing}
                                />
                                : <div className="editable"> <IngredientsDisplay ingredients={ingredients} /> </div>
                            }
                        </div>
                    </div>
                    <div className="col-12 col-lg-5">
                        <div>
                            <h4 className="d-inline">Taste: </h4>
                            {activeField === editableFields.taste
                                ? <h2>
                                    <RatingEditor
                                        rating={activeFieldValue}
                                        range={5}
                                        selectedIcon={solidStar}
                                        unselectedIcon={emptyStar}
                                        onChange={val => { this.setState({ activeFieldValue: val }) }}
                                        onCancel={this.cancelEditing}
                                        onSave={this.doSave}
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

                            {activeField === editableFields.difficulty
                                ? <h2>
                                    <RatingEditor
                                        rating={activeFieldValue}
                                        range={5}
                                        selectedIcon={solidTired}
                                        unselectedIcon={emptyTired}
                                        onChange={val => { this.setState({ activeFieldValue: val }) }}
                                        onCancel={this.cancelEditing}
                                        onSave={this.doSave}
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
                        <LastUsedDisplay date={lastUsed} />
                        <UsedCountDisplay usedCount={usedCount} />
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-12">
                        <h4>Notes:</h4>
                        {
                            activeField === editableFields.notes
                                ? <NotesEditor
                                    notes={activeFieldValue}
                                    onSave={this.doSave}
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
                                return useMeal(meal);
                            }}>Use it!</button>

                        <Link to="/meals" className="btn btn-outline-primary">close</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Meal;
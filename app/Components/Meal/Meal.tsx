import * as React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponentProps } from 'react-router-dom';
import getMealById from 'Business/Meals/getMealById';
import Header from 'Components/Header/Header';
import TextInput from 'UI/Forms/TextInput/TextInput';
import AsyncButton from 'UI/Forms/AsyncButton/AsyncButton';
import dateString from 'UI/Formatting/dateString';
import IMeal from 'Business/Meals/Types/Meal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';

import './Meal.sass';

interface State {
    editingName: boolean,
    editingTaste: boolean,
    editingDifficulty: boolean,
    editingNotes: boolean,
}

interface MealProps {
    meals?: IMeal[],
    logoutHandler: () => void,
    match: ReactComponentProps,
    useMeal: (Meal) => Promise<void>
}


class Meal extends React.Component<MealProps, State> {
    readonly state: State = {
        editingName: false,
        editingTaste: false,
        editingDifficulty: false,
        editingNotes: false
    }

    render() {
        if (!this.props.meals) {
            return <p>Loading...</p>
        }
        const meal: IMeal = getMealById(this.props.match.params.id, this.props.meals);

        return (
            <div className="meal mainBackground container-fluid">
                <div className="row">
                    <div className="col-12">
                        <Header logoutHandler={this.props.logoutHandler} />
                    </div>
                </div>
                <div className="row m-2" onClick={() => {
                    this.setState({ editingName: true })
                }}>
                    <div className="editable">
                        {this.state.editingName ?
                            (<div className="input-group">
                                <TextInput value={meal.name} />
                                <div className="input-group-append">
                                    <AsyncButton className="btn btn-sm btn-primary" ><FontAwesomeIcon icon={faCheck} /></AsyncButton>
                                    <AsyncButton className="btn btn-sm btn-outline-primary" ><FontAwesomeIcon icon={faBan} /></AsyncButton>
                                </div>
                            </div>)
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
                        <div><h4 className="d-inline">Last Used: </h4><span className='lastUsed'>{dateString.display(meal.lastUsed)}</span></div>

                        <h4 className="usedCount">Used {meal.usedCount} {(meal.usedCount === 1) ? 'time' : 'times'}</h4>
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-12">
                        <h4>Notes:</h4>
                        <span>{meal.notes}</span>
                    </div>
                </div>
                <div className="row m2 d-flex justify-content-end">
                    <div className="col-2 d-flex justify-content-between">
                        <AsyncButton className="btn btn-primary">save</AsyncButton>

                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={function (event): void {
                                event.stopPropagation();
                                event.preventDefault();
                                return this.props.useMeal(meal);
                            }}>Use it!</button>

                        <Link to="/dashboard" className="btn btn-outline-primary">close</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Meal;
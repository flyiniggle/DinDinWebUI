import { curry } from 'ramda';
import * as React from 'react';
import { Link } from 'react-router-dom';
import maybe from 'Business/Lib/maybe';
import IMeal from 'Business/Meals/Types/Meal';
import LastUsedDisplay from 'Components/Meal/LastUsedDisplay';
import DisplayOrEditName, {IDisplayOrEditNameProps} from 'Components/Meal/DisplayOrEditName/DisplayOrEditName';
import NotesEditor from 'Components/Meal/NotesEditor';
import RatingEditor from 'Components/Meal/RatingEditor';
import editableFields from 'Components/Meal/editableFields';
import IMealProps from 'Components/Meal/Types/IMealProps';
import IngredientsDisplay from 'Components/Meal/IngredientsDisplay';
import IngredientsEditor from 'Components/Meal/IngredientsEditor';
import RatingDisplay from 'Components/Meal/RatingDisplay';
import UsedCountDisplay from 'Components/Meal/UsedCountDisplay';
import { faStar as solidStar, faTired as solidTired } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar, faTired as emptyTired } from '@fortawesome/free-regular-svg-icons';

import './Meal.sass';
import INewMeal from 'Business/Meals/Types/NewMeal';

const getRenderUseIt = curry(function(meal: IMeal, handler: (IMeal) => any) {
    return (
        <button
            className="btn btn-primary"
            type="button"
            onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                return handler(meal);
            }}
        >
            Use it!
        </button>
    );
});

const getRenderSaveButton = curry(function (newMeal: INewMeal, handler: (INewMeal) => any) {
    return (
        <button
            className="btn btn-primary"
            type="button"
            onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                return handler(newMeal);
            }}
        >
            Save
        </button>
    );
});


function Meal(props: IMealProps) {
    const {
        meal,
        message,
        useMeal,
        save,
        activeField,
        activeFieldValue,
        updateFieldHandler,
        updateListFieldHandler,
        saveFieldHandler,
        cancelEditingHandler
    } = props

    if (!meal) {
        return <p>Loading...</p>
    }
    
    const ingredients = meal.ingredients.length !== 0 ? meal.ingredients : null;
    const usedCount = 'usedCount' in meal ? meal.usedCount : null;
    const lastUsed = 'lastUsed' in meal ? meal.lastUsed : null;
    const saveHandler = maybe(save);
    const useHandler = maybe(useMeal);
    const renderUseIt = getRenderUseIt(meal);
    const renderSaveButton = getRenderSaveButton(meal);
    const displayOrEditNameProps: IDisplayOrEditNameProps = {
        active: activeField === editableFields.name,
        activate: () => props.activateEditor(editableFields.name, meal.name),
        onSave: saveFieldHandler,
        onCancel: cancelEditingHandler,
        displayValue: meal.name,
        editingValue: activeFieldValue,
        onChange: updateFieldHandler,
    }


    return (
        <div className="meal">
            <div className="row m-2">
                <div className="editable">
                    <DisplayOrEditName {...displayOrEditNameProps}/>
                </div>
            </div>
            <div className="row m-2">
                <div className="col-12 col-lg-2">
                    <h4>Ingredients</h4>
                    {activeField === editableFields.ingredients
                        ? <IngredientsEditor
                            list={activeFieldValue}
                            onChange={updateListFieldHandler}
                            onSave={saveFieldHandler}
                            onCancel={cancelEditingHandler}
                        />
                        : <div className="editable" onClick={() => {
                            props.activateEditor(editableFields.ingredients, meal.ingredients);
                        }}>
                            <IngredientsDisplay ingredients={ingredients} />
                        </div>
                    }
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
                                    onChange={updateFieldHandler}
                                    onCancel={cancelEditingHandler}
                                    onSave={saveFieldHandler}
                                />
                            </h2>
                            : <h2 className="editable" onClick={() => {
                                props.activateEditor(editableFields.taste, meal.taste);
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
                                    onChange={updateFieldHandler}
                                    onCancel={cancelEditingHandler}
                                    onSave={saveFieldHandler}
                                />
                            </h2>
                            : <h2 className="editable" onClick={() => {
                                props.activateEditor(editableFields.difficulty, meal.difficulty);
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
                                onSave={saveFieldHandler}
                                onChange={updateFieldHandler}
                                onCancel={cancelEditingHandler}
                            />
                            : <span className={`editable ${meal.notes ? '' : 'placeholder'}`}
                                onClick={() => {
                                    props.activateEditor(editableFields.notes, meal.notes);
                                }}
                            >{meal.notes || "add a note"}</span>
                    }
                </div>
            </div>
            <div className="row m2 d-flex justify-content-end">
                <div className="col-2 d-flex justify-content-between">
                    {useHandler.map(renderUseIt).unwrapOr(null)}
                    {saveHandler.map(renderSaveButton).unwrapOr(null)}

                    <Link to="/meals" className="btn btn-outline-primary">close</Link>
                </div>
            </div>
        </div>
    );
}

export default Meal;
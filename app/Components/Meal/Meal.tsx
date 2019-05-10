import { curry, map, pipe } from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import maybe from 'Business/Lib/maybe';
import Meal from 'Business/Meals/Types/Meal';
import Message from 'Business/Validation/Types/Message';
import Collaborations, { ICollaborationsProps } from 'Components/Meal/Collaborations/Collaborations';
import LastUsedDisplay from 'Components/Meal/LastUsedDisplay';
import DisplayOrEditDifficulty, { IDisplayOrEditDifficultyProps } from 'Components/Meal/DisplayOrEditDifficulty/DisplayOrEditDifficulty';
import DisplayOrEditIngredients, { IDisplayOrEditIngredientsProps } from 'Components/Meal/DisplayOrEditIngredients/DisplayOrEditIngredients';
import DisplayOrEditName, { IDisplayOrEditNameProps } from 'Components/Meal/DisplayOrEditName/DisplayOrEditName';
import DisplayOrEditNotes, { IDisplayOrEditNotesProps } from 'Components/Meal/DisplayOrEditNotes/DisplayOrEditNotes';
import DisplayOrEditTaste, { IDisplayOrEditTasteProps } from 'Components/Meal/DisplayOrEditTaste/DisplayOrEditTaste';
import editableFields from 'Components/Meal/Types/editableFields';
import IMealProps from 'Components/Meal/Types/IMealProps';
import UsedCountDisplay from 'Components/Meal/UsedCountDisplay';
import Ribbon from 'Components/Ribbon/Ribbon';
import { usernamesList, username } from 'Data/Selectors/userSelectors';
import { getUsernamesList } from 'Data/ActionCreators/userActionCreators';
import AlertBar from 'UI/Alert/AlertBar';
import AlertContianer from 'UI/Alert/AlertContainer';
import AsyncButton from 'UI/Forms/AsyncButton/AsyncButton';

import './Meal.sass';


const getRenderUseIt = curry(function (meal: Meal, handler: (IMeal) => any) {
    return (
        <button
            className="btn btn-sm btn-accent"
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


function MealBase(props: IMealProps) {
    const {
        meal: maybeMeal,
        getUsernamesList,
        usernamesList,
        username,
        messages,
        isWorking,
        saveField,
        useMeal,
        saveNewMeal,
        activeField,
        activeFieldValue,
        updateFieldHandler,
        updateListFieldHandler,
        cancelEditingHandler,
        acknowledgeMessage
    } = props;

    React.useEffect(function () {
        if (maybeMeal.isJust()) {
            getUsernamesList();
        }
    }, [getUsernamesList]);

    if (maybeMeal.isNothing()) {
        return <p>Loading...</p>
    }

    const meal = maybeMeal.unsafelyUnwrap();
    const usedCount = 'usedCount' in meal ? meal.usedCount : null;
    const lastUsed = 'lastUsed' in meal ? meal.lastUsed : null;
    const saveNewMealHandler = maybe(saveNewMeal);
    const useHandler = maybe(useMeal);
    const renderUseIt = getRenderUseIt(meal);
    const displayOrEditNameProps: IDisplayOrEditNameProps = {
        active: activeField === editableFields.name,
        activate: () => props.activateEditor(editableFields.name, meal.name),
        onSave: saveField,
        onCancel: cancelEditingHandler,
        displayValue: meal.name,
        editingValue: activeFieldValue,
        onChange: updateFieldHandler,
        submitting: (activeField === editableFields.name) && isWorking
    };
    const displayOrEditTasteProps: IDisplayOrEditTasteProps = {
        active: activeField === editableFields.taste,
        activate: () => props.activateEditor(editableFields.taste, meal.taste),
        onSave: saveField,
        onCancel: cancelEditingHandler,
        displayValue: meal.taste,
        editingValue: activeFieldValue,
        onChange: updateFieldHandler,
        range: 5,
        submitting: (activeField === editableFields.taste) && isWorking
    };
    const displayOrEditDifficultyProps: IDisplayOrEditDifficultyProps = {
        active: activeField === editableFields.difficulty,
        activate: () => props.activateEditor(editableFields.difficulty, meal.difficulty),
        onSave: saveField,
        onCancel: cancelEditingHandler,
        displayValue: meal.difficulty,
        editingValue: activeFieldValue,
        onChange: updateFieldHandler,
        range: 5,
        submitting: (activeField === editableFields.difficulty) && isWorking
    };
    const ingredients = meal.ingredients.length !== 0 ? meal.ingredients : null;
    const displayOrEditIngredientsProps: IDisplayOrEditIngredientsProps = {
        active: activeField === editableFields.ingredients,
        activate: () => props.activateEditor(editableFields.ingredients, meal.ingredients),
        onSave: saveField,
        onCancel: cancelEditingHandler,
        displayValue: ingredients,
        editingValue: activeFieldValue,
        onChange: updateListFieldHandler,
        submitting: (activeField === editableFields.ingredients) && isWorking
    };
    const displayOrEditNotesProps: IDisplayOrEditNotesProps = {
        onSave: saveField,
        active: activeField === editableFields.notes,
        activate: () => props.activateEditor(editableFields.notes, meal.notes),
        displayValue: meal.notes,
        editingValue: activeFieldValue,
        onChange: updateFieldHandler,
        onCancel: cancelEditingHandler,
        submitting: (activeField === editableFields.notes) && isWorking
    };
    const collaborationsProps: ICollaborationsProps = {
        ownerName: 'owner' in meal ? meal.owner : username.unwrapOr(''),
        currentUserName: username.unwrapOr(''),
        collaborations: meal.collaborators,
        users: usernamesList
    }

    return (
        <div className="meal col-12">
            <div className="row meal-ribbon">
                <div className="col-12">
                    <Ribbon>
                        <Link to="/meals" className="btn btn-sm btn-outline-accent">close</Link>
                        {useHandler.map(renderUseIt).unwrapOr(null)}
                        {saveNewMealHandler.map(handler => (
                            <AsyncButton
                                className="btn btn-sm btn-accent"
                                working={isWorking}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    handler();
                                }}>Save</AsyncButton>
                        )).unwrapOr(null)}
                    </Ribbon>
                </div>
            </div>
            <div className="row meal-main">
                <div className="col-12">
                    <div className="meal-info-box row mb-4 mx-2 d-flex">
                        <div className="col-12 col-md-6">
                            <div className="editable">
                                <DisplayOrEditName {...displayOrEditNameProps} />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <Collaborations {...collaborationsProps} />
                        </div>
                    </div>
                    <div className="row mb-5 mx-2">
                        <div className="col-12 col-md-4 mb-4 mb-md-0">
                            <h4>Ingredients</h4>
                            <DisplayOrEditIngredients {...displayOrEditIngredientsProps} />
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="mb-4">
                                <h4 className="d-inline">Taste: </h4>
                                <DisplayOrEditTaste {...displayOrEditTasteProps} />
                            </div>
                            <div className="mb-4">
                                <h4 className="d-inline">Difficulty: </h4>
                                <DisplayOrEditDifficulty {...displayOrEditDifficultyProps} />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <LastUsedDisplay date={lastUsed} />
                            <UsedCountDisplay usedCount={usedCount} />
                        </div>
                    </div>
                    <div className="row mb-5 mx-2">
                        <div className="col-12">
                            <h4>Notes:</h4>
                            <DisplayOrEditNotes {...displayOrEditNotesProps} />
                        </div>
                    </div>
                </div>
            </div>
            <AlertContianer>
                {
                    messages.map(
                        map((m: Message) => (
                            <AlertBar
                                key={m.id}
                                message={m}
                                dismissMessage={acknowledgeMessage.bind(null, m.id)}
                            />
                        ))
                    ).unwrapOr(null)
                }
            </AlertContianer>
        </div>
    );
}

const mapStateToProps = function (state) {
    return {
        usernamesList: usernamesList(state),
        username: username(state)
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        getUsernamesList: pipe(getUsernamesList, dispatch)
    };
};

const Meal = connect(mapStateToProps, mapDispatchToProps)(MealBase)

export { MealBase };
export default Meal;
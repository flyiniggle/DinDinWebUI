import { curry } from 'ramda';
import * as React from 'react';
import { Link } from 'react-router-dom';
import maybe from 'Business/Lib/maybe';
import IMeal from 'Business/Meals/Types/Meal';
import INewMeal from 'Business/Meals/Types/NewMeal';
import LastUsedDisplay from 'Components/Meal/LastUsedDisplay';
import DisplayOrEditDifficulty, { IDisplayOrEditDifficultyProps } from 'Components/Meal/DisplayOrEditDifficulty/DisplayOrEditDifficulty';
import DisplayOrEditIngredients, { IDisplayOrEditIngredientsProps } from 'Components/Meal/DisplayOrEditIngredients/DisplayOrEditIngredients';
import DisplayOrEditName, { IDisplayOrEditNameProps } from 'Components/Meal/DisplayOrEditName/DisplayOrEditName';
import DisplayOrEditNotes, { IDisplayOrEditNotesProps } from 'Components/Meal/DisplayOrEditNotes/DisplayOrEditNotes';
import DisplayOrEditTaste, { IDisplayOrEditTasteProps } from 'Components/Meal/DisplayOrEditTaste/DisplayOrEditTaste';
import editableFields from 'Components/Meal/Types/editableFields';
import IMealProps from 'Components/Meal/Types/IMealProps';
import UsedCountDisplay from 'Components/Meal/UsedCountDisplay';

import './Meal.sass';

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
        meal: maybeMeal,
        message,
        isWorking,
        saveField,
        useMeal,
        saveNewMeal,
        activeField,
        activeFieldValue,
        updateFieldHandler,
        updateListFieldHandler,
        cancelEditingHandler
    } = props;


    if (maybeMeal.isNothing()) {
        return <p>Loading...</p>
    }
    
    const meal = maybeMeal.unsafelyUnwrap();
    const usedCount = 'usedCount' in meal ? meal.usedCount : null;
    const lastUsed = 'lastUsed' in meal ? meal.lastUsed : null;
    const saveNewMealHandler = maybe(saveNewMeal);
    const useHandler = maybe(useMeal);
    const renderUseIt = getRenderUseIt(meal);
    const renderSaveButton = getRenderSaveButton(meal);
    const displayOrEditNameProps: IDisplayOrEditNameProps = {
        active: activeField === editableFields.name,
        activate: () => props.activateEditor(editableFields.name, meal.name),
        onSave: saveField,
        onCancel: cancelEditingHandler,
        displayValue: meal.name,
        editingValue: activeFieldValue,
        onChange: updateFieldHandler,
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
    };
    const displayOrEditNotesProps: IDisplayOrEditNotesProps = {
        onSave: saveField,
        active: activeField === editableFields.notes,
        activate: () => props.activateEditor(editableFields.notes, meal.notes),
        displayValue: meal.notes,
        editingValue: activeFieldValue,
        onChange: updateFieldHandler,
        onCancel: cancelEditingHandler
    };


    return (
        <div className="meal col-12">
            <div className="row m-2">
                <div className="editable">
                    <DisplayOrEditName {...displayOrEditNameProps}/>
                </div>
            </div>
            <div className="row m-2">
                <div className="col-12 col-lg-2">
                    <h4>Ingredients</h4>
                    <DisplayOrEditIngredients { ...displayOrEditIngredientsProps} />
                </div>
                <div className="col-12 col-lg-5">
                    <div>
                        <h4 className="d-inline">Taste: </h4>
                        <DisplayOrEditTaste { ...displayOrEditTasteProps} />
                    </div>
                    <div>
                        <h4 className="d-inline">Difficulty: </h4>
                        <DisplayOrEditDifficulty { ...displayOrEditDifficultyProps} />
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
                    <DisplayOrEditNotes {...displayOrEditNotesProps} />
                </div>
            </div>
            <div className="row m2 d-flex justify-content-end">
                <div className="col-2 d-flex justify-content-between">
                    {useHandler.map(renderUseIt).unwrapOr(null)}
                    {saveNewMealHandler.map(renderSaveButton).unwrapOr(null)}

                    <Link to="/meals" className="btn btn-outline-primary">close</Link>
                </div>
            </div>
        </div>
    );
}

export default Meal;
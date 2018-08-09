import { pipe, reverse } from 'ramda';

function returnMoreUsed(mealA, mealB) {
    const mealAUses = mealA.usedCount || 0;
    const mealBUses = mealB.usedCount || 0;

    return mealBUses - mealAUses;
}

function sortMostUsed(meals) {
    return Array.from(meals).sort(returnMoreUsed);
}

function compareLastUsed(mealA, mealB) {
    const mealADate = mealA.lastUsed || 0;
    const mealBDate = mealB.lastUsed || 0;

    return mealBDate - mealADate;
}

function sortRecentlyPrepared(meals = []) {
    return Array.from(meals).sort(compareLastUsed);
}

function sortLeastRecentlyPrepared(meals = []) {
    return pipe(
        sortRecentlyPrepared,
        reverse
    )(meals);
}

function compareId(mealA, mealB) {
    const mealAId = mealA.id || 0;
    const mealBId = mealB.id || 0;

    return mealAId - mealBId;
}

function sortById(meals = []) {
    return Array.from(meals).sort(compareId);
}

export {
    returnMoreUsed,
    sortMostUsed,
    compareLastUsed,
    sortRecentlyPrepared,
    sortLeastRecentlyPrepared,
    compareId,
    sortById
};

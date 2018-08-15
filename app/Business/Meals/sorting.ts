import { pipe, reverse } from 'ramda';

interface UsedCount {
    usedCount: number
}

interface LastUsed {
    lastUsed: number
}

function returnMoreUsed(mealA: UsedCount, mealB: UsedCount): number {
    const mealAUses = mealA.usedCount || 0;
    const mealBUses = mealB.usedCount || 0;

    return mealBUses - mealAUses;
}

function sortMostUsed(meals) {
    return Array.from(meals).sort(returnMoreUsed);
}

function compareLastUsed(mealA: LastUsed, mealB: LastUsed): number {
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

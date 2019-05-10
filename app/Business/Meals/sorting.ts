import { pipe, reverse } from 'ramda';
import Meal from 'Business/Meals/Types/Meal';

interface UsedCount {
    usedCount: number
}

interface LastUsed {
    lastUsed: string
}

function returnMoreUsed(mealA: UsedCount, mealB: UsedCount): number {
    const mealAUses = mealA.usedCount || 0;
    const mealBUses = mealB.usedCount || 0;

    return mealBUses - mealAUses;
}

function sortMostUsed(meals: Meal[]) {
    return Array.from(meals as UsedCount[]).sort(returnMoreUsed);
}

function compareLastUsed(mealA: LastUsed, mealB: LastUsed): number {
    const mealADate = mealA.lastUsed || 0;
    const mealBDate = mealB.lastUsed || 0;

    return new Date(mealBDate).getTime() - new Date(mealADate).getTime();
}

function sortRecentlyPrepared(meals: Meal[] = []): Meal[] {
    return Array.from(meals).sort(compareLastUsed);
}

function sortLeastRecentlyPrepared(meals: Meal[] = []) {
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

import { SET_MEALS } from "Data/ActionTypes/mealsActionTypes";
import { SET_EMAIL } from "Data/ActionTypes/userActionTypes";

export function setUsername(username: string = null) {
    return {
        type: SET_MEALS,
        username
    }
}

export function setEmail(email: string = null) {
    return {
        type: SET_EMAIL,
        email
    }
}
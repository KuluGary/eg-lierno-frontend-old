import { 
    ADD_CHARACTERS,
    ADD_MONSTERS,
    ADD_NPCS,
    ADD_LOCATIONS,
    ADD_ALIGNMENTS,
    ADD_PROFILE,
    ADD_CAMPAIGNS,
    ADD_CLASSES,
    ADD_RACES,
    USER_LOGOUT
 } from "../constants/action-types";

const initialState = {};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CHARACTERS: return Object.assign({}, state, {
            characters: action.payload
        })
        case ADD_MONSTERS: return Object.assign({}, state, {
            monsters: action.payload
        })
        case ADD_NPCS: return Object.assign({}, state, {
            npcs: action.payload
        })
        case ADD_LOCATIONS: return Object.assign({}, state, {
            locations: action.payload
        })
        case ADD_ALIGNMENTS: return Object.assign({}, state, {
            alignments: action.payload
        })
        case ADD_PROFILE: return Object.assign({}, state, {
            profile: action.payload
        })
        case ADD_CAMPAIGNS: return Object.assign({}, state, {
            campaigns: action.payload
        })
        case ADD_CLASSES: return Object.assign({}, state, {
            classes: action.payload
        })
        case ADD_RACES: return Object.assign({}, state, {
            races: action.payload
        })
        case USER_LOGOUT: return initialState
        default:            
    }
    return state;
}

export default rootReducer;
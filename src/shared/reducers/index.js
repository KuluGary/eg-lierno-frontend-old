import { 
    ADD_CHARACTERS,
    ADD_MONSTERS,
    ADD_NPCS,
    ADD_LOCATIONS,
    ADD_ALIGNMENTS,
    ADD_PROFILE,
    ADD_CAMPAIGNS,
    ADD_ROLES
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
        case ADD_ROLES: return Object.assign({}, state, {
            roles: action.payload
        })
        default:            
    }
    return state;
}

export default rootReducer;
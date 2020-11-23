import { 
    ADD_CHARACTERS,
    ADD_MONSTERS,
    ADD_NPCS,
    ADD_LOCATIONS,
    ADD_ALIGNMENTS,
    ADD_PROFILE,
    ADD_CAMPAIGNS,
    ADD_ROLES,
    ADD_CLASSES,
    ADD_RACES,
    USER_LOGOUT
 } from "../constants/action-types";

export function addCharacters(payload) {
    return { type: ADD_CHARACTERS, payload }
};

export function addMonsters(payload) {
    return { type: ADD_MONSTERS, payload }
};

export function addNpcs(payload) {
    return { type: ADD_NPCS, payload }
};

export function addLocations(payload) {
    return { type: ADD_LOCATIONS, payload }
};

export function addAlignments(payload) {
    return { type: ADD_ALIGNMENTS, payload }
};

export function addProfile(payload) {
    return { type: ADD_PROFILE, payload }
};

export function addCampaigns(payload) {
    return { type: ADD_CAMPAIGNS, payload }
};

export function addRoles(payload) {
    return { type: ADD_ROLES, payload }
};

export function addClasses(payload) {
    return { type: ADD_CLASSES, payload }
};

export function addRaces(payload) {
    return { type: ADD_RACES, payload }
};

export function resetStore(payload) {
    return { type: USER_LOGOUT, payload }
}
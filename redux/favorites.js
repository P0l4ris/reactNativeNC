import * as ActionTypes from './ActionTypes';


//reducer function 
export const favorites = (state = [], action) => {
    //action types is default to check what type of action type to check
    switch(action.type) {
        case ActionTypes.ADD_FAVORITE:
            if (state.includes(action.payload)) {
                //returns true or if false then returns state not console log anything anymore?
                return state;
            }
            //if doesn't exist, then: add it to the array list
            return state.concat(action.payload);
        default:
            return state;
    }
}
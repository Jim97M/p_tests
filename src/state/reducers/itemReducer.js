import {
    FETCH_ITEMS,
    ITEMS_LOADING,
    SET_ITEMS,
    ITEMS_FAILURE
} from "../constants/DataConstant";

const emptyItems = {
    items: [],
};

const initialState = {
    dataItems: emptyItems,
    isLoading: false,
};

export const itemReducer = (state = initialState, action) => {
    const itemList = state.dataItems.items;

    switch(action.type) {
        case ITEMS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        
        case  ITEMS_FAILURE:
            return {
                ...state,
                isLoading: true,
            }
        case FETCH_ITEMS: 
             return {
                emptyItems: action.items,
                isLoading: false,
             }    

        default: 
          return state;     
            
    }
}

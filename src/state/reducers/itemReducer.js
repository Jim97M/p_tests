import {
    FETCH_ITEMS,
    UPDATE_ITEM
} from "../constants/DataConstant";

const initialState = [];

const itemReducer = (items = initialState, action) => {

const {type, payload} = action;

switch(type) {
  case FETCH_ITEMS:
    return payload;
  
  case UPDATE_ITEM:
    return items.map((item) => {
      if(item._id === payload._id){
        return  {
          ...item,
          ...payload,
        };
      } else {
        return item;
      }
    });  

  default:
    return items;  
  }
};
export default itemReducer;

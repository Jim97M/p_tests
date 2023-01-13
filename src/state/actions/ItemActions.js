import axios from "axios";
import {
    FETCH_ITEMS,
    UPDATE_ITEM
} from "../constants/DataConstant";
import ItemDataService from "../../network/ItemDataService";

export const getAllItems = () => async (dispatch) => {
   try {
     axios.defaults.headers.common = {
        "x-apikey": "63be7360969f06502871ad7f",
      };  
      axios.get("https://touchinspiration-0ada.restdb.io/rest/sample",{ 
        headers: {
            "Content-Type": "application/json",
          } 
    }).then(res => {
        console.log(res.data);
        dispatch({
            type: FETCH_ITEMS,
            payload: res.data,
        });
    })
    
   } catch (err) {
    console.log(err);
   }
}

export const updateById = (_id, data) => async (dispatch) =>{
    try {
      const res = await ItemDataService.patch(_id, data);
     
        dispatch({
          type: UPDATE_ITEM,
          payload: data,
        });
        return Promise.resolve(res.data);  
    
    } catch (error) {
        return Promise.reject(err);
    }
};

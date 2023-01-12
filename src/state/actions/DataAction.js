import dotenv from 'dotenv';
import axios from "axios";
import {
    FETCH_ITEMS,
    UPDATE_ITEM,
    ITEMS_FAILURE
} from '../constants/DataConstant';

dotenv.config();



export const fetchItems = () => {
    const base_url = process.env.BASE_URL;
    const API_KEY = process.env.API_KEY;
  return async dispatch => {
    const emptyCart = {
        items: [],
    };
    axios.get(base_url + "/rest/sample", {
        headers: {
            'x-apikey': 'Bearer '+ API_KEY
        }
    }).then(response => {
        console.log(response.data);
        const resData = response.data;
        if(!resData){
          dispatch({
            type: ITEMS_FAILURE,
          });
          throw new Error('Something went Wrong!');
        }
        let carts = emptyCart;
        carts = resData;
        dispatch({
            type: FETCH_ITEMS, carts
        })
    }).catch(error => {
        console.log(error);
    })
  }
}

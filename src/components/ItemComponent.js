import React, { useState } from "react";
import * as itemActions from '../state/actions/DataAction';
import { useDispatch, useSelector } from "react-redux";



const ItemComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

  return (
    <div className="container">
       <div>
         <table>
            <thead>
                <tr>
                    <th></th>
                </tr>
            </thead>
         </table>
       </div>
    </div>
  )
}

export default ItemComponent

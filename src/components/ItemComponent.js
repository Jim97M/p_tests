import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ItemView from "./ItemView";
import { getAllItems } from "../state/actions/ItemActions";
import '../styles/itemview.css';

const ItemComponent = ({data, _id, props}) => {
    const navigate = useNavigate();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [currentItems, setCurrentItems] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
  
    const itemss = useSelector(state => state.items);
    console.log("Items is", itemss);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAllItems());
    }, []);

  const editItems = (e, _id) => {
     e.preventDefault();
     navigate(`/edit/${_id}`);
  };

  return (
    <div className="container">
       <div>
         <table className="style-table">
            <thead>
                <tr>
                    <th className="theader">Item ID</th>
                    <th className="theader">Item Name</th>
                    <th className="theader">Item Email</th>
                    <th className="theader">Item Occupation</th>
                    <th className="theader">Item Bio</th>
                    <th className="theader">Item MemberID</th>
                    <th className="theader">Actions</th>
                </tr>
            </thead>
            <tbody>
               { itemss &&  itemss.map((item, index) => (
                     <tr key={index}>
                     <td className='tcontainer'>
                        <div>{item._id}</div>
                      </td>
                      <td className='tcontainer'>
                         <div>{item.name}</div>
                      </td>
                      <td className='tcontainer'>
                         <div>{item.email}</div>
                      </td>
                      <td className='tcontainer'>
                         <div>{item.occupation}</div>
                      </td>
                      <td className='tcontainer'>
                         <div>{item.bio}</div>
                      </td>
                      <td className='tcontainer'>
                         <div>{item.memberId}</div>
                      </td>
                      <td> 
                      <Link
                        to={{pathname: `/edit/${item._id}`, state:item._id}}
                      >    
                        Edit
                        </Link>
                      </td>
                   </tr>
               ))}
            </tbody>
         </table>
       </div>
    </div>
  )
}

export default ItemComponent;

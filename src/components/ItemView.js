import React, { useState } from 'react';
import { Navigate, useNavigate, useNavigation, useParams, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateById } from '../state/actions/ItemActions';
import '../styles/items.css';

const ItemView = (props) => {
  const history = useHistory();
  const navigate = useNavigate();

   const initialItemState =JSON.stringify({
      _id: "",
      name: "",
      email: "",
      occupation: "",
      bio: "",
      memberId: ""
   })

   const [currentItem, setCurrentItem] = useState(initialItemState);
   const [message, setMessage] = useState("");
  
   const dispatch = useDispatch();
   const handleInputChange = event => {
      const { name, value } = event.target;
      setCurrentItem({...currentItem, [name]: value});
   };

   const updateItem = (e) => {
      dispatch(updateById(currentItem._id, currentItem))
      .then(response => {
         history.push("/");
      })
      .catch(e => {
         console.log(e);
      });
   };

  return (

  <div className="card">
    <h1>Items</h1>
   <form action>
    <label for="_id">Dont Edit ID</label>
    <input type="text" id="_id" name="_id" placeholder="Your ID" value={currentItem._id} onChange={handleInputChange} />

    <label for="_id">Change Name</label>
    <input type="text" id="name" name="name" placeholder="Change Your Name" value={currentItem.name} onChange={handleInputChange} />

    <label for="lname">Email</label>
    <input type="text" id="email" name="email" placeholder="Change Email" value={currentItem.email} onChange={handleInputChange} />

    <label for="occupation">Occupation</label>
    <input type="text" id="occupation" name="occupation" placeholder="Change Occupation"  value={currentItem.occupation} onChange={handleInputChange} />
   
    <label for="occupation">Bio</label>
    <input type="text" id="bio" name="bio" placeholder="Change Bio"  value={currentItem.bio} onChange={handleInputChange}  />

    <label for="occupation">MemberID</label>
    <input type="text" id="memberId" name="memberId" placeholder="Change MemberId"  value={currentItem.memberId} onChange={handleInputChange} />
  </form>
         <p> <button
           type='submit'
           className="update"
           onClick={updateItem}
          >
            UPDATE ITEM
          </button></p>
     <p>{message}</p>
</div> 

  )
}

export default ItemView;


    //   <div className='cform'>   
    //      <h4>Items</h4>
    //      <form>
    //      <div className='form'>
    //           <label>ID</label>
    //           <input
    //             type="text"
    //             id="_id"
    //             name="_id"
    //             value={currentItem._id}
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <div className='form'>
    //           <label>Name</label>
    //           <input
    //             type="text"
    //             id="name"
    //             name="name"
    //             value={currentItem.name}
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <div className='form'>
    //           <label>Email</label>
    //           <input
    //             type="text"
    //             id="email"
    //             name="email"
    //             value={currentItem.email}
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <div className='form'>
    //           <label>Occupation</label>
    //           <input
    //             type="text"
    //             id="occupation"
    //             name="occupation"
    //             value={currentItem.occupation}
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <div className='form'>
    //           <label>Bio</label>
    //           <input
    //             type="text"
    //             id="bio"
    //             name="bio"
    //             value={currentItem.bio}
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <div className='form'>
    //           <label>MemberID</label>
    //           <input
    //             type="text"
    //             id="memberId"
    //             name="memberId"
    //             value={currentItem.memberId}
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //      </form>
    //      </div>
    //      <div>
    //      <button
    //        type='submit'
    //        className="update"
    //        onClick={updateItem}
    //      >
    //      </button>
    //      <p>{message}</p>
    //      </div>
    // </div>
  
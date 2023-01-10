import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { collection, getDocs, setDoc, doc, query, where, deleteDoc } from "firebase/firestore";
import { EditUserContext } from "../../store/EditUserContext";
import { db } from '../../firebase/config';

import "./EditUser.css";

function EditUser() {
  const [userData, setUserData] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const history = useHistory()
  const auth = getAuth();

  const { userDetails } = useContext(EditUserContext)

  useEffect(() => {
    const userId = userDetails.id
    console.log('usersrfsdf', userId);
    getDocs(query(collection(db, 'users'), where('id', '==', userId))).then((res) => {
      console.log('ressss', res);
      res.forEach(doc => {
        setUserData(doc.data());
      })
    }).catch((err) => {
      console.log(err);
    });

  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    const id = userDetails.id
    try {

      setDoc(doc(db, "users", id), {
        username: name ? name : userDetails.username,
        email: email ? email : userDetails.email,
        phone: phone ? phone : userDetails.phone,
        id: id
      }).then(() => history.push('/admin')).catch((err) => console.log(err))

    } catch (error) {
      console.log(error);
    }
  }

  const deleteUser = (e) => {
    e.preventDefault()
    const id = userDetails.id

    try {
      deleteDoc(doc(db, "users", id))
        .then(() => history.push('/admin'))
        .catch((err) => console.log(err))

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <form>
          <label htmlFor="User Name">User Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name ? name : userDetails.username}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email ? email : userDetails.email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            defaultValue="johndoe@gmail.com"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone ? phone : userDetails.phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="Phone"
            defaultValue="1234567890"
          />
          <br />
          <br />
          <button onClick={(e) => submitHandler(e)}>Update</button>
          <button onClick={(e) => deleteUser(e)}>Delete</button>
        </form>
      </div>
    </div >
  );

}

export default EditUser;

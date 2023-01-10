import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import Logo from '../../olx-logo.png';
import './Signup.css';
import { db } from '../../firebase/config';

const auth = getAuth();

export default function Signup() {
  const history = useHistory()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const buttonHandler = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        console.log(result.user);
        updateProfile(auth.currentUser, { displayName: username, phoneNumber: phone }).then(async () => {
          const docRef = await addDoc(collection(db, "users"), {
            id: result.user.uid,
            username: username,
            phone: phone,
            email: email
          }).then((res) => {
            const setUser = res;
            history.push('/login')
          });
          console.log("Document written with ID: ", docRef.id);
          // Profile updated!
          // ...
        }).catch((error) => {
          console.warn("Error adding document: ", e);
          // An error occurred
          // ...
        });
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
      });


  }

  return (
    <div>
      <div className="signupParentDiv">
        <img alt='' width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button onClick={buttonHandler}>Signup</button>
        </form>
        {/* <a>Login</a> */}
      </div>
    </div>
  );
}

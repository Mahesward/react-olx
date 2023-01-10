import React, { Fragment, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'

import Header from '../Header/Header';
import './Create.css';

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { AuthContext } from '../../store/Context';


const Create = () => {
  const history = useHistory()
  const user = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')

  const storage = getStorage();
  const storageRef = ref(storage, `/image/${image.name}`);

  const handleSubmit = (e) => {
    e.preventDefault()

    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        console.log('File available at', url);
        try {
          addDoc(collection(db, "products"), {
            name,
            category,
            price,
            url,
            userId: user.user.uid,
            createdAt: new Date().toDateString()
          }).then(() => history.push('/'))

        } catch (e) {
          console.error("Error adding document: ", e);
        }
      });
    });

  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => { setCategory(e.target.value) }}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              value={price}
              onChange={(e) => { setPrice(e.target.value) }}
              id="fname"
              name="Price" />
            <br />
          </form>
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ''} />
          <form>
            <br />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <br />
            <button className="uploadBtn" onClick={(e) => handleSubmit(e)}>upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;

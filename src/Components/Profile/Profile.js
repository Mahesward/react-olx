import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../../store/Context';
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


import './Profile.css';

function Profile() {
    const auth = getAuth();
    const user = useContext(AuthContext)
    const storage = getStorage();

    useEffect(() => {
        console.log(user);
        setEmail(user.user.email);
        setName(user.user.displayName);
    }, [])

    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const storageRef = ref(storage, `/Profile-Image/${image.name}`);

    const handleSubmit = (e) => {

        e.preventDefault()

        uploadBytes(storageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
                console.log('File available at', url);
                try {

                    console.log(user);

                    // Update the user's profile image
                    updateProfile(auth.currentUser, {
                        photoURL: url
                    }).then(() => {
                        console.log('Profile image updated successfully');
                    }).catch(error => {
                        console.error('Error updating profile image:', error);
                    });

                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            });
        });


    }


    return (
        <div>
            <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>

            <div className="wrapper">
                <div className="left">
                    <img
                        width="250px"
                        src={user.user.photoURL ? user.user.photoURL : URL.createObjectURL(image)} />
                    <h4>{name}</h4>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    <br />
                    <button className="uploadBtn" onClick={(e) => handleSubmit(e)}>upload and Submit</button>
                </div>
                <div className="right">
                    <div className="info">
                        <h3>Information</h3>
                        <div className="info_data">
                            <div className="data">
                                <h4>User Name</h4>
                                <p>{name}</p>
                            </div>
                            <div className="data">
                                <h4>Email</h4>
                                <p>{email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="info">
                        <button className='button' >Save</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile

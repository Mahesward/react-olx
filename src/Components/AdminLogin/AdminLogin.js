import React, { useState } from 'react'
import './AdminLogin.css'
import { useHistory } from 'react-router-dom';

import { getAuth,  signInWithEmailAndPassword } from "firebase/auth";


function AdminLogin() {

    const auth = getAuth();
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                history.push('/admin')
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
            <div id="card">
                <div id="card-content">
                    <div id="card-title">
                        <h2>LOGIN</h2>
                        <div className="underline-title"></div>
                    </div>
                    <form>
                        <label htmlFor="user-email" style={{ paddingTop: 13 }}>&nbsp;Email :</label>
                        <input id="user-email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-content" type="email" name="email" autoComplete='on' required />
                        <div className="form-border"></div>
                        <label htmlFor="user-password" style={{ paddingTop: 25 }}>&nbsp;Password :</label>
                        <input id="user-password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-content" type="password" name="password" required />
                        <div className="form-border"></div>
                        <button id="submit-btn" style={{}} onClick={(e) => { submitHandler(e) }} name="submit" value="LOGIN">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin

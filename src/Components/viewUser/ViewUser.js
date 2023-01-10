import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config';
import { EditUserContext } from "../../store/EditUserContext";

import './ViewUser.css'
import { useHistory } from 'react-router-dom';

function ViewUser() {
    const [users, setUsers] = useState([])
    const [searchUsers, setSearchUsers] = useState([])
    const history = useHistory()
    const { setUserDetails, userDetails } = useContext(EditUserContext)

    useEffect(() => {
        getDocs(collection(db, "users")).then((querySnapshot) => {

            const allUsers = querySnapshot.docs.map((users) => {
                return {
                    ...users.data(),
                    id: users.id
                }
            })
            setUsers(allUsers);
            setSearchUsers(allUsers);
        })
    }, [])

    const searchHandler = (e) => {
        e.preventDefault();
        let value = e.target.value
        value = value.toLowerCase()
        setSearchUsers(users.filter((user) => {
            if (user.username.toLowerCase().includes(value)) {
                console.log(user);
                return user
            }
        })
        )
    }


    return (
        <div>
            <h2 className='userMgmt' style={{ float: 'left' }}>User Management</h2>
            <input type="search"
                name=""
                placeholder=' Search for user '
                id=""
                style={{ float: 'right', width: 400, height: 40, margin: 20 }}
                onChange={(e) => searchHandler(e)}
            />
            <table>
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        searchUsers.map(users => (
                            <tr>
                                <td data-label="Account">{users.username}</td>
                                <td data-label="Due Date">{users.email}</td>
                                <td data-label="Due Date">{users.phone}</td>
                                <td data-label="Amount"><span style={{ cursor: 'pointer' }} onClick={() => {
                                    setUserDetails(users)
                                    console.log('resersesers', userDetails)
                                    history.push('/admin/edituser')
                                }}>Edit/delete</span></td>
                            </tr>
                        ))
                    }</tbody>
            </table>
        </div>
    )
}

export default ViewUser

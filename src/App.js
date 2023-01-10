import React, { useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContext } from './store/Context';
import Post from './store/PostContext';
import EditUserData from './store/EditUserContext';


/**
 * ?  =====Import Components=====
 */

import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import Profile from './Pages/UserProfile';
import AdminLogin from './Pages/AdminLogin';
import Admin from './Pages/Admin';
import EdituserPage from './Pages/Edituser';


function App() {
  const { setUser } = useContext(AuthContext)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    });
  }, [])

  return (
    <div>
      <Post>
        <Router>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route path='/signup'>
            <Signup />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/create'>
            <Create />
          </Route>

          <Route path='/viewpost'>
            <ViewPost />
          </Route>

          <Route path='/profile'>
            <Profile />
          </Route>

          { /*================admin=================*/}

          <Route path='/admin/login'>
            <AdminLogin />
          </Route>

          <EditUserData>

            <Route exact path='/admin'>
              <Admin />
            </Route>


            <Route exact path='/admin/editUser'>
              <EdituserPage />
            </Route>

          </EditUserData>

        </Router>
      </Post>
    </div>
  );
}

export default App;

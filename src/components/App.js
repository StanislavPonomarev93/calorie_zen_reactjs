import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import Header from './Header';
import Diary from './Diary';
import Tips from './Tips';
import Register from './Register';
import Login from './Login';
import NavBar from './NavBar';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth.js';
import * as calData from '../data';
import './styles/App.css';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwt'));
  const [calGoal, setCalGoal] = useState();

  const handleLogin = (calGoal) => {
    setLoggedIn(true);
    setCalGoal(calGoal);
  }
  const handleLogout = () => {
    setLoggedIn(false);
  }
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        calData.calData.forEach((goal) => {
          if (goal.id === res.ru_cal_goal) {
            setCalGoal(goal.calGoal);
          }
        })
        if (res) {
          setLoggedIn(true);
          history.push("/diary");
        }
      });
    }
  }, [history])
  
  return (
    <>
      <Header />
      <main className="content">
        {loggedIn && <NavBar handleLogout={handleLogout} />}
        <Switch>
          <ProtectedRoute path="/diary" calGoal={calGoal} loggedIn={loggedIn} component={Diary} />
          <ProtectedRoute path="/tips" loggedIn={loggedIn} component={Tips} />
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/diary" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </main>
    </>
  )
}

export default withRouter(App);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { loginStatus, tryLoginWithCookie } from './actions/actions';
import Welcome from './components/Welcome/Welcome';
import Cars from './containers/Cars/Cars';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Navigation from './containers/Navigation/Navigation';
import User from './components/User/User';
import CarBooking from './components/CarBooking/CarBooking';
import UpdateBooking from './components/UpdateBooking/UpdateBooking';
import './App.css';

function App({ carsState, userStatus, loginWithCookie }) {
  useEffect(() => {
    if (document.cookie.match('appointcar')) {
      loginWithCookie();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <div className="App" data-testid="App">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          {userStatus.isLoggedIn ? (
            <Route
              exact
              path="/cars"
              render={props => <Cars cars={carsState.cars} {...props} />}
            />
          ) : (
            <Route exact path="/login" render={props => <Login {...props} />} />
          )}
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/signup" render={props => <Signup {...props} />} />

          <Route exact path="/user">
            {userStatus.isLoggedIn ? <User /> : <Redirect push to={{ pathname: '/login' }} />}
          </Route>
          {userStatus.isLoggedIn ? (
            <Route
              exact
              path="/cars/:car"
              render={props => <CarBooking {...props} car={carsState.carToShow} />}
            />
          ) : (
            <Redirect push to={{ pathname: '/login' }} />
          )}
          <Route exact path="/update/:car_model">
            {' '}
            <UpdateBooking />
            {' '}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

App.propTypes = {
  carsState: PropTypes.shape({
    cars: PropTypes.instanceOf(Array),
    isFetching: PropTypes.bool,
    carToShow: PropTypes.instanceOf(Object),
  }).isRequired,

  userStatus: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
  }).isRequired,
  loginWithCookie: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  carsState: state.carsReducer,
  userStatus: state.userReducer,
});

const mapDispatchToProps = dispatch => ({
  checkLoginStatus: () => dispatch(loginStatus()),
  loginWithCookie: () => dispatch(tryLoginWithCookie()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

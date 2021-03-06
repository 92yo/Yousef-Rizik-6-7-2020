import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";
import Inbox from "./containers/Inbox/Inbox";
import Login from "./components/Login/";
import Register from "./components/Register/";
import NotFound from "./components/404/";
import Main from "./components/Main";
import * as actionTypes from "./store/actions/actionTypes";
import Loader from "./components/Loader/";
import * as AuthActions from "./store/actions/auth";
import './style.css';

class App extends Component {
  componentDidMount() {
    this.props.checkLogin();
  }
  render() {
    let content;
    if (this.props.isLoading) {
      content = <Loader />;
    } else {
      content = (
        <Switch>
          {!this.props.isLoggedIn ? (
            <Redirect from="/inbox" to="/login" />
          ) : null}
          <Route path="/" exact component={Main} />
          <Route path="/inbox" exact component={Inbox} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route component={NotFound} />
        </Switch>
      );
    }
    return content;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.auth.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loading: () => dispatch({ type: actionTypes.LOADING }),
    checkLogin: () => dispatch(AuthActions.checkLogin()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from 'redux'
import { Redirect } from "react-router-dom";
import * as AuthActions from "../../store/actions/auth";
import {Avatar, Button, CssBaseline, TextField, Link, Paper, Grid, Typography, withStyles} from '@material-ui/core'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from '@material-ui/lab/Alert';
import Loader from "../Loader";

const styles = (theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  ErrMessage: {
    color: 'white',
    fontSize: '100',
    backgroundColor: '#ef5350',
    fontStyle: 'oblique',
    width: '100%',
  }
});

class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  handleUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleForm = (event) => {
    event.preventDefault();
    // Dispatch authInit with user and type as "Login"
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.handleForm({ user, type: "Login" });
  };
  render() {
    const { classes } = this.props;

    let content;
    let errorMessageArr;
    if (this.props.loading) {
      // Show Loader
      content = <Loader />;
    } else if (this.props.isLoggedIn) {
      // Redirect to Inbox after login
      content = <Redirect to="/inbox" />;
    } else {
      // Show login form if not logged in
      if (this.props.error) {
        errorMessageArr = this.props.errorMessageArr;
      }
      content = (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form
                className={classes.form}
                onSubmit={this.handleForm}
                noValidate
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={this.handleUsername}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handlePassword}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                {errorMessageArr ? <Alert severity="error" >{errorMessageArr}
          </Alert> : ""}
                <Grid container>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account?"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Grid>
      );
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleForm: (data) => dispatch(AuthActions.authInit(data)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Login)

import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from 'redux'
import * as AuthActions from "../../store/actions/auth";
import {Avatar, Button, CssBaseline, TextField, Link, Container, Grid, Typography, withStyles} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import { Redirect } from "react-router-dom";
import Loader from "../Loader";

const styles = (theme) => ({  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});



class Register extends Component {
  state = {
    username: "",
    password: ""
  };
  handleInput = (event, key) => {
    this.setState({
      [key]: event.target.value
    });
  };
  handleForm = event => {
    event.preventDefault();
    // Dispatch authInit with user and type as "Register"
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.handleForm({ user, type: "Register" });
  };
  render() {
    const { classes } = this.props;

    let content;
    let errorMessageArr;
    if (this.props.loading) {
      // Show Loader
      content = <Loader />;
    } else if (this.props.isLoggedIn) {
      content = <Redirect to="/inbox" />;
    } else {
      // Show register form if not registered
      if (this.props.error) {
        errorMessageArr = this.props.errorMessageArr.map((error, i) => {
          return <span key={i}>{error}</span>;
        });
      }
      content = (
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={this.handleForm} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                onChange={event => this.handleInput(event, "username")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => this.handleInput(event, "password")}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          {errorMessageArr ? <Alert severity="error" >{errorMessageArr}
          </Alert> : ""}
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
      );
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    errorMessageArr: state.auth.errorMessageArr,
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleForm: data => dispatch(AuthActions.authInit(data))
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Register)
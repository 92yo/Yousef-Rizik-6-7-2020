import React from "react";
import {Link, Button, Typography, Toolbar, AppBar, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  AppBar: {
    background: "white",
    boxShadow: "0 3px 5px 2px rgba(33, 181, 162, 0.25)",
    position: "fixed",
    color: "#21b5a2",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.AppBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Messaging System
          </Typography>
          <Link href="/login" variant="body2">
            <Button color="inherit">Login</Button>
          </Link>
          <Link href="/register" variant="body2">
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

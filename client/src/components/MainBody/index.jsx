import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typed from "react-typed";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import Email from "../../assets/email.jpg";
import './style.css';

const useStyles = makeStyles(theme=> ({
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: theme.spacing(1)
    },
    title:{
        color: '#e65100'
    },
    subTitle:{
        color: "tan",
        marginBottom: "3rem"
    },
    mainContainer: {
        position: "absolute",
        top: "40%",
        left: "50",
        transofrm: "translate(-50%, -50%)",
        width: "100vw",
        textAlign: "center",
        zIndex: 1,
    },
}))

export default function MainBody() {
    const classes = useStyles()

  return (
    <>
    <Box className={classes.mainContainer}>
        <Grid container justify="center">
        <Avatar className={classes.avatar} src={Email} alt="Email" />
        </Grid>
      <Typography className={classes.title} variant="h4">
        <Typed strings={["Welcome to Messaging System"]} typeSpeed={40} />
      </Typography>
      <br/>
      <Typography className={classes.subTitle} variant="h5">
        <Typed strings={["Made By", "Yousef Rizik"]} typeSpeed={40} backSpeed={60} loop />
      </Typography>
    </Box>
 
    </>
  );
}
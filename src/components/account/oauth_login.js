import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import OAuthLoginCard from "./login_card";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(14)
  },
  inputOuter: {
    marginTop: theme.spacing(3),
  },
  inputOuterError: {
    marginTop: theme.spacing(0),
  },
  inputOuter1: {
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(0),
  },
  inputEndAdornment: {
    minWidth: '8ch'
  },
  primaryColor: {
    color: "#2196F3",
  },
  secondaryColor: {
    color: "#FE6B8B",
  },
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function OAuthLogin() {
    let navigate = useNavigate();
    const classes = useStyles();
  return (
    <React.Fragment>
        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className={classes.marginTop}>
            <Grid item container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <OAuthLoginCard/>
            </Grid>
        </Grid>
    </React.Fragment>
  );
}
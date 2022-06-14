import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Header from "../header/header";
import HeaderDividers from "../account/divider";
import ProductPayCard from "./card";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(14),
  },
}));

export default function Pay(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header />
      {/* 分割线 */}
      <Grid container className={classes.marginTop}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <HeaderDividers name="" />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>

      {/* 注册表单 */}
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} >
          <ProductPayCard subProductStr="{}" />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </React.Fragment>
  );
}

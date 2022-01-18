import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import ImgMediaCard from "../card/card";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  cardBox1: {
    display: "flex",
    justifyContent: "center",
  },
  carBox2: {
    display: "flex",
    justifyContent: "right",
  },
}));

function Body() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={4}>
          <ImgMediaCard />
        </Grid>
        <Grid item className={classes.cardBox1} xs={4}>
          <ImgMediaCard />
        </Grid>
        <Grid item className={classes.carBox2} xs={4}>
          <ImgMediaCard />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Body;

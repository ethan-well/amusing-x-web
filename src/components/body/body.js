import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ImgMediaCard from '../card/card';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  cardBox1: {
    display: 'flex',
    justifyContent: 'center',
  },
  carBox2: {
    display: 'flex',
    justifyContent: 'right'
  }
}));

function Body() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container className={classes.root}>
        <Grid container direction="row" justify="space-between" alignItems="center" spacing={3}>
          <Grid item xs={4}>
            <ImgMediaCard />
          </Grid>
          <Grid className={classes.cardBox1} item xs={4}>
            <ImgMediaCard />
          </Grid>
          <Grid className={classes.carBox2} item xs={4} direction="row-reverse">
            <ImgMediaCard />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Body;


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 10,
  },
}));

export default function HeaderDividers(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={0} className={classes.root} direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={5}>
        <Divider variant="middle" />
      </Grid>

      <Grid container item direction="row" justifyContent="center" alignItems="center" xs={2}>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            {props.name}
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={5}>
        <Divider variant="middle" />
      </Grid>
    </Grid>
  );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  field: {
    color: '#ffebee'
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form noValidate autoComplete="off">
      <Grid container direction="row" justify="space-between" alignItems="flex-end" spacing={1}>
        <Grid item xs={9}>
          <TextField
            id="standard-full-width"
            label="评论"
            style={{ margin: 8 }}
            placeholder="留下你的评论"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={3} >
          <Button size="small" className={classes.margin}>
            保存
            </Button>
        </Grid>
      </Grid>
    </form>
  );
}
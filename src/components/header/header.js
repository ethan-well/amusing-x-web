import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const handleClick = () => {
  console.log('Click happened');
};

function Header() {
  const handlleFunc = handleClick;
  const name = "name";

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Link href="#" onClick={handlleFunc} color='error'>
            Link
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="#" onClick={handlleFunc} color='error'>
            Link
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="#" onClick={handlleFunc} color='error'>
            Link
          </Link>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <Grid container spacing={3} style={{ height: '15vh' }}>
      <Grid item xs={1}></Grid>
      <Grid container justify="center" alignItems="center" item xs={3}>
        <Grid item justify="center" alignContent='center' alignItems="center" xs={4}>
          <Link href="#" align='center' display='block' onClick={handlleFunc} color="inherit">
            美食
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="#" align='center' display='block' onClick={handlleFunc} color="inherit">
            编程
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="#" align='center' display='block' onClick={handlleFunc} color="inherit">
            理财
          </Link>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center" item xs={4}>
        <FormControl fullWidth size="small" variant="outlined">
          <InputLabel htmlFor="component-outlined">搜索</InputLabel>
          <OutlinedInput id="component-outlined" defaultValue={name} onChange={handlleFunc} label="Name" />
        </FormControl>
      </Grid>
      <Grid container justify="center" alignItems="center" item xs={3}>
        <Grid item justify="center" alignItems="center" xs={4}>
          <Link href="#" align='center' display='block' onClick={handlleFunc} color="inherit">
            历史
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="#" align='center' display='block' onClick={handlleFunc} color="inherit">
            文学
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="#" align='center' display='block' onClick={handlleFunc} color="inherit">
            电影
          </Link>
        </Grid>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  )
}

export default Header;
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AMAvatars from './avatar';

const handleClick = () => {
  console.log('Click happened');
};

function Header() {
  const handlleFunc = handleClick;
  const name = "name";

  return (
    <Grid container spacing={3} style={{ height: '15vh' }}>
      <Grid item xs={1}></Grid>
      <Grid container justifyContent="center" alignItems="center" item xs={3}>
        <Grid item xs={4}>
          <Link href="#" underline='none' align='center' display='block' onClick={handlleFunc} color="inherit">
            美食
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="#" underline='none' align='center' display='block' onClick={handlleFunc} color="inherit">
            编程
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="#" underline='none' align='center' display='block' onClick={handlleFunc} color="inherit">
            理财
          </Link>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" item xs={4}>
        <FormControl fullWidth size="small" variant="outlined">
          <InputLabel htmlFor="component-outlined">搜索</InputLabel>
          <OutlinedInput id="component-outlined" defaultValue={name} onChange={handlleFunc} label="Name" />
        </FormControl>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" item xs={3}>
        <Grid container item justifyContent="center" direction="row" alignItems="center" xs={4}>
          <Grid item>
            <AMAvatars />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Link href="#" underline='none' align='center' display='block' onClick={handlleFunc} color="inherit">
            文学
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="#" underline='none' align='center' display='block' onClick={handlleFunc} color="inherit">
            电影
          </Link>
        </Grid>
      </Grid>
      <Grid item xs={1}>
      </Grid>
    </Grid>
  )
}

export default Header;
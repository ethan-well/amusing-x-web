import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Header from '../header/header';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import HeaderDividers from './divider';

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(14)
  },
  inputOuter: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(0),
  },
  inputEndAdornment: {
    minWidth: '8ch'
  }
}));

export default function Join() {
  const [age, setAge] = React.useState('');

  const classes = useStyles()
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <Header />

      {/* 分割线 */}
      <Grid container className={classes.marginTop}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <HeaderDividers name="注册" />
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>

      {/* 注册表单 */}
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>

          <Grid className={classes.inputOuter} item xs={12}>
            <TextField fullWidth id="standard-required" label="请输入昵称" />
          </Grid>

          <Grid className={classes.inputOuter} item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="standard-adornment-password">请输入密码(6 到 8 位数字和大小写字母组成)</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid container className={classes.inputOuter} spacing={0} item>
            <Grid item xs={4}>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">选择区号</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>中国大陆</MenuItem>
                  <MenuItem value={30}>中国澳门</MenuItem>
                  <MenuItem value={30}>中国香港</MenuItem>
                  <MenuItem value={20}>中国台湾</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField fullWidth id="standard-required" label="常用手机号" />
            </Grid>
          </Grid>
          <Grid className={classes.inputOuter}>
            <FormControl fullWidth>
              <InputLabel >请输入短信验证码</InputLabel>
              <Input
                type="text"
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <Link className={classes.inputEndAdornment} href="#">
                    点击获取
                  </Link>
                }
              />
            </FormControl>
          </Grid>
          <Grid className={classes.inputOuter} container spacing={3}>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" color="primary" disableElevation>登录</Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined">注册</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </React.Fragment>
  );
}
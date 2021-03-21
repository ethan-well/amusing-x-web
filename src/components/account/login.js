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
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(14)
  },
  inputOuter: {
    marginTop: theme.spacing(3),
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
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Login() {
  const [age, setAge] = React.useState('');
  const [logWay, setLogWay] = React.useState('SMS')

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

  const handlerLogWayChange = (event) => {
    console.log("xxxxx", event.target.value);
    setLogWay(event.target.value);
  }

  return (
    <React.Fragment>
      <Header />

      {/* 分割线 */}
      <Grid container className={classes.marginTop}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <HeaderDividers name="登录" />
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>

      {/* 登录表单 */}
      <Grid container className={classes.inputOuter}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>

          {/* 登录方式选择 */}
          <Grid>
            <Typography className={classes.root}>
              <Link component="button" underline="none" value="password" onClick={handlerLogWayChange} >
                密码登录
              </Link>
              <Link component="button" underline="none" value="sms" onClick={handlerLogWayChange} >
                短信登录
              </Link>
            </Typography>
          </Grid>

          {/* 手机号 */}
          <Grid container spacing={0} item xs={12}>
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

          {/* 密码输入 */}
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

          {/* 验证码登录 */}
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
import React, { useState } from 'react';
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
import { Link as RouterLink, useHistory } from 'react-router-dom';
import useDataApi from '../../api/APIUtils.js';
import { SubmitLoginForm } from './submit';

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

export default function Login() {
  let history = useHistory();

  const classes = useStyles();
  const [state, setValues] = React.useState({
    phone: '',
    area_code: '',
    password: '',
    type: 0,
    showPassword: false,
  });

  const [loginSubmited, setLoginSubmited] = useState(false)
  const [loginResult, setLoginResult] = useState({})

  // 获取区号
  const [{ data, isLoading, isError }, doFetch] = useDataApi(`country/list`, { "result": [] }, true);

  const handleChange = (prop) => (event) => {
    setValues({ ...state, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginCallBack = (result) => {
    setLoginSubmited(true)
    setLoginResult(result);
    if (result.succeed) {
      history.push("/");
    }
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    SubmitLoginForm(state, loginCallBack);
  }

  const HandlerForgetPasswordClick = (event) => {
    event.preventDefault();
    history.push("/reset_password");
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
              <Link component="button" underline="none" color={state.type == 0 ? "primary" : "inherit"} value={0} onClick={handleChange("type")} >
                密码登录
              </Link>
              <Link component="button" underline="none" color={state.type == 1 ? "primary" : "inherit"} value={1} onClick={handleChange("type")} >
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
                  value={state.area_code}
                  onChange={handleChange('area_code')}
                >
                  {/* 区号列表 */}
                  {isLoading ? (
                    <div>Loading ...</div>
                    // @ts-ignore
                  ) : (data.result.map(item => (
                    <MenuItem key={item.cname} value={item.country_code}>{item.cname}</MenuItem>
                  )))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="standard-required"
                label="常用手机号"
                onChange={handleChange('phone')}
              />
            </Grid>
          </Grid>

          {state.type == 0 ?
            // 密码
            (<Grid className={classes.inputOuter} item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="standard-adornment-password">请输入密码(6 到 8 位数字和大小写字母组成)</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={state.showPassword ? 'text' : 'password'}
                  value={state.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>)
            :
            // 验证码登录
            (<Grid className={classes.inputOuter}>
              <FormControl fullWidth>
                <InputLabel >请输入短信验证码</InputLabel>
                <Input
                  type="text"
                  value={state.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <Link underline="none" className={classes.inputEndAdornment} href="#">
                      点击获取
                    </Link>
                  }
                />
              </FormControl>
            </Grid>)
          }

          {loginSubmited && loginResult &&
            <Grid className={classes.inputOuter} container>
              <Grid item xs={6} className={loginResult.succeed ? classes.primaryColor : classes.secondaryColor}>
                {loginResult.succeed && "登陆成功"}
                {!loginResult.succeed && loginResult.error_info && loginResult.error_info.message}
              </Grid>
            </Grid>
          }

          <Grid container>
            <Link
              component="button"
              variant="body2"
              onClick={HandlerForgetPasswordClick}
            >
              忘记密码？
            </Link>
          </Grid>

          {/* 登录注册 button */}
          <Grid className={classes.inputOuter} container spacing={3}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLoginSubmit}
                disableElevation
              >
                登录
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" disableElevation component={RouterLink} to="/join" >注册</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </React.Fragment>
  );
}
import React, { useState, useEffect } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import useDataApi from '../../api/APIUtils.js'

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

export default function Join(props) {
  const classes = useStyles();

  const [{ data, isLoading, isError }, doFetch] = useDataApi(`country/list`, {"result": []});

  const [values, setValues] = useState({
    nickname: '',
    password: '',
    area_code: '',
    phone: '',
    verification_code: '',
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

      {isError && <div>Something went wrong ...</div>}

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
            <TextField fullWidth id="standard-required" label="请输入昵称"
              value={values.nickname}
              onChange={handleChange('nickname')} />
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
                  value={values.area_code}
                  onChange={handleChange('area_code')}
                >
                  {/* 区号列表 */}
                  {isLoading ? (
                    <div>Loading ...</div>
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

          <Grid className={classes.inputOuter}>
            <FormControl fullWidth>
              <InputLabel >请输入短信验证码</InputLabel>
              <Input
                type="text"
                value={values.verification_code}
                onChange={handleChange('verification_code')}
                endAdornment={
                  <Link className={classes.inputEndAdornment} href="#">
                    点击获取
                  </Link>
                }
              />
            </FormControl>
          </Grid>

          <Grid
            spacing={3}
            className={classes.inputOuter}
            container
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disableElevation
            >
              注册
            </Button>
          </Grid>

          <Grid container
            className={classes.inputOuter}
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Link
              component={RouterLink}
              to="/login"
            >
              已有账号，直接登录
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </React.Fragment>
  );
}
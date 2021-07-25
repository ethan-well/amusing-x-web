import React, { useState, useReducer, useEffect } from 'react';
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
import { Link as RouterLink, useHistory } from 'react-router-dom';
import useDataApi from '../../api/APIUtils.js';
import VericationCodeApp from './verication_code';
import JoinReducer from './joinReducer';
import { SubmitJoinForm } from './submit'

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
    minWidth: '11ch'
  },
  codeInputEndAdornment: {
    minWidth: '11ch'
  }
}));

// @ts-ignore
export default function Join(props) {
  const classes = useStyles();
  let history = useHistory();


  // @ts-ignore
  const [{ data, isLoading, isError }, doFetch] = useDataApi(`country/list`, { "result": [] }, true);

  const [joinData, setValues] = useState({
    nickname: { value: '', errMsg: '', show: true },
    password: { value: '', errMsg: '', show: false },
    area_code: { value: '', errMsg: '', show: true },
    phone: { value: '', errMsg: '', show: true },
    verification_code: { value: '', errMsg: '', show: true },
  });

  const [joinResult, setJointResult] = useState({
    isLoading: false,
    result: {},
  })

  useEffect(() => {
    if (joinResult.result && joinResult.result.succeed) {
      history.push('/login')
    }

  }, [history, joinResult])

  // @ts-ignore
  const handleChange = (prop) => (event) => {
    setValues({ ...joinData, [prop]: { ...joinData[prop], value: event.target.value } });
    dispatch({ type: 'CHANGE_DATA', prop: prop, value: event.target.value })
  };

  const handleClickShowPassword = () => {
    setValues({ ...joinData, password: { ...joinData.password, show: !joinData.password.show } });
  };

  // @ts-ignore
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [state, dispatch] = useReducer(JoinReducer, joinData);

  const callback = (resp) => {
    setJointResult({ isLoading: false, result: resp });
  }

  // @ts-ignore
  const handleJoinSubmit = (event) => {
    // dispatch({ type: 'JOIN_SUBMIT' });
    event.preventDefault();
    SubmitJoinForm(state, callback);
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
              value={joinData.nickname.value}
              onChange={handleChange('nickname')} />
          </Grid>

          <Grid className={classes.inputOuter} item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="standard-adornment-password">请输入密码(6 到 8 位数字和大小写字母组成)</InputLabel>
              <Input
                id="standard-adornment-password"
                type={joinData.password.show ? 'text' : 'password'}
                value={joinData.password.value}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {joinData.password.show ? <Visibility /> : <VisibilityOff />}
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
                  value={joinData.area_code.value}
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

          <Grid className={classes.inputOuter}>
            <FormControl fullWidth>
              <InputLabel >请输入短信验证码</InputLabel>
              <Input
                type="text"
                className={classes.codeInputEndAdornment}
                value={joinData.verification_code.value}
                onChange={handleChange('verification_code')}
                endAdornment={<VericationCodeApp />}
              />
            </FormControl>
          </Grid>

          <Grid
            className={classes.inputOuter}
            container
          >
            {joinResult.result && joinResult.result.succeed && "注册成功"}
            {joinResult.result && !joinResult.result.succeed && joinResult.result.error_info && String(joinResult.result.error_info.message)}
          </Grid>

          <Grid
            className={classes.inputOuter}
            container
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleJoinSubmit}
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
        <Grid item xs={4}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
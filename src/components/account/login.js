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
import FormHelperText from '@material-ui/core/FormHelperText';
import Link from '@material-ui/core/Link';
import HeaderDividers from './divider';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { SubmitLoginForm, RequestData } from './submit';
import VericationCodeApp from './verication_code';

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
  const [loginData, setValues] = React.useState({
    phone: '',
    area_code: '',
    password: '',
    type: 0,
    verification_code: ''
  });

  // 表单验证数据
  const [paramsErrMsg, setParamsErrMsg] = useState({
    phone: { errMsg: '', show: false, valid: false },
    area_code: { errMsg: '', show: false, valid: false },
    password: { errMsg: '', show: false, valid: false },
    type: { errMsg: '', show: false, valid: false },
    verification_code: { errMsg: '', show: false, valid: false },
  })

  const [loginSubmited, setLoginSubmited] = useState(false)
  const [loginResult, setLoginResult] = useState({})

  // 获取区号
  const [areaCodeList, setAreaCodeList] = useState({
    succeed: false,
    result: {},
  });
  const getAreaCodeListCallback = (data) => {
    setAreaCodeList(data);
  }
  useEffect(() => {
    RequestData('country/list', getAreaCodeListCallback)
  }, []);

  // 获取表单校验正则
  const [regexps, setRegexps] = useState({
    succeed: false,
    result: {},
  });
  const getRegexpsCallback = (data) => {
    setRegexps(data);
  }
  useEffect(() => {
    RequestData('login/regexp', getRegexpsCallback)
  }, []);

  const [currentEdit, setCurrentEdit] = useState("");
  const handleChange = (prop) => (event) => {
    setCurrentEdit(prop);

    let value = event.target.value
    if (prop == 'type') {
      value = parseInt(value, 10);
    }

    setValues({ ...loginData, [prop]: value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...loginData, showPassword: !loginData.showPassword });
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
    if (!ValidPropByRegexpsOnSubmitForm()) {
      return
    }

    SubmitLoginForm(loginData, loginCallBack);
  }

  const ValidPropByRegexpsOnSubmitForm = () => {
    let keys = ['area_code', 'phone']
    if (loginData.type == 0) {
      keys.push("password");
    } else {
      keys.push("verification_code");
    }

    for (let key of keys) {
      if (!ValidPropByRegexps(key)) {
        return false;
      }
    }

    return true;
  }

  const ValidPropByRegexpsOnClickGetVerificationCodeButton = (props) => {
    let keys = ['area_code', 'phone']

    for (let key of keys) {
      if (!ValidPropByRegexpsWithGiveData(key, props)) {
        return false;
      }
    }

    return true;
  }

  const ValidPropByRegexpsWithGiveData = (prop, data) => {
    if (!regexps || !regexps.result) {
      return true
    }

    let regexpMap = Object.create({});
    for (let i = 0; i < regexps.result.length; i++) {
      regexpMap[regexps.result[i].name] = regexps.result[i];
    };

    if (regexpMap[prop]) {
      let match = data[prop].match(regexpMap[prop].rules);
      if (match) {
        setParamsErrMsg({ ...paramsErrMsg, [prop]: { errMsg: '', show: false, valid: true } });
        return true
      } else {
        setParamsErrMsg({ ...paramsErrMsg, [prop]: { errMsg: regexpMap[prop].desc, show: true, valid: false } });
        return false
      }
    }

    return true
  };


  const HandlerForgetPasswordClick = (event) => {
    event.preventDefault();
    history.push("/reset_password");
  }

  const [currentOnBlurField, setCurrentOnBlurField] = useState("");
  const onBlurField = (prop) => (event) => {
    setCurrentOnBlurField(prop);
  }

  useEffect(() => {
    ValidPropByRegexpsOnBlur(currentEdit)
  }, [loginData, currentEdit, currentOnBlurField]);

  const ValidPropByRegexpsOnBlur = (prop) => {
    if (currentOnBlurField != prop) {
      return
    }

    ValidPropByRegexps(prop);
  }

  const ValidPropByRegexps = (prop) => {
    if (!regexps || !regexps.result) {
      return true
    }

    let regexpMap = Object.create({});
    for (let i = 0; i < regexps.result.length; i++) {
      regexpMap[regexps.result[i].name] = regexps.result[i];
    };

    if (regexpMap[prop]) {
      let match = loginData[prop].match(regexpMap[prop].rules);
      if (match) {
        setParamsErrMsg({ ...paramsErrMsg, [prop]: { errMsg: '', show: false, valid: true } });
        return true
      } else {
        setParamsErrMsg({ ...paramsErrMsg, [prop]: { errMsg: regexpMap[prop].desc, show: true, valid: false } });
        return false
      }
    }

    return true
  };

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
              <Link component="button" underline="none" color={loginData.type == 0 ? "primary" : "inherit"} value={0} onClick={handleChange("type")} >
                密码登录
              </Link>
              <Link component="button" underline="none" color={loginData.type == 1 ? "primary" : "inherit"} value={1} onClick={handleChange("type")} >
                短信登录
              </Link>
            </Typography>
          </Grid>

          {/* 手机号 */}
          <Grid container spacing={0} item xs={12}>
            <Grid item xs={4}>
              <FormControl fullWidth className={classes.formControl} error={paramsErrMsg['area_code'].show}>
                <InputLabel id="demo-simple-select-label">选择区号</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onBlur={onBlurField('area_code')}
                  value={loginData.area_code}
                  onChange={handleChange('area_code')}
                >
                  {/* 区号列表 */}
                  {!areaCodeList.succeed ? (
                    <div>Loading ...</div>
                    // @ts-ignore
                  ) : (areaCodeList.result.map(item => (
                    <MenuItem key={item.cname} value={item.country_code}>{item.cname}</MenuItem>
                  )))}
                </Select>
                <FormHelperText>{paramsErrMsg['area_code'].errMsg}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="standard-required"
                label="常用手机号"
                onBlur={onBlurField('phone')}
                onChange={handleChange('phone')}
                error={paramsErrMsg['phone'].show}
                helperText={paramsErrMsg['phone'].show && paramsErrMsg['phone'].errMsg}
              />
            </Grid>
          </Grid>

          {loginData.type == 0 ?
            // 密码
            (<Grid className={classes.inputOuter} item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="密码"
                  id="standard-adornment-password"
                  type={loginData.showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  error={paramsErrMsg['password'].show}
                  onBlur={onBlurField('password')}
                  onChange={handleChange('password')}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {paramsErrMsg['password'].show ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }}
                  helperText={paramsErrMsg['password'].show && paramsErrMsg['password'].errMsg}
                />
              </FormControl>
            </Grid>)
            :
            // 验证码登录
            (<Grid className={classes.inputOuter}>
              <FormControl fullWidth>
                <TextField
                  label="验证码"
                  type="text"
                  value={loginData.verification_code}
                  onBlur={onBlurField('verification_code')}
                  onChange={handleChange('verification_code')}
                  InputProps={{
                    endAdornment: <VericationCodeApp action="login" data={loginData} onClick={ValidPropByRegexpsOnClickGetVerificationCodeButton} />
                  }}
                  error={paramsErrMsg['verification_code'].show}
                  helperText={paramsErrMsg['verification_code'].show && paramsErrMsg['verification_code'].errMsg}
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
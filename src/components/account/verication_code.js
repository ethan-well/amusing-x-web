import React, { useState, useCallback } from 'react';
import useFetch, { Provider } from 'use-http'
import Link from '@material-ui/core/Link';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  codeInputEndAdornment: {
    minWidth: '10ch'
  }
}));

const GetCode = (props) => {
  const classes = useStyles();

  const [ErrMsg, setErrMsg] = useState({ msg: '', show: false });
  const [todos, setTodos] = useState({});
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [showPopover, setShowPopover] = useState(false);

  const handlePopoverClose = () => {
    setShowPopover(false);
  }

  const addNewTodo = useCallback(async () => {
    if (!props.onClick(props.data)) {
      return
    }

    const newTodo = await get(`/verification_code?action=${props.action}&phone=${props.data.phone}&area_code=${props.data.area_code}`)
    if (response.ok) {
      if (newTodo.succeed) {
        setShowPopover(false);
        setErrMsg({ msg: '', show: false })
      } else {
        setShowPopover(true);
        setErrMsg({ msg: newTodo.error_info.message, show: true })
      }
      setTodos(newTodo);
    }
  }, [get, todos, props, response])

  return (
    <React.Fragment>
      <Popover
        open={ErrMsg.show && showPopover}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
      >
        <Box p={2}>
          <Typography>{ErrMsg.msg}</Typography>
        </Box>
      </Popover>

      <Link component="button" variant="body2" className={classes.codeInputEndAdornment} onClick={addNewTodo}>
        获取验证码
      </Link>
    </React.Fragment>
  )
}

const VericationCodeApp = (props) => (
  <Provider url='http://localhost:3000/v1/amusingxwebapiserv' options={{ cachePolicy: 'no-cache' }}>
    <GetCode action={props.action} onClick={props.onClick} data={props.data} />
  </Provider>
)

export default VericationCodeApp;

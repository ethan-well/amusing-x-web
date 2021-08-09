import React, { useState, useCallback } from 'react';
import useFetch, { Provider } from 'use-http'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  codeInputEndAdornment: {
    minWidth: '10ch'
  }
}));

const GetCode = (props) => {
  console.info('GetCode', props);

  const classes = useStyles();

  const [todos, setTodos] = useState({})
  const { get, post, response, loading, error } = useFetch({ data: [] })

  const addNewTodo = useCallback(async () => {
    if (!props.onClick(props.data)) {
      return
    }

    const newTodo = await get(`/verification_code?action=${props.action}&phone=${props.data.phone}&area_code=${props.data.area_code}`)
    if (response.ok) {
      setTodos(newTodo)
    }
  }, [get, todos, props, response])

  return (
    <Link component="button" variant="body2" className={classes.codeInputEndAdornment} onClick={addNewTodo}>
      获取验证码
    </Link>
  )
}

const VericationCodeApp = (props) => (
  <Provider url='http://localhost:3000/v1/amusinguserserv' options={{ cachePolicy: 'no-cache' }}>
    <GetCode action={props.action} onClick={props.onClick} data={props.data} />
  </Provider>
)

export default VericationCodeApp;

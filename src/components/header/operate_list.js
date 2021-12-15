import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { RequestData } from '../account/submit';

const useStyles = makeStyles((theme) => ({
  box: {
    zIndex: 100000,
    position: 'absolute',
  },
}));

const  OperateListFunc =  function OperateList(props, ref) {
  const classes = useStyles();

  const logoutCallback = (data) => {
    console.log(data);
  }

  const logoutFunction = (e) => {
    e.stopPropagation();
    RequestData(process.env.REACT_APP_EUROPA_LOGOUT, logoutCallback);
  }

  return (
    props.show
    ?
    <Box ref={ref} className={classes.box} sx={{ border: 1, borderRadius: 2, borderColor: '#bdbdbd', width: '50%', maxWidth: 200, bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={logoutFunction}>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Logout" >
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
    :
    ""
  );
}

export default React.forwardRef(OperateListFunc);

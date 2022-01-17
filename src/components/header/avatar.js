import React, { useState} from 'react';
import { findDOMNode } from 'react-dom'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import OperateListNew from "./operate_list";

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    cursor: "pointer",
  },
}));

export default function AMAvatars() {
  const classes = useStyles();
  const ref = React.createRef();

  document.addEventListener('mousedown', (e)=>onClickFunction(e), false);


  const [operateListShow, setOperateListShow] = useState(false)

  const insideAvatarFunction = (e) => {
    e.stopPropagation();
    setOperateListShow(true);
  }

  const onClickFunction = (e) => {
    e.stopPropagation();
    if (ref.current) {
      let result = findDOMNode(ref.current).contains(e.target);
      if (!result) {
        setOperateListShow(false);
      }
    }
  }

  return (
    <React.Fragment>
      <div onClick={insideAvatarFunction}>
        <Avatar className={classes.purple}>X</Avatar>
      </div>

      <OperateListNew show={operateListShow} ref={ref}/>
    </React.Fragment>
  );
}

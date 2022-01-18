import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import AMAvatars from "./avatar";
import ImageListItem from "@mui/material/ImageListItem";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@mui/material/Avatar";
import { deepOrange, green } from "@mui/material/colors";

const handleClick = () => {
  console.log("Click happened");
};

const useStyles = makeStyles((theme) => ({
  ImageSize: {
    height: "100ch",
    weight: "100ch",
  },
}));

function Header() {
  const classes = useStyles();
  const handlleFunc = handleClick;
  const name = "name";

  return (
    <Grid container spacing={3} style={{ height: "15vh" }}>
      <Grid item xs={1}></Grid>
      <Grid container justify="center" alignItems="center" item xs={3}>
        <Grid
          container
          item
          justify="center"
          direction="row"
          alignItems="center"
          xs={4}
        >
          <Grid item>
            <Avatar
              src={process.env.PUBLIC_URL + "/header_logo.png"}
              variant="square"
            ></Avatar>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Link
            href="#"
            underline="none"
            align="center"
            display="block"
            onClick={handlleFunc}
            color="inherit"
          >
            资源
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link
            href="#"
            underline="none"
            align="center"
            display="block"
            onClick={handlleFunc}
            color="inherit"
          >
            问答
          </Link>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center" item xs={4}>
        <FormControl fullWidth size="small" variant="outlined">
          <InputLabel htmlFor="component-outlined">搜索</InputLabel>
          <OutlinedInput
            id="component-outlined"
            defaultValue={name}
            onChange={handlleFunc}
            label="Name"
          />
        </FormControl>
      </Grid>
      <Grid container justify="center" alignItems="center" item xs={3}>
        <Grid item xs={4}>
          <Link
            href="#"
            underline="none"
            align="center"
            display="block"
            onClick={handlleFunc}
            color="inherit"
          >
            项目
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link
            href="#"
            underline="none"
            align="center"
            display="block"
            onClick={handlleFunc}
            color="inherit"
          >
            方案
          </Link>
        </Grid>
        <Grid
          container
          item
          justify="center"
          direction="row"
          alignItems="center"
          xs={4}
        >
          <Grid item>
            <AMAvatars />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}

export default Header;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Image1 from "./image1.jpeg";
import { red } from "@material-ui/core/colors";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 200,
  },
  action: {
    padding: 16,
  },
  icon: {
    onHover: red,
  },
  fab: {
    margin: theme.spacing(2),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

function ImgMediaCard(props) {
  const classes = useStyles();
  const subProduct = JSON.parse(props.subProductStr);

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={Image1}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {subProduct.subProductInfo.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {subProduct.subProductInfo.desc}
          </Typography>
          {subProduct.Attributes.map((attr) => (
            <p>
              {attr.Name} : {attr.AttrValue}
            </p>
          ))}
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <AddIcon />
        </IconButton>
        <IconButton className={classes.expand}>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      {/* <CardActions disableSpacing={true}> */}
      {/* {subProduct.subProductInfo.price} */}
      {/* <Button variant="contained" color="secondary" className={classes.expand}> */}
      {/* 购买 */}
      {/* </Button> */}
      {/* </CardActions> */}
    </Card>
  );
}

export default ImgMediaCard;

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Image1 from "./image1.jpeg";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { RequestData } from "../account/submit";

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
  price: {},
}));

function ImgMediaCard(props) {
  const classes = useStyles();
  const subProduct = JSON.parse(props.subProductStr);
  const [count, setCount] = useState(1);
  const [showTip, setShowTip] = useState(false);
  const [tip, setTip] = useState("");
  const [pictures, setPictures] = useState([{src: "loading"}]);

  const addCount = function () {
    if (count + 1 > subProduct.subProductInfo.max_num) {
      setTip("超过最大可售卖数量限制！");
      setShowTip(true);
    } else {
      setCount(count + 1);
    }
  };

  const removeCount = function () {
    if (count - 1 < subProduct.subProductInfo.min_num) {
      setTip("数量小于最小售卖数量限制！");
      setShowTip(true);
    } else {
      setCount(count - 1);
    }
  };

  const getProductsCallback = (data) => {
    console.log("data: ", data);
    if (data && data.result && data.result.sub_product_pictures) {
      setPictures(data.result.sub_product_pictures[0].pictures);
    }
  };

  useEffect(() => {
    if (subProduct.subProductInfo.id >= 1) {
      RequestData(
        `v1/europa/product/sub_product/pictures?sub_product_ids=${subProduct.subProductInfo.id}`,
        getProductsCallback
      );
    }
  }, []);

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          // image={Image1}
          src={pictures[0].src}
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
        <Grid container spacing={3}>
          <Grid container item xs={3} alignContent="center">
            <span class="currency">
              {subProduct.subProductInfo.currencySymbol}
            </span>
            <span class="value">{subProduct.subProductInfo.price}</span>
          </Grid>
          <Grid item xs={6}>
            <IconButton aria-label="remove">
              <RemoveIcon onClick={() => removeCount()} />
            </IconButton>
            <span>{count}</span>
            <IconButton aria-label="add">
              <AddIcon onClick={() => addCount()} />
            </IconButton>
          </Grid>
          <Grid item container alignContent="center" xs={3}>
            <Button variant="outlined" color="secondary">
              购买
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default ImgMediaCard;

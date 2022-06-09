import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { RequestData } from "../account/submit";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

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
  const [tipInfo, setTipInfo] = useState("");
  const [pictures, setPictures] = useState([{ src: "loading" }]);

  const [openMaxTip, setOpenMaxTip] = useState(false);
  const [openMinTip, setOpenMinTip] = useState(false);

  const closeTip = function () {
    setOpenMaxTip(false);
    setOpenMinTip(false);
  };

  const addCount = function () {
    if (count + 1 > subProduct.subProductInfo.max_num) {
      setTipInfo(`最多购买${subProduct.subProductInfo.max_num}件`);
      setOpenMaxTip(true);
    } else {
      setCount(count + 1);
      setOpenMaxTip(false);
    }
  };

  const removeCount = function () {
    if (count - 1 < subProduct.subProductInfo.min_num) {
      setTipInfo(`最少购买${subProduct.subProductInfo.min_num}件`);
      setOpenMinTip(true);
    } else {
      setCount(count - 1);
      setOpenMinTip(false);
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
          {subProduct.Attributes &&
            subProduct.Attributes.map((attr) => (
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
            <Tooltip
              title={tipInfo}
              TransitionComponent={Zoom}
              placement="top"
              open={openMinTip}
            >
              <IconButton onMouseLeave={closeTip} aria-label="remove">
                <RemoveIcon onClick={() => removeCount()} />
              </IconButton>
            </Tooltip>
            <span>{count}</span>
            <Tooltip
              title={tipInfo}
              TransitionComponent={Zoom}
              placement="top"
              open={openMaxTip}
            >
              <IconButton onMouseLeave={closeTip} aria-label="add">
                <AddIcon onClick={() => addCount()} />
              </IconButton>
            </Tooltip>
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

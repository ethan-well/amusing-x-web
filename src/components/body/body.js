import React, { useState, useReducer, useEffect } from 'react';
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import ImgMediaCard from "../card/card";
import Grid from "@material-ui/core/Grid";
import { RequestData } from '../account/submit';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  cardBox1: {
    display: "flex",
    justifyContent: "center",
  },
  carBox2: {
    display: "flex",
    justifyContent: "right",
  },
}));

function Body() {
  const classes = useStyles();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
  })

  // 获取表单校验正则
  const [products, setProducts] = useState({
    succeed: false,
    result: {},
  });
  const getProductsCallback = (data) => {
    console.log("data: ", data);
    setProducts(data);
  };
  useEffect(() => {
    RequestData(`v1/europa/product/sub_product/list?page=${pagination.page}&limit=${pagination.limit}`, getProductsCallback);
  }, []);

  return (
    <Container className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={4}>
          <ImgMediaCard />
        </Grid>
        <Grid item className={classes.cardBox1} xs={4}>
          <ImgMediaCard />
        </Grid>
        <Grid item className={classes.carBox2} xs={4}>
          <ImgMediaCard />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Body;

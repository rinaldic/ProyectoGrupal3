import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import * as actions from "../../redux/actions/productsActions";
import s from "./OrderList.module.css";
import logo from "..//../img/logo.JPG";
import IconButton from "@material-ui/core/IconButton";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ReviewForm from "./ReviewForm";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    direction: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  detail: {
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    direction: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "2px",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  card: {
    width: 400,
    height: 800,
  },
  typo: {
    fontfamily: "Poppins",
    fontSize: 40,
    display: "flex",
    justifyContent: "center",
  },
  paragraph: {
    margin: "10px 0",
  },
  image: {
    width: "50px",
    height: "50px",
  },
  trade: {
    display: "flex",
    direction: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: "5px",
  },
  tradeName: {
    fontfamily: "Poppins",
    fontSize: 25,
  },
}));

export default function OrderList({ onOrderSelect }) {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [showForm, setShowForm] = useState(false);

  console.log(orders);

  useEffect(() => {
    dispatch(actions.getOrders());
  }, [dispatch]);

  function handleClickBack() {
    history.push("/home");
  }

  return (
    <div className={s.general}>
      <Grid container spacing={2} className={classes.header}>
        <Grid item xs={4} className={classes.trade}>
          <Typography>
            <img src={logo} alt={"logo"} className={classes.image} />
          </Typography>
          <Typography className={classes.tradeName}>CloudyBuy</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.typo}>Your Orders</Typography>
        </Grid>
        <Grid item>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleClickBack}
          >
            Go to Store
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.root}>
        {orders.length === 0 ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            m={1}
            p={1}
            bgcolor="background.paper"
            className={s.boxStyle}
          >
            <Typography variant="h4" color="initial">
              You have no orders created yet.
            </Typography>
            <br />
            <Typography variant="h5" color="initial">
              Go to the store and buy!
            </Typography>
            <br />
            <IconButton onClick={handleClickBack} size="large">
              <SearchIcon />
              <ShoppingBasketIcon />
            </IconButton>
          </Box>
        ) : (
          orders.map((order) => {
            const orderDetails = order.OrderDetails;
            let totalPrice = 0;
            for (let i = 0; i < orderDetails.length; i++) {
              const productPrice = orderDetails[i].product.price;
              totalPrice += productPrice;
            }

            return (
              <Grid spacing={2} item xs={4} key={order._id}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h2"
                      className={classes.paragraph}
                    >
                      Order #{order.id}
                    </Typography>
                    <Typography color="textSecondary">
                      Date: {order.createdAt}
                    </Typography>
                    <Typography color="textSecondary">
                      Status: {order.status}
                    </Typography>
                    <hr />
                    {orderDetails.map((orderDetail) => {
                      return (
                        <Grid container className={classes.detail}>
                          <Typography
                            key={orderDetail._id}
                            className={s.paragraph}
                          >
                            <img
                              src={orderDetail.product.thumbnail}
                              alt={orderDetail.product.title}
                              width="200"
                              height="200"
                              alignItems="center"
                            />
                            <Typography className={classes.paragraph}>
                              {orderDetail.product.title}:{" "}
                            </Typography>
                            <Typography className={classes.paragraph}>
                              {orderDetail.quantity} x $
                              {orderDetail.product.price}
                            </Typography>
                            <Typography className={classes.paragraph}>
                              <Button
                                id="review-button"
                                onClick={() => setShowForm(!showForm)}
                              >
                                Leave your review
                              </Button>
                              {showForm && (
                                <ReviewForm
                                  productId={orderDetail.product.id}
                                  orderId={order.id}
                                  userId={order.userId}
                                />
                              )}
                            </Typography>
                          </Typography>
                        </Grid>
                      );
                    })}
                    <hr />
                    <Typography variant="body2" component="p">
                      Order Total:$ {totalPrice}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
}

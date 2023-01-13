import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getCart, postOrder,getUsers } from "../../redux/actions/productsActions";
import CartProduct from "../CartProduct/CartProduct.jsx";
import EmptyCart from "../EmptyCart/EmptyCart";
import LoginModal from "../Login/LoginModal";
import Login from "../Login/Login";
//import s from "../CreateProduct/CreateProduct";
import axios from "axios";
import logo from "..//../img/logo.JPG";

import { useLogin } from "../Login/useLogin";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../Cart/Cart.module.css";

//import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    direction: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  detail: {
    direction:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  header: {
    display: "flex",
    direction:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    marginTop:"2px"
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
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
  },
  paragraph: {
    margin: "10px 0",
  },
  image: {
    width:"50px",
    height:"50px"
  },
  trade: {
    display:"flex",
    direction:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    paddingLeft:"5px"
  },
  tradeName: {
    fontfamily: "Poppins",
    fontSize: 20,
  }
}));


const Cart = () => {
  let userAddress;
  const cart = useSelector((state) => state.cart);
  const users = useSelector((state) => state.users);
  
  const user1 = useSelector((state) => state.user);
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalOpen, openLogin, closeLogin] = useLogin(false);
  const user = sessionStorage.getItem("userId");

  useEffect(()=>{
    dispatch(getUsers())
    
    userAddress = users.filter(userEl => (userEl.id === user1.id));
    console.log(userAddress)
    if(userAddress.length>0){
    setInput( prevState => ({...prevState, address: userAddress[0].adress}))}else{input.address=""}
  },[dispatch])

  const [input, setInput] = useState({
    address: "",
  });

  function handleInputChange(e) {
    e.preventDefault();
    console.log(input);

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleLogin() {
    console.log("hola");
    if (!sessionStorage.getItem("token")) {
      openLogin();
    } else {
      sessionStorage.removeItem("token");
    }
  }

  async function buy() {
    const response = await axios.post("https://proyecto-grupal-back-production.up.railway.app/checkout", {
      items: cart,
      pagador: input,
    });
    const pago = response.data.init_point;
    const pagoId = response.data.id;
    let order = {
      id: parseInt(user),
      idMp: pagoId,

      price: totalAmount,
      quantity: totalQuantity,
      pedido: cart,
    };  
    localStorage.setItem('order2', JSON.stringify(order));
    localStorage.setItem('user2', JSON.stringify(user));
    dispatch(postOrder(order));
    window.location.href = pago;
    //history.push("/home");
  }

  function onBuy(e) {
    e.preventDefault();

    !user ? handleLogin() : buy();

    //history.push("/home");
  }

  const totalAmount = cart.reduce((sum, value) => sum + value.amount * value.quantity,0);
  const totalQuantity = cart.reduce((sum, value) => sum + value.quantity, 0);

  function handleClickBack() {
    history.push("/home");
  }
  
  return (
    <div className={styles.container}>
      <Login modalOpen={modalOpen} closeLogin={closeLogin} />
      <Grid container spacing={2} className={classes.header && styles.header}>
        <Grid item xs={4} className={classes.trade}>
          <Typography>
          <img src={logo} alt={"logo"} className={classes.image}/>
          </Typography>
          <Typography className={classes.tradeName}>CloudyBuy</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.typo}>Shopping Cart</Typography>
        </Grid>
        <Grid item>
          <Button size="small" variant="contained" color="primary" onClick={handleClickBack}>Go to Store</Button>
        </Grid>
      </Grid>
      <hr />
      <div className={styles.cart}>
        {cart.length === 0 ? (
          <div className={styles.fullDiv}>
            <EmptyCart />
          </div>
        ) : 
        (
          <div className={styles.fullDiv}>
              <TableContainer className={styles.table_container}>
                <Table
                  sx={{ minWidth: "60rem" }}
                  size="medium"
                  aria-label="simple table"
                  className={styles.dataTable}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell >Image</TableCell>
                      <TableCell >Product</TableCell>
                      <TableCell >Price</TableCell>
                      <TableCell >Quantity</TableCell>
                      <TableCell >Total</TableCell>
                      <TableCell >Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart?.map((cartItem, index) => {
                      return (
                        <CartProduct
                          key={index}
                          productId={cartItem.productId}
                          title={cartItem.title}
                          amount={cartItem.amount}
                          quantity={cartItem.quantity}
                          images={cartItem.images}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className={styles.orderTotalAddressAndBuy}>
                  <div className={styles.orderTotal}>
                    <div><Typography variant="p">Total Order: </Typography></div>
                    <div><Typography variant="p"> $ {totalAmount}</Typography></div>
                  </div>
                  <div className={styles.addressDiv}>
                      <form className={styles.addressDiv}>
                        <label className={styles.addressDivLabel} htmlFor="">
                          Shipping address:
                        </label>
                        <input
                          className={styles.addressDivInput}
                          placeholder="Address..."
                          value={input.address}
                          name="address"
                          type="text"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </form>
                  </div>
                  <Button size="small" onClick={onBuy} color="primary" variant="contained" className={styles.buyButton}>
                  Buy now
                  </Button>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

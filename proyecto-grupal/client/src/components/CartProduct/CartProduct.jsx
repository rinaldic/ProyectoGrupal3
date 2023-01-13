import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TableRow, TableCell, TextField } from "@mui/material";
import * as actions from "../../redux/actions/productsActions";

import styles from "../CartProduct/CartProduct.module.css";

export default function CartProduct({
  productId,
  title,
  amount,
  quantity,
  images,
}) {
  const dispatch = useDispatch();
  let product = useSelector((state) => state.products);

  function removeCart() {
    dispatch(actions.removeCart(productId));
  }

  function changeCart(e) {
    const data = product?.filter((item) => item.id === productId);

    let cant = e.target.value < 1 ? 1 : e.target.value > data[0].stock ? data[0].stock: parseInt(e.target.value);

    let canti = cant > data[0].stock ? data[0].stock : parseInt(e.target.value);

    //console.log(data[0].stock)
    
    dispatch(actions.changeItemCart(productId, cant, amount));
  }

  return (
    <TableRow
      key={productId}
      className={productId % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
    >
      {/* <TableCell sx={{ color: "#e7ebf0" }}>{productId}</TableCell> */}
      <TableCell><img src={images} alt={title} /></TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>$ {amount}</TableCell>
      {/* <TableCell sx={{color: '#e7ebf0'}}><TextField sx={{ color: '#e7ebf0', maxWidth: '75px'}} id='filled-number' type='number' variant='filled' defaultValue={quantity} /></TableCell> */}
      <TableCell>
        {" "}
        <input
          className={styles.quantityInput}
          type="number"
          name="quantity"
          value={quantity}
          onChange={changeCart}
        />{" "}
      </TableCell>
      <TableCell>$ {amount * quantity}</TableCell>
      <TableCell>
        <Button onClick={removeCart} color="error" variant="contained">
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}

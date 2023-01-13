import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, TableRow, TableCell, TextField } from "@mui/material";
import * as actions from "../../redux/actions/productsActions";
import styles from "../WishListProduct/WishListProduct.module.css";

export default function WishListProduct({
    index,
    id,
    title,
    description,
    price,
    image,
}) {
    const dispatch = useDispatch();
    const wishList = useSelector((state) => state.wishListItems);
    const history = useHistory();
    //   let product = useSelector((state) => state.products);

    function handleWishListDelete() {
        console.log('entra a handleWishListDelete. El id es: ' + id);
        console.log('la wishList es: ', wishList);
        const data = wishList?.find(item => {
          return item.id === id;
        });
        console.log('la data de handleWishListDelete es: ', data);
        if(data) {
          dispatch(actions.removeProductFromWishList(data.id));
          const objWishList = {
            user_id: sessionStorage.getItem("userId"),
            wishListItems: wishList.filter(wishListItem => {
              return (wishListItem.id !== data.id)
            })
          }
          dispatch(actions.saveUserWishList(objWishList));
        }
      }
    function goToProductDetails(event) {
        const id = event.target.value;
        console.log('el id es: ', id);
        history.push(`/details/${id}`);
    }
    //   function removeCart() {
    //     dispatch(actions.removeCart(productId));
    //   }

    //   function changeCart(e) {
    //     const data = product?.filter((item) => item.id === productId);

    //     let cant = e.target.value < 1 ? 1 : e.target.value > data[0].stock ? data[0].stock: parseInt(e.target.value);

    //     let canti = cant > data[0].stock ? data[0].stock : parseInt(e.target.value);

    //     //console.log(data[0].stock)

    //     dispatch(actions.changeItemCart(productId, cant, amount));
    //   }

    return (
        <TableRow
            key={index}
            className={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
        >

            <TableCell sx={{ color: "#e7ebf0" }}>
                <img src={image} alt={title} />
            </TableCell>
            <TableCell sx={{ color: "#e7ebf0" }}>{title}</TableCell>
            <TableCell sx={{ color: "#e7ebf0" }}>{description}</TableCell>
            <TableCell sx={{ color: "#e7ebf0" }}>$ {price}</TableCell>
            <TableCell sx={{ color: "#e7ebf0" }}>
                <Button onClick={handleWishListDelete} color="error" variant="contained">
                    Remove from Wishlist
                </Button>
            </TableCell>
            <TableCell sx={{ color: "#e7ebf0" }}>
                <Button onClick={(event) => goToProductDetails(event)} color="success" variant="contained" value={id}>
                    View
                </Button>
            </TableCell>
        </TableRow>
    );
}

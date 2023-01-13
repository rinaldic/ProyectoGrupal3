import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addCart,
  addProductToWishList,
  saveUserWishList,
  removeProductFromWishList,
  getUserWishList,
  getCart,
  removeCart,
} from "../../redux/actions/productsActions";
import { Button } from "@mui/material";
import { IconButton } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Rating from "@mui/material/Rating";
import sty from "..//ProductCard/ProductCard.module.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const RedFavoriteIcon = styled(FavoriteIcon)({
  color: "#d32f2f",
});

const BlueCartIcon = styled(AddShoppingCartIcon)({
  color: "#0a2d55",
});

const GreenCartIcon = styled(AddShoppingCartIcon)({
  color: "#4caf50",
});

export default function ProductCard({
  title,
  id,
  price,
  images,
  rating,
  stock,
  description,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  let cart = useSelector((state) => state.cart);
  let userDb = useSelector((state) => state.user);
  let wishList = useSelector((state) => state.wishListItems);

  //   useEffect(() => {
  //     dispatch(getUserWishList());
  //     //dispatch(getCart);
  // }, [dispatch]);

  function handleDetail() {
    history.push(`/details/${id}`);
  }

  function handleWishList() {
    const data = wishList?.find((item) => {
      return item.id === id;
    });
    console.log("data de handleWishList: ", data);
    if (!data) {
      console.log("entra al if(!data)");
      dispatch(addProductToWishList(id, images, title, description, price));
      const objWishListItem = {
        id: id,
        thumbnail: images,
        title: title,
        description: description,
        price: price,
      };
      const objWishList = {
        user_id: sessionStorage.getItem("userId"),
        wishListItems: [...wishList, objWishListItem],
      };
      console.log("objWishList.wishListItems: ", objWishList.wishListItems);
      dispatch(saveUserWishList(objWishList));
    }
  }
  function handleWishListDelete() {
    console.log("entra a handleWishListDelete. El id es: " + id);
    console.log("la wishList es: ", wishList);
    const data = wishList?.find((item) => {
      return item.id === id;
    });
    console.log("la data de handleWishListDelete es: ", data);
    if (data) {
      dispatch(removeProductFromWishList(data.id));
      const objWishList = {
        user_id: sessionStorage.getItem("userId"),
        wishListItems: wishList.filter((wishListItem) => {
          return wishListItem.id !== data.id;
        }),
      };
      dispatch(saveUserWishList(objWishList));
    }
  }
  function showWishListButtons() {
    if (sessionStorage.getItem("userId") !== null) {
      return true;
    } else {
      return false;
    }
  }
  function handleCart() {
    const data = cart?.filter((item) => item.productId === id);
    const dataf = data.length < 1 ? stock - 1 : data[0].quantity;
    //console.log(dataf);
    stock > 0 && dataf + 1 <= stock
      ? dispatch(addCart(id, price, images, title))
      : Swal.fire({
          title: "Out of Stock!",
          //text: 'Do you want to continue',
          icon: "error",
          confirmButtonText: "Continue",
        });
  }
  //const dark = useSelector((state) => state.dark);
  function checkIsInWishList(id) {
    const wishListItemFound = wishList.find((wishListItem) => {
      return wishListItem.id === id;
    });
    return wishListItemFound ? true : false;
  }

  function checkIsInCart(id) {
    console.log(id);
    console.log(cart);
    const cartItemFound = cart.find((cartItem) => {
      return cartItem.productId === id;
    });
    //dispatch(getCart());
    console.log(cartItemFound);
    return cartItemFound ? true : false;
    // console.log(id);
    // console.log(cart);
    // const cartItemFound = cart.find(cartItem => {
    //   return cartItem.productId === id;
    // });
    //dispatch(getCart());
    // console.log(cartItemFound);
  }
  // function removeCart() {
  //   console.log('id removeCart: ', id);
  //   dispatch(removeCart(id));
  // }

  return (
    <>
      <div>
        <div className={sty.card}>
          <img className={sty.images} src={images} alt="" />

          <div className={sty.text}>
            <strong>{title}</strong>

            <p className={sty.weight}>
              <strong>Price: ${price ? price : "0"}</strong>
            </p>
            <div className={sty.ratingbox}>
              <p className={sty.weight}>
                <strong>Rating: </strong>
                <Rating
                  value={rating}
                  readOnly
                  size="small"
                  className={sty.stars}
                  precision={0.1}
                />
              </p>
            </div>
            <div className={sty.divBtns}>
              <p onClick={handleDetail} className={sty.btnDetailText}>
                <strong>Info +</strong>
              </p>
              {stock && checkIsInCart(id) ? (
                <IconButton onClick={handleCart}>
                  <GreenCartIcon />
                </IconButton>
              ) : stock ? (
                <IconButton onClick={handleCart}>
                  <BlueCartIcon />
                </IconButton>
              ) : (
                <Button variant="contained" size="small">
                  Not Available
                </Button>
              )}
              {showWishListButtons() &&
                (checkIsInWishList(id) ? (
                  <IconButton onClick={handleWishListDelete}>
                    <RedFavoriteIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleWishList}>
                    <FavoriteBorderIcon />
                  </IconButton>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
//import Loading from '..//Loading/Loading.jsx';
import {
  getProductsDetails,
  addCart,
  addProductToWishList,
  saveUserWishList,
  removeProductFromWishList,
  getUserWishList,
} from "..//../redux/actions/productsActions.js";
import sty from "./ProductDetails.module.css";
import CarouselImg from "../CarouselImg/CarouselImg";
import logo from "..//../img/logo.JPG";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import Reviews from "../Reviews/Reviews";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // redux states --------------------------------
  const prod = useSelector((state) => state.detail);
  let cart = useSelector((state) => state.cart);
  let userDb = useSelector((state) => state.user);
  console.log(prod);
  //const dark = useSelector(state=>state.dark)
  let wishList = useSelector((state) => state.wishListItems);

  useEffect(() => {
    dispatch(getProductsDetails(id));
    dispatch(getUserWishList());
  }, [id, dispatch]);

  //--------handler click--------------------
  function handleClickCreate() {
    history.push(`/modifyProduct/${id}`);
  }
  function handleClickBack() {
    history.push("/home");
  }

  function handleCart() {
    const data = cart?.filter((item) => item.productId === parseInt(id));
    const dataf = data.length < 1 ? prod.stock - 1 : data[0].quantity;
    console.log(dataf);
    prod.stock > 0 && dataf + 1 <= prod.stock
      ? dispatch(addCart(parseInt(id), prod.price, prod.thumbnail, prod.title))
      : alert("no");
    console.log("prod:", prod);
    history.goBack();
  }

  //----------------Wishlist------------------

  function handleWishList() {
    const data = wishList?.find((item) => {
      return item.id === parseInt(id);
    });
    console.log("data de handleWishList: ", data);
    if (!data) {
      console.log("entra al if(!data)");
      dispatch(
        addProductToWishList(
          parseInt(id),
          prod.thumbnail,
          prod.title,
          prod.description,
          prod.price
        )
      );
      const objWishListItem = {
        id: parseInt(id),
        thumbnail: prod.thumbnail,
        title: prod.title,
        description: prod.description,
        price: prod.price,
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
    console.log("entra a handleWishListDelete. El id es: " + parseInt(id));
    console.log("la wishList es: ", wishList);
    const data = wishList?.find((item) => {
      return item.id === parseInt(id);
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
  }
  return (
    <div className={sty.details}>
      <div className={sty.header}>
        <img src={logo} alt="LOGO" className={sty.logo} />
        <h4>CloudyBuy</h4>

        <div className={sty.btn}>
          <button onClick={handleClickBack}>
            <i className="fa-solid fa-circle-chevron-left"></i>
          </button>
          <br></br>
        </div>
      </div>

      {prod.message ? (
        <h2>{prod.message}</h2>
      ) : (
        <>
          {prod.thumbnail ? (
            <div className={sty.container}>
              {/* <img src={prod.thumbnail} alt="" />  */}
              <div className={sty.containerCarouse}>
                <div className={sty.carouse}>
                  <CarouselImg />
                </div>
              </div>

              <div className={sty.text}>
                <h1>{prod.title}</h1>
                <br />
                <div className={sty.specs}>
                  <p>
                    <strong>
                      <h4>{prod?.brand}</h4>
                    </strong>
                  </p>
                  <p>
                    <strong>
                      <h5>{prod?.description}</h5>
                    </strong>
                  </p>
                  <p className={sty.price}>
                    <strong>$ {prod?.price} </strong>
                  </p>
                  <Rating value={prod.rating} readOnly />
                </div>
                <hr />
                <div className={sty.ratingbox}>
                  <p className={sty.specs}>
                    <h4>Reviews:</h4>
                    <Reviews productId={id} />
                  </p>
                </div>

                <div>
                  {userDb.isAdmin && (
                    <button onClick={handleClickCreate} className={sty.button1}>
                      <i className="fa-solid fa-plus"></i> Modify product
                    </button>
                  )}
                </div>
              </div>

              <div className={sty.text}>
                <h1>Buy Now!</h1>
                <br />
                <div className={sty.specs}>
                  <h4 htmlFor="">
                    <strong>Actual Stock</strong>
                  </h4>
                  <p>
                    <strong>{prod.stock ? prod.stock : "0"} Units</strong>
                  </p>
                  <br />
                  {checkIsInCart(parseInt(id)) ? (
                    <button
                      className={sty.btns}
                      disabled={true}
                      style={{
                        color: "#ffff",
                        cursor: "not-allowed",
                        backgroundColor: "rgba(160, 4, 4, 0.7)",
                      }}
                    >
                      In Cart!
                    </button>
                  ) : (
                    <button className={sty.btns} onClick={() => handleCart()}>
                      Add to Cart
                    </button>
                  )}

                  <hr />
                  {showWishListButtons() &&
                    (checkIsInWishList(parseInt(id)) ? (
                      <button
                        className={sty.btns}
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={handleWishListDelete}
                      >
                        Remove from wishlist
                      </button>
                    ) : (
                      <button
                        className={sty.btns}
                        variant="contained"
                        size="small"
                        onClick={handleWishList}
                      >
                        Add to wishlist
                      </button>
                    ))}
                  <hr />
                  <button className={sty.btns} onClick={() => history.goBack()}>
                    Go to Store
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </>
      )}
    </div>
  );
}

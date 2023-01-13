import React from 'react';
import EmptyWishList from '../EmptyWishList/EmptyWishList.jsx';
import WishListProduct from "../WishListProduct/WishListProduct.jsx";
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getUserWishList, saveUserWishList, removeProductFromWishList } from '../../redux/actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';

import styles from './WishList.module.css';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
  } from "@mui/material";


export default function WishList() {
    const dispatch = useDispatch();
    const wishList = useSelector((state) => state.wishListItems);
    const history = useHistory();



    
    

    useEffect(() => {
        dispatch(getUserWishList());
    }, [dispatch]);


    // return (
    //     <div>
    //         <Link className={styles.volverAtras} to='/home'>Go Back...</Link>
    //         { wishList && wishList.map(wishListItem => {
    //             return (
    //                 <div>
    //                     <p>{wishListItem.title}</p>
    //                 </div>
    //             )
    //         } )}
    //     </div>
    // )
    return (
        <div>
          {/* <Login modalOpen={modalOpen} closeLogin={closeLogin} /> */}
          <div className={styles.wishList}>
            <Typography variant="h2" className={styles.tableTitle}>
              My Wishlist
            </Typography>
    
            {wishList.length === 0 ? (
              <div className={styles.fullDiv}>
                
                <EmptyWishList />
              </div>
            ) : (
              <div className={styles.fullDiv}>
                <Link className={styles.volverAtras} to="/home">
                  Home...
                </Link>
                <div className={styles.mainDiv}>
                  <span className={styles.filler}></span>
                  <TableContainer>
                    <Table
                      sx={{ minWidth: "1440px" }}
                      size="medium"
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: "#e7ebf0" }}>Image</TableCell>
                          <TableCell sx={{ color: "#e7ebf0" }}>Title</TableCell>
                          <TableCell sx={{ color: "#e7ebf0" }}>Description</TableCell>
                          <TableCell sx={{ color: "#e7ebf0" }}>Price</TableCell>
                          <TableCell sx={{ color: "#e7ebf0" }}>Action</TableCell>
                          <TableCell sx={{ color: "#e7ebf0" }}>Details</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      { wishList && wishList.map((wishListItem, index) => {
                          return (
                            <WishListProduct
                              key={index}
                              index={index}
                              id={wishListItem.id}
                              image={wishListItem.thumbnail}
                              title={wishListItem.title}
                              description={wishListItem.description}
                              price={wishListItem.price}
                            />
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                       
                    
                  </div>
                </div>
           
            )}
          </div>
        </div>
      );
}
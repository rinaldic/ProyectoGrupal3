import React from "react";
import styles from '../EmptyWishList/EmptyWishList.module.css';
import shoppingCartEmpty from '../../img/ShoppingCart-Empty.png';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";

export default function EmptyWishList () {
    return (
        <div className={styles.mainDiv}>
            <img className={styles.emptyImage} src={shoppingCartEmpty} />
            <h2 className={styles.h2}>Your Wishlist is Currently Empty</h2>
            <p className={styles.p}>You have no items in wishlist.</p>
            <p className={styles.p}>Let's go add something first!</p>
            <Link to='/home'><Button variant='contained'>Explore!</Button></Link>
        </div>
    )
}
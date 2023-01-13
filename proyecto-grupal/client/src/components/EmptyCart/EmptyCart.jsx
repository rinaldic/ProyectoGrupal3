import React from "react";
import styles from '../EmptyCart/EmptyCart.module.css';
import shoppingCartEmpty from '../../img/ShoppingCart-Empty.png';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";

export default function EmptyCart () {
    return (
        <div className={styles.mainDiv}>
            <img className={styles.emptyImage} src={shoppingCartEmpty} />
            <h2 className={styles.h2}>Your Shopping Cart is Currently Empty</h2>
            <p className={styles.p}>You have no items in your shopping cart.</p>
            <p className={styles.p}>Let's go buy something!</p>
            <Link to='/home'><Button variant='contained'>Shop Now!</Button></Link>
        </div>
    )
}
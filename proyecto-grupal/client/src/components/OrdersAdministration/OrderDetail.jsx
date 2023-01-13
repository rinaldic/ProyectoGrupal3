import React from "react";
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import { Link } from "react-router-dom";
import styles from './OrderDetail.module.css';


export default function OrderAdministration() {
    const dispatch = useDispatch();
    let data = window.location.toString().split("/");
    console.log(data)
    const order = useSelector((state) => state.orderDetail);
    console.log(order)
    let id = data[4]
    let orderid = data[5]
    useEffect(() => {
        dispatch(actions.getOrderDetail(id));
    },[dispatch])
    
    let order2 = [order]
    let order3 = order2[0].orders;
    let findorder = order3.filter(e => e.id == orderid)
    let finded = findorder[0].OrderDetails
    finded = finded.map(e=>e.product)
    let products = finded.map(e=> e.title)
    return(
        <div className={styles.fulldiv}>
            <Link className={styles.goback} to='/administrateOrders'>Return</Link>
            <div className={styles.ordercard}>
                <div>Order ID: {orderid}</div>
                <div>Belongs to user: {order.name + " " + order.surname}</div>
                <div>User adress: {order.adress}</div>
                <div>User email: {order.email}</div>
                <div>Item Quantity: {findorder[0].quantity}</div>
                <div>Total Price: {findorder[0].price}</div>
                <div>Order status: {findorder[0].status} </div>
                <div>Products: {products.map(e=><div>-{e}</div>)}</div>
            </div>
            
        </div>
    )
}
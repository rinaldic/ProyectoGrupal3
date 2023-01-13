import React from "react";
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import OrderRow from "./OrderRow";
import { Link } from "react-router-dom";
import styles from './OrderAdministration.module.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";


export default function OrderAdministration() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);
    
    const [dummyState, rerender] = React.useState(1)



    function handleStatus(e){
        e.preventDefault(e);
        dispatch(actions.filterByStatus(e.target.value));
    }

    function reload(e){
        e.preventDefault();
        rerender(dummyState + 1);
    }
    useEffect(() => {
        dispatch(actions.getOrders());
    },[dummyState])
    
    return (
        <div className={styles.fullDiv}>
            <Link className={styles.volverAtras} to='/home'>Home...</Link>
            <div className={styles.mainDiv}>
                <Typography variant="h2" className={styles.tableTitle}>Orders administration</Typography>
                <span className={styles.filler}></span>
                <div>
                    {<button type="submit" className={styles.reload} onClick={(e) => reload(e)}>Reload Orders</button>}
                    <h5>Filter by Status: </h5>
                    <select>
                        <option value="all" onClick={(e) => handleStatus(e)}>All</option>
                        <option value="in process" onClick={(e) => handleStatus(e)}>In Process</option>
                        <option value="confirmed" onClick={(e) => handleStatus(e)}>Confirmed</option>
                        <option value="cancelled" onClick={(e) => handleStatus(e)}>Cancelled</option>
                    </select>
                </div>
                <TableContainer>
                    <Table sx={{ minWidth: '1440px' }} size="medium" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#e7ebf0' }}>Order ID</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Status</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Item Quantity</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Price</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>User ID</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Order Detail (Products)</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Cancel Order</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Confirm Order</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Shipping Status</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {orders?.map((order, index) => {
                            return (
                                <OrderRow
                                    key={index}
                                    id={order.id}
                                    status={order.status}
                                    quantity={order.quantity}
                                    price={order.price}
                                    user={order.userId}
                                    orderDetail={order.OrderDetails}
                                    orderShipping={order.shippingStatus}
                                />
                            );
                        })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
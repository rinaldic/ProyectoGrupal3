import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import UserRow from "../UserRow/UserRow";
import { Link } from "react-router-dom";
import styles from './usersAdministration.module.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";


export default function () {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(actions.getUsers());
    },[dispatch])
    return (
        <div className={styles.fullDiv}>
            <Link className={styles.volverAtras} to='/home'>Home...</Link>
            <div className={styles.mainDiv}>
                <Typography variant="h2" className={styles.tableTitle}>User administration</Typography>
                <span className={styles.filler}></span>
                <TableContainer>
                    <Table sx={{ minWidth: '1440px' }} size="medium" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#e7ebf0' }}>ID</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Name</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Surname</TableCell>
                            {/* <TableCell sx={{ color: '#e7ebf0' }}>Password</TableCell> */}
                            <TableCell sx={{ color: '#e7ebf0' }}>Email</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Address</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>type</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Active</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {users?.map((user, index) => {
                            return (
                                <UserRow
                                    
                                    key={index}
                                    id={user.id}
                                    name={user.name}
                                    surname={user.surname}
                                    password={user.password}
                                    email={user.email}
                                    address={user.adress}
                                    isAdmin={user.isAdmin}
                                    active={user.active}
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
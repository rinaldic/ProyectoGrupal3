import { Button, TableRow } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import styles from './userRow.module.css';
import { TableCell } from "@mui/material";

export default function UserRow ({id, name, surname, password, email, address, isAdmin, active}) {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(active);
    const [admin, setIsAdmin] = useState(isAdmin);
    const [user, setUser] = useState({
        id: id,
        name: name,
        surname: surname,
        password: password,
        email: email,
        adress: address,
        isAdmin: isAdmin,
        active: active,
    });
    function handleClickAdmin(e) {
        e.preventDefault();
        // dispatch(actions.turnIntoAdminOrUser(user.id));
        dispatch(actions.turnIntoAdminOrUser(id));
        // setUser(!user.isAdmin);
        setIsAdmin(!admin);

    }
    function handleClickActive(e) {
        e.preventDefault();
        // dispatch(actions.setActiveInactive({email: user.email}));
        dispatch(actions.setActiveInactive({email: email}));
        // setUser(!user.active);
        setIsActive(!isActive);
    }
    return (
        <TableRow key={id} className={(id % 2 === 0)? styles.tableRowEven:styles.tableRowOdd}>
            <TableCell sx={{color: '#e7ebf0'}}>{id}</TableCell>
            <TableCell sx={{color: '#e7ebf0'}}>{name}</TableCell>
            <TableCell sx={{color: '#e7ebf0'}}>{surname}</TableCell>
            {/* <TableCell sx={{color: '#e7ebf0'}}>{password}</TableCell> */}
            <TableCell sx={{color: '#e7ebf0'}}>{email}</TableCell>
            <TableCell sx={{color: '#e7ebf0'}}>{address}</TableCell>
            <TableCell sx={{ paddingLeft: '7px' }}><Button color={admin?'success':'error'} variant='contained' onClick={(e) => {handleClickAdmin(e)}}>{admin?'admin':'user'}</Button></TableCell>
            <TableCell sx={{ paddingLeft: '7px' }}><Button color={isActive?'success':'error'} variant='contained' onClick={(e) => {handleClickActive(e)}}>{isActive?'active':'banned'}</Button></TableCell>
        </TableRow>
    )
}
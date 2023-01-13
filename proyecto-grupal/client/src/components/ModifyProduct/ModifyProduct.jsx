import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getProductsDetails, postProduct } from '../../redux/actions/productsActions';
import { getCategories } from '../../redux/actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ModifyProduct.module.css'

import { Button } from '@mui/material';
import ModifyForm from '../ModifyForm/ModifyForm.jsx';

export default function ModifyProduct() {
    const { id } = useParams();
    console.log(id);
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.detail);
    const categories = useSelector((state) => state.categories);
    const history = useHistory();



    
    

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProductsDetails(id));
        console.log(productDetails);
    }, [id, dispatch]);

    

    return (
        <div className={styles.fullDiv}>
            <Link className={styles.volverAtras} to='/home'>Go Back...</Link>
            { productDetails && <ModifyForm id={id} productDetails={productDetails} />}
        </div>
    )
}
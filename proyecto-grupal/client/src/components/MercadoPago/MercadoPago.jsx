import React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import sty from "./MercadoPago.module.css";

export default function MercadoPago(pago) {

    const carrito = useSelector(state => state.cart);
    const { MercadoPago } = useScript( "https://sdk.mercadopago.com/js/v2", "MercadoPago");
     

    const mp = new MercadoPago("APP_USR-06027043-b2a5-4576-ac25-217e1bbfc148", { locale: "es-AR",  })
   
    mp.checkout({
        preference: {
            id: pago.id,
        },
        render: {
            container: "#button-checkout", // Indica el nombre de la clase donde se mostrará el botón de pago
            label: "Pagar", // Cambia el texto del botón de pago (opcional)
        },
        theme: {
            elementsColor: '#000000',
            headerColor: '#ffffff',
        }
        })

    return (
                    <div id="button-checkout" className={sty.btn}></div> 
           );
};


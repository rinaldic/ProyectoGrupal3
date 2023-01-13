const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
const { userLogin } = require("..//Controllers/userController");

//Provisional de esta forma, luego va en el .env

const ACCESS_TOKEN = "APP_USR-2136680771902247-071214-4767199d5dfa22b7c0885a9e58ff3bec-1159384629";
//const ACCESS_TOKEN = "TEST-6405482469447912-122618-bdf78e9edc3a5200ee09947407b8f220-108067496";
//const ACCESS_TOKEN = "TEST-3513189841843574-122218-a2e90018ba813e2fee73acec8437541e-196223807";

//5031 7557 3453 0604	

//TETE775785

//4CkqVh8LxT

mercadopago.configure({
    access_token: ACCESS_TOKEN,
});

router.post("/", (req, res) => {
    try{
        const {items, pagador} = req.body
        //console.log(req.body)
        //const idPedido = pedidoGenerado.pedido.id;
        const productos = [];
        items.map((p) => {
            let item = {
                title: p.title,
                unit_price: p.amount,
                quantity: p.quantity,
 
            }
            productos.push(item);
        })

        const usuario = {
            // name: datos.nombre,
            // surname: datos.apellido,
            // identification: {
            //     type: "DNI",
            //     number: datos.documento
            // },
            address: pagador.address
            
        }
        console.log(usuario)
        
        let preference = {
            items: productos,
            payer: {usuario},
            //notification_url:"http://localhost:3000/notificacion",
            payment_methods: {
                excluded_payment_types: [
                    {
                        id: "ticket"
                    }
                ],
                installments: 12
                },
            back_urls:{
                success: "https://proyecto-grupal3.vercel.app/checkout/success/",
                failure: "https://proyecto-grupal3.vercel.app/checkout/success/",
            },
            auto_return: "approved",
            //binary_mode: true,
        };
        console.log(preference)

        mercadopago.preferences.create(preference)
            .then(function(response){
                res.json(response.body);
            }).catch(function (error){
                console.log(error);
                res.send("Se ha producido un error");
            })
    }catch(e){
        console.log(e);
        res.send("Se ha producido un error");
    }
})



module.exports = router;
